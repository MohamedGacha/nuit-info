import React, { useState, useRef } from 'react';
import CorpseCSS from './Corpse.module.css';
import CorpseSVG from '../assets/human-body-silhouette-with-focus-on-the-head-svgrepo-com.svg';
import SimPoint from './SimPoint';

const Corpse: React.FC = () => {
  const [translateY, setTranslateY] = useState(0); // Track the Y translation
  const corpseImgRef = useRef<HTMLImageElement | null>(null); // Reference to the image

  const handleWheel = (event: React.WheelEvent) => {
    if (corpseImgRef.current) {
      // Calculate the new translateY value
      const newTranslateY = translateY + event.deltaY;

      // Define limits for scrolling (min and max values)
      const MIN_TRANSLATE_Y = -650; // Minimum scroll limit (scrolling up)
      const MAX_TRANSLATE_Y = 50;  // Maximum scroll limit (scrolling down)

      // Clamp the newTranslateY value between the minimum and maximum limits
      const clampedTranslateY = Math.min(Math.max(newTranslateY, MIN_TRANSLATE_Y), MAX_TRANSLATE_Y);

      // Set the new clamped translateY state
      setTranslateY(clampedTranslateY);

      // Apply the clamped translateY to the image
      corpseImgRef.current.style.transform = `scale(3.5) translateY(${clampedTranslateY}px)`; // Fixed scale, updating only translateY
    }
  };

  return (
    <div className={CorpseCSS.container} 
    onWheel={handleWheel}>
      <div 
        className={`${CorpseCSS.imgContainer}`} 
      >
        <img 
          src={CorpseSVG} 
          className={CorpseCSS.corpseImg} 
          alt="Corpse" 
          ref={corpseImgRef} 
        />
        
        {/* SimPoint is stacked above the image using z-index */}
        <div className={CorpseCSS.simPointContainer} 
        onWheel={handleWheel}>
            <SimPoint 
              ocean="https://www.svgrepo.com/show/481068/shark-dorsal-fin.svg" 
              human="https://www.svgrepo.com/show/482777/brain-illustration-4.svg"
              position={{
                top: 20 ,  // Dynamically update top based on scroll (translateY)
                left: 50
              }} // Dynamically update position based on scroll
            >
              <p>This is a brain and ocean simulation point.</p>
            </SimPoint>
        </div>
      </div>
    </div>
  );
};

export default Corpse;
