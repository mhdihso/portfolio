import { QuartzComponent } from "./types"

const timelineItems = [
  {
    period: "Apr 2026 – Present",
    role: "Working Student — Web Apps",
    org: "Robert Bosch GmbH",
    location: "Reutlingen, Germany",
    detail: "Quality reporting & SQL data pipelines",
    current: true,
  },
  {
    period: "2025 – Present",
    role: "M.Sc. Computer Science",
    org: "University of Tübingen",
    location: "Tübingen, Germany",
    detail: "Scalable backend systems & DuckDB research",
    current: true,
  },
  {
    period: "Jan – Mar 2025",
    role: "IT Intern — System & Project",
    org: "Deutsche Bundesbank",
    location: "Hannover, Germany",
    detail: "Monetary policy systems & SQL validation",
    current: false,
  },
  {
    period: "2019 – 2024",
    role: "Backend Developer & Co-Founder",
    org: "NoyanFanavarArya",
    location: "Iran",
    detail: "Python, Django, PostgreSQL, Redis, Docker",
    current: false,
  },
  {
    period: "2020 – 2024",
    role: "B.Sc. Computer Science",
    org: "University of Zanjan",
    location: "Iran",
    detail: "CS Student Tutor for 3 Years",
    current: false,
  },
]

const CareerTimeline: QuartzComponent = () => {
  return (
    <div class="career-timeline-widget" aria-label="Career and education timeline">
      <h3 class="timeline-widget-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        Journey Timeline
      </h3>
      <div class="timeline-track">
        {timelineItems.map((item) => (
          <div class={`timeline-node ${item.current ? "is-current" : ""}`}>
            <div class="timeline-marker">
              <div class="timeline-dot"></div>
            </div>
            <div class="timeline-content">
              <div class="timeline-header-line">
                <span class="timeline-period">{item.period}</span>
                {item.current && <span class="timeline-badge">Active</span>}
              </div>
              <h4 class="timeline-role">{item.role}</h4>
              <div class="timeline-org">{item.org}</div>
              <p class="timeline-detail">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CareerTimeline
