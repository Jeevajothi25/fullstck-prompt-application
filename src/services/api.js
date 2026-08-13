const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000'

export async function signup(data){
  const res = await fetch(API_BASE + '/api/auth/signup', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) })
  return res.json()
}

export async function login(data){
  const res = await fetch(API_BASE + '/api/auth/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) })
  return res.json()
}

export async function me(token){
  const res = await fetch(API_BASE + '/api/auth/me', { headers:{ Authorization: 'Bearer '+token } })
  return res.json()
}
