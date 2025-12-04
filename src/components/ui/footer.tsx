"use client";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FooterProps {
  logo: React.ReactNode
  brandName: string
  socialLinks: Array<{
    icon: React.ReactNode
    href: string
    label: string
  }>
  mainLinks: Array<{
    href: string
    label: string
  }>
  legalLinks: Array<{
    href: string
    label: string
  }>
  copyright: {
    text: string
    license?: string
  }
}

export function Footer({
  logo,
  brandName,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: FooterProps) {
  const [panel, setPanel] = useState<"privacy" | "terms" | null>(null)
  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24">
      <div className="px-4 lg:px-8">
        <div className="md:flex md:items-start md:justify-between">
          <Link
            href="/"
            className="flex items-center gap-x-2"
            aria-label={brandName}
          >
            {logo}
            <span className="font-bold text-xl">{brandName}</span>
          </Link>
          <ul className="flex list-none mt-6 md:mt-0 space-x-3">
            {socialLinks.map((link, i) => (
              <li key={i}>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  asChild
                >
                  <a href={link.href} target="_blank" aria-label={link.label}>
                    {link.icon}
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <section className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">Capabilities</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Production-grade APIs, auth, observability, CI/CD</li>
              <li>LLM/RAG pipelines, evaluation, prompt tooling</li>
              <li>Model integration, inference APIs, performance tuning</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">Selected Outcomes</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>Latency reduced by 35–60% via caching and batching</li>
              <li>Deployment time cut 50% with automated pipelines</li>
              <li>Accessibility and WCAG improvements across UI</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground">Focus Areas</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>AI/ML systems, data processing, model lifecycle</li>
              <li>Secure, observable, maintainable product engineering</li>
              <li>Design systems, performance, responsive UX</li>
            </ul>
          </div>
        </section>
        <div className="border-t mt-6 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10">
          <nav className="lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
              {mainLinks.map((link, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <Link
                    href={link.href}
                    className="text-sm text-primary underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-6 lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-end">
              {legalLinks.map((link, i) => (
                <li key={i} className="my-1 mx-3 shrink-0">
                  {link.label.toLowerCase() === "privacy" ? (
                    <button
                      type="button"
                      onClick={() => setPanel("privacy")}
                      className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </button>
                  ) : link.label.toLowerCase() === "terms" ? (
                    <button
                      type="button"
                      onClick={() => setPanel("terms")}
                      className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-sm leading-6 text-muted-foreground whitespace-nowrap lg:mt-0 lg:row-[1/3] lg:col-[1/4]">
            <div className="flex items-center gap-3">
              <span>{copyright.text}</span>
              {copyright.license && <span>{copyright.license}</span>}
            </div>
            {/* Privacy/Terms controls moved to right-bottom legal links */}
          </div>
        </div>
        <AnimatePresence>
          {panel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm"
              onClick={() => setPanel(null)}
              aria-modal="true"
              role="dialog"
            >
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-3xl rounded-2xl border border-white/10 bg-neutral-900 shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white">{panel === "privacy" ? "Privacy Policy" : "Terms of Use"}</h3>
                  <Button variant="secondary" onClick={() => setPanel(null)}>Close</Button>
                </div>
                <div className="p-6 text-sm text-white/90 space-y-4 max-h-[55vh] overflow-y-auto">
                  {panel === "privacy" ? (
                    <>
                      <p>We collect only the information you provide via the contact form (name, email, project details). Data is used solely for responding to inquiries and is never sold or shared with third parties.</p>
                      <p>Security measures include transport encryption (HTTPS) and trusted mail delivery via Resend. You may request data deletion by contacting the email listed in the footer.</p>
                      <p>Cookies are limited to essential functionality. No tracking or advertising cookies are used.</p>
                    </>
                  ) : (
                    <>
                      <p>Content is provided “as is” for informational purposes. Do not redistribute without permission. Any sample code is licensed per repository settings.</p>
                      <p>By using this site, you agree not to misuse contact details, and you accept reasonable usage limits for any demos or APIs showcased.</p>
                      <p>Availability may vary during maintenance windows. Feedback and improvement proposals are welcome.</p>
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </footer>
  )
}
