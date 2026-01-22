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

  const [loginErrors, setLoginErrors] = useState({ username: '', password: '' });

  const { mutate: login, isPending, isError, error } = useLogin();

  function loginValidate(values = { username, password }) {
    const next = { username: '', password: '' };

    if (!values.username.trim()) next.username = 'Please fill in the username';
    if (!values.password) next.password = 'Please fill in the password';

    setLoginErrors(next);
    return !next.username && !next.password;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!loginValidate()) return;
    login({ username, password });
  }

  function handleUsernameChange(e) {
    const value = e.target.value;
    setUsername(value);

    if (loginErrors.username) {
      setLoginErrors((prev) => ({ ...prev, username: '' }));
    }
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);

    if (loginErrors.password) {
      setLoginErrors((prev) => ({ ...prev, password: '' }));
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
          <div className="login-alert">
            {error?.response?.data?.data || 'Server error, try again later'}
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-field">
            <span>Email / Username</span>

            <div className="login-username-row">
              <input
                className="login-input"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                onBlur={() => loginValidate({ username, password })}
                disabled={isPending}
                placeholder="you@example.com"
                aria-invalid={!!loginErrors.username}
              />
            </div>

            {loginErrors.username && (
              <small className="login-field-error">{loginErrors.username}</small>
            )}
          </label>

          <label className="login-field">
            <span>Password</span>

            <div className="login-password-row">
              <input
                className="login-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                onBlur={() => loginValidate({ username, password })}
                disabled={isPending}
                placeholder="••••••••"
                aria-invalid={!!loginErrors.password}
              />

              <button
                type="button"
                className="login-ghost-btn"
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            {loginErrors.password && (
              <small className="login-field-error">{loginErrors.password}</small>
            )}
          </label>

          <button className="login-primary-btn" disabled={isPending}>
            {isPending ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-divider">
          <span />
          <em>or</em>
          <span />
        </div>

        <p className="login-social-text">Continue with</p>

        <div className="login-social-icons">
          <button
            type="button"
            className="login-social-icon google"
            onClick={() => handleSocialLogin('google')}
          >
            <FaGoogle />
          </button>

          <button
            type="button"
            className="login-social-icon facebook"
            onClick={() => handleSocialLogin('facebook')}
          >
            <FaFacebookF />
          </button>

          <button
            type="button"
            className="login-social-icon github"
            onClick={() => handleSocialLogin('github')}
          >
            <FaGithub />
          </button>

          <button
            type="button"
            className="login-social-icon apple"
            onClick={() => handleSocialLogin('apple')}
          >
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
