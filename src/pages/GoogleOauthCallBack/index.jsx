import './styles.scss';

import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGoogleLoginCallBack } from '@/hook/useGoogleLoginCallBack';
import Loading from '@/components/Loading';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const code = params.get('code');
  const state = params.get('state');
  const error = params.get('error');

  const { mutate: getToken, isPending, isError } = useGoogleLoginCallBack();

  useEffect(() => {
    if (error) return;

    if (!code || !state) return;

    getToken({ code, state });
  }, [code, state, error, getToken, navigate]);

  /* =====================
     ERROR FROM GOOGLE
  ===================== */
  if (error) {
    return (
      <div className="oauth">
        <div className="oauth-card">
          <h1 className="oauth-title">Google sign-in failed</h1>
          <p className="oauth-desc">{error}</p>

          <button className="oauth-btn" onClick={() => navigate('/', { replace: true })}>
            Back to login
          </button>
        </div>
      </div>
    );
  }

  /* =====================
     MISSING PARAMS
  ===================== */
  if (!code || !state) {
    return (
      <div className="oauth">
        <div className="oauth-card">
          <h1 className="oauth-title">Invalid callback</h1>
          <p className="oauth-desc">Missing authorization information. Please try again.</p>

          <button className="oauth-btn" onClick={() => navigate('/', { replace: true })}>
            Back to login
          </button>
        </div>
      </div>
    );
  }

  /* =====================
     BACKEND ERROR
  ===================== */
  if (isError) {
    return (
      <div className="oauth">
        <div className="oauth-card">
          <h1 className="oauth-title">Authentication failed</h1>
          <p className="oauth-desc">Could not complete Google authentication.</p>

          <button className="oauth-btn" onClick={() => navigate('/', { replace: true })}>
            Back to login
          </button>
        </div>
      </div>
    );
  }

  /* =====================
    LOADING (PRO)
 ===================== */
  return (
    <div className="oauth">
      <div className="oauth-card oauth-loading">
        <div className="oauth-loader" />

        <h1 className="oauth-title">Signing you in</h1>
        <p className="oauth-desc">Securely connecting to your Google account…</p>

        <p className="oauth-hint">This will only take a moment</p>
      </div>
    </div>
  );
}
