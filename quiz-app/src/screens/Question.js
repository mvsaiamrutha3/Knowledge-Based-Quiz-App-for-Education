import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Clock from "../components/Clock/Clock"; // Import Clock Component

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
  const [timerRunning, setTimerRunning] = useState(true); // Control timer

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
    setCompleted(false);
  }, [data]);

  useEffect(() => {
    // Reset timer and state when the question changes
    setTimerRunning(true);
    setChosenOption("");
    setIsChecked(false);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (option) => {
    if (!isChecked) {
      setChosenOption(option);
      setIsChecked(true); // Mark the answer as checked
      setTimerRunning(false); // Stop the timer when an option is selected
      if (option === currentQuestion.correct) {
        setTotal((prevTotal) => prevTotal + 10); // Add points for correct answer
      }
      setTimeout(() => {
        moveToNextQuestion(); // Move to next question after 1 second
      }, 2000);
    }
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setCompleted(true); // All questions completed
    }
  };

  const onTimeUp = () => {
    setIsChecked(true); // Mark the question as checked when time is up
    setTimerRunning(false); // Stop the timer
    setCompleted(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <Navbar />
      {questions.length === 0 ? ( // Check if there are no questions
        <div className="container mt-4 mb-4 p-4 border border-white rounded" style={{ width: "45%", height: "auto" }}>
          <h1 className="m-4" style={{ textAlign: "center" }}>
            No questions available
          </h1>
        </div>
      ) : completed ? (
        <div>
          <div
            className="container mt-4 mb-4 p-4 border border-white rounded"
            style={{ width: "45%", height: "auto" }}
          >
            <h1 className="m-4" style={{ textAlign: "left" }}>
              Total Points: {total}
            </h1>
          </div>
        </div>
      ) : (
        <div className="container-quiz">
          {/* Left Side: Questions and Options */}
          <div className="question-box-container">
            <h3 className="mb-2">Question: {currentQuestionIndex + 1}</h3>
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
                        onClick={() => handleOptionSelect(option)}
                        style={{ cursor: isChecked ? "not-allowed" : "pointer" }}
                      >
                        <span className="option-text">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div>No question available</div>
            )}
          </div>

          {/* Right Side: Clock and Total Points */}
          <div className="timer-box-container">
            {/* Clock Component */}
            <Clock
              initialTime={20} // Set your initial timer here (e.g., 20 seconds)
              isRunning={timerRunning}
              onTimeUp={onTimeUp} // Function to handle when time is up
            />
            {/* Total Points */}
            <h4 style={{ marginTop: "10px", marginBottom: "40px" }}>
              Total Points: {total}
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
