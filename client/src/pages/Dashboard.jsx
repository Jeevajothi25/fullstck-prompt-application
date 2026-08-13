import React from 'react'
import { useAuth } from '../context/AuthContext'

export default function Dashboard(){
  const { user } = useAuth()
  const dummy = { enrolled: ['Full Stack Web Development','React for Beginners'], progress: 42 }
  return (
    <div className="container">
      <h2>Welcome to LearnHub</h2>
      <p>Welcome, {user?.name || 'Student'}!</p>
      <div style={{display:'flex',gap:20,flexWrap:'wrap'}}>
        <div className="card" style={{flex:1,minWidth:260}}>
          <h3>Learning Progress</h3>
          <p>{dummy.progress}% completed</p>
        </div>
        <div className="card" style={{flex:1,minWidth:260}}>
          <h3>Enrolled Courses</h3>
          <ul>
            {dummy.enrolled.map((c,i)=><li key={i}>{c}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
