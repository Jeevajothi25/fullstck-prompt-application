import React from 'react'
import { Link } from 'react-router-dom'

export default function CourseCard({c}){
  return (
    <div className="card">
      <div style={{height:120,background:'#eef2ff',borderRadius:6,marginBottom:10}} />
      <h3 style={{margin:'6px 0'}}>{c.title}</h3>
      <p style={{color:'#6b7280',margin:0}}>{c.instructor} • {c.category}</p>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:12,alignItems:'center'}}>
        <div style={{color:'#6b7280'}}>{c.level} • ⭐ {c.rating}</div>
        <Link to={`/courses/${c.id}`} className="btn">View Course</Link>
      </div>
    </div>
  )
}
