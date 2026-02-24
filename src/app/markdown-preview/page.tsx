"use client";

import { useState } from "react";

export default function MarkdownPreviewPage() {
  const [markdown, setMarkdown] = useState("# Hello World\n\nStart typing **markdown** here...");

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 italic">Markdown Preview Editor</h1>
        <p className="text-slate-500">Real-time markdown editing with live preview</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[70vh]">
        {/* Editor Pane */}
        <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Editor</span>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="flex-1 p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            placeholder="Type your markdown here..."
          />
        </div>

        {/* Preview Pane */}
        <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Preview</span>
          </div>
          <div className="flex-1 p-6 overflow-y-auto prose prose-slate prose-sm max-w-none">
            {/* Minimal Markdown Rendering Logic for Demo (Pure Text/Lines) */}
            {markdown.split("\n").map((line, i) => {
              if (line.startsWith("# ")) return <h1 key={i} className="text-2xl font-bold mb-4">{line.replace("# ", "")}</h1>;
              if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold mb-3">{line.replace("## ", "")}</h2>;
              if (line.startsWith("- ")) return <li key={i} className="ml-4 list-disc">{line.replace("- ", "")}</li>;
              if (line.includes("**")) {
                const parts = line.split("**");
                return (
                  <p key={i} className="mb-2">
                    {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
                  </p>
                );
              }
              return <p key={i} className="mb-2 min-h-[1em]">{line}</p>;
            })}
          </div>
        </div>
      </div>

      <footer className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
        <h3 className="text-sm font-bold text-blue-900 mb-2 underline decoration-blue-300">Feature Roadmap</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>✅ Real-time synchronization</li>
          <li>✅ Responsive side-by-side layout</li>
          <li>✅ Support for Headers, Bold, and Lists (Basic)</li>
          <li>⏳ Full GitHub Flavored Markdown (GFM) support</li>
        </ul>
      </footer>
    </div>
  );
}
