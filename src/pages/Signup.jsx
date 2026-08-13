import React, { useState } from 'react'
import { signup as signupApi } from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
import AuthLeft from '../components/AuthLeft'
import PasswordStrength from '../components/PasswordStrength'

export default function Signup(){
  const [form, setForm] = useState({name:'',email:'',password:'',confirm:''})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [show, setShow] = useState(false)
  const nav = useNavigate()

  const handle = async (e)=>{
    e.preventDefault(); setError(null)
    if (form.password !== form.confirm) return setError('Passwords do not match')
    setLoading(true)
    try{
      const res = await signupApi({ name: form.name, email: form.email, password: form.password })
      setLoading(false)
      if (res.message === 'User created') { nav('/login') }
      else setError(res.message || 'Signup failed')
    }catch(err){ setLoading(false); setError('Network error') }
  }

  return (
    <div className="auth-root">
      <AuthLeft signup={true} />
      <div className="auth-right">
        <div className="auth-panel" role="region" aria-labelledby="signup-heading">
          <div className="form-label">CREATE YOUR ACCOUNT</div>
          <h3 id="signup-heading" className="form-heading">Start learning today.</h3>
          <p className="form-sub">One account. A world of possibilities.</p>

          <form onSubmit={handle}>
            <div className="form-field">
              <label className="form-label">Full Name</label>
              <input required placeholder="Enter your full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            </div>

            <div className="form-field">
              <label className="form-label">Email</label>
              <input required type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
            </div>

            <div className="form-field">
              <label className="form-label">Password</label>
              <div style={{position:'relative'}}>
                <input required type={show? 'text':'password'} placeholder="Create a strong password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
                <button type="button" onClick={()=>setShow(s=>!s)} aria-label={show? 'Hide password':'Show password'} style={{position:'absolute',right:10,top:8,background:'transparent',border:'none',cursor:'pointer'}}>{show? '🙈':'👁️'}</button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            <div className="form-field">
              <label className="form-label">Confirm Password</label>
              <input required type={show? 'text':'password'} placeholder="Confirm your password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} />
            </div>

            {error && <div style={{color:'crimson',marginTop:8}}>{error}</div>}

            <div className="cta">
              <button className="btn" type="submit" disabled={loading}>{loading? 'Creating your account...':'Start Learning →'}</button>
            </div>

            <div style={{marginTop:14,fontSize:14}}>
              <div>Already learning with us? <Link to="/login">Continue your journey →</Link></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
