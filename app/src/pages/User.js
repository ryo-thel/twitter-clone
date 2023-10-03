import React, { useEffect, useState } from 'react';
import authApi from '../api/authApi';

const useUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authApi.getUser()
      .then(data => {
        console.log('成功しました', data);
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.log('失敗しました', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { user, error, loading };
};

const User = () => {
  const { user, error, loading } = useUser();

  if (loading) {
    return (
      <div>
        <h1>読み込み中...</h1>
      </div>
    );
  } else if (user) {
    return (
      <div>
        <h1>ユーザー名: {user.data.username}</h1>
      </div>
    );
  } else if (error) {
    return (
      <div>
        <h1>エラー: {error.message}</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>もう一度やり直してください</h1>
      </div>
    );
  }
};

export default User;