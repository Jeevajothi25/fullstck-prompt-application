import React from 'react'
import courses from '../data/courses'
import CourseCard from '../components/CourseCard'

export default function Courses(){
  return (
    <div className="container">
      <h2>All Courses</h2>
      <div className="grid" style={{marginTop:12}}>
        {courses.map(c => <CourseCard key={c.id} c={c} />)}
      </div>
    </div>
  )
}
