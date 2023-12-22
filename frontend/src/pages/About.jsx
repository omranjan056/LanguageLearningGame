import React from 'react';

const About = () => {
  return (
    <div className="container-fuid my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">About Us</h2>
              <p>
                Welcome to our application! We are a diverse and talented team
                working together to create a seamless and enjoyable experience
                for our users.
              </p>
              <p>
                Our Vision: To empower users through innovative technology,
                fostering a connected and engaged community.
              </p>
              <h4 className="mt-4">Key Features:</h4>
              <ul>
                <li>
                  <strong>User Authentication:</strong> Securely manage your
                  account with our authentication system.
                </li>
                <li>
                  <strong>Dynamic Routing:</strong> Explore different sections
                  of our application with ease.
                </li>
                <li>
                  <strong>Blog Section:</strong> Read and create engaging blog
                  posts using our built-in editors.
                </li>
                {/* Add more features as needed */}
              </ul>
              <h4 className="mt-4">Meet Our Team:</h4>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="card">
                    <img
                      src="https://placekitten.com/200/200"
                      alt="Team Member"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">John Doe</h5>
                      <p className="card-text">Frontend Developer</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="card">
                    <img
                      src="https://placekitten.com/201/201"
                      alt="Team Member"
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Jane Smith</h5>
                      <p className="card-text">Backend Developer</p>
                    </div>
                  </div>
                </div>
                {/* Add more team members as needed */}
              </div>
              <p>
                Thank you for choosing our platform. We value your feedback and
                are committed to continuous improvement.
              </p>
              <p>
                If you have any questions, suggestions, or issues, please
                contact our support team at support@example.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
