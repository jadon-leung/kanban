import KanbanBoardServer from "@/components/kanban-board-server"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Team Tasks</h1>
          <ThemeToggle />
        </div>
      </header>
      <main>
        <KanbanBoardServer />
      </main>
    </div>
  )
}
