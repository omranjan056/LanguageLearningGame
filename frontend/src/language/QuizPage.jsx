import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LanguageAPI from './LanguageAPI';

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState([]);
    const { language_id, question_set_id } = useParams();
    const navigate = useNavigate();

    const handleOptionChange = (question_id, option_id) => {
        // Find if the question already has an answer in the formData
        const existingAnswerIndex = formData.findIndex((item) => item.question_id === question_id);

        if (existingAnswerIndex !== -1) {
            // Update the existing answer
            const updatedFormData = [...formData];
            updatedFormData[existingAnswerIndex].option_id = option_id;
            setFormData(updatedFormData);
        } else {
            // Add a new answer
            setFormData((prevFormData) => [
                ...prevFormData,
                { question_id: question_id, option_id: option_id },
            ]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!language_id) {
            console.error("Language ID is missing.");
            return;
        }

        try {
            // console.log(formData);
            const response = await LanguageAPI.submitAnswer({
                language_id: language_id,
                question_set_id: question_set_id,
                answers: formData,
            });

            console.log(response.data);
            if(response.status === 200)
            {
                // navigate(`/languages/grade`);
                navigate(`/languages/grade/${response.data.id}`);

            }
            // Handle response accordingly, e.g., show results or navigate to a new page
        } catch (error) {
            console.error("Error submitting answers:", error);
        }
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await LanguageAPI.getQuestionForSet(question_set_id);
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchQuestions();
    }, [question_set_id]);

    return (
        <div className="container my-5">
            <form onSubmit={handleSubmit}>
                {questions && questions.map((question) => (
                    <div key={question.id} className="mb-4 card p-4 shadow rounded">
                        <div className='d-flex'>
                            <h3 className='m-2'>
                                {question.question}
                            </h3>
                            <p className='m-2'>
                                <span className='text-success m-2 p-2'>+{question.increment}</span>
                                <span className='text-danger m-2 p-2'>-{question.decrement}</span>
                            </p>
                        </div>
                        {question.options && question.options.map((option) => (
                            <div key={option.id} className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    name={`question_${question.id}`}
                                    value={option.id}
                                    checked={formData.some((item) => item.question_id === question.id && item.option_id === option.id)}
                                    onChange={() => handleOptionChange(question.id, option.id)}
                                />
                                <label className="form-check-label">{option.value}</label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Submit Answers</button>
            </form>
        </div>
    );
};

export default QuizPage;
