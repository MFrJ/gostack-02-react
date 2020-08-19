import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    })
  }, []);

  async function handleAddRepository() {

    const name = Math.random().toString(36).substr(2, 5);

    const newRepo = {
      "title": name,
      "url": "http://github.com/teste3",
      "techs":["Node.JS", "AngularJS"]
      
    }

    var payload = await api.post('repositories', newRepo);

    setRepositories([...repositories, payload.data]);
    
    
  }

  async function handleRemoveRepository(id) {
    
    console.log(id);

    api.delete(`repositories/${id}`).then((res) => {
      const filtered_repositories = repositories.filter(repo => repo.id !== id);
      setRepositories(filtered_repositories);
    });

  
  }

  return (
    <div>
      <ul data-testid="repository-list" >
        {repositories.map(repo =>
        <li key={repo.id} >
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
