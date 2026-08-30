import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search, ChevronDown } from 'lucide-react';
import type { Product, Category, Material, Stone, Collection } from '@/types';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { QuickView } from '@/components/product/QuickView';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { EmptyState } from '@/components/ui/EmptyState';

type SortOption = 'featured' | 'newest' | 'rating' | 'price-asc' | 'price-desc';

const categoryOptions: Category[] = ['Rings', 'Earrings', 'Necklaces', 'Bracelets', 'Bangles', 'Charms', 'Jewellery Sets'];
const materialOptions: Material[] = ['Gold', 'Silver', 'Platinum', 'Rose Gold', 'Brass'];
const stoneOptions: Stone[] = ['Diamond', 'Pearl', 'Emerald', 'Ruby', 'Sapphire', 'Kundan', 'None'];
const collectionOptions: Collection[] = ['Heritage', 'Aurora', 'Mehfil', 'Noor', 'Zarina', 'Everyday Luxe'];
const colorOptions = ['Gold', 'Silver', 'Rose'];

interface Filters {
  categories: Category[];
  materials: Material[];
  stones: Stone[];
  collections: Collection[];
  colors: string[];
  priceRange: [number, number];
  minRating: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
}

const defaultFilters: Filters = {
  categories: [],
  materials: [],
  stones: [],
  collections: [],
  colors: [],
  priceRange: [0, 500],
  minRating: 0,
  inStockOnly: false,
  onSaleOnly: false,
};

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Read initial params
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('category');
    const filter = searchParams.get('filter');

    setSearchQuery(q);
    const newFilters = { ...defaultFilters };
    if (cat && categoryOptions.includes(cat as Category)) {
      newFilters.categories = [cat as Category];
    }
    if (filter === 'new') setSort('newest');
    if (filter === 'bestseller') {
      // We'll handle this via a special sort
    }
    setFilters(newFilters);
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [searchParams]);

  const toggleArrayFilter = <K extends keyof Filters>(key: K, value: any) => {
    setFilters((prev) => {
      const arr = prev[key] as any[];
      const exists = arr.includes(value);
      return { ...prev, [key]: exists ? arr.filter((x) => x !== value) : [...arr, value] };
    });
  };

  const clearAll = () => {
    setFilters(defaultFilters);
    setSearchQuery('');
    setSearchParams({});
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += filters.categories.length;
    count += filters.materials.length;
    count += filters.stones.length;
    count += filters.collections.length;
    count += filters.colors.length;
    if (filters.minRating > 0) count++;
    if (filters.inStockOnly) count++;
    if (filters.onSaleOnly) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) count++;
    return count;
  }, [filters]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q) ||
        p.stone.toLowerCase().includes(q)
      );
    }

    // Filter by bestseller/new from URL
    const filterParam = searchParams.get('filter');
    if (filterParam === 'new') result = result.filter((p) => p.isNew);
    if (filterParam === 'bestseller') result = result.filter((p) => p.isBestSeller);

    // Categories
    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }
    // Materials
    if (filters.materials.length > 0) {
      result = result.filter((p) => filters.materials.includes(p.material));
    }
    // Stones
    if (filters.stones.length > 0) {
      result = result.filter((p) => filters.stones.includes(p.stone));
    }
    // Collections
    if (filters.collections.length > 0) {
      result = result.filter((p) => filters.collections.includes(p.collection));
    }
    // Colors
    if (filters.colors.length > 0) {
      result = result.filter((p) => filters.colors.some((c) => p.color.toLowerCase().includes(c.toLowerCase())));
    }
    // Price
    result = result.filter((p) => {
      const price = p.salePrice ?? p.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
    // Rating
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }
    // In stock
    if (filters.inStockOnly) {
      result = result.filter((p) => p.inStock);
    }
    // On sale
    if (filters.onSaleOnly) {
      result = result.filter((p) => !!p.salePrice);
    }

    // Sort
    switch (sort) {
      case 'newest':
        result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-asc':
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      default:
        result.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }

    return result;
  }, [filters, sort, searchQuery, searchParams]);

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="py-5 border-b border-charcoal-100 dark:border-charcoal-700">
      <h3 className="text-xs uppercase tracking-wider text-charcoal-800 dark:text-ivory font-medium mb-4">{title}</h3>
      {children}
    </div>
  );

  const CheckboxOption = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
    <label className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
      <span className={`w-4 h-4 border flex items-center justify-center transition-colors ${checked ? 'bg-charcoal-800 dark:bg-champagne-300 border-charcoal-800 dark:border-champagne-300' : 'border-charcoal-300 dark:border-charcoal-600 group-hover:border-charcoal-500'}`}>
        {checked && <span className="w-2 h-2 bg-ivory dark:bg-charcoal-900" />}
      </span>
      <span className="text-sm text-charcoal-600 dark:text-charcoal-300 group-hover:text-charcoal-800 dark:group-hover:text-ivory transition-colors" onClick={onChange}>{label}</span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );

  const FiltersContent = () => (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-lg text-charcoal-800 dark:text-ivory">Filters</h2>
        {activeFilterCount > 0 && (
          <button onClick={clearAll} className="text-xs uppercase tracking-wider text-champagne-500 dark:text-champagne-300 hover:text-charcoal-800 dark:hover:text-ivory transition-colors">
            Clear All ({activeFilterCount})
          </button>
        )}
      </div>

      <FilterSection title="Category">
        {categoryOptions.map((cat) => (
          <CheckboxOption
            key={cat}
            label={cat}
            checked={filters.categories.includes(cat)}
            onChange={() => toggleArrayFilter('categories', cat)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            value={filters.priceRange[0]}
            onChange={(e) => setFilters((f) => ({ ...f, priceRange: [Number(e.target.value), f.priceRange[1]] }))}
            className="w-full border border-charcoal-200 dark:border-charcoal-600 bg-transparent px-2 py-1.5 text-sm focus:outline-none focus:border-champagne-400"
            placeholder="Min"
          />
          <span className="text-charcoal-400">—</span>
          <input
            type="number"
            value={filters.priceRange[1]}
            onChange={(e) => setFilters((f) => ({ ...f, priceRange: [f.priceRange[0], Number(e.target.value)] }))}
            className="w-full border border-charcoal-200 dark:border-charcoal-600 bg-transparent px-2 py-1.5 text-sm focus:outline-none focus:border-champagne-400"
            placeholder="Max"
          />
        </div>
        <input
          type="range"
          min="0"
          max="500"
          value={filters.priceRange[1]}
          onChange={(e) => setFilters((f) => ({ ...f, priceRange: [f.priceRange[0], Number(e.target.value)] }))}
          className="w-full accent-champagne-500"
        />
      </FilterSection>

      <FilterSection title="Material">
        {materialOptions.map((mat) => (
          <CheckboxOption
            key={mat}
            label={mat}
            checked={filters.materials.includes(mat)}
            onChange={() => toggleArrayFilter('materials', mat)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Stone">
        {stoneOptions.map((stone) => (
          <CheckboxOption
            key={stone}
            label={stone === 'None' ? 'No stone' : stone}
            checked={filters.stones.includes(stone)}
            onChange={() => toggleArrayFilter('stones', stone)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Color">
        {colorOptions.map((color) => (
          <CheckboxOption
            key={color}
            label={color}
            checked={filters.colors.includes(color)}
            onChange={() => toggleArrayFilter('colors', color)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Collection">
        {collectionOptions.map((col) => (
          <CheckboxOption
            key={col}
            label={col}
            checked={filters.collections.includes(col)}
            onChange={() => toggleArrayFilter('collections', col)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Rating">
        {[4, 3, 2, 1].map((r) => (
          <CheckboxOption
            key={r}
            label={`${r} stars & up`}
            checked={filters.minRating === r}
            onChange={() => setFilters((f) => ({ ...f, minRating: f.minRating === r ? 0 : r }))}
          />
        ))}
      </FilterSection>

      <FilterSection title="Availability">
        <CheckboxOption
          label="In stock only"
          checked={filters.inStockOnly}
          onChange={() => setFilters((f) => ({ ...f, inStockOnly: !f.inStockOnly }))}
        />
        <CheckboxOption
          label="On sale only"
          checked={filters.onSaleOnly}
          onChange={() => setFilters((f) => ({ ...f, onSaleOnly: !f.onSaleOnly }))}
        />
      </FilterSection>
    </div>
  );

  return (
    <div className="container-lux py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop' }]} />

      <div className="mt-6 mb-8">
        <h1 className="font-serif text-headline text-charcoal-800 dark:text-ivory">Shop All Jewellery</h1>
        <p className="text-charcoal-500 dark:text-charcoal-400 mt-2">Explore our full collection of thoughtfully designed pieces.</p>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="flex items-center gap-3 border border-charcoal-200 dark:border-charcoal-600 px-4 py-3 max-w-md">
          <Search className="w-4 h-4 text-charcoal-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, category, material, or collection..."
            className="flex-1 bg-transparent text-sm focus:outline-none text-charcoal-800 dark:text-ivory placeholder:text-charcoal-400"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-charcoal-400 hover:text-charcoal-700">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-28">
            <FiltersContent />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-charcoal-100 dark:border-charcoal-700">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm text-charcoal-600 dark:text-charcoal-300"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </button>
              <p className="text-sm text-charcoal-500 dark:text-charcoal-400">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-charcoal-400 hidden sm:inline">Sort by</span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="appearance-none bg-transparent border border-charcoal-200 dark:border-charcoal-600 pl-3 pr-8 py-2 text-sm text-charcoal-700 dark:text-charcoal-200 focus:outline-none focus:border-champagne-400 cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Best Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Products grid */}
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i}>
                  <div className="aspect-[3/4] skeleton" />
                  <div className="mt-4 space-y-2">
                    <div className="h-3 w-1/3 skeleton" />
                    <div className="h-4 w-2/3 skeleton" />
                    <div className="h-3 w-1/4 skeleton" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              title="No products found"
              description="Try adjusting your filters or search query to find what you're looking for."
              actionLabel="Clear All Filters"
              actionTo="/shop"
            />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-charcoal-900/50 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-ivory dark:bg-charcoal-800 shadow-xl overflow-y-auto animate-slide-in">
            <div className="flex items-center justify-between p-5 border-b border-charcoal-100 dark:border-charcoal-700 sticky top-0 bg-ivory dark:bg-charcoal-800 z-10">
              <h2 className="font-serif text-lg text-charcoal-800 dark:text-ivory">Filters</h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2 text-charcoal-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5">
              <FiltersContent />
              <Button onClick={() => setMobileFiltersOpen(false)} className="w-full mt-6">
                Show {filteredProducts.length} Results
              </Button>
            </div>
          </div>
        </div>
      )}

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
