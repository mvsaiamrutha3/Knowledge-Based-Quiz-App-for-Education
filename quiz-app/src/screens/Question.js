import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Questions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chosenOption, setChosenOption] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
    setCompleted(false);
  }, [data]);

  const handleOptionSelect = (option) => {
    setChosenOption(option);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setChosenOption("");
      setIsChecked(false);
    } else {
      setCompleted(true);
    }
  };

  const handleCheck = () => {
    setIsChecked(true);
    if (chosenOption === currentQuestion.correct) {
      setTotal(total + 10);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <Navbar />
      {completed ? (
        <div>
          <div
            className="container mt-4 mb-4 p-4 border border-white rounded"
            style={{ width: "65%", height: "auto" }}
          >
            <h1 className="m-4" style={{ textAlign: "left" }}>
              Total Points: {total}
            </h1>
           
          </div>
        </div>
      ) : (
        <div>
          <div
            className="container mt-4 mb-4 p-4 border border-white rounded"
            style={{ width: "65%", height: "auto" }}
          >
            {currentQuestion ? (
              <>
                <div className="question-box bg-primary text-white p-3 mb-4">
                  <h4>{currentQuestion.question}</h4>
                </div>
                <div className="row">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <div
                        className={`option-box bg-dark p-3 ${
                          chosenOption === option ? "selected" : ""
                        } ${
                          isChecked && option === currentQuestion.correct
                            ? "correct"
                            : ""
                        } ${
                          isChecked &&
                          option === chosenOption &&
                          option !== currentQuestion.correct
                            ? "incorrect"
                            : ""
                        }`}
                        onClick={() => !isChecked && handleOptionSelect(option)}
                        style={{ cursor: isChecked ? "not-allowed" : "pointer" }}
                      >
                        <span className="option-text">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col">
                  <button
                    className="btn btn-danger me-5"
                    onClick={handleCheck}
                    disabled={!chosenOption || isChecked}
                  >
                    Check
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={handleNext}
                    disabled={!isChecked}
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <div>No question available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
