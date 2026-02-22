import { ProjectGrid } from "@/components/ProjectGrid";

export default function ShowcasePage() {
    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-8 py-16 text-center shadow-2xl md:px-12 md:py-24">
                {/* Decorative background elements */}
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-500/20 blur-[100px]" />
                <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px]" />

                <div className="relative z-10 mx-auto max-w-2xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-400">
                        Community Spotlight
                    </span>
                    <h1 className="mt-6 text-4xl font-black tracking-tight text-white md:text-6xl">
                        Hackathon <span className="bg-gradient-to-r from-brand-400 to-blue-400 bg-clip-text text-transparent">Showcase</span>
                    </h1>
                    <p className="mt-6 text-lg text-slate-400 leading-relaxed md:text-xl">
                        Explore the most innovative projects built by our community. Vote for your favorites and get inspired for your next build.
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <button className="rounded-2xl bg-brand-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-brand-900/40 transition-all hover:bg-brand-500 hover:scale-105 active:scale-95">
                            Submit Your Project
                        </button>
                        <button className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95">
                            View Guidelines
                        </button>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section>
                <div className="mb-8 flex items-end justify-between border-b border-slate-100 pb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Featured Entries</h2>
                        <p className="mt-1 text-slate-500">Discover what's possible with the MergeFund Kit.</p>
                    </div>
                    <div className="hidden text-sm font-medium text-slate-400 md:block">
                        Showing <span className="text-slate-900 font-bold">Latest</span> first
                    </div>
                </div>

                <ProjectGrid />
            </section>

            {/* Footer / Call to action */}
            <section className="rounded-3xl bg-slate-50 p-10 text-center border border-slate-100">
                <h3 className="text-xl font-bold text-slate-700">Ready to build?</h3>
                <p className="mt-2 text-slate-500 max-w-md mx-auto">
                    Start your mission today and join the ranks of these featured developers.
                </p>
                <a href="/" className="mt-6 inline-flex font-bold text-brand-600 hover:text-brand-700 items-center gap-1 group">
                    Back to Dashboard
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </a>
            </section>
        </div>
    );
}
