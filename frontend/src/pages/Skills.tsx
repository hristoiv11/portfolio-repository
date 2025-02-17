import React, { useEffect, useState } from "react";
import "../App.css";
import {useTranslation} from "react-i18next";

interface Skills {
    skillId: string;
    languages: string;
    frameworks: string;
    tools: string;
    databaseTechnologies: string;
    methodologies: string;
}

const Skills: React.FC = () => {
    const { t } = useTranslation();
    const [skills, setSkills] = useState<Skills | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_selectedSkill, _setSelectedSkill] = useState<string>("");
    const [selectedSkillToUpdate, setSelectedSkillToUpdate] = useState<string>("");
    const [newSkillName, setNewSkillName] = useState<string>("");
    const [selectedSkillToDelete, setSelectedSkillToDelete] = useState<string>("");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_newSkill, _setNewSkill] = useState<{ category: string; skill: string }>({ category: "", skill: "" });
    const categoryNames: { [key: string]: string } = {
        languages: t("languagesSkill"),
        frameworks: t("frameworks"),
        tools: t("tools"),
        databaseTechnologies: t("databases"),
        methodologies: t("methodologies"),
    };

    const [_updateSkill, _setUpdateSkill] = useState<{ category: string; skill: string }>({ category: "", skill: "" });
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState<boolean>(false);

    useEffect(() => {

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        console.log("Skills Backend URL:", backendUrl);

        const token = localStorage.getItem("adminToken");
        setIsAdmin(!!token);

        const skillsUrl = `${backendUrl}api/skills/1`;
        console.log("Fetching skills from:", skillsUrl);

        fetch(skillsUrl)
            .then((response) => response.json())
            .then((data) => {
                setSkills({
                    skillId: data.skillId ?? "", // Default to empty string if undefined
                    languages: data.languages ?? "",
                    frameworks: data.frameworks ?? "",
                    tools: data.tools ?? "",
                    databaseTechnologies: data.databaseTechnologies ?? "",
                    methodologies: data.methodologies ?? "",
                });
            })
            .catch((error) => console.error("Error fetching skills:", error));
    }, []);


    const handleAddSkill = async () => {
        if (!selectedCategory || !newSkillName) {
            console.log("Category or Skill Name is missing.");
            return;
        }

        console.log("Adding Skill:", newSkillName, "to category:", selectedCategory);

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        console.log("Skills Backend URL:", backendUrl);

        const updatedSkills = {
            skillId: skills?.skillId,
            languages: selectedCategory === "languages"
                ? (skills?.languages ? `${skills.languages}, ${newSkillName}` : newSkillName)
                : skills?.languages || "",

            frameworks: selectedCategory === "frameworks"
                ? (skills?.frameworks ? `${skills.frameworks}, ${newSkillName}` : newSkillName)
                : skills?.frameworks || "",

            tools: selectedCategory === "tools"
                ? (skills?.tools ? `${skills.tools}, ${newSkillName}` : newSkillName)
                : skills?.tools || "",

            databaseTechnologies: selectedCategory === "databaseTechnologies"
                ? (skills?.databaseTechnologies ? `${skills.databaseTechnologies}, ${newSkillName}` : newSkillName)
                : skills?.databaseTechnologies || "",

            methodologies: selectedCategory === "methodologies"
                ? (skills?.methodologies ? `${skills.methodologies}, ${newSkillName}` : newSkillName)
                : skills?.methodologies || "",
        };

        console.log("Updated Skills Data:", updatedSkills);

        try {

            const skillsUrl = `${backendUrl}api/skills/${skills?.skillId}`;
            console.log("Sending request to:", skillsUrl);

            const response = await fetch(skillsUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
                body: JSON.stringify(updatedSkills),
            });

            console.log("Response Status:", response.status);

            if (response.ok) {
                setSkills(updatedSkills);
                console.log("Skill added successfully!");
                setShowAddModal(false);
            } else {
                console.error("Failed to add skill. Server responded with:", await response.text());
            }
        } catch (error) {
            console.error("Error adding skill:", error);
        }
    };

    const handleUpdateSkill = async () => {
        if (!selectedCategory || !selectedSkillToUpdate || !newSkillName) {
            console.error("Update failed: Missing required fields", {
                selectedCategory,
                selectedSkillToUpdate,
                newSkillName,
            });
            return;
        }

        console.log("Updating Skill:", {
            category: selectedCategory,
            oldSkill: selectedSkillToUpdate,
            newSkill: newSkillName,
        });

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        console.log("Skills Backend URL:", backendUrl);


        const updatedSkills = {
            skillId: skills?.skillId ?? "",
            languages: selectedCategory === "languages"
                ? skills?.languages.replace(selectedSkillToUpdate, newSkillName)
                : skills?.languages || "",

            frameworks: selectedCategory === "frameworks"
                ? skills?.frameworks.replace(selectedSkillToUpdate, newSkillName)
                : skills?.frameworks || "",

            tools: selectedCategory === "tools"
                ? skills?.tools.replace(selectedSkillToUpdate, newSkillName)
                : skills?.tools || "",

            databaseTechnologies: selectedCategory === "databaseTechnologies"
                ? skills?.databaseTechnologies.replace(selectedSkillToUpdate, newSkillName)
                : skills?.databaseTechnologies || "",

            methodologies: selectedCategory === "methodologies"
                ? skills?.methodologies.replace(selectedSkillToUpdate, newSkillName)
                : skills?.methodologies || "",
        };

        console.log("Updated Skills Data Before Sending:", updatedSkills);

        try {

            const skillsUrl = `${backendUrl}api/skills/${skills?.skillId}`;
            console.log("Sending request to:", skillsUrl);

            const response = await fetch(skillsUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
                body: JSON.stringify(updatedSkills), // ✅ Send as JSON
            });

            console.log("Response Status:", response.status);

            if (response.ok) {
                setSkills(updatedSkills);
                console.log("Skill updated successfully!");
                setShowUpdateModal(false);
            } else {
                const errorMessage = await response.text();
                console.error("Failed to update skill. Server responded with:", response.status, errorMessage);
            }
        } catch (error) {
            console.error("Error updating skill:", error);
        }
    };


    const confirmDeleteSkill = async () => {
        if (!selectedCategory || !selectedSkillToDelete) return;

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        console.log("Skills Backend URL:", backendUrl);

        try {
            const updatedSkills = {
                skillId: skills?.skillId ?? "",
                languages: selectedCategory === "languages"
                    ? skills?.languages.split(", ").filter(skill => skill !== selectedSkillToDelete).join(", ")
                    : skills?.languages || "",

                frameworks: selectedCategory === "frameworks"
                    ? skills?.frameworks.split(", ").filter(skill => skill !== selectedSkillToDelete).join(", ")
                    : skills?.frameworks || "",

                tools: selectedCategory === "tools"
                    ? skills?.tools.split(", ").filter(skill => skill !== selectedSkillToDelete).join(", ")
                    : skills?.tools || "",

                databaseTechnologies: selectedCategory === "databaseTechnologies"
                    ? skills?.databaseTechnologies.split(", ").filter(skill => skill !== selectedSkillToDelete).join(", ")
                    : skills?.databaseTechnologies || "",

                methodologies: selectedCategory === "methodologies"
                    ? skills?.methodologies.split(", ").filter(skill => skill !== selectedSkillToDelete).join(", ")
                    : skills?.methodologies || "",
            };

            const skillsUrl = `${backendUrl}api/skills/${skills?.skillId}`;
            console.log("Sending request to:", skillsUrl);

            const response = await fetch(skillsUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
                body: JSON.stringify(updatedSkills),
            });

            if (response.ok) {
                setSkills(updatedSkills);
                setShowDeleteSuccess(true);
                setTimeout(() => {
                    setShowDeleteSuccess(false);
                    setShowDeleteModal(false);
                }, 2000); //
            } else {
                console.error("Failed to delete skill. Server responded with:", await response.text());
            }
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };


    if (!skills) {
        return <p>Loading...</p>;
    }

    /*
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setNewSkill((prev) => ({ ...prev, [name]: value }));

        if (name === "category") {
            setSelectedCategory(value);
        } else if (name === "skill") {
            setNewSkillName(value);
        }
    };

     */

    const handleUpdateClick = (category: string) => {
        const skillList = skills?.[category as keyof Skills]?.split(", ") || [];

        if (skillList.length === 0) {
            console.error("No skills found in category:", category);
            return;
        }

        setSelectedCategory(category);
        setSelectedSkillToUpdate("");
        setNewSkillName("");

        console.log("Opening Update Modal with:", { category });

        setShowUpdateModal(true);
    };



    const handleDeleteClick = (category: string) => {
        const skillList = skills?.[category as keyof Skills]?.split(", ") || [];

        if (skillList.length === 0) {
            console.error("No skills found in category:", category);
            return;
        }

        setSelectedCategory(category);
        setSelectedSkillToDelete("");
        setDeleteConfirmation(false);
        setShowDeleteModal(true);
    };


    return (
        <div className="skills-page">
            <h1 className="skills-title">{t("skillsTitle")}</h1>

            {isAdmin && (
                <button
                    className="btn-add"
                    onClick={() => {
                        setSelectedCategory("");
                        setNewSkillName("");
                        setShowAddModal(true);
                    }}
                >
                    {t("addSkill")}
                </button>
            )}

            <div className="skills">
                {skills &&
                    Object.entries(skills).map(([category, skillsArray]) =>
                        category !== "skillId" ? (
                            <div key={category} className="skill-category">
                                <h2>{categoryNames[category] || category}</h2>
                                <ul>
                                    {skillsArray
                                        ? skillsArray.split(", ").map((skill: string, index: number) => (
                                            <li key={index}>{skill}</li>
                                        ))
                                        : null}
                                </ul>

                                {isAdmin && (
                                    <div className="skill-buttons-container">
                                        <button className="btn-update" onClick={() => handleUpdateClick(category)}>
                                            {t("updateSkill")}
                                        </button>
                                        <button className="btn-delete-skill" onClick={() => handleDeleteClick(category)}>
                                            {t("deleteSkill")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : null
                    )}
            </div>

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{t("addSkill")}</h2>
                        <form>
                            <div className="form-group">
                                <label>{t("selectCategory")}</label>
                                <select
                                    name="category"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">-- {t("selectCategory")}--</option>
                                    {Object.keys(categoryNames).map((key) => (
                                        <option key={key} value={key}>{categoryNames[key]}</option>
                                    ))}
                                </select>
                            </div>

                            {selectedCategory && (
                                <div className="form-group">
                                    <label>{t("newSkillName")}</label>
                                    <input
                                        type="text"
                                        name="skill"
                                        value={newSkillName}
                                        onChange={(e) => setNewSkillName(e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            <div className="form-buttons">
                                <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}>
                                    {t("cancelSkill")}
                                </button>
                                <button
                                    type="button"
                                    className="btn-save"
                                    onClick={handleAddSkill}
                                    disabled={!selectedCategory || !newSkillName}
                                >
                                    {t("saveSkill")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {showUpdateModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{t("updateSkill")}</h2>
                        <form>
                            <div className="form-group">
                                <label>{t("selectSkillToUpdate")}</label>
                                <select
                                    value={selectedSkillToUpdate}
                                    onChange={(e) => {
                                        setSelectedSkillToUpdate(e.target.value);
                                        setNewSkillName(e.target.value);
                                    }}
                                >
                                    <option value="">-- {t("selectSkill")} --</option>
                                    {skills[selectedCategory as keyof Skills]
                                        ?.split(", ")
                                        .map((skill, index) => (
                                            <option key={index} value={skill}>{skill}</option>
                                        ))}
                                </select>
                            </div>

                            {selectedSkillToUpdate && (
                                <div className="form-group">
                                    <label>{t("newSkillName")}</label>
                                    <input
                                        type="text"
                                        name="skill"
                                        value={newSkillName}
                                        onChange={(e) => setNewSkillName(e.target.value)}
                                        required
                                    />
                                </div>
                            )}

                            <div className="form-buttons">
                                <button type="button" className="btn-close" onClick={() => setShowUpdateModal(false)}>
                                    {t("cancelSkill")}
                                </button>
                                <button type="button" className="btn-save" onClick={handleUpdateSkill} disabled={!selectedSkillToUpdate}>
                                    {t("updateSkill")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        {!deleteConfirmation ? (
                            <>
                                <h2>{t("deleteSkill")}</h2>
                                <form>
                                    <div className="form-group">
                                        <label>{t("selectSkillToDelete")}</label>
                                        <select
                                            value={selectedSkillToDelete}
                                            onChange={(e) => setSelectedSkillToDelete(e.target.value)}
                                        >
                                            <option value="">-- {t("selectSkill")} --</option>
                                            {skills[selectedCategory as keyof Skills]
                                                ?.split(", ")
                                                .map((skill, index) => (
                                                    <option key={index} value={skill}>{skill}</option>
                                                ))}
                                        </select>
                                    </div>

                                    <div className="form-buttons">
                                        <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}>
                                            {t("cancelSkill")}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn-save"
                                            onClick={() => setDeleteConfirmation(true)}
                                            disabled={!selectedSkillToDelete}
                                        >
                                            {t("deleteSkill")}
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : !showDeleteSuccess ? (
                            <>
                                <h2>{t("confirmSkillDelete")}</h2>
                                <p>{t("confirmSkillDelete")} <strong>{selectedSkillToDelete}</strong>?</p>
                                <div className="form-buttons">
                                    <button className="btn-close" onClick={() => setDeleteConfirmation(false)}>
                                        {t("cancelSkill")}
                                    </button>
                                    <button className="btn-save" onClick={confirmDeleteSkill}>
                                        {t("yesDeleteSkill")}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <h2>{t("deleteSkillSuccess")}</h2>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Skills;
