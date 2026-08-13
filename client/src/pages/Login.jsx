import React, { useState } from 'react'
import { login as loginApi } from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const [form, setForm] = useState({email:'',password:''})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const nav = useNavigate()
  const { login } = useAuth()

  const handle = async (e)=>{
    e.preventDefault(); setError(null); setLoading(true)
    const res = await loginApi(form)
    setLoading(false)
    if (res.token){ login(res.token, res.user); nav('/dashboard') }
    else setError(res.message || 'Login failed')
  }

  return (
    <div className="container" style={{maxWidth:520}}>
      <h2>Login</h2>
      <form className="card" onSubmit={handle}>
        <label>Email</label>
        <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <label>Password</label>
        <input required type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        {error && <div style={{color:'red'}}>{error}</div>}
        <div style={{display:'flex',gap:10,marginTop:10}}>
          <button className="btn" type="submit">{loading ? 'Signing in...' : 'Login'}</button>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  )
}
