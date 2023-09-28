import React, { useEffect, useState } from 'react';
import authApi from '../api/authApi';

const Logout = () => {
    const [Success, setSuccess] = useState(false);

    useEffect(() => {
        authApi.Logout()
            .then(data => {
                console.log('成功しました', data);
                setSuccess(true);
            })
            .catch(error => {
                console.log('失敗しました', error);
            });
        });

    if (Success) {
        return (
            <div>
                <h1>ログアウト完了</h1>
            </div>
        )
    } else {
        return (
            <div>
                <h1>もう一度やり直してください</h1>
            </div>
        )
    }

}

export default (Logout);