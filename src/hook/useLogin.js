import { useMutation } from '@tanstack/react-query';
import { login } from '@/service/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

export const useLogin = () => {
  const navigate = useNavigate();

  const { addToken } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const token = response.data.data;
      localStorage.setItem('token', token);
      addToken(token);
      navigate('/');
    },
    onError: (error) => {
      console.log("Login error:" + error);
    },
  });
};
