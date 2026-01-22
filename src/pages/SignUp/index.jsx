import './styles.scss';

import { useState } from 'react';
import { FaApple, FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '@/components/Loading';
import { getGoogleLoginUrl } from '@/service/auth';
import { useRegister } from '@/hook/useRegister';

const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState(''); // email/username
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signupErrors, setSignupErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { mutate: register, isPending, isError, error } = useRegister();

  function signupValidate(values = { firstName, lastName, username, password, confirmPassword }) {
    const next = {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      confirmPassword: '',
    };

    if (!values.firstName.trim()) next.firstName = 'Please fill in first name';
    if (!values.lastName.trim()) next.lastName = 'Please fill in last name';
    if (!values.username.trim()) next.username = 'Please fill in email / username';
    if (!values.password) next.password = 'Please fill in password';
    if (!values.confirmPassword) next.confirmPassword = 'Please confirm password';

    if (values.password && values.confirmPassword && values.password !== values.confirmPassword) {
      next.confirmPassword = 'Password and confirm password do not match';
    }

    setSignupErrors(next);
    return Object.values(next).every((v) => !v);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!signupValidate()) return;

    register(
      { firstName, lastName, username, password },
      { onSuccess: () => navigate('/', { replace: true }) }
    );
  }

  const clearSignupError = (key) => {
    if (signupErrors[key]) {
      setSignupErrors((prev) => ({ ...prev, [key]: '' }));
    }
  };

  function handleSocialLogin(provider) {
    if (provider === 'google') window.location.href = getGoogleLoginUrl();
  }

  function navigateSignInPage() {
    navigate('/');
  }

  return (
    <div className="signup-page">
      <Loading isLoading={isPending} />

      <div className="signup-card">
        <header className="signup-header">
          <h1>Bakery</h1>
          <p>Create your account</p>
        </header>

        {isError && (
          <div className="signup-alert">
            {error?.response?.data?.data || 'Server error, try again later'}
          </div>
        )}

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* First + Last name */}
          <div className="signup-name-row">
            <label className="signup-field">
              <span className="signup-label">First name</span>
              <input
                className="signup-input"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  clearSignupError('firstName');
                }}
                onBlur={() => signupValidate()}
                disabled={isPending}
                placeholder="John"
                aria-invalid={!!signupErrors.firstName}
              />
              {signupErrors.firstName && (
                <small className="signup-field-error">{signupErrors.firstName}</small>
              )}
            </label>

            <label className="signup-field">
              <span className="signup-label">Last name</span>
              <input
                className="signup-input"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  clearSignupError('lastName');
                }}
                onBlur={() => signupValidate()}
                disabled={isPending}
                placeholder="Doe"
                aria-invalid={!!signupErrors.lastName}
              />
              {signupErrors.lastName && (
                <small className="signup-field-error">{signupErrors.lastName}</small>
              )}
            </label>
          </div>

          {/* Email / Username */}
          <label className="signup-field signup-field-compact">
            <input
              className="signup-input"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clearSignupError('username');
              }}
              onBlur={() => signupValidate()}
              disabled={isPending}
              placeholder="Email / Username"
              aria-invalid={!!signupErrors.username}
            />
            {signupErrors.username && (
              <small className="signup-field-error">{signupErrors.username}</small>
            )}
          </label>

          {/* Password + Confirm */}
          <div className="signup-password-group">
            <label className="signup-field signup-field-compact">
              <div className="signup-password-row">
                <input
                  className="signup-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearSignupError('password');
                    clearSignupError('confirmPassword');
                  }}
                  onBlur={() => signupValidate()}
                  disabled={isPending}
                  placeholder="Password"
                  aria-invalid={!!signupErrors.password}
                />

                <button
                  type="button"
                  className="signup-ghost-btn"
                  onClick={() => setShowPassword((s) => !s)}
                  disabled={isPending}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {signupErrors.password && (
                <small className="signup-field-error">{signupErrors.password}</small>
              )}
            </label>

            <label className="signup-field signup-field-compact">
              <div className="signup-password-row">
                <input
                  className="signup-input"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    clearSignupError('confirmPassword');
                  }}
                  onBlur={() => signupValidate()}
                  disabled={isPending}
                  placeholder="Confirm password"
                  aria-invalid={!!signupErrors.confirmPassword}
                />

                <button
                  type="button"
                  className="signup-ghost-btn"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  disabled={isPending}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {signupErrors.confirmPassword && (
                <small className="signup-field-error">{signupErrors.confirmPassword}</small>
              )}
            </label>
          </div>

          <button className="signup-primary-btn" disabled={isPending}>
            {isPending ? 'Creating account...' : 'Create Account'}
          </button>

          {/* Social inline */}
          <div className="signup-social-inline">
            <div className="signup-social-icons">
              <button
                type="button"
                className="signup-social-icon google"
                onClick={() => handleSocialLogin('google')}
                disabled={isPending}
                aria-label="Continue with Google"
              >
                <FaGoogle />
              </button>

              <button
                type="button"
                className="signup-social-icon facebook"
                onClick={() => handleSocialLogin('facebook')}
                disabled={isPending}
                aria-label="Continue with Facebook"
              >
                <FaFacebookF />
              </button>

              <button
                type="button"
                className="signup-social-icon github"
                onClick={() => handleSocialLogin('github')}
                disabled={isPending}
                aria-label="Continue with GitHub"
              >
                <FaGithub />
              </button>

              <button
                type="button"
                className="signup-social-icon apple"
                onClick={() => handleSocialLogin('apple')}
                disabled={isPending}
                aria-label="Continue with Apple"
              >
                <FaApple />
              </button>
            </div>
          </div>

          <div className="signup-bottom">
            Already have an account? <a onClick={navigateSignInPage}>Sign in</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
