import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.signup({ email, password, name });
      authService.saveToken(response.token);
      navigate('/track');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-black rounded-xl border border-gray-800">
        <div>
          <h2 className="text-center text-3xl font-bold text-white">Create your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}
          <div className="space-y-4">
            <div>
              <input
                type="text"
                required
                className="w-full p-3 bg-black text-white rounded-lg border border-gray-800 focus:border-white transition-colors focus:outline-none"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                required
                className="w-full p-3 bg-black text-white rounded-lg border border-gray-800 focus:border-white transition-colors focus:outline-none"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className="w-full p-3 bg-black text-white rounded-lg border border-gray-800 focus:border-white transition-colors focus:outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-white text-black p-4 rounded-lg text-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup; 