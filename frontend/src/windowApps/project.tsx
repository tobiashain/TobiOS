import { projects } from "./projects";
import Chip from "../shared/chip";
import ImageGrid from "./imageGrid";
import "./project.scss";

export default function Project({ windowId }: { windowId: string }) {
  const project = projects.find((project) => {
    return project.id === windowId;
  });
  if (!project) return <div>No Project found</div>;

  return (
    <>
      <div className="window-project">
        <aside className="window-project__images">
          <ImageGrid images={project.images} />
        </aside>
        <main>
          <header>
            <h1 className="window-project__title">{project.title}</h1>
            <h2 className="window-project__subtitle">{project.subTitle}</h2>
          </header>
          <section>
            <h3>Context & Motivation</h3>
            <div className="window-project__context">{project.context}</div>
          </section>
          <section>
            <h3>Technologies Used</h3>
            <div className="window-project__technologies">
              <div className="chips">
                {project.chips.map((text, index) => {
                  return <Chip key={index} text={text} image="" />;
                })}
              </div>
            </div>
          </section>
          <section>
            <h3>Key Features</h3>
            <ul className="window-project_features">
              {project.features.map((feature, index) => {
                return (
                  <li key={index} className="window-project__feature">
                    {feature}
                  </li>
                );
              })}
            </ul>
          </section>
          <div className="window-project__buttons">
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
