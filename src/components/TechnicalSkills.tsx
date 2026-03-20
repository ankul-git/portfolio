import { useEffect, useRef } from "react";
import "./styles/TechnicalSkills.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Cloud Infrastructure",
    skills: ["AWS", "Scaleway", "Google Cloud", "DigitalOcean", "VPC", "IAM"],
  },
  {
    title: "Orchestration",
    skills: ["Kubernetes", "Docker", "Helm", "ArgoCD", "Crossplane", "Istio"],
  },
  {
    title: "IaC & Automation",
    skills: ["Terraform", "Ansible", "Pulumi", "CloudFormation", "Packer"],
  },
  {
    title: "Observability",
    skills: ["Prometheus", "Grafana", "ELK Stack", "Datadog", "eBPF", "Jaeger"],
  },
  {
    title: "CI/CD & Security",
    skills: ["GitHub Actions", "Jenkins", "GitLab CI", "Vault", "Trivy", "Falco"],
  },
  {
    title: "Development",
    skills: ["Python", "Go", "Bash", "TypeScript", "Node.js", "React"],
  },
];

const TechnicalSkills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".skill-category"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-header">
        <h2>
          Technical <span>Expertise</span>
        </h2>
      </div>
      <div className="skills-container">
        {skillCategories.map((category, index) => (
          <div key={index} className="skill-category">
            <h3>{category.title}</h3>
            <div className="skill-list">
              {category.skills.map((skill, i) => (
                <span key={i} className="skill-item">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechnicalSkills;
