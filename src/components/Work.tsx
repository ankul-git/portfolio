import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "ML Infrastructure Reliability",
    category: "Cloud-Native Monitoring",
    tools: "Prometheus, Docker, Kubernetes",
    image: "/images/ml-infra-dashboard.png",
    description: "Designed and deployed a high-availability cloud-native reliability platform. Implemented deep-level metric collection using Prometheus to detect resource saturation and system anomalies, ensuring 99.9% uptime for critical ML training workloads.",
  },
  {
    title: "eSignatures Monitoring System",
    category: "API & SLA Tracking",
    tools: "Prometheus, Grafana",
    image: "",
    description: "Led observability operations for a mission-critical eSignature platform. Built comprehensive API monitoring and proactive alerting systems that reduced incident response time by 40% while ensuring strict vendor SLA compliance.",
  },
  {
    title: "Kubernetes Multi-Environment",
    category: "Cluster Deployment",
    tools: "EKS, Kubernetes, Auto-Scaling",
    image: "",
    description: "Architected and managed multi-environment EKS clusters with automated GitOps workflows. Implemented advanced HPA and VPA scaling policies that optimized resource utilization and reduced cloud spend by 25% while maintaining performance.",
  },
  {
    title: "CI/CD & GitOps Automation",
    category: "Deployment Pipelines",
    tools: "GitHub Actions, ArgoCD",
    image: "",
    description: "Engineered robust CI/CD pipelines using GitHub Actions and ArgoCD for zero-downtime deployments. Eliminated manual configuration toil and enforced security scanning within the pipeline for all production releases.",
  },
  {
    title: "Kubernetes Management",
    category: "Core Expertise",
    tools: "Multi-Environment Orchestration",
    image: "",
    description: "Managed unified orchestration across multi-environment staging and production Kubernetes clusters. Implemented scalable deployment strategies, dynamic node scaling, and resource optimization, significantly reducing container overhead.",
  },
  {
    title: "Full-Stack Observability",
    category: "Core Expertise",
    tools: "Prometheus, Grafana, Alerting",
    image: "",
    description: "Architected end-to-end full-stack observability pipelines using Prometheus and Grafana. Built complex real-time operational dashboards focusing on custom application metrics, automated alert routing, and system insights.",
  },
  {
    title: "CI/CD Pipelines",
    category: "Core Expertise",
    tools: "Automated Workflows, GitHub Actions",
    image: "",
    description: "Engineered scalable CI/CD pipelines leveraging GitHub Actions to fully automate software delivery. Integrated rigorous automated build and test suites, ensuring robust quality gates before seamless deployments.",
  },
  {
    title: "Infrastructure as Code",
    category: "Core Expertise",
    tools: "Terraform, Cloud Provisioning",
    image: "",
    description: "Led complex cloud resource provisioning strictly adhering to Infrastructure as Code principles via Terraform. Maintained secure state management, promoting infrastructure execution and eliminating configuration drift.",
  },
  {
    title: "Automation",
    category: "Core Expertise",
    tools: "Script Development",
    image: "",
    description: "Authored advanced Bash and Python scripts replacing manual toil with fully automated operational workflows. Actively improved overall engineering velocity through deployment automation tailored for distributed enterprise architectures.",
  },
  {
    title: "Cloud Architecture",
    category: "Core Expertise",
    tools: "Infrastructure Design, Networking",
    image: "",
    description: "Designed cloud-native architectures optimized for high availability, sophisticated internal networking, and robust perimeter security. Continuously balanced architectural improvements against detailed cost-optimization constraints.",
  },
  {
    title: "Security & Compliance",
    category: "Core Expertise",
    tools: "RBAC, Secrets Management",
    image: "",
    description: "Enforced rigorous infrastructure security best practices encompassing zero-trust network policies, centralized automated secret management, and granular Role-Based Access Control (RBAC) across AWS and cloud environments.",
  },
  {
    title: "Performance Optimization",
    category: "Core Expertise",
    tools: "Scaling Strategies, Cost-Efficiency",
    image: "",
    description: "Conducted deep resource utilization analyses predicting capacity bottlenecks prior to user impact. Synthesized active horizontal scaling strategies maximizing architectural performance and strict overall cost-efficiency.",
  }
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info" style={{ flex: project.image ? 1 : "0 0 100%", maxWidth: project.image ? "calc(50% - 30px)" : "100%" }}>
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <p className="carousel-description" style={{ fontSize: "14px", fontWeight: 300, lineHeight: "1.6", margin: "15px 0", opacity: 0.8 }}>
                          {project.description}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    {project.image && (
                      <div className="carousel-image-wrapper" style={{ flex: 1, maxWidth: "calc(50% - 30px)" }}>
                        <WorkImage image={project.image} alt={project.title} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
