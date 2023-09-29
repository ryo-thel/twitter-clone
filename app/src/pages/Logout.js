import React from 'react';
import authApi from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Display confirmation dialog
    const confirmation = window.confirm("Logoutしますか?");
    if (confirmation) {
      // Proceed with logout if user confirms
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
    }
  };

  return null;
};

export default Logout;
