import { useMutation } from '@tanstack/react-query';
import { getGoogleToken } from '@/service/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

export const useGoogleLoginCallBack = () => {
  const navigate = useNavigate();

  const { addToken } = useAuth();

  return useMutation({
    mutationFn: getGoogleToken,
    onSuccess: (response) => {
      const token = response.data.data;
      localStorage.setItem('token', token);
      addToken(token);
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
