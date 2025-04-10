import React, { useState, useEffect } from 'react';
import './App.css';
import FloatingShapes from './FloatingShapes';
import FlyingSaucer from './FlyingSaucer';
import ChaseAnimation from './ChaseAnimation';

const App = () => {
  const gridSize = 16;
  const [gridItems, setGridItems] = useState(
    Array.from({ length: gridSize * gridSize }, (_, index) => index + 1)
  );
  const [winningIndex, setWinningIndex] = useState(null);

  useEffect(() => {
    // Set a random winning index when the component mounts
    setWinningIndex(Math.floor(Math.random() * gridItems.length));
  }, [gridItems]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('draggedIndex', index);
    e.target.classList.add('dragging'); // Add dragging class
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging'); // Remove dragging class
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData('draggedIndex'), 10);

    // Swap the items
    const updatedGridItems = [...gridItems];
    [updatedGridItems[draggedIndex], updatedGridItems[dropIndex]] = [
      updatedGridItems[dropIndex],
      updatedGridItems[draggedIndex],
    ];

    setGridItems(updatedGridItems);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleElementClick = (e, index) => {
    if (index === winningIndex) {
      alert('Congratulations, you won!');
      // Reset with a new random winning index
      setWinningIndex(Math.floor(Math.random() * gridItems.length));
    }

    const createExplosionShape = () => {
      const shape = document.createElement('div');
      const shapeTypes = ['circle', 'square', 'triangle'];
      const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const randomColor = `hsl(${Math.random() * 360}, 100%, 70%)`;

      shape.className = `shape ${randomType}`;
      shape.style.backgroundColor = randomType !== 'triangle' ? randomColor : 'transparent';
      shape.style.borderBottomColor = randomType === 'triangle' ? randomColor : '';
      shape.style.position = 'absolute';
      shape.style.left = `${e.clientX}px`;
      shape.style.top = `${e.clientY}px`;
      shape.style.animation = 'explode 1s ease-out forwards';

      document.body.appendChild(shape);

      setTimeout(() => {
        shape.remove();
      }, 1000);
    };

    for (let i = 0; i < 20; i++) {
      createExplosionShape();
    }
  };

  return (
    <>
      <FlyingSaucer />
      <FloatingShapes />
      <ChaseAnimation />
      <h1 className="title">AI Programmed This</h1>
      <div className="grid-container">
        {gridItems.map((item, index) => (
          <div
            key={index}
            className="grid-item"
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragEnd={handleDragEnd}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            onClick={(e) => handleElementClick(e, index)}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
