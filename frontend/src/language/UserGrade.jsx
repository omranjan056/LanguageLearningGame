import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';  // Import useLocation from react-router-dom
import LanguageAPI from './LanguageAPI';
import { useParams } from 'react-router-dom';

const UserGrade = () => {

    const {leaderboard_id} = useParams();
    
    const [gradeData, setGradeData] = useState(null);

    useEffect(() => {
        const fetchGrade = async () => {
            try {
                const response = await LanguageAPI.getUserGrade(leaderboard_id);
                setGradeData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching user grade:", error);
            }
        };

        fetchGrade();
        
    }, []);

    return (
        <div>
            {gradeData ? (
                <div className='container my-5 shadow rounded p-5'>
                    <h3 className='text-center'>Marks: {gradeData.marks}</h3>
                    <h5 className='text-center'>Total Marks: {gradeData.total_marks}</h5>
                    <p className='text-center'>Time: {gradeData.last_graded_time}</p>
                </div>
            ) : (
                <p>Loading user grade...</p>
            )}
        </div>
    );
};

export default UserGrade;
