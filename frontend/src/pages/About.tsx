import React, { useEffect, useState } from "react";
import "../App.css";

interface AboutData {
    aboutId: string;
    image: string; // Holds the URL or Base64 string of the image
    description: string;
    languages: { name: string; flagUrl: string }[]; // Array of objects with name and flagUrl
}

const About: React.FC = () => {
    const [aboutData, setAboutData] = useState<AboutData | null>(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showAddLanguageModal, setShowAddLanguageModal] = useState(false);
    const [showDeleteLanguageModal, setShowDeleteLanguageModal] = useState(false);
    const [newDescription, setNewDescription] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [newLanguage, setNewLanguage] = useState<string>("");
    const [newFlagUrl, setNewFlagUrl] = useState<string>("");
    const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
    const [selectedLanguageToDelete, setSelectedLanguageToDelete] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState<boolean>(false);

    useEffect(() => {

        const token = localStorage.getItem("adminToken");
        setIsAdmin(!!token); // True if token exists

        fetch("http://localhost:8080/api/about/1")
            .then((response) => response.json())
            .then((data) => {
                let languagesArray: { name: string; flagUrl: string }[] = [];

                try {
                    const parsedFlags = JSON.parse(data.flags || "{}");
                    languagesArray = Object.entries(parsedFlags).map(([name, flagUrl]) => ({
                        name: name as string,
                        flagUrl: typeof flagUrl === "string" ? flagUrl : ""
                    }));
                } catch (error) {
                    console.error("Error parsing flags JSON:", error);
                }

                setAboutData({
                    aboutId: data.aboutId,
                    image: data.image,
                    description: data.description,
                    languages: languagesArray
                });

                // ✅ Prefill the description when data is loaded
                setNewDescription(data.description);
            })
            .catch((error) => {
                console.error("Error fetching about data:", error);
            });
    }, []);



    if (!aboutData) {
        return <p>Loading...</p>; // Show a loading message while fetching data
    }

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleUpdateAbout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!aboutData) return;

        // Convert languages into a comma-separated string
        const languagesString = aboutData.languages.map(lang => lang.name).join(", ");

        // Convert flags back to a JSON object
        const flagsObject = aboutData.languages.reduce((acc, lang) => {
            acc[lang.name] = lang.flagUrl;
            return acc;
        }, {} as Record<string, string>);

        const updatedAbout = {
            aboutId: aboutData.aboutId,
            image: selectedImagePreview || aboutData.image, // ✅ Use Base64 preview if updated
            description: newDescription,
            languages: languagesString, // ✅ Send languages as a string
            flags: JSON.stringify(flagsObject), // ✅ Send flags in JSON format
        };

        try {
            const response = await fetch(`http://localhost:8080/api/about/${aboutData.aboutId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedAbout),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedData = await response.json();

            // ✅ Reconstruct languages array from string + flags
            const parsedLanguages = updatedData.languages.split(", ").map(name => ({
                name: name.trim(),
                flagUrl: JSON.parse(updatedData.flags)[name.trim()] || "", // ✅ Match flag URL
            }));

            setAboutData({
                aboutId: updatedData.aboutId,
                image: updatedData.image,
                description: updatedData.description,
                languages: parsedLanguages, // ✅ Preserve both names and flags
            });

            setShowUpdateModal(false);
            console.log("✅ About section updated successfully");
        } catch (error) {
            console.error("❌ Error updating about:", error);
        }
    };


    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setSelectedImage(file);
                setSelectedImagePreview(reader.result as string); // Store Base64 for preview & sending
            };
        }
    };



    // Handle adding a new language
    const handleAddLanguage = async () => {
        if (!newLanguage || !newFlagUrl) {
            console.error("Both language name and flag URL are required");
            return;
        }

        if (!aboutData) return;

        // Ensure that the new language does not already exist
        const isDuplicate = aboutData.languages.some(lang => lang.name.toLowerCase() === newLanguage.toLowerCase());
        if (isDuplicate) {
            console.error(`Language "${newLanguage}" already exists!`);
            return;
        }

        // Preserve existing flags & merge new flag correctly
        let existingFlags = {};
        try {
            existingFlags = JSON.parse(JSON.stringify(aboutData.languages.reduce((acc, lang) => {
                acc[lang.name] = lang.flagUrl;
                return acc;
            }, {} as Record<string, string>)));
        } catch (error) {
            console.error("Error parsing flags:", error);
        }

        // Add the new flag
        const updatedFlagsObject = { ...existingFlags, [newLanguage]: newFlagUrl };

        // ✅ Preserve the existing languages and add the new one
        const updatedLanguagesList = aboutData.languages.map(lang => lang.name);
        updatedLanguagesList.push(newLanguage);

        const updatedAbout = {
            aboutId: aboutData.aboutId,
            image: aboutData.image,
            description: aboutData.description,
            languages: updatedLanguagesList.join(", "), // ✅ Fix: Preserve languages
            flags: JSON.stringify(updatedFlagsObject) // ✅ Fix: Preserve all flags
        };

        try {
            const response = await fetch(`http://localhost:8080/api/about/${aboutData.aboutId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedAbout),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedData = await response.json();

            // ✅ Ensure all languages & flags are properly reconstructed
            let parsedFlags = {};
            try {
                parsedFlags = updatedData.flags ? JSON.parse(updatedData.flags) : {};
            } catch (error) {
                console.error("Error parsing flags from response:", error);
            }

            const parsedLanguages = Object.entries(parsedFlags).map(([name, flagUrl]) => ({
                name: name as string,
                flagUrl: typeof flagUrl === "string" ? flagUrl : ""
            }));

            setAboutData(prev => ({
                ...prev!,
                languages: parsedLanguages // ✅ Ensure flags and languages persist
            }));

            // ✅ Close the modal after adding successfully
            setShowAddLanguageModal(false);

            // ✅ Reset input fields
            setNewLanguage("");
            setNewFlagUrl("");

            console.log("✅ Language added successfully");
        } catch (error) {
            console.error("❌ Failed to add language:", error);
        }
    };

    const handleDeleteLanguageClick = (languageName: string) => {
        setSelectedLanguageToDelete(languageName);
        setDeleteConfirmation(true); // Show confirmation modal
        setShowDeleteSuccess(false); // Reset success message
    };

    const confirmDeleteLanguage = async () => {
        if (!selectedLanguageToDelete) return;

        try {
            const response = await fetch(`http://localhost:8080/api/about/${aboutData?.aboutId}/languages/${selectedLanguageToDelete}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("adminToken")}` },
            });

            if (response.ok) {
                setAboutData((prev) => ({
                    ...prev!,
                    languages: prev!.languages.filter(lang => lang.name !== selectedLanguageToDelete),
                }));

                // Show success message and auto-hide after 2 seconds
                setShowDeleteSuccess(true);
                setTimeout(() => {
                    setShowDeleteSuccess(false);
                    setDeleteConfirmation(false); // Close modal
                }, 2000);
            }
        } catch (error) {
            console.error("❌ Failed to delete language:", error);
        }
    };



    return (
        <div className="about">
            {/* About Section */}
            <div className="oval-container">
                <img src={aboutData.image} alt="About Me" className="about-image" />
                <h1>About Me</h1>
                <p>{aboutData.description}</p>
                {isAdmin && (
                    <button className="btn-update" onClick={() => setShowUpdateModal(true)}>
                        Update
                    </button>
                )}

            </div>

            {/* Languages Section */}
            <div className="languages-container">
                <h1>Languages</h1>
                <div className="languages">
                    <div className="languages">
                        {aboutData?.languages?.length ? (
                            aboutData.languages.map(({ name, flagUrl }, index) => (
                                <div key={`${name}-${index}`} className="language-item">
                                    <img src={flagUrl} alt={name} className="flag" />
                                    <p>{name}</p>

                                    {/* Only show delete button if Admin */}
                                    {isAdmin && (
                                        <button className="delete-btn" onClick={() => handleDeleteLanguageClick(name)}>X</button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No languages available</p>
                        )}

                    </div>


                </div>

                {isAdmin && (
                    <div className="language-buttons">
                        <button className="btn-add" onClick={() => setShowAddLanguageModal(true)}>Add Language</button>
                    </div>
                )}

            </div>

            {/* Update Modal */}
            {showUpdateModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Update About Section</h2>
                        <form onSubmit={handleUpdateAbout}>
                            <div className="form-group">
                                <label>New Profile Picture</label>
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-buttons">
                                <button type="button" className="btn-close" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                                <button type="submit" className="btn-save">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Add Language Modal */}
            {showAddLanguageModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Add Language</h2>
                        <form>
                            <div className="form-group">
                                <label>Language Name</label>
                                <input
                                    type="text"
                                    value={newLanguage}
                                    onChange={(e) => setNewLanguage(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Flag URL</label>
                                <input
                                    type="text"
                                    value={newFlagUrl}
                                    onChange={(e) => setNewFlagUrl(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-buttons">
                                <button type="button" className="btn-close" onClick={() => setShowAddLanguageModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn-save" onClick={handleAddLanguage}>
                                    Add
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

            {deleteConfirmation && (
                <div className="modal-overlay">
                    <div className="modal">
                        {!showDeleteSuccess ? (
                            <>
                                <h2>Confirm Deletion</h2>
                                <p>Are you sure you want to delete <strong>{selectedLanguageToDelete}</strong>?</p>
                                <div className="form-buttons">
                                    <button className="btn-close" onClick={() => setDeleteConfirmation(false)}>
                                        Cancel
                                    </button>
                                    <button className="btn-save" onClick={confirmDeleteLanguage}>
                                        Yes, Delete
                                    </button>
                                </div>
                            </>
                        ) : (
                            <h2>✅ Language deleted successfully!</h2>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default About;
