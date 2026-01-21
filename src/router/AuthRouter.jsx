import { Routes, Route } from 'react-router-dom';

import LoginPage from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import GoogleOauthCallBack from '@/pages/GoogleOauthCallBack';

export default function AuthRouter() {
  return (
    <Routes>
      <Route element={<LoginPage />} path="/" />
      <Route element={<GoogleOauthCallBack />} path="/google/login/callback" />
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}