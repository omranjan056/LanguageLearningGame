import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LanguageAPI from "./LanguageAPI";

const LanguageList = () => {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await LanguageAPI.getLanguages();
                setLanguages(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching languages:", error);
                setLoading(false);
            }
        };

        fetchLanguages();
    }, []);

    return (
        <div className="container my-4">
            <h2 className="mb-4">Languages</h2>
            {loading ? (
                <p>Loading languages...</p>
            ) : (
                <ul className="list-group">
                    {languages.map((language) => (
                        <li key={language.id} className="list-group-item">
                            <Link to={`/languages/${language.id}`}>{language.language}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageList;
