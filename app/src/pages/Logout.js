import React from 'react';
import authApi from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const userConfirmed = window.confirm('ログアウトしますか?');

    if (!userConfirmed) {
      navigate('/');
      return;
    }

    // Proceed with logout
    authApi.Logout()
      .then(data => {
        console.log('成功しました', data);
        // Display success toast
        toast.success('ログアウト完了', {
          onClose: () => navigate("/login"),  // Redirect to login on toast close
          autoClose: 2000,  // Set autoClose time
        });
      })
      .catch(error => {
        console.log('失敗しました', error);
        // Display error toast
        toast.error('ログアウト失敗', {
          onClose: () => navigate("/"),
          autoClose: 2000,  // Set autoClose time
        });
      });
  };

  return (
    <div>
      <button onClick={handleLogout}>ログアウト</button>
      <button onClick={() => navigate("/")}>キャンセル</button>
    </div>
  );
};

export default Logout;
