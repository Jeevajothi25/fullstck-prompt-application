import React from 'react'
import { useParams } from 'react-router-dom'
import courses from '../data/courses'

export default function CourseDetails(){
  const { id } = useParams()
  const c = courses.find(x=>x.id===id) || courses[0]
  return (
    <div className="container">
      <div className="card">
        <h2>{c.title}</h2>
        <p style={{color:'#6b7280'}}>{c.instructor} • {c.category}</p>
        <p>{c.description}</p>
        <p><strong>Level:</strong> {c.level} • <strong>Duration:</strong> {c.duration}</p>
        <button className="btn">Enroll</button>
      </div>
    </div>
  )
}
