import './styles.scss';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { USER_INFO_RETRIEVE_SUCCESS } from '@/redux/user/types';
import { RESET_APP } from '@/redux/commonTypes';
import { storePersist } from '@/redux/storePersist';
import { selectUser } from '@/redux/user/selectors';
import useOnFetch from '@/hook/useOnFetch';
import { getUserInfo } from '@/service/user';

import SideBar from '@/components/SideBar';

const Layout = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userInfo = useSelector(selectUser);

  const {
    onFetch: userInfoStmt,
    result: userInfoResult,
    isSuccess: userInfoSuccess,
    isLoading: isLoadingUserInfo,
    statusCode: statusCodeUserInfo,
  } = useOnFetch();

  useEffect(() => {
    const token = storePersist.get('token');
    if (token && !userInfo.id) {
      userInfoStmt(getUserInfo);
    }
  }, []);

  useEffect(() => {
    if (!statusCodeUserInfo) return;

    if (userInfoSuccess) {
      dispatch({
        type: USER_INFO_RETRIEVE_SUCCESS,
        payload: userInfoResult,
      });
    } else {
      storePersist.remove('token');
      dispatch({ type: RESET_APP });
      navigate('/');
    }
  }, [isLoadingUserInfo]);

  return (
    <>
      <div className="center-layout-container">
        <div className="center-layout-sidebar">
          <SideBar />
        </div>

        <div className="center-layout-content">{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
