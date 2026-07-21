import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import PortfolioNav from "./PortfolioNav"

const Header: QuartzComponent = (props: QuartzComponentProps) => {
  return (
    <header>
      <PortfolioNav {...props} />
      {props.children}
    </header>
  )
}

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
