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
      <div class="portfolio-mark" aria-hidden="true">
        <i></i><i></i><i></i><i></i>
      </div>
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
      <span class="portfolio-nav-note">کار و اندیشه</span>
    </nav>
  )
}

export default PortfolioNav
