import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { SiUpwork, SiFiverr } from 'react-icons/si';
import { ScrollSection, Reveal } from './ScrollReveal';

const EMAIL = 'bilalwaleed01@gmail.com';

const CAL_BOOKING_URL = 'https://cal.com/bilal-waleed-vefcxb/intro-call';

/** Replace these with your profile URLs when you have them. */
const UPWORK_URL = '#';
const FIVERR_URL = '#';
/** Digits only, with country code. Example: 923001234567 */
const WHATSAPP_NUMBER = '923292109096';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const countryCodes = [
  { id: 'PK', dial: '+92', name: 'Pakistan' },
  { id: 'AE', dial: '+971', name: 'UAE' },
  { id: 'SA', dial: '+966', name: 'Saudi Arabia' },
  { id: 'GB', dial: '+44', name: 'United Kingdom' },
  { id: 'US', dial: '+1', name: 'United States' },
  { id: 'CA', dial: '+1', name: 'Canada' },
  { id: 'AU', dial: '+61', name: 'Australia' },
  { id: 'IN', dial: '+91', name: 'India' },
  { id: 'BD', dial: '+880', name: 'Bangladesh' },
  { id: 'DE', dial: '+49', name: 'Germany' },
  { id: 'FR', dial: '+33', name: 'France' },
  { id: 'NL', dial: '+31', name: 'Netherlands' },
  { id: 'SE', dial: '+46', name: 'Sweden' },
  { id: 'NO', dial: '+47', name: 'Norway' },
  { id: 'CH', dial: '+41', name: 'Switzerland' },
  { id: 'QA', dial: '+974', name: 'Qatar' },
  { id: 'KW', dial: '+965', name: 'Kuwait' },
  { id: 'OM', dial: '+968', name: 'Oman' },
  { id: 'BH', dial: '+973', name: 'Bahrain' },
  { id: 'TR', dial: '+90', name: 'Turkey' },
  { id: 'SG', dial: '+65', name: 'Singapore' },
  { id: 'MY', dial: '+60', name: 'Malaysia' },
  { id: 'ID', dial: '+62', name: 'Indonesia' },
  { id: 'PH', dial: '+63', name: 'Philippines' },
  { id: 'ZA', dial: '+27', name: 'South Africa' },
  { id: 'NG', dial: '+234', name: 'Nigeria' },
  { id: 'BR', dial: '+55', name: 'Brazil' },
  { id: 'MX', dial: '+52', name: 'Mexico' },
  { id: 'JP', dial: '+81', name: 'Japan' },
  { id: 'KR', dial: '+82', name: 'South Korea' },
  { id: 'CN', dial: '+86', name: 'China' },
];

const projectTypes = [
  'Website development',
  'App development',
  'CRM, ERP & POS',
  'AI integration',
  'API integration',
  'Automation',
  'Not sure yet',
];

const budgets = [
  'Under $500',
  '$500 – $1,500',
  '$1,500 – $5,000',
  '$5,000+',
  'Let’s discuss',
];

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  countryId: yup.string().required('Select a country code'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^\d{6,14}$/, 'Enter 6–14 digits, without the country code'),
  projectType: yup.string().required('Select a project type'),
  budget: yup.string().required('Select a budget range'),
  message: yup.string().required('Tell me what you want to build').min(10, 'At least 10 characters'),
});

const fieldClass =
  'w-full bg-transparent border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-white/35 outline-none transition-colors focus:border-cyan-400';

const labelClass = 'block text-[11px] tracking-wide text-white/70 mb-1.5';

