import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Workflow, Menu, X, Plus, Bot, ArrowUpRight, ShieldCheck } from 'lucide-react'
import Footer from '../components/Footer.jsx'

const WEBSITE_PROJECTS = [
  {
    title: 'Autoflow Automation',
    tag: 'Web · Service Business',
    stack: 'React · Vite · Tailwind · GSAP',
    year: '2026',
    text: 'A premium animated marketing site for an automation agency — violet/cyan palette, GSAP scroll choreography, and a signature falling-particle animation reskinned for tech.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Liora Boutique',
    tag: 'Web · Boutique · Lookbook',
    stack: 'HTML · CSS · JavaScript',
    year: '2026',
    text: "A warm, editorial lookbook site for a fashion boutique — product-forward hero, no cart or checkout by design, ships straight to any static host with zero build step.",
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Ember & Vine',
    tag: 'Web · Restaurant & Recipes',
    stack: 'HTML · CSS · JavaScript',
    year: '2026',
    text: "A hybrid restaurant-and-recipe-journal site — terracotta/sage palette, a filterable chef's-recipe grid with a full ingredients-and-method modal, a live 'From the Pass' kitchen-status animation, and a validating reservation form.",
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    live: 'https://ember-vine-inky.vercel.app',
  },
  {
    title: 'VOLTA Supply Co.',
    tag: 'Web · E-commerce',
    stack: 'React · Vite · Tailwind · GSAP',
    year: '2026',
    text: "A bold streetwear e-commerce store with a real working cart — category filters, size-select quick-view, a live drop-countdown and stock-scarcity ticker, and a persistent cart drawer (saved to localStorage) that carries through to a full checkout flow. Not a static lookbook.",
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=80',
    live: 'https://volta-supply.vercel.app',
  },
]

const AUTOMATION_PROJECTS = [
  {
    title: 'Invoice Processing',
    tag: 'Automation · n8n',
    stack: 'n8n · JavaScript',
    year: '2026',
    text: 'Inbox to ledger with zero re-typing: an n8n workflow watches an accounts-payable inbox, extracts invoice data, validates totals, and routes to auto-log-and-notify or flag-for-review. Paired with a live interactive demo of the pipeline.',
    href: 'https://invoice-processing-tau.vercel.app',
    stages: ['Trigger', 'Extract', 'Validate', 'Sync'],
  },
]

