import { Link } from "react-router-dom";
import { Moon, Sun, Menu, Search } from "lucide-react";
import { useTheme } from "@/lib/theme";
import logo from "@/assets/logo-mark.png";

function BrandMark() {
  return <img src={logo} alt="AeVox" className="size-11 object-contain" />;
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-sm border border-line-2 bg-surface-2 text-t2 transition hover:border-line-3 hover:text-t1"
    >
      {children}
    </button>
  );
}

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="flex h-[60px] flex-none items-center justify-between border-b border-line bg-surface-1 px-4">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Toggle navigation"
          className="grid size-9 place-items-center rounded-sm border border-line-2 bg-surface-2 text-t2 transition hover:text-t1 lg:hidden"
        >
          <Menu className="size-4" />
        </button>
        <Link to="/" className="flex items-center gap-2.5">
          <BrandMark />
        <div className="leading-tight">
          <div className="font-display text-[15px] font-semibold tracking-tight text-t1">
            AeVox
          </div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-t3">
            Design System
          </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Search sections"
          onClick={() => window.dispatchEvent(new Event("aevox:cmdk"))}
          className="flex h-9 items-center gap-2 rounded-sm border border-line-2 bg-surface-2 px-2.5 text-[13px] text-t3 transition hover:border-line-3 hover:text-t2"
        >
          <Search className="size-4" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="ml-3 hidden rounded-xs border border-line-2 bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] text-t3 sm:inline-block">
            ⌘K
          </kbd>
        </button>
        <IconButton
          label={theme === "dark" ? "Switch to light" : "Switch to dark"}
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </IconButton>
      </div>
    </header>
  );
}
