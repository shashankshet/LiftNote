import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await authService.login({ email, password });
      authService.saveToken(response.token);
      navigate('/track'); // Redirect to workout tracking page
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/google');
      const data = await response.json();
      window.location.href = data.url;
    } catch (err) {
      setError('Failed to initialize Google login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-black rounded-xl border border-gray-800">
        <div>
          <h2 className="text-center text-3xl font-bold text-white">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-center text-sm">{error}</div>
          )}
          <div className="space-y-4">
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
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={() => navigate('/signup')}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Don't have an account? Sign up
          </button>
        </div>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-800 rounded-lg text-white hover:bg-gray-900 transition-colors focus:outline-none"
            >
              <img
                className="h-5 w-5 mr-2"
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
              />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 