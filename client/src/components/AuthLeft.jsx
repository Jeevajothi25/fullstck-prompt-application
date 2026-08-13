import React from 'react'

export default function AuthLeft({ signup=false }){
  return (
    <aside className="auth-left" aria-hidden="true">
      <div className="brand">LearnHub</div>
      <h2 className="left-head">{signup ? 'Your learning journey starts here.' : 'Turn curiosity into capability.'}</h2>
      <p className="left-sub">{signup ? 'Create your account and discover skills that can shape your future.' : 'Learn practical skills, build confidence, and move one step closer to your goals.'}</p>

      <div className="journey" role="img" aria-label="Learning journey illustration">
        <div className="step"><div className="node"/> <div>Discover</div></div>
        <div className="connector" />
        <div className="step"><div className="node"/> <div>Learn</div></div>
        <div className="connector" />
        <div className="step"><div className="node"/> <div>Practice</div></div>
        <div className="connector" />
        <div className="step"><div className="node"/> <div>Grow</div></div>
      </div>

      <div className="mini-grid">
        <div className="mini-card floating">
          <strong>React</strong>
          <div style={{fontSize:12,opacity:0.9}}>92% Progress</div>
        </div>
        <div className="mini-card floating" style={{transform:'translateY(8px)'}}>
          <strong>JavaScript</strong>
          <div style={{fontSize:12}}>12 Lessons</div>
        </div>
        <div className="mini-card floating" style={{transform:'translateY(16px)'}}>
          <strong>AI & ML</strong>
          <div style={{fontSize:12}}>New Course</div>
        </div>
        <div className="mini-card floating" style={{transform:'translateY(24px)'}}>
          <strong>UI/UX</strong>
          <div style={{fontSize:12}}>4.8 ★</div>
        </div>
      </div>

      <div className="orbit" aria-hidden>
        <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" stroke="#fff" strokeWidth="1" fill="none" /></svg>
        <div className="icon i1">💡</div>
        <div className="icon i2">📚</div>
        <div className="icon i3">💻</div>
        <div className="icon i4">🚀</div>
      </div>
    </aside>
  )
}
