import { ArrowRight, Github } from "lucide-react";

/*
 * ============================================
 * HERO SECTION
 * ============================================
 *
 * HACKATHON PARTICIPANTS:
 * This is the most important section of the landing page!
 *
 * TIPS:
 * - Make it visually striking
 * - Clear value proposition
 * - Strong CTA buttons
 * - Consider: animations, gradients, illustrations, 3D elements
 *
 * HEADLINE OPTIONS (feel free to create your own):
 * - "Fund Open Source. Get Paid to Code."
 * - "The Future of Open Source Funding"
 * - "Bounties That Actually Pay"
 * - "Where Code Meets Capital"
 * - "Open Source, Funded Right"
 */

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Pattern - Customize this! */}
      <div className="absolute inset-0 dot-grid opacity-50" />

      {/* Optional: Gradient orbs for visual interest */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge/Tag - Optional */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Now in Public Beta
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            {/* HACKATHON: Edit this headline! */}
            Fund Open Source.
            <br />
            <span className="text-muted-foreground">Get Paid to Code.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            {/* HACKATHON: Edit this description! */}
            MergeFund connects maintainers with contributors through bounties.
            Post work, fund it, and pay developers when they deliver.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-primary text-base">
              Start Funding
              <ArrowRight size={18} />
            </button>
            <button className="btn-secondary text-base">
              <Github size={18} />
              View on GitHub
            </button>
          </div>

          {/* Social Proof - Optional */}
          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Trusted by developers from
            </p>
            <div className="flex items-center justify-center gap-8 opacity-50">
              {/* Placeholder company logos - replace with actual or keep as text */}
              {["Vercel", "Stripe", "GitHub", "Supabase"].map((company) => (
                <span
                  key={company}
                  className="text-lg font-semibold text-muted-foreground"
                >
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
