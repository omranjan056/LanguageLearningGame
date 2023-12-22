
// QuizPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LanguageAPI from './LanguageAPI';

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [formData, setFormData] = useState({});
    const { language_id, question_set_id } = useParams();

    const handleOptionChange = (question_id, option_id) => {
        setFormData({
            ...formData,
            [question_id]: option_id,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await LanguageAPI.submitAnwer(formData);

            console.log(response.data);
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
                // setLoading(false);
            } catch (error) {
                console.error("Error fetching questions:", error);
                // setLoading(false);
            }
        };

        fetchQuestions();
    }, [question_set_id]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {questions.map((question) => (
                    <div key={question.id}>
                        <p>{question.question}</p>
                        {question.options
                            .filter((option) => option.question_id === question.id)
                            .map((option) => (
                                <div key={option.id}>
                                    <input
                                        type="radio"
                                        name={`question_${question.id}`}
                                        value={option.id}
                                        checked={formData[question.id] === option.id}
                                        onChange={() => handleOptionChange(question.id, option.id)}
                                    />
                                    {option.value}
                                </div>
                            ))}
                        <hr />
                    </div>
                ))}
                <button type="submit">Submit Answers</button>
            </form>
        </div>
    );
};

export default QuizPage;



// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import LanguageAPI from "./LanguageAPI";

// const QuizPage = () => {
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [score, setScore] = useState(0);

//     const { language_id, question_set_id } = useParams();

//     useEffect(() => {
//         const fetchQuestions = async () => {
//             try {
//                 const response = await LanguageAPI.getQuestionForSet(question_set_id);
//                 setQuestions(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching questions:", error);
//                 setLoading(false);
//             }
//         };

//         fetchQuestions();
//     }, [question_set_id]);

//     const handleOptionSelect = (option) => {
//         setSelectedOption(option);
//     };

//     const handleNextQuestion = () => {
//         if (selectedOption) {
//             const currentQuestionData = questions[currentQuestion];
//             const increment = currentQuestionData.increment;
//             const decrement = currentQuestionData.decrement;

//             if (selectedOption === currentQuestionData.correctOption) {
//                 setScore(score + increment);
//             } else {
//                 setScore(score - decrement);
//             }

//             if (currentQuestion < questions.length - 1) {
//                 setCurrentQuestion(currentQuestion + 1);
//                 setSelectedOption(null);
//             } else {
//                 console.log("End of quiz");
//                 // Add logic to submit answers or navigate to results page
//             }
//         }
//     };

//     const handleSubmit = async () => {
//         try {
//             const response = await LanguageAPI.submitAnwer({
//                 language_id: language_id,  // Assuming language_id is the same for all questions
//                 question_set_id: question_set_id,
//                 answers: questions.map((q, index) => ({
//                     question_id: q.id,
//                     option_id: index === currentQuestion ? selectedOption.id : null,
//                 })),
//             });

//             console.log(response.data);
//             // Handle response accordingly, e.g., show results or navigate to a new page
//         } catch (error) {
//             console.error("Error submitting answers:", error);
//         }
//     };

//     return (
//         <div className="container my-4">
//             <h2 className="mb-4">Quiz for Set</h2>
//             {loading ? (
//                 <p>Loading questions...</p>
//             ) : (
//                 <div>
//                     <h4>Question {currentQuestion + 1}</h4>
//                     <p>{questions[currentQuestion].question}</p>
//                     <ul className="list-group">
//                         {questions[currentQuestion].options.map((option, index) => (
//                             <li
//                                 key={index}
//                                 className={`list-group-item ${selectedOption === option ? "active" : ""
//                                     }`}
//                                 onClick={() => handleOptionSelect(option)}
//                                 style={{ cursor: "pointer" }}
//                             >
//                                 {option}
//                             </li>
//                         ))}
//                     </ul>
//                     <div className="mt-3">
//                         {questions[currentQuestion].increment > 0 && (
//                             <p className="text-success">+{questions[currentQuestion].increment}</p>
//                         )}
//                         {questions[currentQuestion].decrement > 0 && (
//                             <p className="text-danger">-{questions[currentQuestion].decrement}</p>
//                         )}
//                     </div>
//                     <button
//                         className="btn btn-primary mt-3"
//                         onClick={handleNextQuestion}
//                         disabled={!selectedOption}
//                     >
//                         Next Question
//                     </button>
//                     {currentQuestion === questions.length - 1 && (
//                         <button
//                             className="btn btn-success mt-3 ml-2"
//                             onClick={handleSubmit}
//                             disabled={!selectedOption}
//                         >
//                             Submit
//                         </button>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default QuizPage;