/* ----------------------------------------------------------------
   Light-treatment header — distinct from the dark homepage nav
---------------------------------------------------------------- */
function WorkHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#F6F3EE]/90 backdrop-blur-md border-b border-[#E4DFD5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Workflow className="h-4 w-4 text-white" strokeWidth={2.4} />
            </span>
            <span className="font-display font-bold text-[#1C1B18] tracking-tight">Curated Desk</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-[#6B675E] hover:text-[#1C1B18] transition">Home</Link>
            <Link to="/#services" className="text-sm font-medium text-[#6B675E] hover:text-[#1C1B18] transition">Services</Link>
            <span className="text-sm font-semibold text-[#1C1B18] border-b-2 border-primary pb-0.5">Work</span>
            <Link to="/#contact" className="text-sm font-medium text-[#6B675E] hover:text-[#1C1B18] transition">Contact</Link>
          </nav>

          <Link
            to="/#contact"
            className="hidden lg:inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md shadow-primary/20"
          >
            Book a workflow audit
          </Link>

          <button onClick={() => setOpen(true)} className="lg:hidden p-2 text-[#1C1B18]" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] transition-all duration-300 lg:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-[#1C1B18]/40" onClick={() => setOpen(false)} />
        <div className={`absolute top-0 right-0 h-full w-72 bg-[#F6F3EE] px-6 pt-8 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <button onClick={() => setOpen(false)} className="mb-8 p-2 -ml-2 text-[#1C1B18]"><X className="h-5 w-5" /></button>
          <div className="flex flex-col gap-1">
            <Link to="/" onClick={() => setOpen(false)} className="font-display text-2xl font-semibold text-[#1C1B18] py-3 border-b border-[#E4DFD5]">Home</Link>
            <Link to="/#services" onClick={() => setOpen(false)} className="font-display text-2xl font-semibold text-[#1C1B18] py-3 border-b border-[#E4DFD5]">Services</Link>
            <span className="font-display text-2xl font-semibold text-primary-dark py-3 border-b border-[#E4DFD5]">Work</span>
            <Link to="/#contact" onClick={() => setOpen(false)} className="font-display text-2xl font-semibold text-[#1C1B18] py-3 border-b border-[#E4DFD5]">Contact</Link>
          </div>
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   Project card
---------------------------------------------------------------- */
function ProjectCard({ project }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#EAE6DC] border border-[#E4DFD5]">
        {/* fake browser chrome for screenshot realism */}
        <div className="absolute top-0 inset-x-0 h-7 bg-[#EFEBE2] border-b border-[#E4DFD5] flex items-center gap-1.5 px-3 z-10">
          <span className="h-2 w-2 rounded-full bg-[#D8D2C4]" />
          <span className="h-2 w-2 rounded-full bg-[#D8D2C4]" />
          <span className="h-2 w-2 rounded-full bg-[#D8D2C4]" />
        </div>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 top-7 w-full h-[calc(100%-1.75rem)] object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-xl text-[#1C1B18]">{project.title}</h3>
          <p className="font-serif italic text-primary-dark text-base mt-0.5">{project.tag}</p>
        </div>
        <span className="font-mono text-xs text-[#8C8779] whitespace-nowrap pt-1">{project.year}</span>
      </div>
      <p className="text-[#6B675E] text-[15px] leading-relaxed mt-3">{project.text}</p>
      <div className="flex items-center justify-between mt-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[#8C8779]">{project.stack}</p>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary-dark group-hover:gap-1.5 transition-all"
          >
            View live site <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
    </article>
  )
}

function AddProjectTile({ label, sub, Icon }) {
  return (
    <div className="flex flex-col items-center justify-center text-center aspect-[4/3] rounded-2xl border-2 border-dashed border-[#D8D2C4] text-[#8C8779] gap-3">
      <Icon className="h-7 w-7" strokeWidth={1.6} />
      <div>
        <p className="font-display font-semibold text-[#6B675E]">{label}</p>
        <p className="text-sm mt-1 max-w-[16rem]">{sub}</p>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Automation card — dark pipeline visual instead of a screenshot
---------------------------------------------------------------- */
function AutomationCard({ automation }) {
  return (
    <article className="group rounded-2xl overflow-hidden border border-[#E4DFD5] bg-[#1C1B18]">
      <div className="relative p-6 sm:p-7">
        <div className="flex items-center justify-between mb-8">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-primary-light bg-primary/15 px-2.5 py-1 rounded-full">
            <ShieldCheck className="h-3 w-3" /> Verified working demo
          </span>
          <span className="font-mono text-xs text-white/30 whitespace-nowrap">{automation.year}</span>
        </div>

        <div className="relative flex items-center justify-between mb-2">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10" />
          {automation.stages.map((stage, i) => (
            <div key={stage} className="relative z-10 flex flex-col items-center gap-2">
              <span
                className="h-3 w-3 rounded-full border-2"
                style={{ borderColor: '#3B82F6', background: i === automation.stages.length - 1 ? '#3B82F6' : '#1C1B18' }}
              />
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/50">{stage}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-7 pt-2">
        <h3 className="font-display font-bold text-xl text-white">{automation.title}</h3>
        <p className="font-serif italic text-primary-light text-base mt-0.5">{automation.tag}</p>
        <p className="text-white/60 text-[15px] leading-relaxed mt-3">{automation.text}</p>
        <div className="flex items-center justify-between mt-5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">{automation.stack}</p>
          <a
            href={automation.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light group-hover:gap-2.5 transition-all"
          >
            View live demo <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  )
}

/* ----------------------------------------------------------------
   Page
---------------------------------------------------------------- */
export default function Work() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#F6F3EE]">
      <WorkHeader />

      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-20 pb-16">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Selected Work</span>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-[#1C1B18] mt-4 leading-[1.02] tracking-tight max-w-3xl">
          Websites, built
          <span className="block font-serif italic font-medium text-primary-dark">to perform.</span>
        </h1>
        <p className="text-[#6B675E] text-lg mt-6 max-w-xl leading-relaxed">
          A running record of sites and automations we've designed and shipped for clients.
        </p>
      </section>

      <section ref={ref} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-24">
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14 transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {WEBSITE_PROJECTS.map((p, i) => (
            <ProjectCard key={i} project={p} />
          ))}
          <AddProjectTile
            label="Add your next project"
            sub="Your next website case study goes here."
            Icon={Plus}
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-28">
        <div className="flex items-center gap-3 mb-10">
          <Bot className="h-5 w-5 text-primary-dark" strokeWidth={2} />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Automations</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14">
          {AUTOMATION_PROJECTS.map((a, i) => (
            <AutomationCard key={i} automation={a} />
          ))}
          <AddProjectTile
            label="Add your next automation"
            sub="Your next automation case study goes here."
            Icon={Plus}
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}
