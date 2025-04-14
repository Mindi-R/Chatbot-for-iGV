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
      const res = await axios.post('http://localhost:5500/api/user/sign-in', { email, password });

      if (res.data.success) {
        setToken(res.data.data.token);
        localStorage.setItem('token', res.data.data.token);
        toast.success('Sign-in successful!');
        setMessage('Sign-in successful!');
      } else {
        toast.error(res.data.message);
      }
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

  useEffect(() => {
    if (token) {
      navigate('/host-profile');
    }
  }, [token]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>
      <form onSubmit={handleSignIn} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
      {message && <p className="text-red-500 mt-3">{message}</p>}
      <p className="mt-4 text-center text-sm">
        Don't have an account? <Link to="/sign-up" className="text-blue-500 hover:underline">Sign up here</Link>
      </p>
    </div>
  );
}

export default SignIn;