////////Module



// modules={{
//     toolbar: [
//         ['bold', 'italic', 'underline', 'strike'], // toggled buttons
//         ['blockquote', 'code-block'],

//         [{ list: 'ordered' }, { list: 'bullet' }],
//         [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
//         [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
//         [{ direction: 'rtl' }], // text direction

//         [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],

//         [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//         [{ font: [] }],
//         [{ align: [] }],

//         ['clean'], // remove formatting button

//         ['link', 'image'], // link and image, video
//     ],
// }}




// import React, { useEffect, useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import BlogAPI from './BlogAPI'; // Update the path


const BlogHome2 = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch blogs when the component mounts
    const fetchBlogs = async () => {
      try {
        const response = await BlogAPI.getAllBlogs();
        // document.write(response[0].title);
        // console.log(response.data);
        setBlogs(response.data.results); // Assuming your API returns a paginated response
        setTotalPages(response.data.count);
      } catch (error) {
        console.error('Error fetching blogs:', error.message);
      }
    };

    fetchBlogs();
  }, []); // Run this effect only once when the component mounts

  const handlePageChange = (page) => {
    // You may want to add logic to fetch blogs for the selected page
    setCurrentPage(page);
  };

  return (
    <div>
      <Outlet />
      <div className='container my-5'>
        
        <h2>Welcome to the Blog</h2>
        <p>Explore our latest blog posts:</p>
        <ul>
          {blogs.map(blog => (
            <li key={blog.id}>
              <Link to={`/blog/post/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
        </ul>
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <span
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              style={{ cursor: 'pointer', margin: '0 5px', fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// export default BlogHome;



// BlogHome.js

// import React from 'react';
// // import { Link, Outlet } from 'react-router-dom';
// import img from '../static/images/logo512.png';

const BlogHome = () => {
  return (
    <div>
      <Outlet />
      <div className='container my-5'>
        <h2>Welcome to the Blog</h2>
        <p>Explore our latest blog posts:</p>
        <ul>
          <li><Link to="/blog/markdown">Markdown Editor</Link></li>
          <li><Link to="/blog/quill">Quill Editor</Link></li>
          {/* Add more blog post links as needed */}
        </ul>
        <img src={img} alt="Dummy image" />
      </div>
    </div>
  );
};

// export default BlogHome;


// Login.jsx

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import AuthAPI from './AuthAPI';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['access_token', 'refresh_token']);

    const submit = async (e) => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };

        try {
            const response = await AuthAPI.LoginUser(user);
            // console.log(response);
            setCookie('access_token', response.access);
            setCookie('refresh_token', response.refresh);
            navigate("/");
        } catch (error) {
            console.error("Error in token fetch: ", error.message);
        }
    };

    const handleReset = () => {
        setUsername('');
        setPassword('');
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await AuthAPI.checkAuthentication();
                // console.log(response);
                if (response.status == 200) {
                    navigate("/");
                }
            }
            catch (error) {
                console.log("Please login");
            }
        }
        checkAuth();
    }, [navigate]);


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center my-5">Sign In</h3>
                            <form onSubmit={submit}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        className="form-control my-2"
                                        placeholder="Enter Username"
                                        name="username"
                                        type="text"
                                        value={username}
                                        required
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control my-2"
                                        placeholder="Enter password"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="d-flex justify-content-center my-2">
                                    <button type="submit" className="btn btn-primary m-2">
                                        Submit
                                    </button>
                                    <button type="button" className="btn btn-danger m-2" onClick={handleReset}>
                                        Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-center bg-secondary rounded p-4 my-5'>
                <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="" />
            </div>
        </div>
    );
};

export default Login;


// AuthContext.jsx

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import AuthAPI from './AuthAPI';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AuthAPI.checkAuthentication()
            .then(() => setIsAuthenticated(true))
            .catch(() => setIsAuthenticated(false))
            .finally(() => setLoading(false));
    }, []);

    const login = async (credentials) => {
        try {
            await AuthAPI.LoginUser(credentials);
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        }
    };

    const signup = async (userData) => {
        try {
            await AuthAPI.SignupUser(userData);
            setIsAuthenticated(true);
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AuthAPI.logoutUser();
            setIsAuthenticated(false);
        } catch (error) {
            throw error;
        }
    };

    const value = {
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};





// Signup page



// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthAPI from './AuthAPI';

const Signup = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform password match validation
        if (user.password !== user.password2) {
            alert('Passwords do not match!');
            return;
        }

        // Make API call to create a new user
        try {
            const response = AuthAPI.SignupUser(user);
            console.log(response);
            navigate('/user/login'); // Redirect to login page after successful signup
        } catch (error) {
            if (error.response) {
                console.error('Server responded with status:', error.response.status);
                console.error('Error details:', error.response.data);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error during request setup:', error.message);
            }
        }
    };

    const handleReset = () => {
        setUser({
            username: '',
            email: '',
            password: '',
            password2: '',
            first_name: '',
            last_name: '',
        });
    }

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await AuthAPI.checkAuthentication();
                if (response.status == 200) {
                    navigate("/");
                }
            }
            catch (error) {
                console.log("Please login");
            }
        }
        checkAuth();
    }, [navigate]);

    return (

        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-3">Sign Up</h3>
                            {alertMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {alertMessage}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        value={user.first_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="last_name"
                                        value={user.last_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={user.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={user.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password2"
                                        value={user.password2}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="d-flex justify-content-center my-2">
                                    <button type="submit" className="btn btn-primary m-2">
                                        Sign Up
                                    </button>

                                    <button type="button" className="btn btn-danger m-2" onClick={handleReset}>
                                        Reset
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// export default Signup;




// Navbar File

// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import AuthAPI from "../auth/AuthAPI";

const Navbar = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [cookies, , removeCookie] = useCookies([
        "access_token",
        "refresh_token",
    ]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await AuthAPI.logoutUser();
            if (response.status === 205) {
                setIsAuth(false);
                removeCookie("access_token");
                removeCookie("refresh_token");
                navigate("/");
            }
        } catch (error) {
            // console.error('Logout error:', error.message);
            setIsAuth(false);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await AuthAPI.checkAuthentication();
                if (response.status === 200) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
            } catch (error) {
                // console.error('Error during authentication check');
                setIsAuth(false);
                // navigate("/user/login");
            }
        };

        checkAuth();
    }, [cookies]);

    return (
        <>
            <nav
                className="navbar navbar-expand-lg bg-body-tertiary bg-dark"
                data-bs-theme="dark"
            >
                <div className="container-fluid px-3">
                    <NavLink className="navbar-brand" to="/">
                        Auth
                    </NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/user/profile">
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className="nav-link" to="/blog">
                                    Blog
                                </NavLink>
                            </li>
                        </ul>
                        {/* Apply ml-auto to move the following element to the right */}
                        <ul className="navbar-nav ml-auto">
                            {isAuth ? (
                                // Render the logout link for non-authenticated users
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="#" onClick={handleLogout}>
                                        Logout
                                    </NavLink>
                                </li>
                            ) : (
                                // Render the links for authenticated users
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/user/signup">
                                            Signup
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/user/login">
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

// export default Navbar;




////////Auth COntext

// AuthContext.jsx

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import AuthAPI from './AuthAPI';
// import { Cookies } from 'react-cookie';

// const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const cookie = new Cookies();

    useEffect(() => {
        AuthAPI.checkAuthentication()
            .then(() => {
                setUser({ isAuthenticated: true });
            })
            .catch(() => {
                setUser({ isAuthenticated: false });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    const login = async (credentials) => {
        try {
            const response = await AuthAPI.LoginUser(credentials);

            // Store the access and refresh tokens in cookies
            cookie.set('access_token', response.access);
            cookie.set('refresh_token', response.refresh);

            // Update the authentication state
            setUser({ isAuthenticated: true });
            // setIsAuthenticated(true);
        } catch (error) {
            // Handle login errors
            // setIsAuthenticated(false);
            setUser({ isAuthenticated: false });
            throw error;
        }
    };


    const signup = async (userData) => {
        try {
            const response = await AuthAPI.SignupUser(userData);
            setUser({ isAuthenticated: true, user: response.user });
        } catch (error) {
            setUser({ isAuthenticated: false });
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AuthAPI.logoutUser();
            cookie.remove('access_token');
            cookie.remove('refresh_token');
            setUser({ isAuthenticated: false });
        } catch (error) {
            throw error;
        }
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

// const login = async (credentials) => {
//     try {
//         const response = await AuthAPI.LoginUser(credentials);
//         setUser({ isAuthenticated: true, user: response.user });
//     } catch (error) {
//         setUser({ isAuthenticated: false });
//         throw error;
//     }
// };