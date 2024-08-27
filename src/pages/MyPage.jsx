import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MyPage.scss';
import BookMark from '../components/BookMark';
import UserInfo from '../components/UserInfo';
import supabase from '../supabase';

function MyPage({ isLogIn, setIsLogIn, setShowSignIn, userData, setUserData }) {
    const [showBookMark, setShowBookMark] = useState(true);
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [isSessionValid, setIsSessionValid] = useState(null);
    const navigate = useNavigate();

    const handleShowBookMark = () => {
        setShowUserInfo(false);
        setShowBookMark(true);
    };

    const handleShowUserInfo = () => {
        setShowBookMark(false);
        setShowUserInfo(true);
    };

    useEffect(() => {
        const fetchUserLoginData = async () => {
            try {
                const {
                    data: { session },
                    error,
                } = await supabase.auth.getSession();

                if (error) {
                    console.error('유저 로그인 정보를 불러오는데 실패했습니다:', error.message);
                    return;
                }

                if (session) {
                    setIsSessionValid(true);
                    setIsLogIn(true);
                } else {
                    setIsSessionValid(false);
                    setIsLogIn(false);
                }
            } catch (error) {
                console.error('에러:', error);
                setIsSessionValid(false);
            }
        };

        fetchUserLoginData();
    }, []);

    useEffect(() => {
        if (isSessionValid === false) {
            alert('로그인이 필요한 페이지입니다.');
            navigate('/');
            setShowSignIn(true);
        }
    }, [isSessionValid]);

    if (!isSessionValid) {
        return null; // 세션이 유효하지 않으면 렌더링하지 않음
    }

    return (
        <div className="my-page-container">
            <div className="user-utils">
                <div className="user-profile">
                    <h2>{userData?.user_metadata?.name + '님의 마이페이지'}</h2>
                </div>
                <ul className="user-menu">
                    <li>
                        <button onClick={handleShowBookMark}>북마크</button>
                    </li>
                    <li>
                        <button onClick={handleShowUserInfo}>회원정보수정</button>
                    </li>
                </ul>
                <div className="user-info-display">
                    {showBookMark && <BookMark userData={userData} />}
                    {showUserInfo && <UserInfo userData={userData} setUserData={setUserData} setIsLogIn={setIsLogIn} />}
                </div>
            </div>
        </div>
    );
}

export default MyPage;
