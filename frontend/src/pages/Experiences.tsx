import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import {useTranslation} from "react-i18next";
interface Experience {
    id: number | null;
    experienceId: string;
    companyName: string;
    companyNameEn?: string;
    companyNameFr?: string;
    positionTitle: string;
    positionTitleEn?: string;
    positionTitleFr?: string;
    description: string;
    descriptionEn?: string;
    descriptionFr?: string;
    city: string;
    cityEn?: string;
    cityFr?: string;
    country: string;
    countryEn?: string;
    countryFr?: string;
    startDate: string; // ISO 8601 format (e.g., "2024-01-01")
    endDate: string;
    technologies: string;
    image: string;
    type: string;
    typeEn?: string;
    typeFr?: string;

}

const Experiences: React.FC = () => {
    const { t, i18n } = useTranslation();
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [deleteExperienceId, setDeleteExperienceId] = useState<string | null>(null);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState<boolean>(false);
    const [showAddExperienceModal, setShowAddExperienceModal] = useState<boolean>(false);
    const [showUpdateExperienceModal, setShowUpdateExperienceModal] = useState<boolean>(false);
    const [updateExperience, setUpdateExperience] = useState<Experience | null>(null);
    const [newExperience, setNewExperience] = useState({
        companyName: "",
        positionTitle: "",
        description: "",
        city: "",
        country: "",
        startDate: "",
        endDate: "",
        technologies: "",
        image: "",
        type: "",
    });
    const _navigate = useNavigate();
    console.log(_navigate)

    useEffect(() => {
        fetchExperiences(); // ✅ Calls the function when language changes
    }, [i18n.language]); // ✅ Re-fetch when the language changes


    const experiencesBackendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Experiences Backend URL:", experiencesBackendUrl);
    const fetchExperiences = () => {
        const lang = i18n.language; // ✅ Get the current language dynamically

        const token = localStorage.getItem("adminToken");
        setIsAdmin(!!token); // ✅ True if token exists

        const experiencesUrl = `${experiencesBackendUrl}api/experiences?lang=${lang}`;
        console.log("Fetching experiences from:", experiencesUrl);

        fetch(experiencesUrl)
            .then((response) => response.json())
            .then((data) => {
                const processedData = data.map((experience: Experience, index: number) => ({
                    ...experience,
                    id: experience.id ?? index,
                    companyName: lang === "fr" ? experience.companyNameFr : experience.companyNameEn,
                    positionTitle: lang === "fr" ? experience.positionTitleFr : experience.positionTitleEn,
                    description: lang === "fr" ? experience.descriptionFr : experience.descriptionEn,
                    city: lang === "fr" ? experience.cityFr : experience.cityEn,
                    country: lang === "fr" ? experience.countryFr : experience.countryEn,
                    type: lang === "fr" ? experience.typeFr : experience.typeEn,
                }));
                setExperiences(processedData);
            })
            .catch((error) => {
                console.error(t("fetchExperiencesError"), error);
            });
    };


    const handleViewDetails = (experience: Experience) => {
        setSelectedExperience(experience);
    };

    const handleCloseModal = () => {
        setSelectedExperience(null);
    };

    const handleDeleteClick = (experienceId: string) => {
        setDeleteExperienceId(experienceId);
        setShowDeleteSuccess(false); // Reset success message
    };

    const deleteBackendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Experiences Backend URL:", deleteBackendUrl);
    const confirmDeleteExperience = async () => {
        if (!deleteExperienceId) return;

        const deleteExperienceUrl = `${experiencesBackendUrl}api/experiences/${deleteExperienceId}`;
        console.log("Deleting experience from:", deleteExperienceUrl);

        try {
            const response = await fetch(deleteExperienceUrl, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
                },
            });

            if (response.ok) {
                setExperiences((prevExperiences) => prevExperiences.filter((p) => p.experienceId !== deleteExperienceId));
                setShowDeleteSuccess(true); // Show success message
                setTimeout(() => {
                    setShowDeleteSuccess(false); // Hide success message
                    setDeleteExperienceId(null); // Close modal
                }, 2000); // Auto-hide after 2 seconds
            }
        } catch (error) {
            console.error(t("deleteExperienceFailure"), error);
        }
    };

    const handleAddExperienceClick = () => {
        setShowAddExperienceModal(true);
    };

    const handleCloseAddExperienceModal = () => {
        setShowAddExperienceModal(false);
        setNewExperience({
            companyName: "",
            positionTitle: "",
            description: "",
            city: "",
            country: "",
            startDate: "",
            endDate: "",
            technologies: "",
            image: "",
            type: "",
        });
    };

    const handleUpdateClick = (experience: Experience) => {
        setUpdateExperience(experience);
        setShowUpdateExperienceModal(true);
    };
    const handleCloseUpdateExperienceModal = () => {
        setShowUpdateExperienceModal(false);
        setUpdateExperience(null);
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (showUpdateExperienceModal) {
            setUpdateExperience((prev) => prev ? { ...prev, [e.target.name]: e.target.value } : null);
        } else {
            setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (showUpdateExperienceModal) {
                    setUpdateExperience((prev) => prev ? { ...prev, image: reader.result as string } : null);
                } else {
                    setNewExperience((prev) => ({ ...prev, image: reader.result as string }));
                }
            };
        }
    };

    const addingBackendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Experiences Backend URL:", addingBackendUrl);
    const handleAddExperienceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const _lang = i18n.language;
        console.log(_lang);// ✅ Get the current language dynamically

        const newExperienceData = {
            companyNameEn: newExperience.companyName,  // ✅ Always store both names
            companyNameFr: newExperience.companyName,  // ✅ Use the same value initially
            positionTitleEn: newExperience.positionTitle,  // ✅ Store both titles
            positionTitleFr: newExperience.positionTitle,
            descriptionEn: newExperience.description,  // ✅ Store both descriptions
            descriptionFr: newExperience.description,
            cityEn: newExperience.city,  // ✅ Store both cities
            cityFr: newExperience.city,
            countryEn: newExperience.country,  // ✅ Store both countries
            countryFr: newExperience.country,
            startDate: newExperience.startDate,
            endDate: newExperience.endDate,
            technologies: newExperience.technologies,
            image: newExperience.image,
            typeEn: newExperience.type,
            typeFr: newExperience.type,
        };

        const addExperienceUrl = `${experiencesBackendUrl}api/experiences`;
        console.log("Adding experience to:", addExperienceUrl);

        try {
            const response = await fetch(addExperienceUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
                },
                body: JSON.stringify(newExperienceData),
            });

            if (!response.ok) {
                throw new Error("Failed to add experience");
            }

            console.log("Newly added experience:", newExperienceData); // ✅ Debugging log

            // ✅ Fetch the updated list from the backend immediately
            fetchExperiences();

            // ✅ Close modal
            handleCloseAddExperienceModal();
        } catch (error) {
            console.error("Error adding experience:", error);
        }
    };


    const updatingBackendUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("Experiences Backend URL:", updatingBackendUrl);
    const handleUpdateExperienceSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!updateExperience) return;

        const lang = i18n.language; // ✅ Get the current language dynamically

        // ✅ Keep the existing image if not changed
        const updateData = {
            image: updateExperience.image,
            companyNameEn: lang === "en" ? updateExperience.companyName : updateExperience.companyNameEn, // ✅ Update only English if selected
            companyNameFr: lang === "fr" ? updateExperience.companyName : updateExperience.companyNameFr,
            positionTitleEn: lang === "en" ? updateExperience.positionTitle : updateExperience.positionTitleEn, // ✅ Update only English if selected
            positionTitleFr: lang === "fr" ? updateExperience.positionTitle : updateExperience.positionTitleFr,
            descriptionEn: lang === "en" ? updateExperience.description : updateExperience.descriptionEn, // ✅ Update only English if selected
            descriptionFr: lang === "fr" ? updateExperience.description : updateExperience.descriptionFr,
            cityEn: lang === "en" ? updateExperience.city : updateExperience.cityEn,
            cityFr: lang === "fr" ? updateExperience.city : updateExperience.cityFr,
            countryEn: lang === "en" ? updateExperience.country : updateExperience.countryEn,
            countryFr: lang === "fr" ? updateExperience.country : updateExperience.countryFr,
            startDate: updateExperience.startDate,
            endDate: updateExperience.endDate,
            technologies: updateExperience.technologies,
            typeEn: lang === "en" ? updateExperience.type : updateExperience.typeEn,
            typeFr: lang === "fr" ? updateExperience.type : updateExperience.typeFr,
        };

        const updateExperienceUrl = `${experiencesBackendUrl}api/experiences/${updateExperience.experienceId}?lang=${lang}`;
        console.log("Updating experience at:", updateExperienceUrl);

        try {
            const response = await fetch(updateExperienceUrl, {
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

            const updatedExperience = await response.json();

            setExperiences((prevExperiences) =>
                prevExperiences.map((p) => (p.experienceId === updateExperience.experienceId ? {
                    ...p,
                    image: updatedExperience.image,
                    companyName: lang === "fr" ? updatedExperience.companyNameFr : updatedExperience.companyNameEn,
                    positionTitle: lang === "fr" ? updatedExperience.positionTitleFr : updatedExperience.positionTitleEn,
                    description: lang === "fr" ? updatedExperience.descriptionFr : updatedExperience.descriptionEn,
                    city: lang === "fr" ? updatedExperience.cityFr : updatedExperience.cityEn,
                    country: lang === "fr" ? updatedExperience.countryFr : updatedExperience.countryEn,
                    technologies: updatedExperience.technologies,
                    startDate: updatedExperience.startDate,
                    endDate: updatedExperience.endDate,
                    type: lang === "fr" ? updatedExperience.typeFr : updatedExperience.typeEn,
                } : p))
            );

            setShowUpdateExperienceModal(false);
            console.log(t("updateSuccess")); // ✅ Log success message
        } catch (error) {
            console.error(t("updateFailure"), error);
        }
    };


    return (
        <div className="experiences-section">
            <h1>{t("experiencesTitle")}</h1>


            {isAdmin && (
                <button className="experiences-btn-add" onClick={handleAddExperienceClick}>
                    {t("addNewExperience")}
                </button>
            )}

            <ul>
                {experiences.map((experience) => (
                    <li key={experience.experienceId}> {/* Use id or a fallback */}
                        <img
                            src={experience.image}
                            alt={experience.companyName}
                            className="experience-image"
                        />
                        <h2>{experience.companyName}</h2>
                        <div className="experience-buttons">
                            <button
                                className="experiences-btn"
                                onClick={() => handleViewDetails(experience)}
                            >
                                {t("viewDetailsExperience")}
                            </button>

                            {isAdmin && (
                                <>
                                    <button className="experiences-btn-update" onClick={() => handleUpdateClick(experience)}>
                                        {t("updateExperience")}
                                    </button>
                                    <button className="experiences-btn-delete" onClick={() => handleDeleteClick(experience.experienceId)}>
                                        {t("deleteExperience")}
                                    </button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {showAddExperienceModal && (
                <div className="experiences-modal-overlay">
                    <div className="experiences-modal">
                        <h2>{t("createExperienceTitle")}</h2>
                        <form onSubmit={handleAddExperienceSubmit}>
                            <div className="experiences-form-group">
                                <label>{t("experienceCompanyName")}</label>
                                <input type="text" name="companyName" value={newExperience.companyName} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experiencePosition")}</label>
                                <input type="text" name="positionTitle" value={newExperience.positionTitle} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceDescription")}</label>
                                <textarea name="description" value={newExperience.description} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceCity")}</label>
                                <input type="text" name="city" value={newExperience.city} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceCountry")}</label>
                                <input type="text" name="country" value={newExperience.country} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceStartDate")}</label>
                                <input type="date" name="startDate" value={newExperience.startDate} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceEndDate")}</label>
                                <input type="date" name="endDate" value={newExperience.endDate} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceTechnologies")}</label>
                                <input type="text" name="technologies" value={newExperience.technologies} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceUploadImage")}</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceType")}</label>
                                <input type="text" name="type" value={newExperience.type} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-buttons">
                                <button type="button" className="experiences-btn-close" onClick={handleCloseAddExperienceModal}>
                                    {t("cancelExperience")}
                                </button>
                                <button type="submit" className="experiences-btn-save">{t("saveExperience")}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showUpdateExperienceModal && updateExperience && (
                <div className="experiences-modal-overlay">
                    <div className="experiences-modal">
                        <h2>{t("updateExperienceTitle")}</h2>
                        <form onSubmit={handleUpdateExperienceSubmit}>

                            <div className="experiences-form-group">
                                <label>{t("experienceCompanyName")}</label>
                                <input type="text" name="companyName" value={updateExperience.companyName} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experiencePosition")}</label>
                                <input type="text" name="positionTitle" value={updateExperience.positionTitle} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceDescription")}</label>
                                <textarea name="description" value={updateExperience.description} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceCity")}</label>
                                <input type="text" name="city" value={updateExperience.city} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceCountry")}</label>
                                <input type="text" name="country" value={updateExperience.country} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceStartDate")}</label>
                                <input type="date" name="startDate" value={updateExperience.startDate} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceEndDate")}</label>
                                <input type="date" name="endDate" value={updateExperience.endDate} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceTechnologies")}</label>
                                <input type="text" name="technologies" value={updateExperience.technologies} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceUploadImage")}</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>

                            <div className="experiences-form-group">
                                <label>{t("experienceType")}</label>
                                <input type="text" name="type" value={updateExperience.type} onChange={handleInputChange} required />
                            </div>

                            <div className="experiences-form-buttons">
                                <button type="button" className="experiences-btn-close" onClick={handleCloseUpdateExperienceModal}>
                                    {t("cancelExperience")}
                                </button>
                                <button type="submit" className="experiences-btn-save">{t("updateExperience")}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {selectedExperience && (
                <div className="experiences-modal-overlay">
                    <div className="experiences-modal">
                        <h2>{selectedExperience.companyName}</h2>
                        <div className="experiences-detail-row">
                            <strong>{t("experiencePosition")}:</strong>
                            <span>{selectedExperience.positionTitle}</span>
                        </div>
                        <div className="experiences-detail-row">
                            <strong>{t("experienceDescription")}:</strong>
                            <span>{selectedExperience.description}</span>
                        </div>
                        <div className="experiences-detail-row">
                            <strong>{t("experienceCity")}:</strong>
                            <span>{selectedExperience.city}</span>
                        </div>
                        <div className="experiences-detail-row">
                            <strong>{t("experienceCountry")}:</strong>
                            <span>{selectedExperience.country}</span>
                        </div>
                        <div className="experiences-detail-row">
                            <strong>{t("experienceStartDate")}:</strong>
                            <span>{selectedExperience.startDate}</span>
                        </div>
                        <div className="experiences-detail-row">
                            <strong>{t("experienceEndDate")}:</strong>
                            <span>{selectedExperience.endDate}</span>
                        </div>
                        <div className="experiences-detail-row">
                            <strong>{t("experienceTechnologies")}:</strong>
                            <span>{selectedExperience.technologies}</span>
                        </div>
                        <div className="experiences-detail-row">
                            <strong>{t("experienceType")}:</strong>
                            <span>{selectedExperience.type}</span>
                        </div>
                        <button
                            className="experiences-btn-close"
                            onClick={handleCloseModal}
                        >
                            {t("closeExperience")}
                        </button>
                    </div>
                </div>
            )}

            {deleteExperienceId !== null && (
                <div className="experiences-modal-overlay">
                    <div className="experiences-modal">
                        {!showDeleteSuccess ? (
                            <div className="experiences-delete-content">
                                <h2>{t("confirmDeleteTitleExperience")}</h2>
                                <p>{t("confirmDeleteExperience")}</p>
                                <div className="experiences-delete-buttons">
                                    <button className="experiences-btn-save" onClick={confirmDeleteExperience}>
                                        {t("yesDeleteExperience")}
                                    </button>
                                    <button className="experiences-btn-close" onClick={() => setDeleteExperienceId(null)}>
                                        {t("cancelExperience")}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <h2>{t("deleteExperienceSuccess")}</h2>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Experiences;
