import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const AddQue = () => {
    // State variables for questions and topic
    const [topic, setTopic] = useState("");
    const [img, setImg] = useState("");
    const [que, setQue] = useState("");
    const [options, setOpt] = useState(["", "", "", ""]);
    const [ans, setAns] = useState("");
    const [Ques, setQues] = useState([]);
    const [completed, setCompleted] = useState(false);

    // Handlers for input changes
    const handleTop = (e) => {
        setTopic(e.target.value);
    };

    const handleImg = (e) => {
        setImg(e.target.value);
    };

    const handleQue = (e) => {
        setQue(e.target.value);
    };

    const handleAns = (e) => {
        setAns(e.target.value);
    };

    const handleOpt = (index, e) => {
        const newOptions = [...options];
        newOptions[index] = e.target.value;
        setOpt(newOptions);
    };

    // Function to add a question
    const addQuestions = () => {
        if (!que || !ans || options.some(option => !option)) {
            alert("Please fill in all fields before adding a question.");
            return;
        }
        const newQuestions = [...Ques];
        newQuestions.push({ "question": que, "options": options, "correct": ans });
        setQues(newQuestions);
        console.log(newQuestions);
        setQue("");
        setOpt(["", "", "", ""]);
        setAns("");
    };

    // Function to upload questions
    const uploadQuestions = async () => {
        try {

            const response1 = await fetch(`http://localhost:5000/api/create/topic`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    name:topic,
                    count:Ques.length,
                    img:img
                 })
            });
            console.log("topic uploaded:", await response1.json())
            const response2 = await fetch(`http://localhost:5000/api/addque/${topic}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ questions: Ques })
            });
            console.log("Questions uploaded:", await response2.json());
        } catch (error) {
            console.error("Error uploading questions:", error);
        }
    };

    return (
        <>
            <div >
                <div className="container mt-4 mb-4 p-4 border border-white rounded" style={{ width: "45%", height: "auto" }}>
                    {!completed ? (
                        <div>
                            <h3>Enter Topic Information</h3>
                            <input
                                type='text'
                                value={topic}
                                onChange={handleTop}
                                placeholder='Enter Topic Name'
                                className="form-control mb-3"
                            />
                            <input
                                type='text'
                                value={img}
                                onChange={handleImg}
                                placeholder='Enter Image Link'
                                className="form-control mb-3"
                            />  
                            <button 
                                onClick={() => setCompleted(true)} 
                                className="btn btn-primary"
                                disabled={!topic || !img} // Disable until both fields are filled
                            >
                                Continue
                            </button>
                        </div>
                        
                    ) : (
                        <div>
                            <h3>Add Questions</h3>
                            <input
                                type='text'
                                value={que}
                                onChange={handleQue}
                                placeholder='Enter Question'
                                className="form-control mb-3"
                            />
                            <div className='row mb-3'>
                                {options.map((option, index) => (
                                    <div className='col-md-6' key={index}>
                                        <input
                                            type='text'
                                            value={option}
                                            onChange={(e) => handleOpt(index, e)}
                                            placeholder={`Option ${index + 1}`}
                                            className="form-control mb-2"
                                        />
                                    </div>
                                ))}
                            </div>
                            <input
                                type='text'
                                value={ans}
                                onChange={handleAns}
                                placeholder='Enter Correct Option'
                                className="form-control mb-3"
                            />
                            <button onClick={addQuestions} className="btn btn-success">Add Question</button>
                            <button onClick={uploadQuestions} className="btn btn-info">Upload</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddQue;
