export interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
  thumbnailUrl: string;
  tags: string[];
  votes: number;
  githubUrl: string;
  demoUrl: string;
}

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    title: "EcoTrack AI",
    description: "Personalized sustainability dashboard using AI to track and reduce carbon footprints through receipt scanning.",
    author: "Sarah Chen",
    thumbnailUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    tags: ["AI", "Sustainability", "Mobile"],
    votes: 128,
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
  {
    id: "proj-2",
    title: "BlockVote",
    description: "Decentralized voting system for community governance with zero-knowledge proofs for privacy.",
    author: "Marcus Thorne",
    thumbnailUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    tags: ["Web3", "Blockchain", "Security"],
    votes: 95,
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
  {
    id: "proj-3",
    title: "MindFlow",
    description: "Interactive meditation and focus app featuring real-time biometric feedback and generative ambient soundscapes.",
    author: "Elena Rodriguez",
    thumbnailUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
    tags: ["Health", "Audio", "UX"],
    votes: 215,
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
  {
    id: "proj-4",
    title: "CodeConnect",
    description: "Live collaborative coding platform for peer-to-peer mentorship and pair programming with integrated video chat.",
    author: "David Kim",
    thumbnailUrl: "https://images.unsplash.com/photo-1522071823991-b99c22303091?auto=format&fit=crop&q=80&w=800",
    tags: ["Education", "Real-time", "Web"],
    votes: 164,
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
  {
    id: "proj-5",
    title: "SynthArt",
    description: "Browser-based generative art studio that transforms musical input into dynamic visual masterpieces.",
    author: "Aria Vance",
    thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    tags: ["Creative", "Music", "Frontend"],
    votes: 312,
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
  {
    id: "proj-6",
    title: "UrbanFarm OS",
    description: "automated micro-farming management system with sensor integration and crop health diagnostics.",
    author: "Liam O'Shea",
    thumbnailUrl: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=800",
    tags: ["IoT", "Agriculture", "Automation"],
    votes: 82,
    githubUrl: "https://github.com",
    demoUrl: "https://demo.com",
  },
];
