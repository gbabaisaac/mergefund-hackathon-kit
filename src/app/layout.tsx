import "./globals.css";

export const metadata = {
  title: "MergeFund Hackathon Kit",
  description: "Starter kit for MergeFund hackathon bounties."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-slate-200">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
              <div className="text-lg font-semibold">MergeFund Hackathon Kit</div>
              <nav className="flex items-center gap-3 text-sm text-slate-600">
                <a className="hover:text-slate-900" href="/bounty-card">Bounty Card</a>
                <a className="hover:text-slate-900" href="/leaderboard">Leaderboard</a>
                <a className="hover:text-slate-900" href="/discovery">Discovery</a>
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
