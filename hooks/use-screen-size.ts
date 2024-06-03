// useScreenSize.js
import { useState, useEffect } from 'react';

const getScreenSize = () => {
    if (typeof window === 'undefined') {
        return {
            width: 0,
            height: 0,
        };
    }
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
};

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState(getScreenSize());

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(getScreenSize());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const { width } = screenSize
    let screen: any;

    if (width < 600) {
        screen = 'sm';
    } else if (width >= 600 && width < 960) {
        screen = 'md';
    } else {
        screen = 'lg';
    }


    return screen;
};

export default useScreenSize;
