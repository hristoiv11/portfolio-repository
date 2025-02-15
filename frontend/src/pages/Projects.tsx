import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import '../css/Projects.css';
import "../App.css";
import i18n from "../i18n";
import {useTranslation} from "react-i18next";
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
    const { t } = useTranslation();
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


    /*
    useEffect(() => {
        const lang = i18n.language; // ✅ Get the current language dynamically

        const token = localStorage.getItem("adminToken");
        setIsAdmin(!!token); // ✅ True if token exists

        fetch(`http://localhost:8080/api/projects?lang=${lang}`) // ✅ Fetch projects based on language
            .then((response) => response.json())
            .then((data) => {
                const processedData = data.map((project: Project, index: number) => ({
                    ...project,
                    id: project.id ?? index,
                    name: lang === "fr" ? project.nameFr : project.nameEn,
                    description: lang === "fr" ? project.descriptionFr : project.descriptionEn // ✅ Select the correct description
                }));
                setProjects(processedData);
            })
            .catch((error) => {
                console.error(t("fetchProjectsError"), error);
            });
    }, [i18n.language]); // ✅ Re-fetch when the language changes


     */

    useEffect(() => {
        fetchProjects(); // ✅ Calls the function when language changes
    }, [i18n.language]); // ✅ Re-fetch when the language changes


    const fetchProjects = () => {
        const lang = i18n.language; // ✅ Get the current language dynamically

        const token = localStorage.getItem("adminToken");
        setIsAdmin(!!token); // ✅ True if token exists

        fetch(`http://localhost:8080/api/projects?lang=${lang}`) // ✅ Fetch projects based on language
            .then((response) => response.json())
            .then((data) => {
                const processedData = data.map((project: Project, index: number) => ({
                    ...project,
                    id: project.id ?? index,
                    name: lang === "fr" ? project.nameFr : project.nameEn,
                    description: lang === "fr" ? project.descriptionFr : project.descriptionEn // ✅ Select the correct description
                }));
                setProjects(processedData);
            })
            .catch((error) => {
                console.error(t("fetchProjectsError"), error);
            });
    };


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
            console.error(t("deleteProjectFailure"), error);
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

        const lang = i18n.language; // ✅ Get the current language dynamically

        const newProjectData = {
            nameEn: newProject.name,  // ✅ Always store both names
            nameFr: newProject.name,  // ✅ Use the same value initially
            descriptionEn: newProject.description,  // ✅ Store both descriptions
            descriptionFr: newProject.description,
            technologies: newProject.technologies,
            link: newProject.link,
            image: newProject.image
        };

        try {
            const response = await fetch("http://localhost:8080/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
                },
                body: JSON.stringify(newProjectData),
            });

            if (!response.ok) {
                throw new Error("Failed to add project");
            }

            console.log("Newly added project:", newProjectData); // ✅ Debugging log

            // ✅ Fetch the updated list from the backend immediately
            fetchProjects();

            // ✅ Close modal
            handleCloseAddProjectModal();
        } catch (error) {
            console.error("Error adding project:", error);
        }
    };

    /*
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

     */

    const handleUpdateProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!updateProject) return;

        const lang = i18n.language; // ✅ Get the current language dynamically

        // ✅ Keep the existing image if not changed
        const updateData = {
            image: updateProject.image,
            nameEn: lang === "en" ? updateProject.name : updateProject.nameEn, // ✅ Update only English if selected
            nameFr: lang === "fr" ? updateProject.name : updateProject.nameFr,
            descriptionEn: lang === "en" ? updateProject.description : updateProject.descriptionEn, // ✅ Update only English if selected
            descriptionFr: lang === "fr" ? updateProject.description : updateProject.descriptionFr, // ✅ Update only French if selected
            technologies: updateProject.technologies,
            link: updateProject.link,
        };

        try {
            const response = await fetch(`http://localhost:8080/api/projects/${updateProject.projectId}?lang=${lang}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
                },
                body: JSON.stringify(updateData),
            });

            if (!response.ok) {
                throw new Error(`${t("httpError").replace("{status}", response.status.toString())}`);
            }

            const updatedProject = await response.json();

            setProjects((prevProjects) =>
                prevProjects.map((p) => (p.projectId === updateProject.projectId ? {
                    ...p,
                    image: updatedProject.image,
                    description: lang === "fr" ? updatedProject.descriptionFr : updatedProject.descriptionEn, // ✅ Keep updated text
                    name: lang === "fr" ? updatedProject.nameFr : updatedProject.nameEn, // ✅ Keep updated text
                    technologies: updatedProject.technologies,
                    link: updatedProject.link,
                } : p))
            );

            setShowUpdateProjectModal(false);
            console.log(t("updateSuccess")); // ✅ Log success message
        } catch (error) {
            console.error(t("updateFailure"), error);
        }
    };


    return (
        <div className="projects">
            <h1>{t("projectsTitle")}</h1>


            {isAdmin && (
                <button className="btn-add" onClick={handleAddProjectClick}>
                    {t("addNewProject")}
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
                                {t("viewDetails")}
                            </button>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn"
                            >
                                {t("githubProject")}
                            </a>

                            {project.name === "Client Management and Billing System" && (
                                <a
                                    href="http://app.compteexpress.com/login"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-external"
                                >
                                    {t("deploymentProject")}
                                </a>
                            )}

                            {isAdmin && (
                                <>
                                    <button className="btn-update" onClick={() => handleUpdateClick(project)}>
                                        {t("updateProject")}
                                    </button>
                                    <button className="btn-delete" onClick={() => handleDeleteClick(project.projectId)}>
                                        {t("deleteProject")}
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
                        <h2>{t("createProjectTitle")}</h2>
                        <form onSubmit={handleAddProjectSubmit}>
                            <div className="form-group">
                                <label>{t("projectName")}</label>
                                <input type="text" name="name" value={newProject.name} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>{t("projectDescription")}</label>
                                <textarea name="description" value={newProject.description} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>{t("projectTechnologies")}</label>
                                <input type="text" name="technologies" value={newProject.technologies} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>{t("projectGithubLink")}</label>
                                <input type="text" name="link" value={newProject.link} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>{t("projectUploadImage")}</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>

                            <div className="form-buttons">
                                <button type="button" className="btn-close" onClick={handleCloseAddProjectModal}>
                                    {t("cancelProject")}
                                </button>
                                <button type="submit" className="btn-save">{t("saveProject")}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showUpdateProjectModal && updateProject && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{t("updateProjectTitle")}</h2>
                        <form onSubmit={handleUpdateProjectSubmit}>

                            <div className="form-group">
                                <label>{t("projectName")}</label>
                                <input type="text" name="name" value={updateProject.name} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>{t("projectDescription")}</label>
                                <textarea name="description" value={updateProject.description} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>{t("projectTechnologies")}</label>
                                <input type="text" name="technologies" value={updateProject.technologies} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>{t("projectGithubLink")}</label>
                                <input type="text" name="link" value={updateProject.link} onChange={handleInputChange} required />
                            </div>

                            <div className="form-group">
                                <label>{t("projectUploadImage")}</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>

                            <div className="form-buttons">
                                <button type="button" className="btn-close" onClick={handleCloseUpdateProjectModal}>
                                    {t("cancelProject")}
                                </button>
                                <button type="submit" className="btn-save">{t("updateProject")}</button>
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
                            <strong>{t("projectDescription")}:</strong> {selectedProject.description}
                        </p>
                        <p>
                            <strong>{t("projectTechnologies")}:</strong> {selectedProject.technologies}
                        </p>
                        <button
                            className="btn-close"
                            onClick={handleCloseModal}
                        >
                            {t("close")}
                        </button>
                    </div>
                </div>
            )}

            {deleteProjectId !== null && (
                <div className="modal-overlay">
                    <div className="modal">
                        {!showDeleteSuccess ? (
                            <>
                                <h2>{t("confirmDeleteTitleProject")}</h2>
                                <p>{t("confirmDeleteProject")}</p>
                                <button className="btn-save" onClick={confirmDeleteProject}>
                                    {t("yesDeleteProject")}
                                </button>
                                <button className="btn-close" onClick={() => setDeleteProjectId(null)}>
                                    {t("cancelProject")}
                                </button>
                            </>
                        ) : (
                            <h2>{t("deleteProjectSuccess")}</h2>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Projects;
