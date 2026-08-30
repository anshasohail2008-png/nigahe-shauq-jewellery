import { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Instagram, Facebook, Twitter, Send } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { Input, Textarea } from '@/components/ui/Form';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!form.name.trim()) err.name = 'Required';
    if (!form.email.trim()) err.email = 'Required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Invalid email';
    if (!form.subject.trim()) err.subject = 'Required';
    if (!form.message.trim()) err.message = 'Required';
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    showToast("Message sent. We'll be in touch soon.");
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container-lux py-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
      <h1 className="font-serif text-headline text-charcoal-800 dark:text-ivory mt-6 mb-3">Get in Touch</h1>
      <p className="text-charcoal-500 dark:text-charcoal-400 max-w-xl mb-12">We'd love to hear from you. Whether it's a question about an order, a custom request, or just to say hello — our team is here to help.</p>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory mb-6">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} placeholder="Your name" />
              <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} placeholder="you@example.com" />
            </div>
            <Input label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} error={errors.subject} placeholder="How can we help?" />
            <Textarea label="Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} error={errors.message} placeholder="Tell us more..." />
            <Button type="submit" size="lg"><Send className="w-4 h-4" /> Send Message</Button>
          </form>
        </div>

        {/* Info */}
        <div>
          <h2 className="font-serif text-xl text-charcoal-800 dark:text-ivory mb-6">Contact Information</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-beige-50 dark:bg-charcoal-800 shrink-0">
                <Mail className="w-5 h-5 text-champagne-500" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-charcoal-400 mb-1">Email</p>
                <p className="text-sm text-charcoal-800 dark:text-ivory">care@nigaheshauq.com</p>
                <p className="text-xs text-charcoal-400 italic">Demo email — not monitored</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-beige-50 dark:bg-charcoal-800 shrink-0">
                <Phone className="w-5 h-5 text-champagne-500" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-charcoal-400 mb-1">Phone</p>
                <p className="text-sm text-charcoal-800 dark:text-ivory">+92 21 1234 5678</p>
                <p className="text-xs text-charcoal-400 italic">Demo number — not monitored</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-beige-50 dark:bg-charcoal-800 shrink-0">
                <Clock className="w-5 h-5 text-champagne-500" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-charcoal-400 mb-1">Business Hours</p>
                <p className="text-sm text-charcoal-800 dark:text-ivory">Mon–Fri: 10am – 6pm</p>
                <p className="text-sm text-charcoal-500">Sat: 11am – 4pm · Sun: Closed</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center bg-beige-50 dark:bg-charcoal-800 shrink-0">
                <MapPin className="w-5 h-5 text-champagne-500" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-charcoal-400 mb-1">Studio</p>
                <p className="text-sm text-charcoal-800 dark:text-ivory">123 Clifton Road</p>
                <p className="text-sm text-charcoal-500">Karachi, Pakistan</p>
                <p className="text-xs text-charcoal-400 italic mt-1">Demo address</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-charcoal-100 dark:border-charcoal-700">
            <p className="text-xs uppercase tracking-wider text-charcoal-400 mb-4">Follow Us</p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" onClick={(e) => e.preventDefault()} className="w-10 h-10 flex items-center justify-center border border-charcoal-200 dark:border-charcoal-600 text-charcoal-500 hover:border-champagne-400 hover:text-champagne-500 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