function ThemeSelect({ id, value, placeholder, options, ariaLabel, onChange, menuClassName = '' }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className={`${fieldClass} flex items-center justify-between gap-2 text-left`}
      >
        <span className={`truncate ${selected ? 'text-white' : 'text-white/35'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={`text-[10px] text-cyan-400 transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className={`theme-scroll absolute z-30 mt-1 max-h-52 w-full overflow-y-auto border border-cyan-400/40 bg-[#070b12] py-1 shadow-[0_16px_40px_rgba(0,0,0,0.55)] ${menuClassName}`}
        >
          {options.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                    active ? 'bg-cyan-400 text-black' : 'text-white hover:bg-cyan-400/15 hover:text-cyan-200'
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { countryId: 'PK' },
  });

  const countryId = watch('countryId');
  const projectType = watch('projectType');
  const budget = watch('budget');

  const choose = (name, value) => {
    setValue(name, value, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setShowSuccess(false);
    setShowError(false);

    const country = countryCodes.find((item) => item.id === data.countryId);
    const phone = `${country?.dial || ''} ${data.phone}`;

    const emailParams = {
      from_name: data.name,
      from_email: data.email,
      to_email: 'enemyop123456789@gmail.com',
      reply_to: data.email,
      name: data.name,
      email: data.email,
      phone,
      message: `Project type: ${data.projectType}\nBudget: ${data.budget}\n\n${data.message}`,
      project_source: 'Portfolio Contact Form Message',
    };

    try {
      await emailjs.send('service_5s9rybe', 'template_skdaqm7', emailParams, 'mJNe4k8LuOfkw5FHc');
      setShowSuccess(true);
      reset({ countryId: 'PK' });
      setTimeout(() => setShowSuccess(false), 10000);
    } catch (error) {
      console.error('Failed to send email:', error?.text || error);
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollSection
      id="contact"
      className="relative text-white py-20 sm:py-24 scroll-mt-24 bg-gradient-to-br from-black via-gray-900 to-black"
    >
      <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_minmax(0,32rem)] lg:gap-x-16 items-start">
        <div className="contents lg:flex lg:flex-col lg:gap-5 lg:col-start-1 lg:pt-6">
        <Reveal className="order-1 w-full lg:order-none">
          <p className="text-[11px] tracking-[0.22em] uppercase text-cyan-400/80 mb-5">
            Have an idea?
          </p>
          <h2 className="font-[Inter,sans-serif] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[clamp(2.7rem,5.2vw,4.5rem)]">
            <span className="block">Let&apos;s build</span>
            <span className="mt-1.5 sm:mt-2 block">something</span>
            <span className="mt-1.5 sm:mt-2 block text-cyan-400">great.</span>
            <span className="mt-1.5 sm:mt-2 block">together.</span>
          </h2>
          <p className="mt-8 max-w-lg text-base sm:text-lg leading-relaxed text-gray-400">
            Have a product to launch or a system to fix? Send the details and I&apos;ll reply with a clear next step.
          </p>
        </Reveal>

        <Reveal className="order-2 w-full lg:order-none">
          <div className="flex flex-wrap items-center gap-4">
            <a href={`mailto:${EMAIL}`} className="text-sm text-white underline underline-offset-4 decoration-white/30 hover:text-cyan-300">
              {EMAIL}
            </a>
            <a
              href={CAL_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-cyan-400 bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-black transition-colors duration-300 hover:border-cyan-400/40 hover:bg-transparent hover:text-white"
            >
              Book a call
            </a>
          </div>
          <p className="mt-2 text-xs text-white/40">20-minute call to scope the work.</p>
        </Reveal>

        <Reveal className="order-4 w-full lg:order-none">
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs tracking-[0.14em] uppercase text-white/55">
            <a href="https://github.com/Bilal-Waleed" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan-300">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/bilal-waleed-2411172bb/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan-300">
              <FaLinkedin /> LinkedIn
            </a>
            <a href={UPWORK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan-300">
              <SiUpwork /> Upwork
            </a>
            <a href={FIVERR_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan-300">
              <SiFiverr /> Fiverr
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan-300">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </Reveal>
        </div>

        <Reveal className="order-3 w-full lg:order-none lg:col-start-2 lg:row-start-1">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-white/10 bg-[#0c0c0c]/80 p-6 sm:p-7"
          >
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Tell me a little about your project.
            </h3>

            <div className="space-y-3">
              <div>
                <label className={labelClass} htmlFor="name">Full name</label>
                <input id="name" placeholder="Your name" className={fieldClass} {...register('name')} />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="email">Email address</label>
                <input id="email" type="email" placeholder="you@example.com" className={fieldClass} {...register('email')} />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
              </div>

              <div>
                <label className={labelClass} htmlFor="phone">Contact number</label>
                <div className="grid grid-cols-[minmax(0,9.5rem)_1fr] gap-2">
                  <input type="hidden" {...register('countryId')} />
                  <ThemeSelect
                    ariaLabel="Country code"
                    value={countryId}
                    placeholder="Code"
                    options={countryCodes.map((country) => ({
                      value: country.id,
                      label: `${country.name} (${country.dial})`,
                    }))}
                    onChange={(value) => choose('countryId', value)}
                    menuClassName="min-w-[16rem]"
                  />
                  <input
                    id="phone"
                    inputMode="numeric"
                    placeholder="3001234567"
                    className={fieldClass}
                    {...register('phone')}
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message}</p>}
                {errors.countryId && <p className="mt-1 text-xs text-red-400">{errors.countryId.message}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass} htmlFor="projectType">Project type</label>
                  <input type="hidden" {...register('projectType')} />
                  <ThemeSelect
                    id="projectType"
                    value={projectType}
                    placeholder="Select a service"
                    options={projectTypes.map((type) => ({ value: type, label: type }))}
                    onChange={(value) => choose('projectType', value)}
                  />
                  {errors.projectType && <p className="mt-1 text-xs text-red-400">{errors.projectType.message}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="budget">Budget range</label>
                  <input type="hidden" {...register('budget')} />
                  <ThemeSelect
                    id="budget"
                    value={budget}
                    placeholder="Select a range"
                    options={budgets.map((range) => ({ value: range, label: range }))}
                    onChange={(value) => choose('budget', value)}
                  />
                  {errors.budget && <p className="mt-1 text-xs text-red-400">{errors.budget.message}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="message">Project description</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="What are you looking to build?"
                  className={`${fieldClass} resize-y`}
                  {...register('message')}
                />
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
              </div>
            </div>

            {showSuccess && (
              <p className="mt-4 text-sm text-cyan-300">Message sent. I&apos;ll get back to you soon.</p>
            )}
            {showError && (
              <p className="mt-4 text-sm text-red-400">Couldn&apos;t send the message. Try again in a moment.</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 w-full rounded-lg bg-cyan-400 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/60"
            >
              {isSubmitting ? 'Sending…' : 'Start a project'}
            </button>
            <p className="mt-3 text-xs text-white/40">
              Your details are only used to reply to this inquiry.
            </p>
          </form>
        </Reveal>
      </div>
    </ScrollSection>
  );
}
