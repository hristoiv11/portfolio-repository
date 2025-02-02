import React, {useEffect, useState} from "react";
//import '../css/Skills.css';
import '../App.css';
interface Skills {
    skillId: string;
    languages: string[];
    frameworks: string[];
    tools: string[];
    databaseTechnologies: string[];
    methodologies: string[];
}


const Skills: React.FC = () => {
    const [skills, setSkills] = useState<Skills | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/skills/1") // Adjust the ID if necessary
            .then((response) => response.json())
            .then((data) => {
                // Convert comma-separated values into arrays
                setSkills({
                    skillId: data.skillId,
                    languages: data.languages ? data.languages.split(",").map((lang: string) => lang.trim()) : [],
                    frameworks: data.frameworks ? data.frameworks.split(",").map((fw: string) => fw.trim()) : [],
                    tools: data.tools ? data.tools.split(",").map((tool: string) => tool.trim()) : [],
                    databaseTechnologies: data.databaseTechnologies ? data.databaseTechnologies.split(",").map((db: string) => db.trim()) : [],
                    methodologies: data.methodologies ? data.methodologies.split(",").map((method: string) => method.trim()) : [],
                });
            })
            .catch((error) => {
                console.error("Error fetching skills:", error);
            });
    }, []);

    if (!skills) {
        return <p>Loading...</p>;
    }
    return (
        <div className="skills-page">
            <h1 className="skills-title">Skills</h1>
            <div className="skills">
                <div className="skill-category">
                    <h2>Programming Languages</h2>
                    <ul>
                        {skills.languages.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="skill-category">
                    <h2>Frameworks & Libraries</h2>
                    <ul>
                        {skills.frameworks.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="skill-category">
                    <h2>Tools & Technologies</h2>
                    <ul>
                        {skills.tools.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="skill-category">
                    <h2>Databases</h2>
                    <ul>
                        {skills.databaseTechnologies.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className="skill-category">
                    <h2>Methodologies</h2>
                    <ul>
                        {skills.methodologies.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Skills;
