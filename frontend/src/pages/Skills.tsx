import React from 'react';
import "../App.css";


const Skills: React.FC = () => {
    const skills = {
        languages: ['Java', 'JavaScript', 'C#', 'TypeScript', 'Python'],
        frameworks: ['Spring Boot', 'React', 'ASP.NET Core'],
        tools: ['Docker', 'Git', 'Jira', 'Figma'],
        databases: ['MySQL', 'PostgreSQL', 'MongoDB'],
    };

    return (
        <div className="skills">
            <h1>Skills</h1>
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
                    {skills.databases.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Skills;
