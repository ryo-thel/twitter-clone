import React, { useEffect, useState } from 'react';
import authApi from '../api/authApi';
import { useParams } from "react-router-dom";

export default function Activation() {
    const { uid, token } = useParams();
    const [Success, setSuccess] = useState(false);

    useEffect(() => {
        if (uid && token) {
            authApi.Activate(uid, token)
                .then(data => {
                    console.log('成功しました', data);
                    setSuccess(true);
                })
                .catch(error => {
                    console.log('失敗しました', error);
                });
        }
    }, [uid, token]);

    if (Success) {
        return (
            <div>
                <h1>本登録完了</h1>
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
