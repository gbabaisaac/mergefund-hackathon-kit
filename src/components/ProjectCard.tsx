"use client";

import { Project } from "@/data/mock-projects";
import { useState } from "react";

export function ProjectCard({ project }: { project: Project }) {
    const [votes, setVotes] = useState(project.votes);
    const [voted, setVoted] = useState(false);

    const handleVote = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!voted) {
            setVotes(prev => prev + 1);
            setVoted(true);
        } else {
            setVotes(prev => prev - 1);
            setVoted(false);
        }
    };

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-brand-300 hover:shadow-xl hover:-translate-y-1">
            {/* Thumbnail */}
            <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                <img
                    src={project.thumbnailUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-sm text-slate-500">by {project.author}</p>
                    </div>
                    <button
                        onClick={handleVote}
                        className={`flex flex-col items-center gap-0.5 rounded-xl border px-2.5 py-1.5 transition-all ${voted
                                ? "border-brand-200 bg-brand-50 text-brand-600 shadow-inner"
                                : "border-slate-100 bg-slate-50 text-slate-600 hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                            }`}
                    >
                        <span className="text-xs font-bold leading-none">{votes}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className={`h-4 w-4 ${voted ? "scale-110" : ""}`}
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                <p className="mt-3 line-clamp-2 text-sm text-slate-600 leading-relaxed">
                    {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center rounded-lg bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 transition-colors group-hover:bg-brand-50 group-hover:text-brand-600"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="mt-6 flex gap-3">
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-xl bg-slate-900 py-2.5 text-center text-xs font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95"
                    >
                        Code
                    </a>
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 rounded-xl bg-brand-600 py-2.5 text-center text-xs font-bold text-white transition-all hover:bg-brand-700 hover:shadow-lg active:scale-95 shadow-md shadow-brand-200"
                    >
                        Live Demo
                    </a>
                </div>
            </div>
        </div>
    );
}
