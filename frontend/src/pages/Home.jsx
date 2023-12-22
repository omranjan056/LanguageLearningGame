import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <h1>Welcome to the Language Learning Game!</h1>
      <p>Learn and test your language skills with our interactive games.</p>

      <div className="my-4">
        <div className="col-md-6 my-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Vocabulary Quiz</h5>
              <p className="card-text">Test your vocabulary with our fun quizzes.</p>
              <Link to="/languages" className="btn btn-primary">Start Quiz</Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 my-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sentence Construction</h5>
              <p className="card-text">Construct sentences to improve your language proficiency.</p>
              {/* <Link to="/sentence-construction" className="btn btn-primary">Start Exercise</Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;