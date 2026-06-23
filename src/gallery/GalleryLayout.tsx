import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Topbar } from "./Topbar";
import { Sidebar } from "./Sidebar";
import { GalleryPage } from "./GalleryPage";

export function GalleryLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <ThemeProvider>
      <TooltipProvider delayDuration={200}>
        <div className="flex h-screen flex-col">
          <Topbar onMenu={() => setMenuOpen((o) => !o)} />
          <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[260px_1fr]">
            {/* Scrim (mobile only) */}
            {menuOpen ? (
              <div
                className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                onClick={() => setMenuOpen(false)}
                aria-hidden
              />
            ) : null}
            <aside
              className={cn(
                "z-50 min-h-0 overflow-y-auto border-r border-line bg-surface-1",
                "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:w-[264px] max-lg:shadow-3 max-lg:transition-transform",
                menuOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full",
              )}
            >
              <Sidebar onNavigate={() => setMenuOpen(false)} />
            </aside>
            <main
              id="gallery-scroll"
              className="min-h-0 overflow-y-auto scroll-smooth bg-surface-0"
            >
              <GalleryPage />
            </main>
          </div>
        </div>
        <Toaster position="bottom-right" />
      </TooltipProvider>
    </ThemeProvider>
  );
}
