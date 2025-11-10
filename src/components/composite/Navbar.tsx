import { useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD_PX = 24;

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    // guard for SSR
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const y = Math.max(0, window.scrollY || window.pageYOffset);

      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          const lastY = lastYRef.current;

          // Always show while within the threshold from the top
          if (y <= SCROLL_THRESHOLD_PX) {
            setVisible(true);
          } else {
            // Hide on scroll down, show on scroll up
            if (y > lastY) {
              setVisible(false);
            } else if (y < lastY) {
              setVisible(true);
            }
          }

          lastYRef.current = y;
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };
    // initialize
    lastYRef.current = Math.max(0, window.scrollY || window.pageYOffset);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "bg-theme-secondary-dark fixed top-0 left-0 w-full flex justify-between items-center z-[999] px-24",
        "transition-transform duration-500 ease-in-out",
        visible ? "translate-y-0" : "-translate-y-full",
      ].join(" ")}
    >
      <div className="flex justify-center items-center">
        <a href="/">
          <img src="./icon.png" className="w-[5rem]" alt="Animerry logo" />
        </a>
        <p className="text-light text-xl font-bold">Animerry</p>
      </div>

      <div className="flex justify-evenly items-center gap-4">
        <a className="text-light text-sm" href="/search">
          Anime
        </a>
        <a className="text-light text-sm" href="#">
          Forum
        </a>
        <a className="text-light text-sm" href="#">
          News
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
