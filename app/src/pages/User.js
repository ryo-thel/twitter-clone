import React, { useEffect, useState } from 'react';
import authApi from '../api/authApi';

const User = () => {
    const [Success, setSuccess] = useState(false);

    useEffect(() => {
        authApi.getUser()
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
                <h1>成功</h1>
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

export default (User);
