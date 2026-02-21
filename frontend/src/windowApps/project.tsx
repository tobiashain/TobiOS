import { RenderProps } from "../window/renderMap";
import { projects } from "./projects";

export default function Project({ windowId }: { windowId: string }) {
  const project = projects.find((project) => {
    return project.id === windowId;
  });
  if (!project) return <div>No Project found</div>;

  return (
    <>
      <div className="project">
        <aside className="images"></aside>
        <main>
          <header>
            <h1 className="title">{project.title}</h1>
            <h2 className="sub-title">{project.subTitle}</h2>
          </header>
          <section>
            <h3>Context & Motivation</h3>
            <div className="context">{project.context}</div>
          </section>
          <section>
            <h3>Technologies Used</h3>
            <div className="technologies">
              {project.chips.map((chip, index) => {
                return (
                  <div key={index} className="chip">
                    {chip}
                  </div>
                );
              })}
            </div>
          </section>
          <section>
            <h3>Key Features</h3>
            <div className="features">
              {project.features.map((feature, index) => {
                return (
                  <div key={index} className="feature">
                    {feature}
                  </div>
                );
              })}
            </div>
          </section>
          <div className="btns">
            {project.website && (
              <a href={project.website} target="_blank">
                <button>Live Preview</button>
              </a>
            )}
            {project.sourceCode && (
              <a href={project.sourceCode} target="_blank">
                <button>Source Code</button>
              </a>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
