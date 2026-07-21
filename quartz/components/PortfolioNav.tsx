import { QuartzComponent, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative } from "../util/path"

const links = [
  { label: "Home", slug: "" },
  { label: "Bio", slug: "about/bio" },
  { label: "Experience", slug: "experience" },
  { label: "Blog", slug: "blog" },
  { label: "Connect", slug: "connect" },
]

const PortfolioNav: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const currentSlug = fileData.slug ?? ("" as FullSlug)

  return (
    <nav class="portfolio-nav" aria-label="Primary navigation">
      <a class="portfolio-mark astrolabe-mark" href={resolveRelative(currentSlug, "" as FullSlug)} aria-label="Home page">
        <svg viewBox="0 0 240 240" width="38" height="38" class="astrolabe-svg">
          <circle cx="120" cy="120" r="108" fill="none" stroke="var(--gold)" stroke-width="2" />
          <g stroke="var(--gold)" stroke-width="1" opacity="0.75">
            {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((deg) => {
              const a = (deg * Math.PI) / 180
              const r1 = 108
              const r2 = deg % 30 === 0 ? 98 : 103
              return (
                <line
                  x1={(120 + r1 * Math.cos(a)).toFixed(2)}
                  y1={(120 + r1 * Math.sin(a)).toFixed(2)}
                  x2={(120 + r2 * Math.cos(a)).toFixed(2)}
                  y2={(120 + r2 * Math.sin(a)).toFixed(2)}
                />
              )
            })}
          </g>
          <circle cx="120" cy="120" r="86" fill="none" stroke="var(--secondary)" stroke-width="1" opacity="0.6" />
          <circle cx="120" cy="120" r="64" fill="none" stroke="var(--secondary)" stroke-width="1" opacity="0.4" />
          <g class="astrolabe-rete">
            <polygon
              points="120,42 133,90 181,51 149,99 198,120 149,141 181,189 133,150 120,198 107,150 59,189 91,141 42,120 91,99 59,51 107,90"
              fill="none"
              stroke="var(--tertiary)"
              stroke-width="1.4"
            />
            <circle cx="120" cy="42" r="3" fill="var(--secondary)" />
            <circle cx="181" cy="51" r="3" fill="var(--secondary)" />
            <circle cx="198" cy="120" r="3" fill="var(--secondary)" />
            <circle cx="181" cy="189" r="3" fill="var(--secondary)" />
            <circle cx="120" cy="198" r="3" fill="var(--secondary)" />
            <circle cx="59" cy="189" r="3" fill="var(--secondary)" />
            <circle cx="42" cy="120" r="3" fill="var(--secondary)" />
            <circle cx="59" cy="51" r="3" fill="var(--secondary)" />
            <circle cx="120" cy="120" r="4" fill="var(--gold)" />
            <line x1="120" y1="24" x2="120" y2="216" stroke="var(--secondary)" stroke-width="1" opacity="0.5" />
          </g>
        </svg>
      </a>
      <div class="portfolio-nav-links">
        {links.map((link, index) => (
          <a
            class="internal portfolio-nav-link"
            href={resolveRelative(currentSlug, link.slug as FullSlug)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default PortfolioNav

