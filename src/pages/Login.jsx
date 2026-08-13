import React, { useState } from 'react'
import { login as loginApi } from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [show, setShow] = useState(false)
  const nav = useNavigate()
  const { login } = useAuth()

  const handle = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await loginApi({ email: form.email, password: form.password })
      if (res.token) {
        login(res.token, res.user)
        nav('/dashboard')
      } else {
        setLoading(false)
        setError(res.message || 'Incorrect email or password. Please try again.')
      }
    } catch (err) {
      setLoading(false)
      setError('Unable to sign in. Please check your credentials and try again.')
    }
  }

  return (
    <div className="login-page">
      {/* Left Panel - Brand Experience */}
      <div className="login-left-panel">
        <div className="left-content">
          {/* Brand */}
          <div className="brand-section">
            <div className="brand-icon">📚</div>
            <div className="brand-name">LEARNHUB</div>
          </div>

          {/* Main Heading */}
          <h1 className="left-heading">
            Build skills.<br />
            Shape your future.
          </h1>

          {/* Supporting Text */}
          <p className="left-description">
            Learn practical skills from expert-led courses and keep moving toward your goals.
          </p>

          {/* Continue Learning Card */}
          <div className="continue-card">
            <div className="continue-label">CONTINUE LEARNING</div>
            <div className="continue-course">Full Stack Development</div>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '72%' }}></div>
              </div>
              <div className="progress-text">72% complete</div>
            </div>
            <a href="#" className="continue-link">Continue your journey →</a>
          </div>

          {/* Statistics */}
          <div className="stats-section">
            <div className="stat">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Learners</div>
            </div>
            <div className="stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Courses</div>
            </div>
            <div className="stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Skills</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="login-right-panel">
        <div className="login-form-container">
          {/* Header */}
          <div className="form-header">
            <div className="form-welcome">Welcome back</div>
            <h2 className="form-heading">Continue learning.</h2>
            <p className="form-description">
              Sign in to access your courses and track your progress.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handle} className="auth-form" aria-describedby={error ? 'login-error' : undefined}>
            {/* Email Field */}
            <div className="form-field">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="form-input"
              />
            </div>

            {/* Password Field */}
            <div className="form-field">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                  className="form-input"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="password-visibility-btn"
                  aria-label={show ? 'Hide password' : 'Show password'}
                >
                  {show ? '✓' : '○'}
                </button>
              </div>
            </div>

            {/* Form Options */}
            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>

            {/* Error Message */}
            {error && (
              <div id="login-error" className="error-box">
                {error}
              </div>
            )}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="sign-in-btn"
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Google Button */}
          <button className="google-btn" disabled>
            <span className="google-icon">G</span>
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <div className="signup-footer">
            Don't have a LearnHub account?{' '}
            <Link to="/signup" className="signup-link">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
