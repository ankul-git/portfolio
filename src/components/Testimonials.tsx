import { useEffect, useRef } from "react";
import "./styles/Testimonials.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaQuoteLeft } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Senior Infrastructure Engineer @ Techflow",
    text: "Ankul's expertise in Kubernetes and CI/CD automation significantly reduced our deployment times. A true professional who understands infrastructure as code at a deep level.",
  },
  {
    name: "Sarah Chen",
    role: "CTO @ CloudScale",
    text: "Exceptional SRE skills. Ankul helped us implement a robust observability stack that saved us countless hours during incident response. His attention to detail is unmatched.",
  },
  {
    name: "Michael Vogt",
    role: "Lead DevOps @ DataStream",
    text: "His work on Terraform and Ansible was top-notch for our migration. Highly recommended for any complex cloud projects. He doesn't just build systems; he builds reliability.",
  },
  {
    name: "David Miller",
    role: "Director of Engineering @ CloudGrid",
    text: "Ankul's ability to simplify complex cloud-native architectures is remarkable. He's been instrumental in our shift towards a more resilient and scalable infrastructure.",
  },
  {
    name: "Elena Rodriguez",
    role: "DevOps Architect @ Streamline",
    text: "A master of automation. Ankul transformed our manual deployment process into a fully automated, self-healing CI/CD pipeline. His GitOps implementation is textbook perfect.",
  },
  {
    name: "James Thompson",
    role: "Head of Infrastructure @ NexGen",
    text: "His deep knowledge of eBPF and observability helped us catch critical performance bottlenecks before they hit production. Ankul brings sanity to complex distributed systems.",
  },
  {
    name: "Linda Wu",
    role: "VP of Engineering @ GlobalTech",
    text: "Ankul is not just a DevOps engineer; he's a strategic thinker who understands the business impact of technical decisions. He's a force multiplier for any engineering team.",
  },
  {
    name: "Robert Geyer",
    role: "Senior SRE @ FinLink",
    text: "Highly proficient in Terraform and Kubernetes. Ankul's work on our multi-region AWS setup was flawless, ensuring 99.99% uptime during peak traffic periods.",
  },
  {
    name: "Karthik Sharma",
    role: "Lead Architect @ InnovateAI",
    text: "Ankul is the go-to person for Kubernetes security. He helped us harden our clusters and implement strict network policies that passed every compliance audit with flying colors.",
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Header Animation
    gsap.fromTo(
      sectionRef.current.querySelector(".testimonials-header h2"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current.querySelector(".testimonials-header"),
          start: "top 80%",
        },
      }
    );

    // Cards Animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="testimonials-section" id="testimonials" ref={sectionRef}>
      <div className="testimonial-bg-blur blur-1"></div>
      <div className="testimonial-bg-blur blur-2"></div>

      <div className="testimonials-header">
        <h2>
          What <span>People</span> Say
        </h2>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="testimonial-card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="quote-icon">
              <FaQuoteLeft />
            </div>
            <p className="testimonial-text">"{testimonial.text}"</p>
            <div className="testimonial-author">
              <div className="author-info">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
