import React, { useState } from 'react'
import { signup as signupApi } from '../services/api'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup(){
  const [form, setForm] = useState({name:'',email:'',password:'',confirm:''})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const nav = useNavigate()

  const handle = async (e)=>{
    e.preventDefault(); setError(null)
    if (form.password !== form.confirm) return setError('Passwords do not match')
    setLoading(true)
    const res = await signupApi({ name: form.name, email: form.email, password: form.password })
    setLoading(false)
    if (res.message === 'User created') { nav('/login') }
    else setError(res.message || 'Signup failed')
  }

  return (
    <div className="container" style={{maxWidth:520}}>
      <h2>Sign Up</h2>
      <form className="card" onSubmit={handle}>
        <label>Full Name</label>
        <input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <label>Email</label>
        <input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        <label>Password</label>
        <input required type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
        <label>Confirm Password</label>
        <input required type="password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} />
        {error && <div style={{color:'red'}}>{error}</div>}
        <div style={{display:'flex',gap:10,marginTop:10}}>
          <button className="btn" type="submit">{loading ? 'Creating...' : 'Sign Up'}</button>
          <Link to="/login">Already have an account?</Link>
        </div>
      </form>
    </div>
  )
}
