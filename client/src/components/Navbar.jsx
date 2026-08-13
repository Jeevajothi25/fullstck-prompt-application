import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar(){
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const handleLogout = ()=>{ logout(); nav('/login') }
  return (
    <header style={{background:'#fff',borderBottom:'1px solid #e5e7eb'}}>
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 0'}}>
        <div style={{display:'flex',gap:16,alignItems:'center'}}>
          <Link to="/" style={{fontWeight:700,fontSize:18,color:'#111'}}>LearnHub</Link>
          <nav style={{display:'flex',gap:12}}>
            <Link to="/">Home</Link>
            <Link to="/courses">Courses</Link>
          </nav>
        </div>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="btn">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
