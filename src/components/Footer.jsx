import { Link } from 'react-router-dom'
import { Workflow, ArrowRight } from 'lucide-react'

const SERVICE_LINKS = [
  'Workflow Automation',
  'AI Agent Development',
  'System Integrations',
  'Data Pipeline Automation',
]

export default function Footer() {
  return (
    <footer className="relative bg-deep text-white rounded-t-6xl mt-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/20 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            Business,
            <span className="font-serif italic font-medium text-primary block">decluttered.</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/50 max-w-md">
              Curated Desk — automation, integrations, and AI agents for teams who'd rather build than re-type.
            </p>
            <Link to="/#contact" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full self-start sm:self-auto">
              Book a workflow audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 w-fit">
              <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                <Workflow className="h-5 w-5 text-white" strokeWidth={2.4} />
              </span>
              <span className="font-display font-bold text-lg">Curated Desk</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              A workflow automation agency helping growing teams remove manual busywork through custom
              automations, integrations, and AI agents.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-6">
              Remote-first · Nairobi, KE
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Services</p>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((s, i) => (
                <li key={i}>
                  <Link to="/#services" className="text-white/65 hover:text-primary transition text-sm">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Company</p>
            <ul className="space-y-2.5">
              <li><Link to="/#approach" className="text-white/65 hover:text-primary transition text-sm">Approach</Link></li>
              <li><Link to="/work" className="text-white/65 hover:text-primary transition text-sm">Work</Link></li>
              <li><Link to="/#contact" className="text-white/65 hover:text-primary transition text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Contact</p>
            <ul className="space-y-2.5">
              <li><a href="tel:+254790492477" className="text-white/65 hover:text-primary transition text-sm">+254 790 492 477</a></li>
              <li><a href="mailto:curateddesk@gmail.com" className="text-white/65 hover:text-primary transition text-sm">curateddesk@gmail.com</a></li>
              <li className="text-white/65 text-sm">Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
              System Operational · Taking on new projects
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono">
            <Link to="/privacy" className="hover:text-primary transition">Privacy</Link>
            <Link to="/terms" className="hover:text-primary transition">Terms</Link>
            <span>© 2026 Curated Desk</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
