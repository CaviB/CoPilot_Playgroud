import React, { useEffect, useRef } from 'react';
import './index.css';
import humanSvg from './assets/human.svg';
import alienSvg from './assets/alien.svg';
import saucerSvg from './assets/saucer.svg';
import blackholeSvg from './assets/blackhole.svg';

const ChaseAnimation = () => {
    const humanRefs = useRef([]);
    const alienRefs = useRef([]);
    const saucerRefs = useRef([]);
    const blackholeRef = useRef(null);

    useEffect(() => {
        const randomMovement = (elements) => {
            elements.forEach((element) => {
                if (!element) return;

                const x = Math.random() * (window.innerWidth - element.clientWidth);
                const y = Math.random() * (window.innerHeight - element.clientHeight);

                const rotation = Math.random() * 360; // Add random rotation
                const scale = 0.5 + Math.random() * 1.5; // Dynamically scale between 0.5 and 2.0

                const directionX = Math.random() < 0.5 ? -1 : 1; // Random direction for X
                const directionY = Math.random() < 0.5 ? -1 : 1; // Random direction for Y

                element.style.transform = `translate(${x * directionX}px, ${y * directionY}px) rotate(${rotation}deg) scale(${scale})`;
            });
        };

        const humanInterval = setInterval(() => {
            randomMovement(humanRefs.current);
        }, 2000);

        const alienInterval = setInterval(() => {
            randomMovement(alienRefs.current);
        }, 2000);

        const saucerInterval = setInterval(() => {
            randomMovement(saucerRefs.current);
        }, 2000);

        return () => {
            clearInterval(humanInterval);
            clearInterval(alienInterval);
            clearInterval(saucerInterval);
        };
    }, []);

    useEffect(() => {
        const updateWindowSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            humanRefs.current.forEach((human) => {
                if (human) {
                    const x = Math.random() * (width - human.offsetWidth);
                    const y = Math.random() * (height - human.offsetHeight);
                    const rotation = Math.random() * 360; // Add random rotation
                    const scale = 0.5 + Math.random() * 1.5; // Dynamically scale between 0.5 and 2.0
                    human.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
                }
            });

            alienRefs.current.forEach((alien) => {
                if (alien) {
                    const x = Math.random() * (width - alien.offsetWidth);
                    const y = Math.random() * (height - alien.offsetHeight);
                    const rotation = Math.random() * 360; // Add random rotation
                    const scale = 0.5 + Math.random() * 1.5; // Dynamically scale between 0.5 and 2.0
                    alien.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
                }
            });

            saucerRefs.current.forEach((saucer) => {
                if (saucer) {
                    const x = Math.random() * (width - saucer.offsetWidth);
                    const y = Math.random() * (height - saucer.offsetHeight);
                    const rotation = Math.random() * 360; // Add random rotation
                    const scale = 0.8 + Math.random() * 0.4; // Add random scaling between 0.8 and 1.2
                    saucer.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${scale})`;
                }
            });
        };

        updateWindowSize();

        const resizeListener = () => {
            updateWindowSize();
        };

        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    useEffect(() => {
        const moveBlackhole = () => {
            const blackhole = blackholeRef.current;
            if (!blackhole) return;

            const x = Math.random() * (window.innerWidth - blackhole.clientWidth);
            const y = Math.random() * (window.innerHeight - blackhole.clientHeight);

            blackhole.style.transform = `translate(${x}px, ${y}px)`;
        };

        const checkCollision = () => {
            const blackhole = blackholeRef.current;
            if (!blackhole) return;

            const blackholeRect = blackhole.getBoundingClientRect();

            const elements = [...humanRefs.current, ...alienRefs.current, ...saucerRefs.current];
            elements.forEach((element) => {
                if (!element) return;

                const elementRect = element.getBoundingClientRect();
                const isColliding = !(
                    blackholeRect.right < elementRect.left ||
                    blackholeRect.left > elementRect.right ||
                    blackholeRect.bottom < elementRect.top ||
                    blackholeRect.top > elementRect.bottom
                );

                if (isColliding) {
                    element.style.transition = 'transform 0.5s ease-in-out';
                    element.style.transform = `translate(${blackholeRect.left}px, ${blackholeRect.top}px) scale(0)`;
                    setTimeout(() => {
                        element.style.display = 'none';
                    }, 500);
                }
            });
        };

        const blackholeInterval = setInterval(() => {
            moveBlackhole();
            checkCollision();
        }, 2000);

        return () => {
            clearInterval(blackholeInterval);
        };
    }, []);

    return (
        <div>
            <img ref={blackholeRef} src={blackholeSvg} alt="Blackhole" className="chase-character blackhole" />
            {[...Array(5)].map((_, index) => (
                <img
                    key={`human-${index}`}
                    ref={(el) => (humanRefs.current[index] = el)}
                    src={humanSvg}
                    alt="Human"
                    className="chase-character human"
                />
            ))}
            {[...Array(5)].map((_, index) => (
                <img
                    key={`alien-${index}`}
                    ref={(el) => (alienRefs.current[index] = el)}
                    src={alienSvg}
                    alt="Alien"
                    className="chase-character alien"
                />
            ))}
            {[...Array(6)].map((_, index) => (
                <img
                    key={`saucer-${index}`}
                    ref={(el) => (saucerRefs.current[index] = el)}
                    src={saucerSvg}
                    alt="Saucer"
                    className="chase-character saucer"
                />
            ))}
            <FullScreenUFO />
        </div>
    );
};

const FullScreenUFO = () => {
    const ufoRef = useRef(null);

    useEffect(() => {
        const ufo = ufoRef.current;
        if (!ufo) return;

        ufo.style.transform = 'scale(0)';
        ufo.style.transition = 'transform 2s ease-in-out';

        setTimeout(() => {
            ufo.style.transform = 'scale(1)';
        }, 500);

        setTimeout(() => {
            ufo.style.transform = 'scale(0)';
        }, 3000);
    }, []);

    return (
        <img
            ref={ufoRef}
            src={saucerSvg}
            alt="Full Screen UFO"
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100vw',
                height: '100vh',
                zIndex: 10,
            }}
        />
    );
};

export default ChaseAnimation;