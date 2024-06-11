import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Head } from '@laravext/react';

export default () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/projects')
            .then(response => {
                setProjects(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Head title="Our Projects" />
            {loading ? (
                <div className="flex justify-center items-center min-h-[70vh] mt-6">
                    Loading...
                </div>
            ) : (
                <div className="flex justify-center items-center min-h-[70vh] mt-6">
                    <div>
                        <h3 className="text-2xl mb-2">Our projects...</h3>
                        <ul>
                            {projects.map(project => (
                                <li key={project.id}>
                                    {project.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};
