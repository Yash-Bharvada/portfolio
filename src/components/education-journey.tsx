"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, School, BookOpen, Brain } from 'lucide-react';

interface EducationNode {
  id: number;
  title: string;
  grade: string;
  institution: string;
  side: 'left' | 'right';
  icon: React.ReactNode;
  color: string;
  href?: string;
}

const educationData: EducationNode[] = [
  {
    id: 1,
    title: '10th Grade',
    grade: '95.53 Percentile',
    institution: 'Utkarsh School of Execllence',
    side: 'right',
    icon: <School className="w-6 h-6" />,
    color: 'bg-blue-500',
    href: 'https://drive.google.com/file/d/1KiowBxw0H4kTmoosvenWFDkzIeaEMtqq/view?usp=sharing'
  },
  {
    id: 2,
    title: '12th Grade',
    grade: '89.04 Percentile',
    institution: 'Utkarsh School of Execllence',
    side: 'left',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'bg-green-500',
    href: 'https://drive.google.com/file/d/1dUqmLjYeh1Wn3hi27bH9YUAyDw4WntZ0/view?usp=sharing'
  },
  {
    id: 3,
    title: "Bachelor's in Computer Science",
    grade: '9.3 CGPA',
    institution: 'CHARUSAT University',
    side: 'right',
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'bg-purple-500',
    href: 'https://example.com/bachelors-transcript'
  },
  {
    id: 4,
    title: "Intership as Software Developer",
    grade: '1 month',
    institution: 'Blue Eagle Technologies',
    side: 'left',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-orange-500',
    href: 'https://drive.google.com/file/d/1s_EH2hm8x9694km6KbvHj6FdqFJng5V1/view?usp=sharing'
  },
  {
    id: 5,
    title: "Paid Intership as Software Developer",
    grade: '1 month',
    institution: 'Elite Infotech',
    side: 'right',
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-pink-500',
    href: 'https://example.com/elite-infotech-internship'
  },
];

interface NodeCardProps {
  node: EducationNode;
  index: number;
}

const NodeCard: React.FC<NodeCardProps> = ({ node, index }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 15%"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [node.side === 'left' ? -80 : 80, 0, node.side === 'left' ? -80 : 80]
  );

  return (
    <div ref={ref} className="relative w-full py-8">
      <div
        className={`flex items-center justify-center gap-8 ${
          node.side === 'left' ? 'flex-row' : 'flex-row-reverse'
        }`}
      >
        {node.href ? (
          <motion.a
            href={node.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${node.title} details`}
            style={{ opacity, x }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`w-full md:w-5/12 ${node.side === 'left' ? 'text-right' : 'text-left'} group cursor-pointer`}
          >
            <div className="bg-card border border-border rounded-lg p-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 relative">
              <div className={`flex items-center gap-3 ${node.side === 'left' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${node.color} text-white p-3 rounded-full`}>
                  {node.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{node.title}</h3>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-2xl font-bold text-primary">{node.grade}</p>
                <p className="text-sm text-muted-foreground inline-flex items-center">
                  {node.institution}
                  <span className="ml-2 text-primary/80 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                </p>
              </div>
            </div>
          </motion.a>
        ) : (
          <motion.div
            style={{ opacity, x }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`w-full md:w-5/12 ${node.side === 'left' ? 'text-right' : 'text-left'}`}
          >
            <div className="bg-card border border-border rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className={`flex items-center gap-3 ${node.side === 'left' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${node.color} text-white p-3 rounded-full`}>
                  {node.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{node.title}</h3>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-2xl font-bold text-primary">{node.grade}</p>
                <p className="text-sm text-muted-foreground">{node.institution}</p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          style={{ opacity }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative z-10"
        >
          <div className={`w-4 h-4 rounded-full ${node.color} border-4 border-background shadow-lg`} />
        </motion.div>

        <div className="w-full md:w-5/12" />
      </div>

      {index < educationData.length - 1 && (
        <motion.div
          style={{ opacity }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="absolute left-1/2 top-full w-0.5 h-16 bg-border origin-top transform -translate-x-1/2"
        />
      )}
    </div>
  );
};

const EducationJourney: React.FC = () => {
  return (
    <div className="min-h-screen bg-background pt-28 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My Journey
          </h1>
          <p className="text-muted-foreground text-lg">
            A timeline of achievements and milestones
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 flex justify-center mb-8"
          >
            <div className="bg-primary text-primary-foreground rounded-full p-6 shadow-xl">
              <GraduationCap className="w-8 h-8" />
            </div>
          </motion.div>

          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute left-1/2 top-20 w-0.5 h-16 bg-border origin-top transform -translate-x-1/2"
          />

          <div className="mt-24">
            {educationData.map((node, index) => (
              <NodeCard key={node.id} node={node} index={index} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-block bg-card border border-border rounded-full px-8 py-4 shadow-lg">
            <p className="text-foreground font-semibold">Journey Continues...</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EducationJourney;
