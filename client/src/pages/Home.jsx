import React from 'react'
import { Link } from 'react-router-dom'
import courses from '../data/courses'
import CourseCard from '../components/CourseCard'

export default function Home(){
  return (
    <div className="container">
      <section style={{display:'flex',justifyContent:'space-between',gap:20,alignItems:'center'}}>
        <div style={{flex:1}}>
          <h1>Learn New Skills. Build Your Future.</h1>
          <p style={{color:'#6b7280'}}>Explore practical courses taught by experienced instructors and learn at your own pace.</p>
          <div style={{display:'flex',gap:12,marginTop:12}}>
            <Link to="/courses" className="btn">Explore Courses</Link>
            <Link to="/signup">Start Learning</Link>
          </div>
        </div>
        <div style={{width:360}}>
          <div className="card">
            <h3>Categories</h3>
            <ul style={{color:'#6b7280'}}>
              <li>Web Development</li>
              <li>Programming</li>
              <li>Data Science</li>
              <li>AI & Machine Learning</li>
              <li>Cloud Computing</li>
              <li>UI/UX Design</li>
            </ul>
          </div>
        </div>
      </section>

      <h2 style={{marginTop:24}}>Featured Courses</h2>
      <div className="grid" style={{marginTop:12}}>
        {courses.slice(0,6).map(c => <CourseCard key={c.id} c={c} />)}
      </div>
    </div>
  )
}
