import { projects } from "../data/projects";
import ProjectFilm from "./project-film";

export default function WorkShowcase({ mirror }: { mirror: boolean }) {
  return (
    <div className="project-gallery">
      {projects.map((project, index) => (
        <article
          className={`project-chapter project-${project.theme}`}
          key={project.name}
        >
          <div
            className="project-chapter-top"
            data-studio-enter={!mirror ? "" : undefined}
          >
            <span>
              0{index + 1} / {project.type}
            </span>
            <span>ASTRA DEVS — SELECTED WORK</span>
          </div>
          <div className="project-composition">
            <div
              className="project-media"
              data-project-media={!mirror ? "" : undefined}
            >
              <div className="project-stage">
                <span className="project-stage-arch" aria-hidden="true" />
                <ProjectFilm name={project.name} film={project.film} poster={project.poster} url={project.url} mirror={mirror} />
                <span className="project-stage-caption" aria-hidden="true">
                  {project.name} / EXPERIENCE IN MOTION
                </span>
              </div>
            </div>
            <div
              className="project-information"
              data-studio-enter={!mirror ? "" : undefined}
            >
              <h3 className="project-title">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {project.name}
                  <span aria-hidden="true">↗</span>
                </a>
              </h3>
              <p className="project-headline">{project.headline}</p>
              <div className="project-description" data-mask="expand">
                <p className={mirror ? "project-copy-geometry" : undefined}>
                  {project.description}
                </p>
                {mirror && (
                  <p className="project-alternate-copy">{project.secret}</p>
                )}
              </div>
              <ul
                className="project-tags"
                aria-label={`${project.name} project focus`}
              >
                {project.tags.split(" · ").map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a
                className="project-visit"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit website<span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
