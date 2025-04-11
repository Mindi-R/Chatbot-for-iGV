import React, { useState } from 'react';
import axios from 'axios';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5500/api/v1/auth/sign-in',
        {
          email,
          password,
        },
        {
          withCredentials: true, 
        }
      );

      localStorage.setItem("token", res.data.data.token);

      setMessage('Signed in successfully!');
      console.log('Sign-in response:', res.data);
    } catch (err) {
      if (err.response) {
        console.error('Server responded with:', err.response.data);
        setMessage(err.response.data.message || 'Sign in failed!');
      } else {
        console.error('Error:', err.message);
        setMessage('Network error or server not reachable');
      }
    }
  };

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
    </div>
  );
}

export default SignIn;