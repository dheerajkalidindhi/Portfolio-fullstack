import './App.css';
import Skills from "./Skills";
import Projects from './Projects';
import Contact from "./Contact";

 
function App() {
  return (
    
    <div className="App">
        
      <h2>Hi, I'm Dheeraj 👋</h2>
      <h1>Dheeraj Varma</h1>
      <p>Kalidindi Venkata Dheeraj Varma</p>
      <p> AI & Python Developer | FastAPI | PySpark | Generative AI </p>

      <h2>About Me</h2>
      <p> 
      I am a Python developer focused on building AI-powered applications using FastAPI, PySpark, and React.
      </p>
        
      <Skills />
        
      <Projects />

      <Contact />
       
    </div>
  );
}

export default App;
