"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  defaultActive?: string
}

export function AnimeNavBar({ items, className, defaultActive = "Home" }: NavBarProps) {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>(defaultActive)
  const anchorMap = useMemo(() => {
    return items
      .filter((i) => i.url.startsWith("#") || i.url === "/")
      .map((i) => ({ name: i.name, id: i.url === "/" ? "home" : i.url.slice(1) }))
  }, [items])

  const navRef = useRef<HTMLDivElement | null>(null)
  const [dollTargetX, setDollTargetX] = useState(0)
  const dollRef = useRef<HTMLDivElement | null>(null)
  const [dollHalfWidth, setDollHalfWidth] = useState(0)
  const [itemCenters, setItemCenters] = useState<number[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash : ""
    if (hash) {
      const match = items.find((i) => i.url === hash)
      if (match) {
        setTimeout(() => setActiveTab(match.name), 0)
        const el = document.getElementById(hash.slice(1))
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [items])

  useEffect(() => {
    if (!anchorMap.length || typeof window === "undefined") return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) {
          const found = anchorMap.find((a) => a.id === visible.target.id)
          if (found) setActiveTab(found.name)
        }
      },
      { root: null, rootMargin: "0px", threshold: [0.3, 0.6] }
    )
    anchorMap.forEach((a) => {
      const el = document.getElementById(a.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [anchorMap])

  useEffect(() => {
    if (typeof window === "undefined") return
    const measure = () => {
      const navEl = navRef.current
      const links = navEl ? Array.from(navEl.querySelectorAll<HTMLElement>("[data-nav-item]")) : []
      const navRect = navEl ? navEl.getBoundingClientRect() : { left: 0 }
      const centers = links.map((el) => {
        const r = el.getBoundingClientRect()
        return r.left - navRect.left + r.width / 2
      })
      setItemCenters(centers)
      const idx = items.findIndex((i) => i.name === activeTab)
      const initialX = centers[idx >= 0 ? idx : 0] ?? 0
      setDollTargetX(initialX)
      setReady(true)
    }
    measure()
    const onResize = () => {
      measure()
    }
    window.addEventListener("resize", onResize)
    const id = setInterval(measure, 1000)
    return () => {
      window.removeEventListener("resize", onResize)
      clearInterval(id)
    }
  }, [anchorMap, items, activeTab])

  useEffect(() => {
    const measureDoll = () => {
      const w = dollRef.current?.getBoundingClientRect().width || 0
      setDollHalfWidth(w / 2)
    }
    measureDoll()
    window.addEventListener("resize", measureDoll)
    return () => window.removeEventListener("resize", measureDoll)
  }, [])

  useEffect(() => {
    if (!ready) return
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
    let timeout: number | undefined
    const update = () => {
      if (!itemCenters.length) return
      const vh = window.innerHeight
      const vc = vh / 2
      const rects = anchorMap.map((a) => {
        const el = document.getElementById(a.id)
        return el ? el.getBoundingClientRect() : { top: 0, bottom: 0, height: 0 }
      })
      const vis = rects.map((r) => {
        const top = Math.max(r.top, 0)
        const bottom = Math.min(r.bottom, vh)
        const visible = Math.max(0, bottom - top)
        const denom = Math.max(1, Math.min(vh, r.height || (r.bottom - r.top)))
        return visible / denom
      })
      let idx = 0
      let max = -1
      vis.forEach((v, i) => {
        if (v > max) {
          max = v
          idx = i
        }
      })
      if (max >= 0.5) {
        const name = anchorMap[idx]?.name
        if (name) setActiveTab(name)
        const x = itemCenters[idx] ?? itemCenters[0] ?? 0
        setDollTargetX(x)
        return
      }
      let i = rects.findIndex((r) => r.top <= vc && r.bottom >= vc)
      if (i === -1) {
        i = rects.findIndex((r) => r.top > vc)
        if (i === -1) i = rects.length - 1
        const prev = Math.max(0, i - 1)
        const xa = itemCenters[prev] ?? itemCenters[0] ?? 0
        const xb = itemCenters[i] ?? xa
        setDollTargetX(lerp(xa, xb, 0.5))
        return
      }
      const a = rects[i]
      const b = rects[i + 1]
      if (!b) {
        const x = itemCenters[i] ?? itemCenters[0] ?? 0
        setDollTargetX(x)
        return
      }
      const span = Math.max(1, b.top - a.bottom)
      const t = clamp((vc - a.bottom) / span, 0, 1)
      const x0 = itemCenters[i] ?? itemCenters[0] ?? 0
      const x1 = itemCenters[i + 1] ?? x0
      setDollTargetX(lerp(x0, x1, t))
    }
    const onScroll = () => {
      if (timeout) window.clearTimeout(timeout)
      timeout = window.setTimeout(update, 200)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      if (timeout) window.clearTimeout(timeout)
    }
  }, [ready, anchorMap, itemCenters])

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 z-[9999] md:top-5 md:bottom-auto bottom-5",
        className
      )}
      role="navigation"
      aria-label="Main"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) / 2)" }}
    >
      <div className="flex justify-center px-3 md:px-0">
        <motion.div 
          ref={navRef}
          className="flex items-center gap-2 md:gap-3 bg-black/50 border border-white/10 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg relative max-w-[95%] md:max-w-max overflow-x-auto"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        >
          <motion.div
            ref={dollRef}
            className="absolute -top-12 left-0 pointer-events-none z-[10000]"
            animate={{ x: dollTargetX - dollHalfWidth }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="relative w-12 h-12">
              <motion.div 
                className="absolute w-10 h-10 bg-white rounded-full left-1/2 -translate-x-1/2"
                animate={
                  hoveredTab ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5, ease: "easeInOut" }
                  } : {
                    y: [0, -3, 0],
                    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }
                }
              >
                <motion.div 
                  className="absolute w-2 h-2 bg-black rounded-full"
                  animate={ hoveredTab ? { scaleY: [1, 0.2, 1], transition: { duration: 0.2, times: [0, 0.5, 1] } } : {} }
                  style={{ left: '25%', top: '40%' }}
                />
                <motion.div 
                  className="absolute w-2 h-2 bg-black rounded-full"
                  animate={ hoveredTab ? { scaleY: [1, 0.2, 1], transition: { duration: 0.2, times: [0, 0.5, 1] } } : {} }
                  style={{ right: '25%', top: '40%' }}
                />
                <motion.div 
                  className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                  animate={{ opacity: hoveredTab ? 0.8 : 0.6 }}
                  style={{ left: '15%', top: '55%' }}
                />
                <motion.div 
                  className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                  animate={{ opacity: hoveredTab ? 0.8 : 0.6 }}
                  style={{ right: '15%', top: '55%' }}
                />
                <motion.div 
                  className="absolute w-4 h-2 border-b-2 border-black rounded-full"
                  animate={ hoveredTab ? { scaleY: 1.5, y: -1 } : { scaleY: 1, y: 0 } }
                  style={{ left: '30%', top: '60%' }}
                />
                <AnimatePresence>
                  {hoveredTab && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute -top-1 -right-1 w-2 h-2 text-yellow-300"
                      >
                        ✨
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ delay: 0.1 }}
                        className="absolute -top-2 left-0 w-2 h-2 text-yellow-300"
                      >
                        ✨
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                className="absolute -bottom-1 left-1/2 w-4 h-4 -translate-x-1/2"
                animate={ hoveredTab ? { y: [0, -4, 0], transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" } } : { y: [0, 2, 0], transition: { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 } } }
              >
                <div className="w-full h-full bg-white rotate-45 transform origin-center" />
              </motion.div>
            </div>
          </motion.div>
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name
            const isHovered = hoveredTab === item.name

            return (
              <Link
                key={item.name}
                href={item.url}
                data-nav-item={item.name}
                onClick={(e) => {
                  e.preventDefault()
                  setActiveTab(item.name)
                  const isAnchor = item.url === "/" || item.url.startsWith("#")
                  if (isAnchor) {
                    const id = item.url === "/" ? "home" : item.url.slice(1)
                    const el = document.getElementById(id)
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" })
                      window.history.replaceState({}, "", `#${id}`)
                    }
                  } else {
                    window.location.href = item.url
                  }
                  const linkRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                  const navRect = navRef.current?.getBoundingClientRect()
                  const x = navRect ? (linkRect.left - navRect.left + linkRect.width / 2) : (linkRect.width / 2)
                  setDollTargetX(x)
                }}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-6 py-3 rounded-full transition-all duration-300",
                  "text-white/70 hover:text-white",
                  isActive && "text-white"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full -z-10 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.03, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="absolute inset-0 bg-primary/25 rounded-full blur-md" />
                    <div className="absolute inset-[-4px] bg-primary/20 rounded-full blur-xl" />
                    <div className="absolute inset-[-8px] bg-primary/15 rounded-full blur-2xl" />
                    <div className="absolute inset-[-12px] bg-primary/5 rounded-full blur-3xl" />
                    
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                      style={{
                        animation: "shine 3s ease-in-out infinite"
                      }}
                    />
                  </motion.div>
                )}

                <motion.span
                  className="hidden md:inline relative z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
                <motion.span 
                  className="md:hidden relative z-10"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={22} strokeWidth={2.5} />
                </motion.span>
          
                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                    />
                  )}
                </AnimatePresence>

                
              </Link>
            )
          })}
        </motion.div>
      </div>
    </nav>
  )
}
