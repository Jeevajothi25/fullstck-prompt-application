import React from 'react'

export default function MyLearning(){
  const dummy = [{name:'React for Beginners',progress:20},{name:'Python Programming',progress:60}]
  return (
    <div className="container">
      <h2>My Learning</h2>
      <div style={{display:'grid',gap:12}}>
        {dummy.map((c,i)=> (
          <div className="card" key={i}>
            <h4>{c.name}</h4>
            <p>Progress: {c.progress}%</p>
            <button className="btn">Continue Learning</button>
          </div>
        ))}
      </div>
    </div>
  )
}
