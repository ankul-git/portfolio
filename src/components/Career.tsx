import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>DevOps Engineer</h4>
                <h5>Quest Integrity Services</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Provisioned and managed infrastructure using Terraform. Built CI/CD pipelines using GitHub Actions. Demonstrated robust monitoring with Prometheus and Grafana. Handled deployments via Helm and enforced strict IAM security policies.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Site Reliability Engineer</h4>
                <h5>Alyssum Global Services</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Led AWS + Kubernetes production deployment serving 1M+ daily users with zero-downtime CI/CD. Implemented eBPF-based real-time monitoring using Grafana & Prometheus and automated reporting via Python.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
