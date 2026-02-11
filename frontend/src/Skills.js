import { useState } from "react";

function Skills() {
  const [skills] = useState([
     "Python",
     "FastAPI",
     "Generative AI",
     "PySpark",
     "MySQL",
     "React"
  ]);

  return (
    <div>
      <h2>Skills</h2>
      {skills.map((skill, index) => (
        <p key={index}>{skill}</p>
      ))}
    </div>
  );
}

export default Skills;
