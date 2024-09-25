import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import '/node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  
import '/node_modules/bootstrap/dist/js/bootstrap.bundle';
import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./screens/SignUp.js";
import Login from "./screens/Login.js";
import Intro from "./screens/Intro.js";
import Question from "./screens/Question.js";
import Home from "./screens/Home.js";

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Routes >
          <Route path="/" element={<Intro/>}/>  
          <Route path="/home" element={<Home/>}/> 
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>  
          <Route path="/questions" element={<Question/>}/>       
        </Routes>
      </div>
    </Router>
      
    </div>
  );
}

export default App;
