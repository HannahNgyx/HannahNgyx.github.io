import { T, Var } from "gt-react";

export function Work() {
  return (
    <section className="sheet band" id="work" aria-labelledby="experience-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow"><T>Work</T></p>
          <h2 id="experience-title"><T>Where the work has lived</T></h2>
        </div>
        <p className="section-note">
          <T>
            <Var name="azimuth">Azimuth</Var> and <Var name="tarmac">Tarmac</Var> are both current. <Var name="zyro">Zyro</Var> and <Var name="mitek">MiTek</Var> are the chapters just before them.
          </T>
        </p>
      </div>
      <ol className="jobs">
        <li className="job">
          <div className="job-meta">
            <p className="job-when">June 2026 – Present</p>
            <p className="job-where"><T>Bay Area, USA</T></p>
          </div>
          <div className="job-body">
            <p className="job-place">Azimuth Industrial Co.</p>
            <h3><T>Software Developer</T></h3>
            <ul>
              <li><T>Engineered an RFQ workflow platform in Python and Flask, with FileMaker and Microsoft 365, for 10+ users. It handles about 20–25 RFQs a month and saves roughly 8 hours a week of manual tracking.</T></li>
              <li><T>Built a cross-company scheduling and ledger platform in Python, React, and TypeScript that turns multi-hour meeting coordination and manual credit tracking into about 10-minute workflows.</T></li>
              <li><T>Shipped a CMMC-compliant, on-premise AI knowledge platform with Python, PostgreSQL, Docker, and local models, cutting retrieval from 15–30 minutes to under 2 minutes.</T></li>
            </ul>
          </div>
        </li>
        <li className="job">
          <div className="job-meta">
            <p className="job-when">May 2024 – Present</p>
            <p className="job-where"><T>Remote, USA</T></p>
          </div>
          <div className="job-body">
            <p className="job-place">Tarmac.IO</p>
            <h3><T>Software Developer</T></h3>
            <ul>
              <li><T>Investigated and resolved 100+ production issues across backend APIs, databases, and front-end clients, using logs, API responses, and telemetry. Repeat incidents dropped by about 20%.</T></li>
              <li><T>Debugged Rails services and PostgreSQL data pipelines so API behavior, data integrity, and 50,000+ energy certificate records stayed correct.</T></li>
              <li><T>Built CSV and PDF ingestion pipelines that cut manual data entry by 85% and improved throughput.</T></li>
            </ul>
          </div>
        </li>
        <li className="job">
          <div className="job-meta">
            <p className="job-when">July 2025 – Feb 2026</p>
            <p className="job-where"><T>New York City, USA</T></p>
          </div>
          <div className="job-body">
            <p className="job-place">Zyro Company</p>
            <h3><T>Founding Engineer</T></h3>
            <ul>
              <li><T>Prototyped AI onboarding and activation flows with Product and Design for demos and internal strategy. Internal testing showed about 25–35% better performance.</T></li>
              <li><T>Iterated those flows through early user sessions, improving perceived product value and lifting activation by about 40%.</T></li>
              <li><T>Connected the front end to FastAPI and Node.js for live demo data, and brought API latency down about 35% while debugging integrations with logs and telemetry.</T></li>
            </ul>
          </div>
        </li>
        <li className="job">
          <div className="job-meta">
            <p className="job-when">Dec 2023 – May 2024</p>
            <p className="job-where"><T>Ann Arbor, MI</T></p>
          </div>
          <div className="job-body">
            <p className="job-place">MiTek Company</p>
            <h3><T>Systems Integration Researcher</T></h3>
            <ul>
              <li><T>Coordinated integration across machine-learning models, embedded systems, and validation workflows, cutting integration and debug time by 30%.</T></li>
              <li><T>Built and evaluated computer-vision pipelines with Detectron2, Python, and C++, improving anomaly detection accuracy by 25%.</T></li>
            </ul>
          </div>
        </li>
      </ol>
      <p className="edu">
        <span><T>Education</T></span>
        <span>
          University of Michigan, Ann Arbor
          {" · "}
          <T>Bachelor of Science in Computer Science</T>
        </span>
      </p>
      <p className="toolkit">
        <strong><T>Toolkit</T></strong>
        <span>Python · TypeScript · JavaScript · SQL · C++ · Ruby · React · Flask · Ruby on Rails · PostgreSQL · MongoDB · FileMaker · Microsoft 365 · Docker · AWS · GitHub Actions</span>
      </p>
    </section>
  );
}
