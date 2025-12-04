"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Award } from "lucide-react";
import { AwardCard } from "@/components/achievement-cards";

type Achievement = {
  id: string;
  title: string;
  issuer: string;
  image?: string;
  certificateUrl?: string;
};

const achievementsData: Achievement[] = [
  { id: "sankalp101", title: "2nd Place — Sankalp101", issuer: "India's First 2D Virtual Hackathon", image: "/achievements/sankalp101.jpg", certificateUrl: "https://drive.google.com/file/d/1iRqOBKmClIb24bkwCBDsR5vH3Tql87Cc/view?usp=sharing" },
  { id: "odoo-finalist", title: "Finalist — Odoo Gandhinagar", issuer: "Odoo", image: "/achievements/odoo.jpg", certificateUrl: "" },
  { id: "react-frontend-1", title: "Frontend Development with React", issuer: "Coursera (Packt)", image: "/achievements/react-frontend.jpg", certificateUrl: "https://drive.google.com/file/d/1cK_reFe-SYHLct3Mck2HS4e95ddBaR-L/view?usp=sharing" },
  { id: "backend-api", title: "Backend Development and API Creation", issuer: "Coursera (Packt)", image: "/achievements/backend.jpg", certificateUrl: "https://drive.google.com/file/d/1VUscznjWqMo39lfvdOdnVo0hdnxHfwb7/view?usp=sharing" },
  { id: "advanced-frontend", title: "Advanced Frontend Development and Deployment", issuer: "Coursera (Packt)", image: "/achievements/advanced-frontend.jpg", certificateUrl: "https://drive.google.com/file/d/1nq96v64zjCMtMDHfwGMZcv-QFBAnpMHn/view?usp=sharing" },
  { id: "mern-specialization", title: "MERN Stack Specialization", issuer: "Coursera (Packt)", image: "/achievements/mern.jpg", certificateUrl: "https://drive.google.com/file/d/1lcJR4bkrHA4W6Wvh9dAvzfz6sLPQYdhl/view?usp=sharing" },
  { id: "ml-ibm", title: "Machine Learning", issuer: "Coursera (IBM)", image: "/achievements/ml-ibm.jpg", certificateUrl: "https://drive.google.com/file/d/1qZtZuvGFyXetlpEZf05iJMaaN9eSIJJ1/view?usp=sharing" },
  { id: "ai-everyone", title: "AI for Everyone", issuer: "DeepLearning.AI", image: "/achievements/ai-everyone.jpg", certificateUrl: "https://drive.google.com/file/d/1U3q88boDIlhMDTZo8myttYpSljI2b_kF/view?usp=sharing" },
  { id: "keras-ibm", title: "Intro to Deep Learning and Neural Networks with Keras", issuer: "Coursera (IBM)", image: "/achievements/keras.jpg", certificateUrl: "https://drive.google.com/file/d/1jrjqUxFfGkUgHDP5IVGJ774evnJFypqo/view?usp=sharing" },
];

export default function AchievementsSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = achievementsData.find((a) => a.id === openId);
  const toDrivePreview = (url?: string) => {
    if (!url) return "";
    const m = url.match(/https?:\/\/drive\.google\.com\/file\/d\/([^/]+)/);
    return m ? `https://drive.google.com/file/d/${m[1]}/preview` : url;
  };

  return (
    <section className="bg-neutral-950 py-16">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-2">Achievements & Certifications</h2>
            <p className="text-muted-foreground">Selected achievements and certifications</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {achievementsData.map((a) => (
            <button
              key={a.id}
              onClick={() => setOpenId(a.id)}
              aria-label={`Open certificate for ${a.title}`}
              className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
            >
              <AwardCard
                icon={<Award className="w-6 h-6" />}
                title={a.title}
                description={a.issuer}
                className="w-full"
              />
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/70 backdrop-blur-sm"
            onClick={() => setOpenId(null)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-4xl rounded-2xl border border-white/10 bg-neutral-900 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="text-white font-semibold">{active?.title}</div>
                <button className="cta-link" onClick={() => setOpenId(null)} aria-label="Close">Close</button>
              </div>
              <div className="relative h-[70vh]">
                {active?.certificateUrl ? (
                  <iframe
                    title={`${active.title} certificate`}
                    src={toDrivePreview(active.certificateUrl)}
                    className="absolute inset-0 w-full h-full rounded-b-2xl"
                  />
                ) : active?.image ? (
                  <img src={active.image} alt={`${active.title} certificate`} className="absolute inset-0 w-full h-full object-contain" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text:white/80">Certificate will be attached.</div>
                )}
              </div>
              {active?.certificateUrl && (
                <div className="flex items-center justify-end p-4 border-t border-white/10">
                  <a href={active.certificateUrl} target="_blank" rel="noopener noreferrer" className="cta-link">Open in new tab</a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
