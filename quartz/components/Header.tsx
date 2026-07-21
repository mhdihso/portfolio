import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import PortfolioNav from "./PortfolioNav"

const Header: QuartzComponent = (props: QuartzComponentProps) => {
  return (
    <header>
      <div class="girih-field" data-girih aria-hidden="true">
        <svg viewBox="0 0 600 130" preserveAspectRatio="none">
          <g class="girih-tiles">
            <path d="M38 65 65 22l50 16v54l-50 16Z" />
            <path d="M142 18l44 26-17 52h-54l-17-52Z" />
            <path d="M250 65l33-33 33 33-33 33Z" />
            <path d="M348 65 382 22l48 25-10 55-49 6Z" />
            <path d="M472 18l47 28-15 53h-56l-15-53Z" />
            <path d="M551 65l22-33 22 33-22 33Z" />
          </g>
        </svg>
      </div>
      <PortfolioNav {...props} />
      {props.children}
    </header>
  )
}

Header.afterDOMLoaded = `
document.querySelectorAll('[data-girih]').forEach((field) => {
  requestAnimationFrame(() => field.classList.add('is-ready'))
})
`

Header.css = `
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
  gap: 1rem;
}

header h1 {
  margin: 0;
  flex: auto;
}
`

export default (() => Header) satisfies QuartzComponentConstructor
