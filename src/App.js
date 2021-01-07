import React, { useState, useEffect } from 'react'
import api from './services/api'

import './styles.css'

function App() {
  const [repository, setRepository] = useState([])
  const [repositoryTitle, setRepositoryTitle] = useState('')

  useEffect(() => {
    getRepositories()
  }, [])

  async function getRepositories() {
    const response = await api.get('/repositories')
    setRepository(response.data)
  }

  async function handleRepositoryTitle(event) {
    setRepositoryTitle(event.target.value)
  }

  async function handleAddRepository() {
    const newRepository = await api.post('/repositories', {title:`${repositoryTitle}`, url: 'url', 'techs': ['teste']})
    setRepository([...repository, newRepository.data])
    setRepositoryTitle('')
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    //getRepositories() pra mim esta seria a forma correta
    setRepository(repository.filter(elem => elem.id !== id))
  }

  return (
    <div>
      <label>Title</label>
      <input type="text" onChange={handleRepositoryTitle} value={repositoryTitle}/>
      <button onClick={handleAddRepository}>Adicionar</button>
      <ul data-testid='repository-list'>
        {repository.map(data => {
          return (
            <li key={data.id}>
              {data.title}
              <button onClick={() => handleRemoveRepository(data.id)}>
                Remover
              </button>         
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
