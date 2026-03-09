import "./globals.css";

export const metadata = {
  title: "MergeFund Hackathon Kit",
  description: "Starter kit for MergeFund hackathon bounties."
};

const themeScript = `
(function(){
  var theme = localStorage.getItem('theme');
  if (!theme && typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) theme = 'dark';
  if (theme === 'dark') document.documentElement.classList.add('dark');
  else document.documentElement.classList.remove('dark');
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="min-h-screen">
          <header className="border-b border-slate-200 dark:border-slate-700">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">MergeFund Hackathon Kit</div>
              <nav className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <a className="hover:text-slate-900 dark:hover:text-slate-100" href="/bounty-card">Bounty Card</a>
                <a className="hover:text-slate-900 dark:hover:text-slate-100" href="/leaderboard">Leaderboard</a>
                <a className="hover:text-slate-900 dark:hover:text-slate-100" href="/discovery">Discovery</a>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
