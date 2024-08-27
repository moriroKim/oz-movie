import React, { useEffect } from 'react';

function Observer({ setPage }) {
    const handleObserver = (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 0.3,
        });

        const observerTarget = document.getElementById('observer');

        if (observerTarget) {
            observer.observe(observerTarget);
        }
    }, []);

    return <div id="observer"></div>;
}

export default Observer;
