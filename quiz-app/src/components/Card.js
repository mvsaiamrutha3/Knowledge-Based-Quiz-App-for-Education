import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({topic}) => {
  const navigate=useNavigate()
    const handlePlay = async () => {
      
        console.log("handlePlay function called");
        try {
            let curColl = topic.cName;
            console.log("Current Collection:", curColl);
            let response = await fetch(`http://localhost:5000/api/Topics/${curColl}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            navigate('/questions', { state: { data } });
        } catch (error) {
            console.error('Error:', error.message);
        }
    };
    
  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "300px" }}>
        <img
          src={topic.img}
          alt="Cyber security"
          style={{ height: "230px", objectFit: "cover" }}
        />
        <div className="card-body rounded">
          <h5 className="card-title">{topic.name}</h5>
          <div className="container w-100">
                        <hr />
            <div className="d-inline h-100 fs-8">Questions: {topic.count}   </div>
            <button
              className="btn btn-success justify-center ms-4  w-95 "
              onClick={handlePlay}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
