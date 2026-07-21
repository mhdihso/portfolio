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
      <a class="portfolio-mark" href={resolveRelative(currentSlug, "" as FullSlug)} aria-label="Home">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="8" fill="var(--secondary)" fill-opacity="0.2" stroke="var(--gold)" stroke-width="1.5"/>
          <path d="M18 4L22.2 13.8L32 18L22.2 22.2L18 32L13.8 22.2L4 18L13.8 13.8L18 4Z" fill="var(--secondary)" stroke="var(--gold)" stroke-width="1.2"/>
          <path d="M18 9L20.8 15.2L27 18L20.8 20.8L18 27L15.2 20.8L9 18L15.2 15.2L18 9Z" fill="var(--gold)"/>
          <circle cx="18" cy="18" r="3" fill="var(--light)"/>
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

