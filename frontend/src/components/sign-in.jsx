import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5500/api/user/sign-in', {email, password} );
      // console.log(res.data.data.token);

      if (res.data.success) {
        setToken(res.data.data.token);
        localStorage.setItem('token', res.data.data.token);
        toast.success('Sign-in successful!');
        setMessage('Sign-in successful!');
      }
      else {
        toast.error(res.data.message);
      }
    } 
    catch (err) {
      if (err.response) {
        console.error('Server responded with:', err.response.data);
        setMessage(err.response.data.message || 'Sign in failed!');
      } else {
        console.error('Error:', err.message);
        setMessage('Network error or server not reachable');
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/host-profile');
    }
  }, [token])

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '0.5rem' }}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '0.5rem' }}
        /><br />
        <button type="submit" style={{ width: '100%' }}>Sign In</button>
      </form>
      <p>{message}</p>
      <p>Don't have an account? <Link to="/sign-up">Sign up here</Link></p>
    </div>
  );
}

export default SignIn;