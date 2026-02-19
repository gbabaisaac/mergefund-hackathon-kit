import { Nav, Footer } from "@/components";
import {
  Zap,
  Shield,
  DollarSign,
  GitMerge,
  Users,
  BarChart3,
  Bot,
  Lock,
  Globe,
  Webhook,
  CreditCard,
  Bell,
} from "lucide-react";

/*
 * ============================================
 * FEATURES PAGE
 * ============================================
 *
 * HACKATHON PARTICIPANTS:
 * Showcase all MergeFund features in detail.
 * Consider: feature comparison tables, interactive demos, etc.
 */

const featureCategories = [
  {
    title: "For Contributors",
    description: "Tools that help you get paid for your code",
    features: [
      {
        icon: DollarSign,
        title: "Instant Payouts",
        description: "Get paid the moment your PR is merged. No waiting.",
      },
      {
        icon: Globe,
        title: "Work Globally",
        description: "Accept bounties from anywhere in the world.",
      },
      {
        icon: BarChart3,
        title: "Track Earnings",
        description: "Dashboard to monitor your contributions and income.",
      },
    ],
  },
  {
    title: "For Maintainers",
    description: "Tools to manage your project's bounties",
    features: [
      {
        icon: GitMerge,
        title: "GitHub Integration",
        description: "Works natively with your existing workflow.",
      },
      {
        icon: Bot,
        title: "AI Code Review",
        description: "Automated quality scoring for submissions.",
      },
      {
        icon: Users,
        title: "Contributor Management",
        description: "Track who's working on what.",
      },
    ],
  },
  {
    title: "For Organizations",
    description: "Enterprise features for teams",
    features: [
      {
        icon: Lock,
        title: "SSO & Security",
        description: "Enterprise-grade authentication and security.",
      },
      {
        icon: Webhook,
        title: "Webhooks & API",
        description: "Integrate with your existing tools.",
      },
      {
        icon: CreditCard,
        title: "Invoicing",
        description: "Proper invoicing for accounting and taxes.",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Nav />
      <main className="pt-24">
        {/* Hero */}
        <section className="section">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Features built for the modern developer
              </h1>
              <p className="text-lg text-muted-foreground">
                Everything you need to fund, manage, and complete bounties.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Categories */}
        {featureCategories.map((category, index) => (
          <section
            key={category.title}
            className={`section ${index % 2 === 1 ? "bg-muted/30" : ""}`}
          >
            <div className="container-custom">
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {category.title}
                </h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {category.features.map((feature) => (
                  <div key={feature.title} className="card">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="section">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of developers funding and completing bounties.
            </p>
            <button className="btn-primary">
              Start Free
              <Zap size={18} />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
