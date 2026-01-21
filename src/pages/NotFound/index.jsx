import { useNavigate } from 'react-router-dom';
import './styles.scss';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="nf">
      <div className="nf-card">
        <h1 className="nf-code">404</h1>
        <h2 className="nf-title">Page not found</h2>
        <p className="nf-desc">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <button className="nf-btn" onClick={() => navigate('/')}>
          Go back home
        </button>
      </div>
    </div>
  );
}
