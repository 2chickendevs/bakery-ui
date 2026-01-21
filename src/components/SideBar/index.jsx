import './style.scss';

import Logo from '@/asset/image/logo.jpeg';

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useOnFetch from '@/hook/useOnFetch';
import * as authService from '@/service/auth';
import { storePersist } from '@/redux/storePersist';

import { RESET_APP } from '@/redux/commonTypes';
import { useDispatch } from 'react-redux';
import LoadingOverlay from '@/components/LoadingOverlay';

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (pathname) => location.pathname === pathname && 'active';

  const {
    onFetch: signOutStmt,
    isLoading: isSignOutLoading,
    statusCode: signOutStatusCode,
  } = useOnFetch();
  const signOut = (event) => {
    event.preventDefault();
    signOutStmt(authService.signOut);
  };

  useEffect(() => {
    if (!signOutStatusCode) return;
    storePersist.remove('token');
    dispatch({ type: RESET_APP });
    navigate('/');
  }, [isSignOutLoading]);

  return (
    <div className="sidebar-layout">
      <LoadingOverlay isLoading={isSignOutLoading} />

      <div className="sidebar-container">
        <div className="sidebar-logo">
          <img src={Logo} alt="logo image" />

          <div>Book store</div>
        </div>

        <div className="sidebar-menus">
          <div className={`sidebar-menu ${isActive('/')} `} onClick={() => navigate('/')}>
            <i className="pi pi-home"></i>
            <div>Dashboard</div>
          </div>
          <div
            className={`sidebar-menu ${isActive('/topics')} `}
            onClick={() => navigate('/topics')}
          >
            <i className="pi pi-pen-to-square"></i>
            <div>Topics</div>
          </div>
          <div className={`sidebar-menu ${isActive('/words')} `} onClick={() => navigate('/words')}>
            <i className="pi pi-book"></i>
            <div>Words</div>
          </div>
          <div
            className={`sidebar-menu ${isActive('/practice')} `}
            onClick={() => navigate('/practice')}
          >
            <i className="pi pi-pen-to-square"></i>
            <div>Practice</div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-menu" onClick={signOut}>
            <i className="pi pi-sign-out"></i>
            <div>Sign out</div>
          </div>
        </div>
      </div>
    </div>
  );
}
