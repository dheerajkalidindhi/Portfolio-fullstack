import { useEffect, useState } from "react";


  function Projects() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    fetch("http://127.0.0.1:8000/projects")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  const addProject = () => {
  fetch("http://127.0.0.1:8000/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      description: description,
    }),
  })
    .then(res => res.json())
    .then(() => {
      setTitle("");
      setDescription("");
      window.location.reload();
    });
};


  return (
    <div>
      <h2>Projects</h2>

           <div style={{ marginBottom: "20px" }}>
               <input
                type="text"
                placeholder="Project Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ marginRight: "10px", padding: "5px" }}
        />

  <input
    type="text"
    placeholder="Project Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    style={{ marginRight: "10px", padding: "5px" }}
  />

  <button onClick={addProject}>Add Project</button>
</div>
              

      {projects.map((project, index) => (
        <div key={index} className="project-card">
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Projects;
