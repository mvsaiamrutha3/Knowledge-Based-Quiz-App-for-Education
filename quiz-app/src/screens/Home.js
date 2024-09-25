import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";



const Home = () => {
  const [search, setSearch] = useState("");
  const [topics, setTopics] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/Topics", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
    });
    response = await response.json();
    setTopics(response);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar search={search} setSearch={setSearch}/>
     
      <div className="bg-dark w-100 d-flex align-items-center" style={{ height: '40px' }}>
        <button
          className="btn btn-dark h-100 d-flex justify-content-center align-items-center"
          style={{ width: '40px' }}
          onClick={toggleSidebar}
        >
          <i className="bi bi-list text-white" style={{ fontSize: '1.5rem' }}></i>
        </button>
      </div>

      <div className="d-flex">
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          {/* <button className="closebtn btn btn-dark" onClick={toggleSidebar}>&times;</button> */}
          <div className="sidebar-options">
            <button className="btn btn-secondary my-2 w-100">Create Quiz</button>
            <button className="btn btn-secondary my-2 w-100">History</button>
            <button className="btn btn-secondary my-2 w-100">Settings</button>
          </div>
        </div>

        <div className="main-content container" style={{zIndex:1000}}>
          <div className="row">
            {topics.length !== 0 ? (
              topics
                .filter(
                  (item) => item.name.toLowerCase().includes(search.toLocaleLowerCase())
                )
                .map((filterItems) => (
                  <div key={filterItems._id} className="col-12 col-md-6 col-lg-3 m-3">
                    <Card topic={filterItems} />
                  </div>
                ))
            ) : (
              <div>No such data found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
