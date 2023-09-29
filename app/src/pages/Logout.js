import React, { useEffect, useState } from 'react';
import authApi from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const [Success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    authApi.Logout()
      .then(data => {
        console.log('成功しました', data);
        setSuccess(true);
        // Display success toast
        toast.success('ログアウト完了', {
          onClose: () => navigate("/login"),  // Redirect to login on toast close
          autoClose: 2000,  // Set autoClose time
        });
      })
      .catch(error => {
        console.log('失敗しました', error);
      });
  }, [navigate]);

  return (
    <div>
      <ToastContainer />  {/* ToastContainer to display toast */}
      {Success ? (
        <h1>ログアウト完了</h1>
      ) : (
        <h1>もう一度やり直してください</h1>
      )}
    </div>
  );
}

export default Logout;
