import React, { useEffect, useState } from 'react';
import '../styles/SignIn.scss';
import supabase from '../supabase';
import { emailRegEx, passwordRegEx } from '../regex/regex';

function SignIn({ setShowSignIn, setIsLogIn, setUserData }) {
    const [showSignUpPage, setShowSignUpPage] = useState(false);

    useEffect(() => {
        const prevScrollY = preventScroll();

        return () => {
            allowScroll(prevScrollY);
        };
    }, []);

    const preventScroll = () => {
        const scrollPosition = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.overflowY = 'scroll';
        return scrollPosition;
    };

    const allowScroll = (prevScrollY) => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.overflowY = '';
        window.scrollTo({
            top: prevScrollY,
            left: 0,
        });
    };

    return (
        <div className="sign__in__container" onClick={() => setShowSignIn(false)}>
            {showSignUpPage ? (
                <SignUpCard setShowSignUpPage={setShowSignUpPage} />
            ) : (
                <SignInCard
                    setShowSignUpPage={setShowSignUpPage}
                    setShowSignIn={setShowSignIn}
                    setIsLogIn={setIsLogIn}
                    setUserData={setUserData}
                />
            )}
        </div>
    );
}

function SignInCard({ setShowSignUpPage, setShowSignIn, setIsLogIn, setUserData }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
        setEmailTouched(true);
    };

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
        setPasswordTouched(true);
    };

    const handleSignInBtn = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (error) {
                console.log(error);
                alert('일치하는 유저정보가 없습니다.');
                return;
            } else {
                console.log(data);
                alert(`${data.user?.user_metadata?.name}님 로그인되었습니다.`);
                setUserData(data.user);
                setIsLogIn(true);
                setShowSignIn(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const signInWithGoogle = async (e) => {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        const userData = await supabase.from('user_table').insert({
            user_id: data?.user?.id,
            name: data?.user?.user_metadata?.name,
            email: data?.user?.email,
            created_at: data?.user?.created_at,
        });
        console.log(data);
        console.log(userData);
    };

    const handleSignUpBtn = (e) => {
        e.preventDefault();
        setShowSignUpPage((prev) => !prev);
    };

    useEffect(() => {
        if (emailTouched) {
            let emailValid = emailRegEx.test(email);
            setIsEmailValid(emailValid || email === '');
        }
    }, [email, emailTouched]);

    useEffect(() => {
        if (passwordTouched) {
            let passwordValid = passwordRegEx.test(password);
            setIsPasswordValid(passwordValid || password === '');
        }
    }, [password, passwordTouched]);

    useEffect(() => {
        if (email && password) setButtonDisabled(false);
        if (email === '' && password === '') setButtonDisabled(true);
    }, [email, password]);

    return (
        <div className="sign__in" onClick={(e) => e.stopPropagation()}>
            <h2>로그인</h2>
            <form>
                <div className="email">
                    <label>이메일</label>
                    <input type="email" placeholder="example@example.com" value={email} onChange={handleEmailInput} />
                    <p>{emailTouched && !isEmailValid && email !== '' ? '올바른 이메일 형식이 아닙니다.' : ''}</p>
                </div>
                <div className="password">
                    <label>비밀번호</label>
                    <input type="password" placeholder="비밀번호" value={password} onChange={handlePasswordInput} />
                    <p>
                        {passwordTouched && !isPasswordValid && password !== ''
                            ? '올바른 비밀번호 형식이 아닙니다.'
                            : ''}
                    </p>
                </div>
                <div className="sign__in__btns">
                    <button onClick={handleSignInBtn} disabled={buttonDisabled}>
                        로그인
                    </button>
                    <button onClick={signInWithGoogle}>구글 로그인</button>
                </div>
            </form>
            <div className="sign__up__btn">
                <p>모리로무비가 처음이신가요?</p>
                <button onClick={handleSignUpBtn}>회원가입</button>
            </div>
        </div>
    );
}

function SignUpCard({ setShowSignUpPage }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isPasswordEqual, setIsPasswordEqual] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [passwordCheckTouched, setPasswordCheckTouched] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        if (emailTouched) {
            let emailValid = emailRegEx.test(email);
            setIsEmailValid(emailValid || email === '');
        }
    }, [email, emailTouched]);

    useEffect(() => {
        if (passwordTouched) {
            let passwordValid = passwordRegEx.test(password);
            setIsPasswordValid(passwordValid || password === '');
        }
    }, [password, passwordTouched]);

    useEffect(() => {
        if (passwordCheckTouched) {
            let passwordConfirm = password === passwordCheck;
            setIsPasswordEqual(passwordConfirm || passwordCheck === '');
        }
    }, [passwordCheck, password, passwordCheckTouched]);

    useEffect(() => {
        if (isEmailValid && isPasswordValid && isPasswordEqual) setButtonDisabled(false);
        if ((email, password, passwordCheck === '')) setButtonDisabled(true);
    }, [email, password, passwordCheck, isEmailValid, isPasswordValid, isPasswordEqual]);

    const handleSignUpBtn = async (e) => {
        e.preventDefault();
        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: name,
                    },
                },
            });
            if (error) {
                alert('회원가입에 실패했습니다.');
                console.error(error);
            } else {
                const userData = await supabase.from('user_table').insert({
                    user_id: data.user?.id,
                    name: name,
                    email: data.user?.email,
                    created_at: data.user?.created_at,
                });
                console.log(data);
                alert(`${data.user?.user_metadata?.name}님, 모리로 무비에 가입하신걸 환영합니다.`);
                setShowSignUpPage(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleReturnSignInBtn = (e) => {
        e.preventDefault();
        setShowSignUpPage((prev) => !prev);
    };

    const handleNameInput = (e) => {
        setName(e.target.value);
    };

    const handleEmailInput = (e) => {
        setEmail(e.target.value);
        setEmailTouched(true);
    };

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
        setPasswordTouched(true);
    };

    const handlePasswordCheckInput = (e) => {
        setPasswordCheck(e.target.value);
        setPasswordCheckTouched(true);
    };

    return (
        <div className="sign__up" onClick={(e) => e.stopPropagation()}>
            <h2>회원가입</h2>
            <form>
                <div className="user__name">
                    <label>이름</label>
                    <input type="text" placeholder="이름" onChange={handleNameInput} />
                </div>
                <div className="email">
                    <label>이메일</label>
                    <input type="email" placeholder="example@example.com" onChange={handleEmailInput} />
                    <p>{emailTouched && !isEmailValid && email !== '' ? '올바른 이메일 형식이 아닙니다.' : ''}</p>
                </div>
                <div className="password">
                    <label>비밀번호</label>
                    <input type="password" placeholder="비밀번호" onChange={handlePasswordInput} />
                    <p>
                        {passwordTouched && !isPasswordValid && password !== ''
                            ? '올바른 비밀번호 형식이 아닙니다.'
                            : ''}
                    </p>
                </div>
                <div className="password__confirm">
                    <label>비밀번호 재확인</label>
                    <input type="password" placeholder="비밀번호 재확인" onChange={handlePasswordCheckInput} />
                    <p>
                        {passwordCheckTouched && !isPasswordEqual && passwordCheck !== ''
                            ? '비밀번호가 일치하지 않습니다.'
                            : ''}
                    </p>
                </div>
                <div className="sign__up__btns">
                    <button onClick={handleSignUpBtn} disabled={buttonDisabled}>
                        회원가입
                    </button>
                </div>
                <div className="sign__in__btn">
                    <p>이미 계정이 있으신가요?</p>
                    <button onClick={handleReturnSignInBtn}>로그인</button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
