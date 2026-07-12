import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-ink px-6 sm:px-10 lg:px-16 py-16">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary-light transition text-sm font-medium mb-10">
          <ArrowLeft className="h-4 w-4" /> Back to Curated Desk
        </Link>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">Legal</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl mt-4 mb-8 tracking-tight">
          Terms of Service
        </h1>
        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            These terms govern your use of the Curated Desk website and, once agreed in a separate
            scope of work, our automation and consulting services.
          </p>
          <h2 className="font-display font-bold text-xl text-ink mt-8">Engagements</h2>
          <p>
            Project scope, pricing, and delivery timelines for any automation work are agreed
            separately in writing before work begins. Nothing on this site is a binding quote.
          </p>
          <h2 className="font-display font-bold text-xl text-ink mt-8">Ownership</h2>
          <p>
            Automations, integrations, and code built for a client under a signed agreement belong to
            that client upon final payment, unless the agreement states otherwise.
          </p>
          <h2 className="font-display font-bold text-xl text-ink mt-8">Contact</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a href="mailto:curateddesk@gmail.com" className="text-primary hover:underline">curateddesk@gmail.com</a>.
          </p>
          <p className="text-sm text-white/40 pt-6">Placeholder terms — replace with counsel-reviewed text before launch.</p>
        </div>
      </div>
    </div>
  )
}
