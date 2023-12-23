import axios from "axios";
// import { useMemo } from "react";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

class LanguageAPI {
    // static baseUrl = "http://127.0.0.1:8000/api";
    static baseUrl = "https://llgbackend.pythonanywhere.com/api";

    static async getLanguages() {
        try {
            const response = await axios.get(`${this.baseUrl}/languages`, null, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response;
        } catch (error) {
            console.error("Error in fetching languages", error);
            throw error;  // Rethrow the error to be caught by the calling component
        }
    }


    static async getQuestionSets(language_id) {
        try {
            const access_token = cookie.get('access_token');
            if (!access_token) {
                // Redirect to login page or handle authentication as needed
                console.error("Access token is missing");
                return null;
            }

            // console.log(access_token);

            const response = await axios.get(`${this.baseUrl}/question-sets/${language_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`,
                },
            });
            return response;
        } catch (error) {
            console.error("Error in fetching question sets");
            // throw error;
        }
    }


    static async getQuestionForSet(question_set_id) {
        try {
            const access_token = cookie.get("access_token");
            const response = await axios.get(`${this.baseUrl}/questions/${question_set_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`,
                }
            });
            return response;
        } catch (error) {
            console.log("Error in fetching quesions");
        }
    }

    static async submitAnswer(body) {
        try {
            // console.log(body);
            const access_token = cookie.get("access_token");
            const response = await axios.post(`${this.baseUrl}/submit-answers/`, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`,
                }
            });
            return response;
        } catch (error) {
            console.log("Error in submitting answer");
        }
    }

    static async getUserGrade(leaderboard_id) {
        try {
            const access_token = cookie.get("access_token");
            const response = await axios.get(`${this.baseUrl}/user-grade/${leaderboard_id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${access_token}`,
                }
            });
            return response;
        } catch (error) {
            console.log("Error in submitting answer");
        }

    }

    static async getLeaderboardData() {
        try {
            const response = await axios.get(`${this.baseUrl}/leaderboard`, null, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response;
        } catch (error) {
            console.log("Error in fetching leaderboard data");
        }

    }
};

export default LanguageAPI;
