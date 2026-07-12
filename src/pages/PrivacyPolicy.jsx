import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-ink px-6 sm:px-10 lg:px-16 py-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition text-sm font-medium mb-10">
          <ArrowLeft className="h-4 w-4" /> Back to Curated Desk
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">Legal</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl mt-4 mb-8 tracking-tight">
          Privacy Policy
        </h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            Curated Desk ("we", "us") respects your privacy. This page describes, in plain terms, what
            we collect through this website and how we use it.
          </p>
          <h2 className="font-display font-bold text-xl text-ink mt-8">What we collect</h2>
          <p>
            When you submit the contact form, we collect the name, email, phone number, and message
            you provide. We do not use tracking cookies beyond what's required for basic site function.
          </p>
          <h2 className="font-display font-bold text-xl text-ink mt-8">How we use it</h2>
          <p>
            We use your information solely to respond to your inquiry and, if you become a client, to
            deliver our services. We never sell your data or share it with third-party marketers.
          </p>
          <h2 className="font-display font-bold text-xl text-ink mt-8">Contact</h2>
          <p>
            Questions about this policy can be sent to{' '}
            <a href="mailto:curateddesk@gmail.com" className="text-primary hover:underline">curateddesk@gmail.com</a>.
          </p>
          <p className="text-sm text-white/40 pt-6">Placeholder policy — replace with counsel-reviewed text before launch.</p>
        </div>
      </div>
    </div>
  )
}
