import React, { useEffect, useRef } from "react";
import Matter from "matter-js";
import "./FloatingSVG.css";
import floatingElement from "../assets/human-body-silhouette-with-focus-on-the-head-svgrepo-com.svg"; // Your SVG image

const FloatingSVG: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const engine = Matter.Engine.create();
    const render = Matter.Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: "transparent",
      },
    });

    // Create a water area boundary (static)
    const waterArea = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight - 50, // Water level position
      window.innerWidth, // Full width
      100, // Height of the water area (the 'water surface')
      { isStatic: true, render: { fillStyle: "#caf0f8" } }
    );

    Matter.World.add(engine.world, waterArea);

    // Create the floating SVG element
    const svgImage = new Image();
    svgImage.src = floatingElement;

    svgImage.onload = () => {
      const svgBody = Matter.Bodies.rectangle(
        window.innerWidth / 2, // Start at the center
        window.innerHeight / 2, // Start in the middle of the screen
        100, // Width of the body
        100, // Height of the body
        {
          render: {
            sprite: {
              texture: floatingElement,
              xScale: 0.2, // Adjust size of the image
              yScale: 0.2,
            },
          },
          restitution: 0.5, // Bounciness of the object
          friction: 0.1, // Friction for floating
          density: 0.002, // Set to float (adjust based on size)
        }
      );

      // Add the floating SVG to the world
      Matter.World.add(engine.world, svgBody);

      // Add wave physics to simulate water
      let waveFrequency = 0.02; // Frequency of the wave oscillations
      let waveAmplitude = 30; // Height of the waves
      let waveSpeed = 0.05; // Speed of wave oscillations
      let time = 0; // Time factor to animate the wave

      // Buoyancy constant (how strongly the object is pushed upwards when near the water surface)
      const buoyancyConstant = 0.005;
      
      const updateWave = () => {
        // The waves will oscillate with a sine function
        for (let x = 0; x < window.innerWidth; x++) {
          let waveHeight = waveAmplitude * Math.sin(waveFrequency * x + waveSpeed * time); // Use time to animate the wave
          
          // Adjust the floating object based on wave interaction
          if (svgBody.position.x > x && svgBody.position.x < x + 100) {
            // Apply wave height effect based on the object's position
            svgBody.position.y = window.innerHeight - 50 + waveHeight;

            // Buoyancy effect (only when close to water)
            if (svgBody.position.y < window.innerHeight - 50) {
              // Apply an upward force when the object is near the water
              Matter.Body.applyForce(svgBody, svgBody.position, { x: 0, y: buoyancyConstant });
            }
          }
        }
      };

      // Update wave simulation in the engine's update cycle
      Matter.Events.on(engine, "beforeUpdate", () => {
        time += 0.05; // Increment time to animate wave
        updateWave(); // Apply wave effect
      });
    };

    // Start the engine and renderer
    Matter.Engine.run(engine);
    Matter.Render.run(render);

    // Clean up when the component unmounts
    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
    };
  }, []);

  return <div ref={sceneRef} className="floating-svg-scene"></div>;
};

export default FloatingSVG;
