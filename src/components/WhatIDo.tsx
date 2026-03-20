import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };
  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }
    return () => {
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, []);
  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          WHAT
          <div>
            I<span className="do-h2"> Do</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
              <line
                x1="100%"
                y1="0"
                x2="100%"
                y2="100%"
                stroke="white"
                strokeWidth="2"
                strokeDasharray="7,7"
              />
            </svg>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>

            <div className="what-content-in">
              <h3>CLOUD & INFRA</h3>
              <h4>Architecting Scalable Systems</h4>
              <p>
                Designing fault-tolerant, secure, and performant cloud architectures on AWS and Scaleway using Infrastructure as Code principles.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">AWS</div>
                <div className="what-tags">Kubernetes (EKS)</div>
                <div className="what-tags">Terraform</div>
                <div className="what-tags">Ansible</div>
                <div className="what-tags">VPC & EC2</div>
                <div className="what-tags">Nginx Ingress</div>
                <div className="what-tags">WireGuard</div>
                <div className="what-tags">Linux</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>OBSERVABILITY & CI/CD</h3>
              <h4>Ensuring Uptime & Automation</h4>
              <p>
                Implementing deep eBPF-based monitoring, building CI/CD pipelines, and driving GitOps workflows for zero-downtime releases.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Prometheus</div>
                <div className="what-tags">Grafana</div>
                <div className="what-tags">GitHub Actions</div>
                <div className="what-tags">ArgoCD</div>
                <div className="what-tags">Helm</div>
                <div className="what-tags">ELK Stack</div>
                <div className="what-tags">Jenkins</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 2)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>PLATFORM ENGINEERING</h3>
              <h4>Developer Productivity & IDPs</h4>
              <p>
                Building internal developer platforms (IDP) to empower engineers with self-service infrastructure, reducing lead time and cognitive load.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Backstage</div>
                <div className="what-tags">Crossplane</div>
                <div className="what-tags">Internal Tooling</div>
                <div className="what-tags">API Design</div>
                <div className="what-tags">Go</div>
                <div className="what-tags">CoreDNS</div>
                <div className="what-tags">Istio</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 3)}
          >
            <div className="what-border1">
              <svg height="100%">
                <line
                  x1="0"
                  y1="100%"
                  x2="100%"
                  y2="100%"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
              </svg>
            </div>
            <div className="what-corner"></div>
            <div className="what-content-in">
              <h3>SECURITY & COMPLIANCE</h3>
              <h4>DevSecOps & Zero Trust</h4>
              <p>
                Integrating security into every stage of the lifecycle. Implementing vulnerability scanning, secrets management, and zero-trust mesh.
              </p>
              <h5>Skillset & tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">HashiCorp Vault</div>
                <div className="what-tags">Trivy</div>
                <div className="what-tags">Falco</div>
                <div className="what-tags">OPA</div>
                <div className="what-tags">RBAC</div>
                <div className="what-tags">Networking</div>
                <div className="what-tags">Linkerd</div>
              </div>
              <div className="what-arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);

    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}
