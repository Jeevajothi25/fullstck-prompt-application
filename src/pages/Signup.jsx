import React, { useState } from 'react'
import { signup as signupApi } from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
import PasswordStrength from '../components/PasswordStrength'

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    terms: false
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const nav = useNavigate()

  const validateForm = () => {
    const errors = {}

    if (!form.name.trim()) {
      errors.name = 'Please enter your full name.'
    }

    if (!form.email.trim()) {
      errors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Please enter a valid email address.'
    }

    if (!form.password) {
      errors.password = 'Please create a password.'
    } else {
      const score = scorePassword(form.password)
      if (score < 2) {
        errors.password = 'Password is too weak. Use at least 8 characters with uppercase, numbers, and symbols.'
      }
    }

    if (!form.confirm) {
      errors.confirm = 'Please confirm your password.'
    } else if (form.password !== form.confirm) {
      errors.confirm = 'Passwords do not match.'
    }

    if (!form.terms) {
      errors.terms = 'Please accept the Terms of Service and Privacy Policy.'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const scorePassword = (pw) => {
    let score = 0
    if (!pw) return 0
    if (pw.length >= 8) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    return score
  }

  const handle = async (e) => {
    e.preventDefault()
    setError(null)

    if (!validateForm()) return

    setLoading(true)
    try {
      const res = await signupApi({
        name: form.name,
        email: form.email,
        password: form.password
      })

      setLoading(false)

      if (res.message === 'User created') {
        nav('/login')
      } else if (res.message && res.message.includes('already exists')) {
        setError('This email is already registered. Try signing in instead.')
      } else {
        setError(res.message || 'Unable to create your account. Please try again.')
      }
    } catch (err) {
      setLoading(false)
      setError('Unable to connect to LearnHub. Please check your connection and try again.')
    }
  }

  return (
    <div className="signup-page">
      {/* Left Panel - Brand & Learning Journey */}
      <div className="signup-left-panel">
        <div className="signup-left-content">
          {/* Brand Section */}
          <div className="brand-section">
            <div className="brand-icon">📚</div>
            <div className="brand-name">LEARNHUB</div>
          </div>

          {/* Main Heading */}
          <h1 className="signup-left-heading">
            Start building skills.<br />
            Shape your future.
          </h1>

          {/* Description */}
          <p className="signup-left-description">
            Create your LearnHub account and get access to courses designed to help you learn practical, career-ready skills.
          </p>

          {/* Learning Journey Indicator */}
          <div className="journey-indicator">
            <div className="journey-title">START YOUR JOURNEY</div>
            <div className="journey-path">
              <div className="journey-step">
                <div className="journey-dot">1</div>
                <div className="journey-label">Explore</div>
              </div>
              <div className="journey-arrow">↓</div>
              <div className="journey-step">
                <div className="journey-dot">2</div>
                <div className="journey-label">Learn</div>
              </div>
              <div className="journey-arrow">↓</div>
              <div className="journey-step">
                <div className="journey-dot">3</div>
                <div className="journey-label">Practice</div>
              </div>
              <div className="journey-arrow">↓</div>
              <div className="journey-step">
                <div className="journey-dot">4</div>
                <div className="journey-label">Grow</div>
              </div>
            </div>
          </div>

          {/* Learning Benefits */}
          <div className="learning-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>Learn at your own pace</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>Track your course progress</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">✓</span>
              <span>Build practical skills</span>
            </div>
          </div>

          {/* Bottom Message */}
          <p className="signup-left-footer">
            Your learning journey starts with one account.
          </p>
        </div>
      </div>

      {/* Right Panel - Sign Up Form */}
      <div className="signup-right-panel">
        <div className="signup-form-container">
          {/* Form Header */}
          <div className="signup-form-header">
            <div className="signup-form-welcome">CREATE YOUR ACCOUNT</div>
            <h2 className="signup-form-heading">Start learning today.</h2>
            <p className="signup-form-description">
              Create your account and take the first step toward your learning goals.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handle} className="signup-auth-form" aria-describedby={error ? 'signup-error' : undefined}>
            
            {/* Full Name Field */}
            <div className="signup-form-field">
              <label htmlFor="fullname" className="signup-form-label">Full name</label>
              <input
                id="fullname"
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value })
                  if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: null })
                }}
                className={fieldErrors.name ? 'signup-form-input error' : 'signup-form-input'}
              />
              {fieldErrors.name && <div className="signup-field-error">{fieldErrors.name}</div>}
            </div>

            {/* Email Field */}
            <div className="signup-form-field">
              <label htmlFor="signup-email" className="signup-form-label">Email address</label>
              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value })
                  if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: null })
                }}
                className={fieldErrors.email ? 'signup-form-input error' : 'signup-form-input'}
              />
              {fieldErrors.email && <div className="signup-field-error">{fieldErrors.email}</div>}
            </div>

            {/* Password Field */}
            <div className="signup-form-field">
              <label htmlFor="signup-password" className="signup-form-label">Password</label>
              <div className="signup-password-wrapper">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value })
                    if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: null })
                  }}
                  className={fieldErrors.password ? 'signup-form-input error' : 'signup-form-input'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="signup-password-visibility-btn"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '✓' : '○'}
                </button>
              </div>
              <PasswordStrength password={form.password} />
              {fieldErrors.password && <div className="signup-field-error">{fieldErrors.password}</div>}
            </div>

            {/* Confirm Password Field */}
            <div className="signup-form-field">
              <label htmlFor="signup-confirm" className="signup-form-label">Confirm password</label>
              <div className="signup-password-wrapper">
                <input
                  id="signup-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={form.confirm}
                  onChange={(e) => {
                    setForm({ ...form, confirm: e.target.value })
                    if (fieldErrors.confirm) setFieldErrors({ ...fieldErrors, confirm: null })
                  }}
                  className={fieldErrors.confirm ? 'signup-form-input error' : 'signup-form-input'}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="signup-password-visibility-btn"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? '✓' : '○'}
                </button>
              </div>
              {fieldErrors.confirm && <div className="signup-field-error">{fieldErrors.confirm}</div>}
            </div>

            {/* Terms Checkbox */}
            <div className="signup-terms-section">
              <label className="signup-terms-checkbox">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(e) => {
                    setForm({ ...form, terms: e.target.checked })
                    if (fieldErrors.terms) setFieldErrors({ ...fieldErrors, terms: null })
                  }}
                />
                <span>
                  I agree to the{' '}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {fieldErrors.terms && <div className="signup-field-error">{fieldErrors.terms}</div>}
            </div>

            {/* Error Message */}
            {error && (
              <div id="signup-error" className="signup-error-box">
                <span className="signup-error-icon">⚠</span>
                <span>
                  {error}
                  {error.includes('already registered') && (
                    <div style={{ marginTop: '8px' }}>
                      <Link to="/login" className="signup-error-link">
                        Sign in instead →
                      </Link>
                    </div>
                  )}
                </span>
              </div>
            )}

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="signup-create-btn"
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="signup-spinner"></span>
                  Creating your account...
                </>
              ) : (
                'Create my account'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="signup-divider">
            <span>OR</span>
          </div>

          {/* Google Button */}
          <button className="signup-google-btn" disabled>
            <span className="signup-google-icon">G</span>
            Continue with Google
          </button>

          {/* Sign In Link */}
          <div className="signup-signin-footer">
            Already have a LearnHub account?{' '}
            <Link to="/login" className="signup-signin-link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
