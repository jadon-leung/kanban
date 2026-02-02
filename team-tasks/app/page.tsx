import KanbanBoardServer from "@/components/kanban-board-server"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="gradient-orb w-[600px] h-[600px] bg-accent/30 -top-[200px] -right-[200px] fixed" />
      <div className="gradient-orb w-[400px] h-[400px] bg-primary/20 bottom-[100px] -left-[100px] fixed" />

      {/* Grain texture overlay */}
      <div className="grain-overlay" />

      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Taskflow</h1>
                <p className="text-[11px] text-muted-foreground font-medium tracking-wide uppercase">Project Board</p>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span>All systems operational</span>
              </div>
              <div className="h-6 w-px bg-border hidden sm:block" />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="relative">
        <KanbanBoardServer />
      </main>
    </div>
  )
}
