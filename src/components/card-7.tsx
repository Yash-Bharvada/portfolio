import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Define the props for the TravelCard component
interface TravelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  imageAlt: string;
  logo?: React.ReactNode;
  title: string;
  location: string;
  overview: string;
  price?: number;
  pricePeriod?: string;
  ctaLabel?: string;
  href?: string;
  fallbackUrl?: string;
  onBookNow?: () => void;
}

const TravelCard = React.forwardRef<HTMLDivElement, TravelCardProps>(
  (
    {
      className,
      imageUrl,
      imageAlt,
      logo,
      title,
      location,
      overview,
      price,
      pricePeriod,
      ctaLabel,
      href,
      onBookNow,
      fallbackUrl,
      ...props
    },
    ref
  ) => {
    const [src, setSrc] = React.useState(imageUrl);
    return (
      <div
        ref={ref}
        className={cn(
          "group relative w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card shadow-lg",
          "transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2",
          className
        )}
        {...props}
      >
        {/* Background Image with Zoom Effect on Hover */}
        <img
          src={src}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          onError={() => {
            if (fallbackUrl && src !== fallbackUrl) {
              setSrc(fallbackUrl);
            }
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Content Container */}
        <div className="relative flex h-full flex-col justify-between p-6 text-card-foreground">
          <div className="flex h-40 items-start">
             {logo && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/50 bg-black/20 backdrop-blur-sm">
                   {logo}
                </div>
             )}
          </div>
          
          <div className="space-y-4 transition-transform duration-500 ease-in-out md:group-hover:-translate-y-16">
            <div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-white">{title}</h3>
              <p className="text-sm text-white/80">{location}</p>
            </div>
            <div>
              <h4 className="font-semibold text-white/90">OVERVIEW</h4>
              <p className="text-sm text-white/70 leading-relaxed">
                {overview}
              </p>
            </div>
          </div>

          <div className="absolute left-0 w-full p-4 md:p-6 transition-all duration-500 ease-in-out bottom-0 opacity-100 md:-bottom-20 md:opacity-0 md:group-hover:bottom-0 md:group-hover:opacity-100 z-10">
            <div className="flex items-end justify-between">
              <div>
                {typeof price === "number" && (
                  <span className="text-4xl font-bold text-white">{price}</span>
                )}
                {pricePeriod && (
                  <span className="text-white/80"> {pricePeriod}</span>
                )}
              </div>
              {href ? (
                <Button asChild size="lg" className="bg-white text-black hover:bg-white/90" style={{ minHeight: 48 }}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {ctaLabel ?? "View"} <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              ) : (
                <Button onClick={onBookNow} size="lg" className="bg-white text-black hover:bg-white/90" style={{ minHeight: 48 }}>
                  {ctaLabel ?? "View"} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
);
TravelCard.displayName = "TravelCard";

export { TravelCard };
