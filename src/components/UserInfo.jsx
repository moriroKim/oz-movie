import React from 'react';
import { useState } from 'react';
import '../styles/MyPage.scss';
import supabase from '../supabase';
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function UserInfo({ userData, setUserData, setIsLogIn }) {
    const [userMetaData] = useState(userData?.user_metadata);
    const [isDisabled, setIsDisabled] = useState(true);
    const [emailInputValue, setEmailInputValue] = useState(userMetaData?.name);
    const navigate = useNavigate();
    console.log(emailInputValue);

    const handleEditButton = (e) => {
        e.preventDefault();
        setIsDisabled((prev) => !prev);

        if (emailInputValue && !isDisabled) {
            const confirmPrompt = confirm(`닉네임을 ${emailInputValue}(으)로 수정하시겠습니까?`);
            if (confirmPrompt) {
                const postUserData = async () => {
                    try {
                        const { data, error } = await supabase.auth.updateUser({
                            data: {
                                name: emailInputValue,
                            },
                        });
                        console.log(data);
                        alert(`성공적으로 닉네임이 ${emailInputValue}(으)로 수정되었습니다.`);
                        window.location.reload();
                        if (error) throw error;
                    } catch (error) {
                        console.error(error);
                    }
                };
                postUserData();
            }
        }
    };

    const handleNickNameInput = (e) => {
        setEmailInputValue(e.target.value);
    };
    const handleWithdraw = (e) => {
        e.preventDefault();
        const confirmPrompt = confirm('정말로 탈퇴하시겠습니까?');

        if (confirmPrompt) {
            const deleteUser = async () => {
                try {
                    const { data } = await supabase.rpc('delete_user');
                    const { error } = await supabase.auth.signOut();
                    if (error) {
                        throw error;
                    }
                    navigate('/');
                    setIsLogIn(false);
                    if (error) {
                        throw error;
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            deleteUser();
        } else {
            return;
        }
    };

    return (
        <div className="user-information">
            <div className="info-container">
                <h2>회원정보수정</h2>
                <form>
                    <div className="nick-name-input">
                        <label>닉네임 : </label>
                        <input
                            type="text"
                            disabled={isDisabled}
                            value={emailInputValue}
                            onChange={handleNickNameInput}
                        />
                        <button onClick={handleEditButton}>{isDisabled ? '수정' : '완료'}</button>
                    </div>
                    <div className="email-input">
                        <label>이메일 : </label>
                        <input type="email" disabled={true} placeholder={userMetaData?.email} />
                    </div>
                    <button onClick={handleWithdraw}>회원탈퇴</button>
                </form>
            </div>
        </div>
    );
}

export default UserInfo;
