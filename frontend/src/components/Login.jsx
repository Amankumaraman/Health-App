import React, { useState } from 'react';

const DEMO_USER = {
  email: 'demo@health.com',
  password: 'demo123'
};

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      localStorage.setItem('isLoggedIn', 'true');
      onLogin();
    } else {
      setError('❌ Invalid email or password');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="card w-full max-w-sm">
        <h2 className="section-title mb-4 text-center">🔐Login</h2>
        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
        <input
          className="w-full mb-3 p-2 border rounded text-sm"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 border rounded text-sm"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="text-xs text-gray-400 mt-3 text-center">
          Use <strong>demo@health.com</strong> / <strong>demo123</strong>
        </p>
      </div>
    </div>
  );
}
