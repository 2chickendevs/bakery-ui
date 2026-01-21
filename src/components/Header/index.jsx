import './style.scss';

import { useSelector } from 'react-redux';
import { selectUser } from '@/redux/user/selectors';

import { Avatar } from 'primereact/avatar';

export default function Header() {
  const currentUser = useSelector(selectUser);

  const getGreetingMessage = () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      return 'Good morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  return (
    <div className="header-container">
      <div className="header-greeting">
        {getGreetingMessage()} {currentUser.firstName}
      </div>

      <div className="header-user-container">
        {currentUser.avatarUrl ? (
          <Avatar
            image={currentUser.avatarUrl}
            className="header-user-icon"
            size="large"
            shape="circle"
          />
        ) : (
          <Avatar className="header-user-icon" icon="pi pi-user" size="large" shape="circle" />
        )}
      </div>
    </div>
  );
}
