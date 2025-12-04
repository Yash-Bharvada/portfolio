"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";
import { LogoMask } from "@/components/ui/logo-mask";

type TechItem = { name: string; slug: string; alt: string; description: string };

const icon = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;

const brandColors: Record<string, string> = {
  react: "#61DAFB",
  nextdotjs: "#616161ff",
  nodedotjs: "#5FA04E",
  express: "#696868ff",
  mongodb: "#47A248",
  docker: "#2496ED",
  tailwindcss: "#06B6D4",
  framer: "#0055FF",
  greensock: "#88CE02",
  python: "#3776AB",
  flask: "#4f4f4fff",
  socketdotio: "#545454ff",
  django: "#092E20",
  streamlit: "#FF4B4B",
  nestjs: "#E0234E",
  tensorflow: "#FF6F00",
  pytorch: "#EE4C2C",
  keras: "#D00000",
  scikitlearn: "#F89939",
  opencv: "#5C3EE8",
  pandas: "#130654",
  numpy: "#013243",
  apachespark: "#E25A1C",
  plotly: "#3F4F75",
  qt: "#41CD52",
  html5: "#E34F26",
};

const items: TechItem[] = [
  { name: "React", slug: "react", alt: "React Logo", description: "UI library for building interfaces" },
  { name: "Next.js", slug: "nextdotjs", alt: "Next.js Logo", description: "Full-stack React framework" },
  { name: "Node.js", slug: "nodedotjs", alt: "Node.js Logo", description: "JavaScript runtime on the server" },
  { name: "Express", slug: "express", alt: "Express Logo", description: "Minimal Node.js web framework" },
  { name: "MongoDB", slug: "mongodb", alt: "MongoDB Logo", description: "NoSQL document database" },
  { name: "Docker", slug: "docker", alt: "Docker Logo", description: "Containerization platform" },
  { name: "Tailwind CSS", slug: "tailwindcss", alt: "Tailwind CSS Logo", description: "Utility-first CSS framework" },
  { name: "Framer Motion", slug: "framer", alt: "Framer Logo", description: "Animation library for React" },
  { name: "GSAP", slug: "greensock", alt: "GSAP Logo", description: "Robust animation toolkit" },
  { name: "Python", slug: "python", alt: "Python Logo", description: "Programming language for ML and backend" },
  { name: "Flask", slug: "flask", alt: "Flask Logo", description: "Python micro web framework" },
  { name: "Socket.IO", slug: "socketdotio", alt: "Socket.IO Logo", description: "Realtime communication library" },
  { name: "Django", slug: "django", alt: "Django Logo", description: "Python web framework" },
  { name: "Streamlit", slug: "streamlit", alt: "Streamlit Logo", description: "Python app framework for data apps" },
  { name: "NestJS", slug: "nestjs", alt: "NestJS Logo", description: "Node.js framework for scalable apps" },
  { name: "TensorFlow", slug: "tensorflow", alt: "TensorFlow Logo", description: "Core ML framework" },
  { name: "PyTorch", slug: "pytorch", alt: "PyTorch Logo", description: "Core ML framework" },
  { name: "Keras", slug: "keras", alt: "Keras Logo", description: "High-level neural networks API" },
  { name: "scikit-learn", slug: "scikitlearn", alt: "scikit-learn Logo", description: "ML library for Python" },
  { name: "OpenCV", slug: "opencv", alt: "OpenCV Logo", description: "Computer vision library" },
  { name: "Pandas", slug: "pandas", alt: "Pandas Logo", description: "Data analysis library" },
  { name: "NumPy", slug: "numpy", alt: "NumPy Logo", description: "Numerical computing library" },
  { name: "Apache Spark", slug: "apachespark", alt: "Apache Spark Logo", description: "Distributed data processing" },
  { name: "Plotly", slug: "plotly", alt: "Plotly Logo", description: "Interactive data visualization" },
  { name: "Qt", slug: "qt", alt: "Qt Logo", description: "GUI framework (PyQt)" },
  { name: "HTML5", slug: "html5", alt: "HTML5 Logo", description: "Web foundation for frontends" },
];

export default function TechStackSection({ className }: { className?: string }) {
  return (
    <section id="tech-stack" className={cn("bg-neutral-950 py-16", className)}>
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <div className="p-0">
          <InfiniteSlider
            gap={24}
            duration={45}
            durationOnHover={30}
            reverse
            palette={{ scheme: "brand", color: "#ffffff", color2: "#60a5fa" }}
            className="w-full py-6"
          >
            {items.map((i) => (
              <figure key={i.name} className="group flex flex-col items-center justify-center w-24 h-20">
                <LogoMask
                  src={icon(i.slug)}
                  alt={i.alt}
                  size={64}
                  className="h-16 w-16"
                  brandColor={brandColors[i.slug] || "#ffffff"}
                />
                <figcaption className="mt-1 text-xs text-white/90 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {i.name}
                </figcaption>
              </figure>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}

