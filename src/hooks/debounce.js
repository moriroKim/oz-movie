import React, { useEffect, useState } from 'react';

export default function useDebounce(value, delay) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timerId = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timerId);
    }, [value, delay]);

    return debounced;
}
