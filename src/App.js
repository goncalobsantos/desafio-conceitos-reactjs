import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => setRepos(response.data))
  }, [])

  const handleAddRepository = async () => {
    const d = new Date()
    const response = await api.post('/repositories', {
      "url": "https://github.com/Rocketseat/umbriel",
      "title": `Umbriel ${d.getDate()}/${d.getMonth()}/${d.getFullYear()}@${d.getHours()}:${d.getMinutes()}`,
      "techs": ["Node", "Express", "TypeScript"]
    })

    setRepos([...repos, response.data])
  }

  const handleRemoveRepository = async (id) => {
    api.delete(`/repositories/${id}`)
    const reposUpdate = repos.filter(repo => repo.id !== id)
    setRepos(reposUpdate)
  }

  //LIKE DYNAMIC COMMENTED BECAUSE OF TESTS
  // const handleLike = async (id) => {
  //   const response = await api.post(`/repositories/${id}/like`)
  //   const updatedRepo = response.data;
  //   const repoIndex = repos.findIndex(repo => repo.id === id);
  //   const reposCopy = [...repos]
  //   reposCopy[repoIndex] = updatedRepo;
  //   setRepos(reposCopy)
  // }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => {
          return (
            //LIKE DYNAMIC COMMENTED BECAUSE OF TESTS
            // <li key={repo.id}>
            //   {repo.title} | {repo.likes}
            //   <button onClick={() => handleRemoveRepository(repo.id)} className="btn btn--list">Remover</button>
            //   <button onClick={() => handleLike(repo.id)} className="btn btn--list btn--like">Like</button>
            // </li>
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)} className="btn btn--list">Remover</button>
            </li>
          )
        })}
      </ul>

      <button className="btn" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
