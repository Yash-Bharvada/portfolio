"use client";
import { AnimeNavBar } from "@/components/ui/anime-navbar";
import { Home, FolderKanban, User, Mail, GraduationCap, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function NavbarClient() {
  const items = [
    { name: "Home", url: "/", icon: Home },
    { name: "About", url: "#about", icon: User },
    { name: "Journey", url: "#education", icon: GraduationCap },
    { name: "Projects", url: "#projects", icon: FolderKanban },
    { name: "Contact", url: "#contact", icon: Mail },
  ];

  const [open, setOpen] = React.useState(false);

  const handleNavigate = (url: string) => {
    const isAnchor = url === "/" || url.startsWith("#");
    if (isAnchor) {
      const id = url === "/" ? "home" : url.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState({}, "", `#${id}`);
      }
    } else {
      window.location.assign(url);
    }
    setOpen(false);
  };

  return (
    <>
      <div className="hidden md:block">
        <AnimeNavBar items={items} className="" />
      </div>

      <div className="md:hidden fixed top-5 left-0 right-0 z-[9999]">
        <div className="flex justify-between items-center px-4">
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="p-3 rounded-full bg-black/60 border border-white/10 backdrop-blur text-white"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            >
              <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute top-16 left-4 right-4 rounded-2xl bg-neutral-900 border border-white/10 p-3 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <nav aria-label="Mobile">
                  <ul className="flex flex-col">
                    {items.map((item) => (
                      <li key={item.name}>
                        <button
                          className="w-full flex items-center gap-3 px-5 py-4 text-white rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors"
                          style={{ minHeight: 48 }}
                          onClick={() => handleNavigate(item.url)}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="text-lg">{item.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
