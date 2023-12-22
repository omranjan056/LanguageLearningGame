import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LanguageAPI from "./LanguageAPI";

const LanguageSet = () => {
    const [sets, setSets] = useState([]);
    const [loading, setLoading] = useState(true);

    const {language_id} = useParams();

    useEffect(() => {
        const fetchSets = async () => {
            try {
                // console.log(language_id);
                const response = await LanguageAPI.getQuestionSets(language_id);
                setSets(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching sets:");
                setLoading(false);
            }
        };

        fetchSets();
    }, [language_id]);

    return (
        <div className="container my-4">
            <h2 className="mb-4">Sets for Language</h2>
            {loading ? (
                <p>Loading sets...</p>
            ) : (
                <ul className="list-group">
                    {sets.map((set) => (
                        <li key={set.id} className="list-group-item">
                            <Link to={`/languages/${language_id}/sets/${set.id}`}>{set.name}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LanguageSet;
