# MergeFund Landing Page Hackathon

> **$100 Prize** - Redesign the MergeFund landing page!

Welcome to the MergeFund Landing Page Redesign Hackathon! We're looking for creative developers and designers to reimagine our landing page experience.

## 🎯 The Challenge

Redesign the MergeFund landing page to be more engaging, modern, and conversion-focused. You have creative freedom to reimagine the layout, animations, copy, and overall user experience.

**Live Site:** [https://mergefund.org](https://mergefund.org)

## 🏆 Prize

**$100** to the winner, paid via MergeFund (of course!)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/MergeFund/mergefund-landing-hackathon.git
cd mergefund-landing-hackathon

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

No environment variables or secrets required!

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx             # Main landing page ← FOCUS HERE
│   ├── globals.css          # Global styles & design tokens
│   ├── companies/page.tsx   # For Companies page
│   └── features/page.tsx    # Features page
├── components/
│   ├── Nav.tsx              # Navigation
│   ├── Footer.tsx           # Footer
│   ├── Hero.tsx             # Hero section
│   ├── Features.tsx         # Features grid
│   ├── HowItWorks.tsx       # Step-by-step section
│   ├── CTA.tsx              # Call to action
│   ├── Stats.tsx            # Statistics
│   └── Logo.tsx             # Placeholder logo
├── public/                  # Static assets
└── AGENTS.md                # AI usage guidelines
```

## 🎨 What You Can Change

- **Everything!** Layout, colors, typography, animations, copy
- Add new sections (testimonials, FAQ, pricing preview, etc.)
- Create new components
- Modify the design system in `globals.css`
- Add illustrations or graphics (keep them original or use open-source assets)

## 🚫 What You Cannot Change

- No backend/API changes (this is frontend only)
- No adding authentication
- No environment variables or secrets
- No proprietary assets from other companies

## 📋 Submission Requirements

### Option 1: Code Submission (Preferred)

1. Fork this repository
2. Create your redesign
3. **Create `AI_USAGE.md`** documenting any AI tools used (see [AGENTS.md](./AGENTS.md))
4. Submit a Pull Request with:
   - Screenshots of your design
   - Brief description of your approach
   - Any special instructions to run

### Option 2: Design-Only Submission

1. Create your design in Figma/Sketch/Adobe XD
2. Export as PDF or share link
3. Open an issue with:
   - Link to your design file
   - Screenshots
   - Design rationale

## ✅ Judging Criteria

| Criteria | Weight |
|----------|--------|
| Visual Design | 30% |
| User Experience | 25% |
| Code Quality | 20% |
| Creativity | 15% |
| Performance | 10% |

**Bonus Points:**
- Mobile-first responsive design
- Accessibility (a11y) considerations
- Smooth animations/micro-interactions
- Dark mode support
- Original illustrations or graphics

## 📅 Timeline

- **Start:** [INSERT DATE]
- **Deadline:** [INSERT DATE]
- **Winner Announced:** [INSERT DATE]

## ❓ Questions?

- Open an issue in this repository
- Tag it with `question`
- We'll respond within 24 hours

## 📄 Rules

1. One submission per person/team
2. Must be original work (no copying other websites)
3. AI tools are allowed but must be documented (see [AGENTS.md](./AGENTS.md))
4. No offensive or inappropriate content
5. Must be runnable with `npm install && npm run dev`
6. Submissions after the deadline will not be considered

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Icons:** Lucide React

## 📝 License

This hackathon codebase is MIT licensed. Your submissions grant MergeFund the right to use, modify, and incorporate your design.

---

**Good luck! We can't wait to see what you create.** 🚀

Made with ❤️ by the MergeFund team
