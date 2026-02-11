Full-Stack Portfolio (React + FastAPI + PostgreSQL)

This project is a complete full-stack personal portfolio where projects can be added dynamically from the frontend and stored permanently in a PostgreSQL database through a FastAPI backend.

It was built step-by-step for learning real production architecture and can be used as a reference guide later if anything is forgotten.

---

🚀 Tech Stack

Frontend

- React (Create React App)
- useState, useEffect
- Fetch API
- Component-based architecture

Backend

- FastAPI
- SQLAlchemy
- Pydantic

Database

- PostgreSQL (local)

Tools

- Git
- GitHub
- VS Code
- Ubuntu

---

📁 Project Structure

portfolio-fullstack/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── requirements.txt
│   └── venv/
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── node_modules/
│
└── .gitignore

---

⚙️ Backend Setup (FastAPI + PostgreSQL)

1️⃣ Create Virtual Environment

cd backend
python3 -m venv venv
source venv/bin/activate

2️⃣ Install Dependencies

pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic

3️⃣ Create requirements.txt

pip freeze > requirements.txt

---

🗄️ PostgreSQL Setup

Open PostgreSQL

sudo -u postgres psql

Create Database

CREATE DATABASE portfolio_db;

Connect to DB

\c portfolio_db

Create Projects Table

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);

Set Password for postgres user

ALTER USER postgres WITH PASSWORD '1234';

Exit:

\q

---

🔌 Database Connection (database.py)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:1234@localhost:5432/portfolio_db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

---

🚀 FastAPI Server (main.py)

Imports

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import text
from database import SessionLocal

App Setup

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Project Model

class Project(BaseModel):
    title: str
    description: str

GET Projects (Read from DB)

@app.get("/projects")
def get_projects():
    db = SessionLocal()
    result = db.execute(text("SELECT id, title, description FROM projects"))

    projects = []
    for row in result:
        projects.append({
            "id": row.id,
            "title": row.title,
            "description": row.description
        })

    db.close()
    return projects

POST Project (Insert into DB)

@app.post("/projects")
def add_project(project: Project):
    db = SessionLocal()
    db.execute(
        text("INSERT INTO projects (title, description) VALUES (:title, :description)"),
        {"title": project.title, "description": project.description}
    )
    db.commit()
    db.close()

    return {"message": "Project added"}

---

▶️ Run Backend

cd backend
source venv/bin/activate
uvicorn main:app --reload

Open:

http://127.0.0.1:8000/docs

---

⚛️ Frontend Setup (React)

Install dependencies

cd frontend
npm install

Run React

npm start

Open:

http://localhost:3000

---

🔗 Connecting React to FastAPI

Fetch projects from backend

useEffect(() => {
  fetch("http://127.0.0.1:8000/projects")
    .then(res => res.json())
    .then(data => setProjects(data));
}, []);

Add project form

const addProject = () => {
  fetch("http://127.0.0.1:8000/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
    }),
  })
  .then(res => res.json())
  .then(() => window.location.reload());
};

---

📌 Features Implemented

- Full-stack architecture
- React frontend
- FastAPI backend
- PostgreSQL database
- Add project from UI
- Data stored permanently
- Dynamic project loading
- API integration
- CORS handling

---

📦 How to Run the Project (Complete Guide)

Start Database

(PostgreSQL service should already be running)

Start Backend

cd backend
source venv/bin/activate
uvicorn main:app --reload

Start Frontend

cd frontend
npm start

---

🧠 Concepts Learned

- React state management
- useEffect lifecycle
- REST API design
- FastAPI routing
- PostgreSQL integration
- SQLAlchemy sessions
- CRUD operations
- Git version control
- Project structuring

---

📈 Future Improvements

- Delete project feature
- Edit project feature
- Authentication (admin login)
- Deploy backend
- Deploy frontend
- Add skills/experience tables

---

👤 Author

Kalidindi Venkata Dheeraj Varma
AI & Python Developer
FastAPI | React | PostgreSQL | Generative AI