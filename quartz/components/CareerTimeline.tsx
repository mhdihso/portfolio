import { QuartzComponent } from "./types"

const timelineItems = [
  {
    period: "Apr 2026 – Present",
    role: "Working Student",
    org: "Robert Bosch GmbH",
    detail: "SQL pipelines · AI workflows · Enterprise apps",
    current: true,
  },
  {
    period: "2025 – Present",
    role: "M.Sc. Computer Science",
    org: "University of Tübingen",
    detail: "Distributed systems · DuckDB research",
    current: true,
  },
  {
    period: "Jan – Mar 2025",
    role: "IT Intern",
    org: "Deutsche Bundesbank",
    detail: "Enterprise SQL · Monetary policy systems",
    current: false,
  },
  {
    period: "2019 – 2024",
    role: "Co-Founder & Backend Lead",
    org: "NoyanFanavarArya",
    detail: "Kafka · Kubernetes · Docker Swarm · 5yr ownership",
    current: false,
  },
  {
    period: "2020 – 2024",
    role: "B.Sc. Computer Science",
    org: "University of Zanjan",
    detail: "CS Tutor · 3 years",
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
