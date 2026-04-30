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
                <h4>Staff Engineer</h4>
                <h5>
                  <a
                    href="https://sbs-software.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sopra Banking Software
                  </a>
                </h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Working as a Staff Engineer at Sopra Banking Software (SBS) since 2021,
              leading architecture decisions, driving engineering standards, and
              delivering high-quality banking software solutions at scale.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Cyient</h5>
              </div>
              <h3>2019–2021</h3>
            </div>
            <p>
              Contributed to software engineering and delivery across enterprise
              projects, building scalable solutions and collaborating across
              cross-functional teams.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Codules Technology</h5>
              </div>
              <h3>2017–2019</h3>
            </div>
            <p>
              Worked on software development projects, contributing to the design
              and delivery of technology solutions across client engagements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
