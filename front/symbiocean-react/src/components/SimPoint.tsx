import React from 'react';
import SimmPointCSS from './SimPoint.module.css';

interface SimPointProps {
  ocean: string;
  human: string;
  position: { top: number; left: number }; // Position prop to dynamically set the position
  children: React.ReactNode;
}

const SimPoint: React.FC<SimPointProps> = ({ ocean, human, position, children }) => {
  return (
    <div
      className={SimmPointCSS.simPointContainer}
      style={{
        position: 'absolute', // Make sure it's absolutely positioned
        top: `${position.top}%`, // Use percentage to make it relative to the image
        left: `${position.left}%`, // Similarly, left position as percentage
      }}
    >
      <div>
        <img src={human} className={SimmPointCSS.humanImg} alt="Human" />
        <img src={ocean} className={SimmPointCSS.oceanImg} alt="Ocean" />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SimPoint;
