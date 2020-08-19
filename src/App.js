import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [projectsList, setProjectsList] = useState([]);

  useEffect( () => {
    api.get('/repositories').then( res => {
      setProjectsList(res.data);
    })
  },[])

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      title: "Novo Projeto, Profexô!",
      owner: "Otavio Bonassi"
    });

    setProjectsList(prevState =>[...prevState, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const filteredProjects = projectsList.filter( project => project.id !== id);
    setProjectsList(filteredProjects);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projectsList.map((project, index) => {
          return (
              <li key={index}>
                {project.title}
                <button onClick={() => handleRemoveRepository(project.id)}>
                  Remover
                </button>
              </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
