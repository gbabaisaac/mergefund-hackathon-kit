import { Nav, Hero, Features, HowItWorks, Stats, CTA, Footer } from "@/components";

/*
 * ============================================
 * LANDING PAGE - MAIN ENTRY POINT
 * ============================================
 *
 * HACKATHON PARTICIPANTS:
 *
 * This is the main landing page you'll be redesigning!
 *
 * CURRENT STRUCTURE:
 * 1. Navigation (sticky header)
 * 2. Hero Section (main headline + CTA)
 * 3. Stats (social proof numbers)
 * 4. Features (what MergeFund offers)
 * 5. How It Works (step-by-step process)
 * 6. CTA (final call to action)
 * 7. Footer
 *
 * FEEL FREE TO:
 * - Rearrange sections
 * - Add new sections (testimonials, FAQ, pricing preview, etc.)
 * - Remove sections
 * - Completely reimagine the layout
 *
 * REMEMBER:
 * - Mobile-first responsive design
 * - Accessibility matters
 * - Performance (keep it fast)
 * - Document your AI usage in AI_USAGE.md
 */

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
