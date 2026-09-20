'use client';

import { useState } from 'react';
import { submitInquiry } from '@/actions/submitInquiry';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const PRODUCTS = [
  'DS TRP – Protected Rollers Multi-Jet Meter',
  'DS ASD/ASD-G – Superdry Multi-Jet Meter',
  'Composite DS TRP – Engineering Plastic Meter',
  'ELECTO SONIC – Electronic Ultrasonic Meter',
  'WMAP EVO – Axial Woltmann Meter',
  'E-BULK – Static Ultrasonic Bulk Meter',
  'WT – Tangential Helix Water Meter',
  'General Inquiry',
];

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<{ name?: string; email?: string; mobile?: string }>({});

  const validate = (formData: FormData) => {
    const newErrors: { name?: string; email?: string; mobile?: string } = {};
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const mobile = formData.get('mobile') as string;

    if (!name || name.trim() === '') newErrors.name = 'Full name is required';

    if (!email || email.trim() === '') {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!mobile || mobile.trim() === '') {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number (starts with 6-9)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!validate(formData)) return;

    setStatus('loading');

    try {
      const result = await submitInquiry(formData);
      if (result.success) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'mt-1 block w-full rounded-lg bg-[rgba(15,23,42,0.6)] border border-[rgba(255,255,255,0.1)] text-white placeholder-slate-400 px-4 py-3 text-sm focus:outline-none focus:border-[#0ea5e9] focus:ring-1 focus:ring-[#0ea5e9] transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {status === 'success' && (
        <div className="flex items-start gap-3 p-4 bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 rounded-lg">
          <CheckCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Inquiry submitted successfully!</p>
            <p className="text-sm text-emerald-400/80 mt-1">
              Thank you for reaching out. Our team will contact you within 24 hours.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-start gap-3 p-4 bg-red-900/30 border border-red-500/30 text-red-400 rounded-lg">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <p className="text-sm">Something went wrong. Please try again or email us directly at aquacyindia@gmail.com.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div className="sm:col-span-2">
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300 mb-1">
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            id="contact-name"
            placeholder="Rahul Sharma"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`${inputBase} ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300 mb-1">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="contact-email"
            placeholder="rahul@example.com"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${inputBase} ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
        </div>

        {/* Mobile */}
        <div>
          <label htmlFor="contact-mobile" className="block text-sm font-medium text-slate-300 mb-1">
            Mobile Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            name="mobile"
            id="contact-mobile"
            placeholder="9876543210"
            required
            aria-invalid={!!errors.mobile}
            aria-describedby={errors.mobile ? "mobile-error" : undefined}
            className={`${inputBase} ${errors.mobile ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.mobile && <p id="mobile-error" className="mt-1.5 text-xs text-red-400">{errors.mobile}</p>}
        </div>
      </div>

      {/* Product */}
      <div>
        <label htmlFor="contact-product" className="block text-sm font-medium text-slate-300 mb-1">
          Product of Interest
        </label>
        <select
          name="product"
          id="contact-product"
          className={`${inputBase} cursor-pointer`}
        >
          <option value="">Select a product (optional)...</option>
          {PRODUCTS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-requirement" className="block text-sm font-medium text-slate-300 mb-1">
          Your Requirement / Message
        </label>
        <textarea
          name="requirement"
          id="contact-requirement"
          rows={5}
          placeholder="Please describe your water metering requirements, quantity needed, installation site, or any questions..."
          className={`${inputBase} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-primary w-full text-base py-4 shadow-[0_0_20px_rgba(14,165,233,0.35)]"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Submitting...</span>
          </>
        ) : (
          <span>Submit Inquiry</span>
        )}
      </button>

      <p className="text-xs text-center text-slate-400 font-medium">
        By submitting, you agree to be contacted by our Pune engineering office regarding your requirement.
      </p>
    </form>
  );
}
