import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';
import { signUp } from '@/service/auth';

export const useRegister = () => {
  const navigate = useNavigate();
  const { addToken } = useAuth();

  return useMutation({
    mutationFn: signUp,
    onSuccess: (response) => {
      const token = response.data.data;
      localStorage.setItem('token', token);
      addToken(token);
      navigate('/');
    },
  });
};
