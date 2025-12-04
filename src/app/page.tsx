"use client";
import dynamic from "next/dynamic";
const BackgroundPaths = dynamic(
  () => import("@/components/ui/background-paths").then((m) => m.BackgroundPaths),
  { ssr: false }
);
import { Footer } from "@/components/ui/footer";
import { Github, Linkedin, Instagram } from "lucide-react";
import { TravelCard } from "@/components/card-7";
import { Gallery4 } from "@/components/gallery4";
import { Typewriter } from "@/components/ui/typewriter-text";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/contact";
import EducationJourney from "@/components/education-journey";

export default function Home() {
  return (
    <div className="bg-neutral-950">
      <main className="flex flex-col">
        <section id="home" className="relative min-h-screen flex items-center justify-center">
          <BackgroundPaths title="" />
          <div className="absolute z-20 text-center">
            <Typewriter
              text={[
                "AI/ML Developer",
                "ML Developer",
                "Yash Bharvada",
              ]}
              speed={90}
              deleteSpeed={40}
              once
              className="text-5xl md:text-7xl font-extrabold text-white"
            />
          </div>
        </section>
        <section id="about" className="bg-neutral-950 py-12">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">So, who am I?</h2>
              <p className="text-zinc-300 mb-4">
                I’m <span className="font-semibold">Yash Bharvada</span>, an AI/ML‑focused developer building
                intelligent, production‑grade systems. I combine practical machine learning with
                solid engineering to deliver fast, reliable, and secure experiences.
              </p>
              <p className="text-zinc-300 mb-4">
                I work across model integration, RAG pipelines, inference APIs, evaluation,
                monitoring, and deployment. On the engineering side, I design clean APIs,
                accessible UIs, and data flows that scale—prioritizing performance,
                observability, and maintainability.
              </p>
              <p className="text-zinc-400 mb-6">
                Beyond core web apps, I’ve contributed to domain projects like contract
                analysis (LLM‑assisted), developer tooling (AI code assistant), hotel
                management systems, and supply‑chain tracking—bridging ML capabilities with
                practical product needs.
              </p>
              <Button asChild className="bg-white text-black hover:bg-white/90">
                <a href="#contact">Contact me</a>
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden border border-border">
              <img
                src="/about.png"
                alt="Yash Bharvada"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
        <section id="education" className="bg-neutral-950">
          <EducationJourney />
        </section>
        <section id="projects" className="bg-neutral-950 pt-16 pb-12">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <TravelCard
                imageUrl="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1080&auto=format&fit=crop"
                imageAlt="ContractAI"
                title="ContractAI"
                location="React • Node • MongoDB • Groq"
                overview="End-to-end system to analyze, summarize, and chat over contracts with LLM-powered workflows and a React + Vite frontend backed by Express + MongoDB."
                ctaLabel="View"
                href="https://github.com/pankti0409/ContractAI"
                fallbackUrl="https://raw.githubusercontent.com/66HEX/free-photos/main/img1.jpeg"
              />
              <TravelCard
                imageUrl="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1080&auto=format&fit=crop"
                imageAlt="CodeMate"
                title="CodeMate"
                location="React • Express • Groq • Docker"
                overview="AI-powered code editor with Monaco: generate, optimize, explain, and run code with sandboxed Docker runners and Groq integration."
                ctaLabel="View"
                href="https://github.com/Yash-Bharvada/CodeMate"
                fallbackUrl="https://raw.githubusercontent.com/66HEX/free-photos/main/img3.jpeg"
              />
              <TravelCard
                imageUrl="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1080&auto=format&fit=crop"
                imageAlt="ALM-SIH2025"
                title="ALM — AI Audio Understanding"
                location="React • Tailwind • Animations"
                overview="Responsive homepage for an Audio Language Model with cyberpunk aesthetic, modern animations, and interactive showcase."
                ctaLabel="View"
                href="https://github.com/Dhruvgabani7/ALM-SIH2025"
                fallbackUrl="https://raw.githubusercontent.com/66HEX/free-photos/main/img5.jpeg"
              />
            </div>
            <div className="mt-10">
              <Gallery4
                title="More Projects"
                description="Selected work across AI/ML, vision, and product engineering"
                items={[
                  {
                    id: "floatchat",
                    title: "FloatChat",
                    description:
                      "Natural-language exploration and visualization of ARGO ocean data using RAG.",
                    href: "https://github.com/Dhruvgabani7/FloatChat",
                    image: "/floatchat.jpg",
                    badges: ["RAG", "LLM", "Data Viz"],
                  },
                  {
                    id: "yolov8-movement",
                    title: "Movement Detection (YOLOv8)",
                    description:
                      "Behavior tracking model identifying looking around, waving, and unusual activity.",
                    href: "https://github.com/Yash-Bharvada/YOLOv8",
                    image: "/yolo.jpg",
                    badges: ["Python", "YOLOv8", "Computer Vision"],
                  },
                  {
                    id: "ser",
                    title: "Speech Emotion Recognition",
                    description:
                      "Classifies emotions from speech using MFCC features and Random Forest.",
                    href: "https://ser-wav2vec.vercel.app/",
                    image: "/ser.png",
                    badges: ["Speech", "Wav2Vec", "Web"],
                  },
                  {
                    id: "diabetes",
                    title: "Early Diabetes Detection",
                    description:
                      "Predictive model using classification algorithms on medical datasets.",
                    href: "https://early-diatetes-prediction.streamlit.app/",
                    image: "/edp.jpg",
                    badges: ["Streamlit", "ML", "Healthcare"],
                  },
                  {
                    id: "supply-chain",
                    title: "Supply Chain Management",
                    description:
                      "Real-time inventory and logistics tracking to streamline operations.",
                    href: "https://github.com/PrinceDiyora/Internship-Project",
                    image: "/scms.jpg",
                    badges: ["Python", "Django REST", "PyQt"],
                  },
                  {
                    id: "stackit",
                    title: "StackIt",
                    description:
                      "Reddit-style dev forum for queries, solutions, and discussions; Odoo Hackathon 2025 R1 PS.",
                    href: "https://github.com/KushalvDesai/stackit-1602",
                    image: "/stackit.jpg",
                    badges: ["Next.js", "NestJS", "MongoDB"],
                  },
                  {
                    id: "lan-messenger",
                    title: "LAN-Based Messenger",
                    description:
                      "Flask + Socket.IO chat app with auth, emojis, file sharing, and basic XOR encryption for educational use.",
                    href: "https://github.com/23CS020DhadukJeet/Lan-Based-Messenger",
                    image: "/lan-messenger.jpg",
                    badges: ["Flask", "Socket.IO", "Python"],
                    ctaLabel: "View",
                  },
                  {
                    id: "quickfolio",
                    title: "QuickFolio",
                    description:
                      "No-code MERN portfolio generator to create and publish professional portfolios in minutes.",
                    href: "https://github.com/Yash-Bharvada/QuickFolio",
                    image: "/quickfolio.jpg",
                    badges: ["MERN", "React", "Node", "MongoDB"],
                    ctaLabel: "View",
                  },
                ]}
              />
            </div>
          </div>
        </section>
        <section id="contact" className="bg-neutral-950">
          <ContactSection
            title="Let's build something exceptional together"
            mainMessage="Let's talk!"
            contactEmail="yashbharvada4@gmail.com"
          />
          <Footer
            logo={<div className="h-7 w-7 rounded-full bg-black dark:bg-white" />}
            brandName="Portfolio"
            socialLinks={[
              {
                icon: <Github className="h-4 w-4" />,
                href: "https://github.com/Yash-Bharvada",
                label: "GitHub",
              },
              {
                icon: <Linkedin className="h-4 w-4" />,
                href: "https://in.linkedin.com/in/yash-bharvada-4361282b2",
                label: "LinkedIn",
              },
              {
                icon: <Instagram className="h-4 w-4" />,
                href: "https://www.instagram.com/yash_bharvada/",
                label: "Instagram",
              },  
            ]}
            mainLinks={[
              { href: "#about", label: "About" },
              { href: "#education", label: "Journey" },
              { href: "#projects", label: "Projects" },
              { href: "#contact", label: "Contact" },
            ]}
            legalLinks={[
              { href: "#privacy", label: "Privacy" },
              { href: "#terms", label: "Terms" },
            ]}
            copyright={{ text: "© 2025 Portfolio" }}
          />
        </section>
        
      </main>
    </div>
  );
}
