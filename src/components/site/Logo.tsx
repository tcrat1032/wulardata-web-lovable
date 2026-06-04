import { Link } from "react-router-dom";
import logoFull from "@/assets/wulardata-logo.png";
import logoIcon from "@/assets/wulardata-icon.png";

interface LogoProps {
  /** Force a single variant; default auto-switches by breakpoint */
  variant?: "auto" | "full" | "icon";
  className?: string;
}

/**
 * Responsive WularData brand mark.
 * - <sm: compact circular icon (square, scales cleanly on phones)
 * - >=sm: full wordmark lockup
 * - High-DPI safe via intrinsic width/height + srcSet hinting
 * - PNG with transparent background; falls back gracefully if either asset fails
 */
const Logo = ({ variant = "auto", className = "" }: LogoProps) => {
  const showIcon = variant === "icon" || variant === "auto";
  const showFull = variant === "full" || variant === "auto";

  return (
    <Link to="/" aria-label="WularData — home" className={`inline-flex items-center ${className}`}>
      {showIcon && (
        <img
          src={logoIcon}
          srcSet={`${logoIcon} 1x, ${logoIcon} 2x`}
          alt="WularData"
          width={512}
          height={512}
          decoding="async"
          className={`h-[4.32rem] w-[4.32rem] sm:h-[4.68rem] sm:w-[4.68rem] object-contain ${variant === "auto" ? "sm:hidden" : ""}`}
          onError={(e) => {
            // Hide broken icon so the wordmark still shows in auto mode
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      {showFull && (
        <img
          src={logoFull}
          srcSet={`${logoFull} 1x, ${logoFull} 2x`}
          alt="WularData"
          width={1024}
          height={512}
          decoding="async"
          className={`h-[3.6rem] sm:h-[3.9rem] md:h-[4.2rem] lg:h-[4.68rem] w-auto object-contain ${variant === "auto" ? "hidden sm:block" : ""}`}
          onError={(e) => {
            // Final fallback: text wordmark
            const img = e.currentTarget as HTMLImageElement;
            const span = document.createElement("span");
            span.textContent = "WularData";
            span.className = "text-xl font-extrabold tracking-tight text-[hsl(var(--deep-blue))]";
            img.replaceWith(span);
          }}
        />
      )}
    </Link>
  );
};

export default Logo;
