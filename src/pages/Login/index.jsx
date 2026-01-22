import './styles.scss';

import { useState } from 'react';
import { FaApple, FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { useLogin } from '@/hook/useLogin';
import Loading from '@/components/Loading';
import { getGoogleLoginUrl } from '@/service/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({ username: '', password: '' });

  const { mutate: login, isPending, isError, error } = useLogin();

  function validate(values = { username, password }) {
    const next = { username: '', password: '' };

    if (!values.username.trim()) next.username = 'Please fill in the username';
    if (!values.password) next.password = 'Please fill in the password';

    setErrors(next);
    return !next.username && !next.password;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    login({ username, password });
  }

  function handleUsernameChange(e) {
    const value = e.target.value;
    setUsername(value);

    if (errors.username) {
      setErrors((prev) => ({ ...prev, username: '' }));
    }
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);

    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: '' }));
    }
  }

  function handleSocialLogin(provider) {
    if (provider === 'google') {
      window.location.href = getGoogleLoginUrl();
    }
  }

  function navigateSignUpPage() {
    navigate('/signup');
  }

  return (
    <div className="login-page">
      <Loading isLoading={isPending} />

      <div className="login-card">
        <header className="login-header">
          <h1>Bakery</h1>
          <p>Sign in to your account</p>
        </header>

        {isError && (
          <div className="alert">
            {error?.response?.data?.data || 'Server error, try again later'}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email / Username</span>

            <div className="username-row">
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                onBlur={() => validate({ username, password })}
                disabled={isPending}
                placeholder="you@example.com"
                aria-invalid={!!errors.username}
              />
            </div>

            {errors.username && <small className="field-error">{errors.username}</small>}
          </label>

          <label className="field">
            <span>Password</span>

            <div className="password-row">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => validate({ username, password })}
                disabled={isPending}
                placeholder="••••••••"
                aria-invalid={!!errors.password}
              />

              <button
                type="button"
                className="ghost-btn"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {errors.password && <small className="field-error">{errors.password}</small>}
          </label>

          <button className="primary-btn" disabled={isPending}>
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="divider">
          <span />
          <em>or</em>
          <span />
        </div>

        <p className="social-text">Continue with</p>

        <div className="social-icons">
          <button className="social-icon google" onClick={() => handleSocialLogin('google')}>
            <FaGoogle />
          </button>
          <button className="social-icon facebook" onClick={() => handleSocialLogin('facebook')}>
            <FaFacebookF />
          </button>
          <button className="social-icon github" onClick={() => handleSocialLogin('github')}>
            <FaGithub />
          </button>
          <button className="social-icon apple" onClick={() => handleSocialLogin('apple')}>
            <FaApple />
          </button>
        </div>

        <footer className="login-footer">
          New here? <a onClick={navigateSignUpPage}>Create account</a>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
