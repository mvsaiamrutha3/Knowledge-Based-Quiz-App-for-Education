import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ search, setSearch }) => {
  const navigate = useNavigate();
  
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("../");
  };
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Quizz!!
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 fs-4"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
            </ul>
            <ul>
              <div className="search-container">
                <form className="d-flex me-5">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: "430px", height: "36px" }}
                  />
                </form>
              </div>
            </ul>

            <div
              className="btn bg-danger text-white ms-3"
              onClick={handleLogOut}
            >
              Logout
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
