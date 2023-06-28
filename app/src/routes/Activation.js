import React, { useEffect } from 'react';
import authApi from '../api/authApi';
import { useParams } from "react-router-dom";

export default function Activation() {
    const { uid, token } = useParams();

    useEffect(() => {
        if (uid && token) {
            authApi.Activate(uid, token)
                .then(data => {
                    console.log('成功しました', data);
                })
                .catch(error => {
                    console.log('失敗しました', error);
                });
        }
    }, [uid, token]);

}
