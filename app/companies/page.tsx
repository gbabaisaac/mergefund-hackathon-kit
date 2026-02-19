import { Nav, Footer } from "@/components";
import { Building2, Users, BarChart3, Shield, ArrowRight } from "lucide-react";

/*
 * ============================================
 * FOR COMPANIES PAGE
 * ============================================
 *
 * HACKATHON PARTICIPANTS:
 * This page targets engineering teams and companies.
 * Focus on B2B messaging and enterprise features.
 */

const benefits = [
  {
    icon: Users,
    title: "Access Global Talent",
    description:
      "Tap into a worldwide pool of verified developers ready to tackle your backlog.",
  },
  {
    icon: BarChart3,
    title: "Predictable Costs",
    description:
      "Pay only for completed work. No hourly rates, no surprises.",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description:
      "AI-powered code review ensures high-quality submissions every time.",
  },
  {
    icon: Building2,
    title: "Enterprise Ready",
    description:
      "SSO, audit logs, and dedicated support for your organization.",
  },
];

export default function CompaniesPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        {/* Hero */}
        <section className="section">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
                <Building2 size={16} />
                For Companies
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Scale your engineering output
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                MergeFund helps engineering teams ship faster by connecting them
                with verified contributors who deliver quality code.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="btn-primary">
                  Book a Demo
                  <ArrowRight size={18} />
                </button>
                <button className="btn-secondary">View Pricing</button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="section bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Why teams choose MergeFund
              </h2>
              <p className="text-muted-foreground">
                Everything you need to accelerate development.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="card">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container-custom">
            <div className="card bg-primary text-center p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to accelerate your roadmap?
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Join hundreds of companies using MergeFund to ship faster.
              </p>
              <button className="inline-flex items-center gap-2 bg-white text-primary font-medium px-8 py-4 rounded-full hover:bg-white/90 transition-colors">
                Get Started
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
