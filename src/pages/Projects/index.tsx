import type { Project } from '@/types'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get<Project[]>(
          `${import.meta.env.VITE_API_URL}/projects`
        )
        setProjects(response.data)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ minHeight: '100vh', padding: '2rem' }}
    >
      <h1>My Projects</h1>
      <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
        {projects.map((project) => (
          <div
            key={project._id}
            style={{ border: '1px solid #ccc', padding: '1rem' }}
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default Projects
