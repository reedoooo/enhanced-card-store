import React, { useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import placeholder from '../../assets/images/placeholder.jpeg';

const SingleCardAnimation = ({ cardImage }) => {
  const containerRef = useRef(null);

  // Default the card image to placeholder if it's null/undefined
  const frontImage = cardImage || placeholder;

  const [tilt, setTilt] = useSpring(() => ({
    xys: [0, 0, 1], // Initial values for tilt [rotateX, rotateY, scale]
    config: { mass: 5, tension: 350, friction: 40 },
  }));

  const calcTilt = (x, y) => {
    const rect = containerRef.current.getBoundingClientRect();
    const relX = x - rect.left - rect.width / 2;
    const relY = y - rect.top - rect.height / 2;
    // Update tilt based on mouse position over the card
    return [relY / 10, relX / 10, 1.1]; // Adjust sensitivity and scale here
  };

  const handleMouseMove = (event) => {
    setTilt({ xys: calcTilt(event.clientX, event.clientY) });
  };

  const handleMouseLeave = () => {
    setTilt({ xys: [0, 0, 1] });
  };

  return (
    <animated.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '20rem',
        height: '29rem',
        backgroundImage: `url(${frontImage})`,
        backgroundSize: 'cover',
        borderRadius: '5px',
        transform: tilt.xys.to(
          (x, y, s) =>
            `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
        ),
        position: 'relative',
      }}
    />
  );
};

export default SingleCardAnimation;

// import React, { useRef } from 'react';
// import { useSpring, animated } from 'react-spring';
// import placeholder from '../../assets/images/placeholder.jpeg';

// const SingleCardAnimation = ({ cardImage }) => {
//   const containerRef = useRef(null);

//   // Default the card image to placeholder if it's null/undefined
//   const frontImage = cardImage || placeholder;

//   const [props, set] = useSpring(() => ({
//     to: { opacity: 1, transform: 'rotateY(0deg)' },
//     from: { opacity: 0.5, transform: 'rotateY(180deg)' },
//     config: { mass: 5, tension: 500, friction: 80 },
//   }));

//   // Handle mouse enter and leave for tilt effect
//   const handleMouseEnter = () => set({ transform: 'rotateY(0deg)' });
//   const handleMouseLeave = () => set({ transform: 'rotateY(180deg)' });

//   return (
//     <div style={{ perspective: '1000px', width: '20rem', height: '29rem' }}>
//       <animated.div
//         ref={containerRef}
//         onMouseMove={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         style={{
//           width: '100%',
//           height: '100%',
//           position: 'relative',
//           transformStyle: 'preserve-3d', // Needed for 3D effect
//           ...props,
//         }}
//       >
//         {/* Front Side */}
//         <animated.div
//           style={{
//             width: '100%',
//             height: '100%',
//             backgroundImage: `url(${frontImage})`,
//             backgroundSize: 'cover',
//             borderRadius: '5px',
//             position: 'absolute',
//             backfaceVisibility: 'hidden', // hide when flipped
//           }}
//         />

//         {/* Back Side */}
//         <animated.div
//           style={{
//             width: '100%',
//             height: '100%',
//             backgroundImage: `url(${placeholder})`,
//             backgroundSize: 'cover',
//             borderRadius: '5px',
//             position: 'absolute',
//             backfaceVisibility: 'hidden', // hide when flipped
//             transform: 'rotateY(180deg)', // rotate backside by 180deg
//           }}
//         />
//       </animated.div>
//     </div>
//   );
// };

// export default SingleCardAnimation;
