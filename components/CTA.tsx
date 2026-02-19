import { ArrowRight } from "lucide-react";

/*
 * ============================================
 * CALL TO ACTION SECTION
 * ============================================
 *
 * HACKATHON PARTICIPANTS:
 * - Make this section compelling
 * - Strong visual impact
 * - Clear, actionable CTA
 * - Consider: gradients, patterns, bold typography
 */

export function CTA() {
  return (
    <section className="section">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 dot-grid" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to fund your first bounty?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Join thousands of maintainers and contributors building the future
              of open source together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="inline-flex items-center justify-center gap-2 bg-white text-primary font-medium px-8 py-4 rounded-full hover:bg-white/90 transition-colors">
                Get Started Free
                <ArrowRight size={18} />
              </button>
              <button className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-medium px-8 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
