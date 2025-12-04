"use client";
import * as React from 'react';
import { cn } from '@/lib/utils';
import { useMotionValue, animate, motion } from 'framer-motion';
import { useState, useEffect, createContext, useContext } from 'react';
import useMeasure from 'react-use-measure';

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
  palette?: {
    scheme?: 'monochrome' | 'gradient' | 'brand';
    color?: string;
    color2?: string;
  };
  mode?: 'line' | 'offscreen';
  lanes?: number;
  speed?: number; // pixels per second for offscreen mode
  flow?: 'ltr' | 'rtl';
};

type Palette = NonNullable<InfiniteSliderProps['palette']>;
const SliderPaletteContext = createContext<Palette | undefined>(undefined);
export const useSliderPalette = () => useContext(SliderPaletteContext);

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 35,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
  palette,
  mode = 'line',
  lanes = 4,
  speed = 140,
  flow = 'ltr',
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration:
          currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [
    key,
    translation,
    currentDuration,
    width,
    height,
    gap,
    isTransitioning,
    direction,
    reverse,
  ]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  const childrenArray = Array.from(React.Children.toArray(children));

  // Offscreen mode renders items absolutely with viewport-based animation
  if (mode === 'offscreen') {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 700;
    const laneYs = Array.from({ length: lanes }, (_, i) => ((i + 1) / (lanes + 1)) * vh);
    const distance = vw * 1.6; // start outside and end outside
    const dur = distance / speed; // seconds
    const startX = flow === 'ltr' ? -vw * 0.3 : vw * 1.3;
    const endX = flow === 'ltr' ? vw * 1.3 : -vw * 0.3;

    const styleVars = {
      ['--logo-color']: palette?.color ?? '#ffffff',
      ['--logo-color-2']: palette?.color2 ?? '#60a5fa',
      ['--logo-scheme']: palette?.scheme ?? 'brand',
    } as React.CSSProperties;
    return (
      <div
        className={cn('relative overflow-visible', className)}
        style={styleVars}
      >
        <SliderPaletteContext.Provider value={palette}>
          {childrenArray.concat(childrenArray).map((child, idx) => {
            const lane = laneYs[idx % laneYs.length];
            const d = durationOnHover ? dur : dur; // hover handled via events
            return (
              <motion.div
                key={idx}
                style={{ position: 'absolute', top: lane, left: 0, y: -32 }}
                initial={{ x: startX, opacity: 0.9 }}
                animate={{ x: endX, opacity: 1 }}
                transition={{ ease: 'linear', duration: d, repeat: Infinity }}
              >
                <div className="transition-transform duration-300 hover:scale-[1.03]">{child}</div>
              </motion.div>
            );
          })}
        </SliderPaletteContext.Provider>
      </div>
    );
  }

  // Default line mode (original)
  const lineStyleVars = {
    ['--logo-color']: palette?.color ?? '#ffffff',
    ['--logo-color-2']: palette?.color2 ?? '#60a5fa',
    ['--logo-scheme']: palette?.scheme ?? 'brand',
  } as React.CSSProperties;
  return (
    <div
      className={cn('overflow-hidden', className)}
      style={lineStyleVars}
    >
      <SliderPaletteContext.Provider value={palette}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal'
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
      </SliderPaletteContext.Provider>
    </div>
  );
}
