/*
 * ============================================
 * STATS SECTION
 * ============================================
 *
 * HACKATHON PARTICIPANTS:
 * - Make the numbers impactful
 * - Consider: counter animations, bold typography
 * - These are placeholder stats - feel free to adjust
 */

const stats = [
  {
    value: "$500K+",
    label: "Paid to Contributors",
  },
  {
    value: "1,000+",
    label: "Bounties Completed",
  },
  {
    value: "5,000+",
    label: "Active Developers",
  },
  {
    value: "200+",
    label: "Projects Funded",
  },
];

export function Stats() {
  return (
    <section className="py-16 border-y border-border bg-muted/20">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
