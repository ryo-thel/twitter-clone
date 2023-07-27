import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tweetApi from '../api/tweetApi';

const Home = () => {
    const [tweetList, setTweetList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        tweetApi.getTweetList()
        .then(data => {
            console.log('成功しました', data);
            setTweetList(data);
        })
        .catch(error => {
            console.log('失敗しました', error);
        });
    }, [])

    return (
        <div>
            <h1>Tweet List</h1>
            <ul>
                {tweetList.map(tweet => (
                    <li key={tweet.id}>
                        <span onClick={() => navigate(`/users/${tweet.user}`)}>{tweet.username}</span> : {tweet.content}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Home;
