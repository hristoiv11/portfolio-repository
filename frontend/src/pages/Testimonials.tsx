import React from 'react';
import "../App.css";


const Testimonials: React.FC = () => {
    const testimonials = [
        {
            name: 'Maria Escobito',
            role: 'Professor, Champlain College',
            feedback: 'Hristo consistently exceeded expectations in class projects and delivered quality results.',
        },
        {
            name: 'John Doe',
            role: 'Team Lead, Champlain Pet Clinic',
            feedback: 'Working with Hristo was a pleasure. His contributions to our microservices architecture were invaluable.',
        },
        {
            name: 'Emma Smith',
            role: 'Client, Billing System Project',
            feedback: 'Hristo’s attention to detail and professional demeanor made him stand out. I highly recommend him!',
        },
    ];

    return (
        <div className="testimonials">
            <h1>Testimonials</h1>
            <ul>
                {testimonials.map((testimonial, index) => (
                    <li key={index} className="testimonial-card">
                        <p>{testimonial.feedback}</p>
                        <h3>- {testimonial.name}</h3>
                        <p><em>{testimonial.role}</em></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Testimonials;
