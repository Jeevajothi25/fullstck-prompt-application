import React, { useState } from 'react'
import { login as loginApi } from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLeft from '../components/AuthLeft'

export default function Login(){
  const [form, setForm] = useState({email:'',password:'',remember:false})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [show, setShow] = useState(false)
  const nav = useNavigate()
  const { login } = useAuth()

  const handle = async (e)=>{
    e.preventDefault(); setError(null); setLoading(true)
    try{
      const res = await loginApi({ email: form.email, password: form.password })
      setLoading(false)
      if (res.token){ login(res.token, res.user); nav('/dashboard') }
      else setError(res.message || 'Login failed')
    }catch(err){ setLoading(false); setError('Network error') }
  }

  return (
    <div className="auth-root">
      <AuthLeft signup={false} />
      <div className="auth-right">
        <div className="auth-panel" role="region" aria-labelledby="login-heading">
          <div className="form-label">WELCOME BACK</div>
          <h3 id="login-heading" className="form-heading">Continue where you left off.</h3>
          <p className="form-sub">Your next lesson is waiting for you.</p>
          <form onSubmit={handle} aria-describedby="login-error">
            <div className="form-field">
              <label className="form-label">Email address</label>
              <input required type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} aria-label="Email address" />
            </div>

            <div className="form-field">
              <label className="form-label">Password</label>
              <div style={{position:'relative'}}>
                <input required type={show? 'text':'password'} placeholder="Enter your password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} aria-label="Password" />
                <button type="button" onClick={()=>setShow(s=>!s)} aria-label={show? 'Hide password':'Show password'} style={{position:'absolute',right:10,top:8,background:'transparent',border:'none',cursor:'pointer'}}>{show? '🙈':'👁️'}</button>
              </div>
            </div>

            <div className="form-row">
              <label style={{display:'flex',alignItems:'center',gap:8}}><input type="checkbox" checked={form.remember} onChange={e=>setForm({...form,remember:e.target.checked})} /> <span className="muted">Remember me</span></label>
              <a href="#" className="muted">Forgot password?</a>
            </div>

            {error && <div id="login-error" style={{color:'crimson',marginTop:12}}>{error}</div>}

            <div className="progress-line" aria-hidden>
              <div style={{fontSize:13,color:'#374151'}}>Your learning journey</div>
              <div style={{display:'flex',alignItems:'center',gap:8,marginTop:6}}>
                <div style={{display:'flex',gap:6,alignItems:'center'}}>
                  <div style={{width:8,height:8,background:'#111',borderRadius:8}}></div>
                  <div style={{width:60,height:6,background:'#d1d5db',borderRadius:6}}></div>
                  <div style={{width:8,height:8,background:'#111',borderRadius:8}}></div>
                  <div style={{width:60,height:6,background:'#d1d5db',borderRadius:6}}></div>
                  <div style={{width:8,height:8,background:'#111',borderRadius:8}}></div>
                  <div style={{width:60,height:6,background:'#d1d5db',borderRadius:6}}></div>
                  <div style={{width:8,height:8,background:'#fff',borderRadius:8,boxShadow:'0 0 8px rgba(59,130,246,0.6)'}}></div>
                </div>
                <div style={{fontSize:12,color:'#6b7280'}}>Explore&nbsp;&nbsp;Learn&nbsp;&nbsp;Practice&nbsp;&nbsp;Grow</div>
              </div>
            </div>

            <div className="cta">
              <button className="btn" type="submit" disabled={loading}>{loading? 'Signing in...':'Continue Learning →'}</button>
            </div>

            <div style={{marginTop:14,fontSize:14}}>
              <div>New to LearnHub? <Link to="/signup">Start your learning journey →</Link></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
