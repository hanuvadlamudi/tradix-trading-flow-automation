import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

type ThemeToggleProps = {
  theme: "light" | "dark"
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-9 border-border/80 bg-background/80 shadow-xs backdrop-blur-sm"
      onClick={onToggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      {theme === "dark" ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  )
}
