import { useEffect, useState } from "react";

/**
 * Tracks which section is currently at the top of the scroll container.
 * Active = the last section whose top has scrolled above a line just under the
 * topbar. (Robust where IntersectionObserver lags by a section.)
 */
export function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");
  const key = ids.join("|");

  useEffect(() => {
    const scroller = document.getElementById("gallery-scroll");
    if (!scroller) return;
    const LINE = 130; // px from the top of the viewport

    const onScroll = () => {
      // At (near) the bottom, the final sections can't scroll under the line —
      // snap to the last id so the sidebar still reflects them.
      if (
        scroller.scrollTop + scroller.clientHeight >=
        scroller.scrollHeight - 4
      ) {
        setActive(ids[ids.length - 1] ?? "");
        return;
      }
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= LINE) current = id;
      }
      setActive(current);
    };

    onScroll();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
}
