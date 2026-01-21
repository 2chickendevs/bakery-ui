import './style.scss';
import { ProgressSpinner } from 'primereact/progressspinner';

const Loading = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="loading-layout">
        <ProgressSpinner
          className="loading-icon gradient-spinner"
          style={{ width: '50px', height: '50px' }}
          strokeWidth="6"
          animationDuration=".8s"
        />
      </div>
    )
  );
};

export default Loading;