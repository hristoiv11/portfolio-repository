import React, { useEffect, useState } from "react";

interface Project {
    id: number;
    name: string;
    description: string;
    technologies: string;
    link: string;
    image: string;
}

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/projects")
            .then((response) => response.json())
            .then((data) => setProjects(data))
            .catch((error) =>
                console.error("Error fetching projects:", error)
            );
    }, []);

    const handleViewDetails = (project: Project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
    };

    return (
        <div className="projects">
            <h1>Projects</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <img
                            src={project.image}
                            alt={project.name}
                            className="project-image"
                        />
                        <h2>{project.name}</h2>
                        <div className="project-buttons">
                            <button
                                className="btn"
                                onClick={() => handleViewDetails(project)}
                            >
                                View Details
                            </button>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn"
                            >
                                GitHub
                            </a>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedProject && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{selectedProject.name}</h2>
                        <p>
                            <strong>Description:</strong>{" "}
                            {selectedProject.description}
                        </p>
                        <p>
                            <strong>Technologies:</strong>{" "}
                            {selectedProject.technologies}
                        </p>
                        <button
                            className="btn-close"
                            onClick={handleCloseModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
