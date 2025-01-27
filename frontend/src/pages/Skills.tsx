import React from "react";
//import '../css/Skills.css';
import '../App.css';
const Skills: React.FC = () => {
    const skills = {
        languages: ['C#', 'Java', 'JavaScript', 'Python', 'Familiar with PHP'],
        frameworks: ['ASP.NET Core', 'MVC', 'Spring Boot', 'React'],
        tools: [
            'Docker',
            'Git',
            'GitHub',
            'Jira',
            'Figma',
            'Azure SQL',
            'Azure SQL Database',
            'DNS',
            'Firewalls'
        ],
        databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'MariaDB'],
        methodologies: ['Agile', 'Microservices', 'TDD', 'CI/CD', 'RESTful APIs'],
    };

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
                        {skills.databases.map((skill, index) => (
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
