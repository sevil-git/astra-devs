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
          </div>
          <div className="project-composition">
            <div
              className="project-media"
              data-project-media={!mirror ? "" : undefined}
            >
              <div className="project-stage">
                <span className="project-stage-arch" aria-hidden="true" />
                <ProjectFilm key={project.film} name={project.name} film={project.film} poster={project.poster} url={project.url} mirror={mirror} />
              </div>
            </div>
            <div
              className="project-information"
              data-studio-enter={!mirror ? "" : undefined}
            >
              <h3 className="project-title">{project.name}</h3>
              <div className="project-description" data-mask="expand">
                <p className={mirror ? "project-copy-geometry" : undefined}>
                  {project.description}
                </p>
                {mirror && (
                  <p className="project-alternate-copy">{project.secret}</p>
                )}
              </div>
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
