export function CellAtlas() {
  const clusters = [
    { x: 165, y: 156, rx: 64, ry: 52, c: "#2a827e" },
    { x: 313, y: 118, rx: 62, ry: 42, c: "#78998a" },
    { x: 332, y: 257, rx: 84, ry: 57, c: "#86a5bb" },
    { x: 140, y: 309, rx: 52, ry: 62, c: "#ba9566" },
    { x: 420, y: 184, rx: 27, ry: 35, c: "#506e80" },
  ];
  return (
    <div className="atlas">
      <div className="atlas-top">
        <span className="micro">A CLOSER LOOK. A CLEARER QUESTION.</span>
        <span className="atlas-cross" aria-hidden="true">
          +
        </span>
      </div>
      <svg
        viewBox="0 0 540 420"
        role="img"
        aria-label="Abstract point clusters inspired by single-cell data; illustrative, not scientific results"
      >
        <defs>
          <pattern
            id="grid"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r=".8" fill="#c6d6d1" />
          </pattern>
        </defs>
        <rect width="540" height="420" fill="url(#grid)" />
        <path d="M55 65V365H482" fill="none" stroke="#c0cfc9" />
        <path
          d="M96 211C180 185 210 232 266 168S374 91 437 145M201 329C264 352 367 339 422 281"
          fill="none"
          stroke="#c1cfca"
          strokeDasharray="4 5"
        />
        {clusters.flatMap((g, j) =>
          Array.from({ length: 90 }, (_, i) => {
            const a = i * 2.39996 + j;
            const r = Math.sqrt((i + 0.5) / 90);
            return (
              <circle
                key={`${j}-${i}`}
                cx={g.x + Math.cos(a) * r * g.rx + Math.sin(i * 3) * 5}
                cy={g.y + Math.sin(a) * r * g.ry + Math.cos(i * 2) * 5}
                r={i % 7 === 0 ? 3.4 : 2.3}
                fill={g.c}
                opacity={0.45 + (i % 5) * 0.12}
              />
            );
          }),
        )}
        <circle
          cx="266"
          cy="213"
          r="81"
          fill="none"
          stroke="#457e70"
          strokeOpacity=".25"
        />
        <path d="M257 213h18M266 204v18" stroke="#2b665d" />
      </svg>
      <div className="atlas-bottom">
        <span>
          <i />
          Biological complexity. Human direction.
        </span>
        <span className="micro">ILLUSTRATIVE ATLAS</span>
      </div>
    </div>
  );
}
export function ArchitectureDiagram() {
  return (
    <div className="architecture">
      <div className="local-zone">
        <div className="zone-heading">
          <span className="eyebrow">On your computer</span>
          <span className="micro">LOCAL WORKSPACE</span>
        </div>
        <div className="architecture-flow">
          {[
            ["01", "Your scientific data", "Raw matrices & processed inputs"],
            [
              "02",
              "scRNA-agent workspace",
              "Your question, context & decisions",
            ],
            ["03", "R / Python analysis", "Local scientific computation"],
            ["04", "Project outputs", "Figures, tables, reports & provenance"],
          ].map(([n, t, d]) => (
            <div className="flow-step" key={n}>
              <span className="step-number">{n}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="local-note">
          <span aria-hidden="true">↳</span> Raw matrices and large scientific
          data stay here.
        </p>
      </div>
      <div className="core-connector" aria-hidden="true">
        <span>Guidance</span>
        <b>←</b>
      </div>
      <aside className="core-zone">
        <span className="core-symbol" aria-hidden="true">
          ✳
        </span>
        <p className="eyebrow">Connected service</p>
        <h3>Protected Core</h3>
        <p>
          Specialized guidance.
          <br />
          Continuously maintained.
        </p>
        <ul>
          <li>Workflow guidance</li>
          <li>Scientific skills</li>
          <li>Reusable experience</li>
          <li>Account & entitlement</li>
          <li>Workflow updates</li>
        </ul>
        <p className="core-note">The Core does not need your raw dataset.</p>
      </aside>
      <div className="model-note">
        <span className="micro">YOUR MODEL ACCESS</span>
        <p>
          Your own AI provider supports reasoning and execution. Shared context
          is subject to that provider’s policies.
        </p>
      </div>
    </div>
  );
}
export function WorkflowDiagram() {
  const phases = [
    [
      "01",
      "Start with the data",
      ["Data intake", "Quality control", "Filtering"],
    ],
    [
      "02",
      "Assess & prepare",
      ["Doublet detection", "Ambient RNA handling", "Dimensionality reduction"],
    ],
    [
      "03",
      "Resolve the biology",
      ["Batch / integration assessment", "Clustering", "Annotation"],
    ],
    [
      "04",
      "Explore & communicate",
      ["Differential analysis", "Pathway analysis", "Figures and reports"],
    ],
  ];
  return (
    <>
      <div className="workflow">
        {phases.map(([n, title, steps]) => (
          <article key={String(n)}>
            <span className="feature-index">{n}</span>
            <h3>{title}</h3>
            <ol>
              {(steps as string[]).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
      <p className="caption">
        An adaptable framework, not a fixed pipeline. The steps and methods
        depend on the dataset and biological question.
      </p>
    </>
  );
}
export function Outputs() {
  return (
    <div className="outputs-grid">
      {[
        [
          "01",
          "Figures & tables",
          "Visual summaries and tabular results for review and further exploration.",
          "figures/  ·  tables/",
        ],
        [
          "02",
          "Analysis & provenance",
          "Analysis artifacts, parameters, and records that keep the work traceable.",
          "artifacts/  ·  provenance/",
        ],
        [
          "03",
          "Summaries & reports",
          "Scientist-facing summaries alongside technical reports for deeper inspection.",
          "summaries/  ·  reports/",
        ],
      ].map(([n, t, d, f]) => (
        <article className="output-card" key={n}>
          <div className="file-illustration" aria-hidden="true">
            <span>{n}</span>
            <i />
            <i />
            <i />
          </div>
          <h3>{t}</h3>
          <p>{d}</p>
          <code>{f}</code>
        </article>
      ))}
      <p className="caption">
        Illustrative output categories. Contents depend on the analysis
        performed.
      </p>
    </div>
  );
}
