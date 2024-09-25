import React from "react";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="bg-image">
      <div className="container-fluid m-30" style={{ padding: "20px" }}>
        <div
          className="row justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="col-md-8 col-lg-6">
            <div className="jumbotron bg-black text-white text-center">
              <h3 className="display-3 font-weight-bold">Quiz App</h3>
              <p className="lead">
                Dive into this quiz and improve your knowledge. Be ahead of your
                friends!!
              </p>
              <Link className="btn btn-primary btn-lg" to="/login">
                Let's Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
