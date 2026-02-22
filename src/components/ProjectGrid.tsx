"use client";

import { useState, useMemo } from "react";
import { Project, mockProjects } from "@/data/mock-projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string>("All");

    const allTags = useMemo(() => {
        const tags = new Set<string>();
        mockProjects.forEach((p) => p.tags.forEach((t) => tags.add(t)));
        return ["All", ...Array.from(tags)];
    }, []);

    const filteredProjects = useMemo(() => {
        return mockProjects.filter((project) => {
            const matchesSearch =
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = selectedTag === "All" || project.tags.includes(selectedTag);
            return matchesSearch && matchesTag;
        });
    }, [searchQuery, selectedTag]);

    return (
        <div className="space-y-10">
            {/* Controls */}
            <div className="sticky top-0 z-10 flex flex-col gap-4 bg-white/80 py-4 backdrop-blur-md md:flex-row md:items-center md:justify-between border-b border-slate-100 -mx-4 px-4 sm:-mx-6 sm:px-6">
                <div className="relative w-full md:max-w-xs">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full rounded-2xl border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-sm focus:border-brand-500 focus:ring-brand-500 placeholder-slate-400 border transition-all"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
                    {allTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(tag)}
                            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all ${selectedTag === tag
                                    ? "bg-brand-600 text-white shadow-lg shadow-brand-200"
                                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project, idx) => (
                        <div
                            key={project.id}
                            className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                            style={{ animationDelay: `${idx * 50}ms` }}
                        >
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="rounded-full bg-slate-50 p-6 text-slate-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196 7.5 7.5 0 0010.607 10.607Z" />
                        </svg>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900">No projects found</h3>
                    <p className="mt-2 text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedTag("All");
                        }}
                        className="mt-6 text-sm font-bold text-brand-600 hover:text-brand-700"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}
