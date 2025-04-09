import React, { useEffect } from 'react';
import './index.css';

const FloatingShapes = () => {
    useEffect(() => {
        const createShape = () => {
            const shape = document.createElement('div');
            const shapeTypes = ['circle', 'square', 'triangle'];
            const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            const randomColor = `hsl(${Math.random() * 360}, 100%, 70%)`;

            shape.className = `shape ${randomType}`;
            shape.style.backgroundColor = randomType !== 'triangle' ? randomColor : 'transparent';
            shape.style.borderBottomColor = randomType === 'triangle' ? randomColor : '';
            shape.style.left = `${Math.random() * 100}vw`;
            shape.style.animationDuration = `${Math.random() * 5 + 3}s`;

            const container = document.getElementById('floating-shapes-container');
            if (container) {
                container.appendChild(shape);
            }

            setTimeout(() => {
                shape.remove();
            }, 8000);
        };

        const interval = setInterval(createShape, 300);
        return () => clearInterval(interval);
    }, []);

    return <div id="floating-shapes-container"></div>;
};

export default FloatingShapes;