import {
  Zap,
  Shield,
  DollarSign,
  GitMerge,
  Users,
  BarChart3
} from "lucide-react";

/*
 * ============================================
 * FEATURES SECTION
 * ============================================
 *
 * HACKATHON PARTICIPANTS:
 * - Redesign the feature cards
 * - Consider: icons, illustrations, animations
 * - Make each feature stand out
 * - Keep copy concise and benefit-focused
 */

const features = [
  {
    icon: DollarSign,
    title: "Instant Payouts",
    description:
      "Contributors get paid the moment their PR is merged. No invoices, no delays.",
  },
  {
    icon: GitMerge,
    title: "GitHub Native",
    description:
      "Works seamlessly with your existing GitHub workflow. No context switching.",
  },
  {
    icon: Shield,
    title: "Escrow Protection",
    description:
      "Funds are held securely until work is verified and approved by maintainers.",
  },
  {
    icon: Zap,
    title: "AI Code Review",
    description:
      "Automated quality scoring helps maintainers identify the best submissions.",
  },
  {
    icon: Users,
    title: "Global Talent",
    description:
      "Access a worldwide pool of developers ready to tackle your issues.",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track bounty performance, contributor activity, and project health.",
  },
];

export function Features() {
  return (
    <section className="section bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to fund open source
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple, transparent, and built for the modern developer workflow.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="card hover:border-primary/50 transition-colors group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
