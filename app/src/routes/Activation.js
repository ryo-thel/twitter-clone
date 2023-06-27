import React, { useEffect } from 'react';
import { Activate } from '../api/authApi';
import useQuery from '../hooks/getParams';

export default function Activation() {
    const { uid, token } = useQuery();

    useEffect(() => {
        if (uid && token) {
            Activate(uid, token)
                .then(data => {
                    console.log('成功しました', data);
                })
                .catch(error => {
                    console.log('失敗しました', error);
                });
        }
    }, [uid, token]);

}
