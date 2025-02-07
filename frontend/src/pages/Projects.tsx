import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import '../css/Projects.css';
import "../App.css";
interface Project {
    id: number | null;
    projectId: string;
    name: string;
    description: string;
    technologies: string;
    link: string;
    image: string;
}

const Projects: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState<boolean>(false);
    const [showAddProjectModal, setShowAddProjectModal] = useState<boolean>(false);
    const [showUpdateProjectModal, setShowUpdateProjectModal] = useState<boolean>(false);
    const [updateProject, setUpdateProject] = useState<Project | null>(null);
    const [newProject, setNewProject] = useState({
        name: "",
        description: "",
        technologies: "",
        link: "",
        image: "",
    });
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("adminToken");
        setIsAdmin(!!token); // True if token exists

        fetch("http://localhost:8080/api/projects")
            .then((response) => response.json())
            .then((data) => {
                // Ensure each project has a unique id fallback if id is missing
                const processedData = data.map((project: Project, index: number) => ({
                    ...project,
                    id: project.id ?? index, // Use index as fallback for missing id
                }));
                setProjects(processedData);
            })
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

    const handleDeleteClick = (projectId: string) => {
        setDeleteProjectId(projectId);
        setShowDeleteSuccess(false); // Reset success message
    };

    const confirmDeleteProject = async () => {
        if (!deleteProjectId) return;

        try {
            const response = await fetch(`http://localhost:8080/api/projects/${deleteProjectId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });

            if (response.ok) {
                setProjects((prevProjects) => prevProjects.filter((p) => p.projectId !== deleteProjectId));
                setShowDeleteSuccess(true); // Show success message
                setTimeout(() => {
                    setShowDeleteSuccess(false); // Hide success message
                    setDeleteProjectId(null); // Close modal
                }, 2000); // Auto-hide after 2 seconds
            }
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    };

    const handleAddProjectClick = () => {
        setShowAddProjectModal(true);
    };

    const handleCloseAddProjectModal = () => {
        setShowAddProjectModal(false);
        setNewProject({
            name: "",
            description: "",
            technologies: "",
            link: "",
            image: "",
        });
    };

    const handleUpdateClick = (project: Project) => {
        setUpdateProject(project);
        setShowUpdateProjectModal(true);
    };
    const handleCloseUpdateProjectModal = () => {
        setShowUpdateProjectModal(false);
        setUpdateProject(null);
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (showUpdateProjectModal) {
            setUpdateProject((prev) => prev ? { ...prev, [e.target.name]: e.target.value } : null);
        } else {
            setNewProject({ ...newProject, [e.target.name]: e.target.value });
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (showUpdateProjectModal) {
                    setUpdateProject((prev) => prev ? { ...prev, image: reader.result as string } : null);
                } else {
                    setNewProject((prev) => ({ ...prev, image: reader.result as string }));
                }
            };
        }
    };

    const handleAddProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
                },
                body: JSON.stringify(newProject),
            });

            if (response.ok) {
                const addedProject = await response.json();
                setProjects([...projects, addedProject]);
                handleCloseAddProjectModal();
            }
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    const handleUpdateProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!updateProject) return;

        try {
            const response = await fetch(`http://localhost:8080/api/projects/${updateProject.projectId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
                },
                body: JSON.stringify(updateProject),
            });

            if (response.ok) {
                setProjects((prevProjects) =>
                    prevProjects.map((p) => (p.projectId === updateProject.projectId ? updateProject : p))
                );
                handleCloseUpdateProjectModal();
            }
        } catch (error) {
            console.error("Error updating project:", error);
        }
    };

    return (
        <div className="projects">
            <h1>Projects</h1>


            {isAdmin && (
                <button className="btn-add" onClick={handleAddProjectClick}>
                    Add New Project
                </button>
            )}

            <ul>
                {projects.map((project) => (
                    <li key={project.projectId}> {/* Use id or a fallback */}
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

                            {project.name === "Client Management and Billing System" && (
                                <a
                                    href="http://app.compteexpress.com/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-external"
                                >
                                    Deployment
                                </a>
                            )}

                            {isAdmin && (
                                <>
                                    <button className="btn-update" onClick={() => handleUpdateClick(project)}>
                                        Update
                                    </button>
                                    <button className="btn-delete" onClick={() => handleDeleteClick(project.projectId)}>
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {showAddProjectModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Create New Project</h2>
                        <form onSubmit={handleAddProjectSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" value={newProject.name} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" value={newProject.description} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>Technologies</label>
                                <input type="text" name="technologies" value={newProject.technologies} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>GitHub Link</label>
                                <input type="text" name="link" value={newProject.link} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>Upload Image</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>

                            <div className="form-buttons">
                                <button type="button" className="btn-close" onClick={handleCloseAddProjectModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-save">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showUpdateProjectModal && updateProject && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Update Project</h2>
                        <form onSubmit={handleUpdateProjectSubmit}>

                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" name="name" value={updateProject.name} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea name="description" value={updateProject.description} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>Technologies</label>
                                <input type="text" name="technologies" value={updateProject.technologies} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>GitHub Link</label>
                                <input type="text" name="link" value={updateProject.link} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>Upload Image</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>

                            <div className="form-buttons">
                                <button type="button" className="btn-close" onClick={handleCloseUpdateProjectModal}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn-save">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {selectedProject && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{selectedProject.name}</h2>
                        <p>
                            <strong>Description:</strong> {selectedProject.description}
                        </p>
                        <p>
                            <strong>Technologies:</strong> {selectedProject.technologies}
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

            {deleteProjectId !== null && (
                <div className="modal-overlay">
                    <div className="modal">
                        {!showDeleteSuccess ? (
                            <>
                                <h2>Confirm Deletion</h2>
                                <p>Are you sure you want to delete this project?</p>
                                <button className="btn-save" onClick={confirmDeleteProject}>
                                    Yes, Delete
                                </button>
                                <button className="btn-close" onClick={() => setDeleteProjectId(null)}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <h2>Project deleted successfully!</h2>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
