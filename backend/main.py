from fastapi import FastAPI,Request
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal
from sqlalchemy import text
from pydantic import BaseModel
from pydantic import BaseModel
    
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Project(BaseModel):
    title: str
    description: str


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

