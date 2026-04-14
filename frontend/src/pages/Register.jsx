import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, ShieldCheck } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await register(formData.username, formData.email, formData.password, formData.role);
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container animate-fade-in">
      <div className="glass-card auth-card">
        <div className="auth-header">
          <div className="logo-icon">
            <ShieldCheck size={32} color="#6366f1" />
          </div>
          <h1>Join Us</h1>
          <p>Create your account for free</p>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              name="username"
              type="text" 
              className="input-field" 
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              name="email"
              type="email" 
              className="input-field" 
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              name="password"
              type="password" 
              className="input-field" 
              placeholder="Minimum 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Account Role</label>
            <select 
              name="role"
              className="input-field" 
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">User (Default)</option>
              <option value="admin">Admin (Testing Only)</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-full">
            <UserPlus size={18} /> Create Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
