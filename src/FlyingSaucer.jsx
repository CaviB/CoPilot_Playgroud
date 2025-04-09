import React, { useEffect } from 'react';
import './index.css';

const FlyingSaucer = () => {
    useEffect(() => {
        const saucer = document.createElement('div');
        saucer.className = 'flying-saucer';

        const shootLaser = () => {
            const laser = document.createElement('div');
            laser.className = 'laser-beam';
            laser.style.top = `${parseInt(saucer.style.top || '50')}px`;
            laser.style.left = `${parseInt(saucer.style.left || '50')}px`;

            document.body.appendChild(laser);

            setTimeout(() => {
                laser.remove();
            }, 2000);
        };

        const moveSaucer = () => {
            saucer.style.top = `${Math.random() * 80}vh`;
            saucer.style.left = `${Math.random() * 100}vw`;
            saucer.style.animationDuration = `${Math.random() * 5 + 3}s`;

            // Shoot a laser beam after moving
            setTimeout(shootLaser, 1000);
        };

        document.body.appendChild(saucer);
        moveSaucer();

        const interval = setInterval(moveSaucer, 8000);
        return () => {
            clearInterval(interval);
            saucer.remove();
        };
    }, []);

    return null;
};

export default FlyingSaucer;