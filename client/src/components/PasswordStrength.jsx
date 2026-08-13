import React from 'react'

function scorePassword(pw){
  let score = 0
  if (!pw) return 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

export default function PasswordStrength({ password }){
  const s = scorePassword(password)
  let state = 'weak'
  if (s >= 3) state = 'strong'
  else if (s === 2) state = 'medium'

  return (
    <div className="strength" aria-live="polite">
      <div style={{fontSize:13,color:'#374151',marginRight:8}}>Password strength</div>
      <div className="dots" aria-hidden>
        {[0,1,2,3].map(i => (
          <div key={i} className={`dot ${i<=s-1? 'active':''} ${i<=s-1? (state):''}`} />
        ))}
      </div>
      <div style={{fontSize:13,color:'#6b7280',marginLeft:8}}>
        {password ? (state === 'weak' ? 'Weak' : state === 'medium' ? 'Medium' : 'Strong') : 'Add uppercase, numbers and symbols'}
      </div>
    </div>
  )
}
