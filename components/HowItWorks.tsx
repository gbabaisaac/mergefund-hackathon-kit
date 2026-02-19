import { FileCode, DollarSign, GitPullRequest, CheckCircle2 } from "lucide-react";

/*
 * ============================================
 * HOW IT WORKS SECTION
 * ============================================
 *
 * HACKATHON PARTICIPANTS:
 * - Make the process clear and visual
 * - Consider: timeline, numbered steps, animations
 * - Show both perspectives: maintainers & contributors
 */

const steps = [
  {
    icon: FileCode,
    step: "01",
    title: "Post a Bounty",
    description:
      "Create a bounty on any GitHub issue. Set the reward amount and acceptance criteria.",
  },
  {
    icon: DollarSign,
    step: "02",
    title: "Fund It",
    description:
      "Add funds to escrow. They're held securely until the work is completed.",
  },
  {
    icon: GitPullRequest,
    step: "03",
    title: "Contributors Work",
    description:
      "Developers submit pull requests. Our AI helps you evaluate quality.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Merge & Pay",
    description:
      "Approve the PR, merge the code, and the contributor gets paid instantly.",
  },
];

export function HowItWorks() {
  return (
    <section className="section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            From issue to payout in four simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector Line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2" />
              )}

              {/* Step Number */}
              <div className="text-5xl font-bold text-primary/20 mb-4">
                {step.step}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
