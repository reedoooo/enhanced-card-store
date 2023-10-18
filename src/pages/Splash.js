import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Splash.css';
// import { motion } from 'framer-motion';
// import { theme } from '../../assets/theme';
// import Particle from '../utils/Particle';
// import logo from '../../assets/logo.png'; // Import the logo
// import GitHubCalendar from 'react-github-calendar';
// import { Box } from '@chakra-ui/react';
import CardDeckAnimation from './CardDeckAnimation';

// const logoVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     rotate: [0, 360], // Add rotation animation
//     transition: {
//       duration: 4,
//       repeat: Infinity,
//       ease: 'linear',
//     },
//   },
//   exit: { opacity: 0, transition: { duration: 0.5 } },
// };

// const ellipsisVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: [0, 1, 1, 1, 0], // This makes the ellipsis fade in and out
//     x: ['0%', '5%', '10%', '15%', '20%'], // Move the ellipsis to the right
//     transition: {
//       duration: 2,
//       repeat: Infinity,
//       repeatType: 'loop',
//     },
//   },
//   exit: { opacity: 0, transition: { duration: 0.5 } },
// };

// const textVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     color: [
//       theme.colors.quaternary[400],
//       theme.colors.quaternary[500],
//       theme.colors.quaternary[600],
//       theme.colors.quaternary[700],
//       theme.colors.quaternary[800],
//       theme.colors.quaternary[900],
//     ],
//     textShadow: ['0px 0px', '5px 5px', '3px 3px', '0px 0px'],
//     transition: {
//       duration: 6, // Increased due to more colors
//       repeat: Infinity,
//       repeatType: 'loop',
//     },
//   },
//   exit: { opacity: 0, transition: { duration: 0.5 } },
// };

// function AnimatedSplash() {
//   const [calendarSize, setCalendarSize] = useState({ width: 0, height: 0 });
//   const calendarRef = useRef(null);
//   // const rect = document.getElementById('myElement').getBoundingClientRect();

//   // Declare minimum dimensions here
//   const minWidth = window.innerWidth * 0.65;
//   const minHeight = 100;

//   useEffect(() => {
//     if (calendarRef.current) {
//       // Check if the ref is assigned to a DOM element
//       // const rect = calendarRef.current.getBoundingClientRect();

//       const breakpoints = {
//         xs: 20 * 16,
//         sm: 28 * 16,
//         md: 36 * 16,
//         lg: 45 * 16,
//         xl: 60 * 16,
//       };

//       const adjustSize = () => {
//         const width = window.innerWidth;
//         let newWidth, newHeight;
//         if (width <= breakpoints.xs) {
//           newWidth = '40px';
//           newHeight = '20px';
//         } else if (width <= breakpoints.sm) {
//           newWidth = '50px';
//           newHeight = '25px';
//         } else if (width <= breakpoints.md) {
//           newWidth = '60px';
//           newHeight = '30px';
//         } else if (width <= breakpoints.lg) {
//           newWidth = '70px';
//           newHeight = '35px';
//         } else {
//           newWidth = '200px';
//           newHeight = '40px';
//         }
//         document.documentElement.style.setProperty(
//           '--calendar-width',
//           newWidth
//         );
//         document.documentElement.style.setProperty(
//           '--calendar-height',
//           newHeight
//         );
//       };
//       adjustSize();
//       window.addEventListener('resize', adjustSize);

//       if (calendarRef.current) {
//         const rect = calendarRef.current.getBoundingClientRect();
//         setCalendarSize({
//           width: Math.max(rect.width + 15, minWidth),
//           height: Math.max(rect.height + 15, minHeight),
//         });
//       }
//       console.log('Updated calendar size:', calendarSize);

//       return () => {
//         window.removeEventListener('resize', adjustSize);
//       };
//     }
//   }, [calendarSize]);

//   return (
//     <motion.div
//       className="splash_wrapper"
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//       style={{
//         backgroundColor: theme.colors.quaternary[100],
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}
//     >
//       <motion.div
//         className="logo_container"
//         variants={logoVariants}
//         style={{ marginRight: '20px' }}
//       >
//         <h1
//           style={{
//             fontSize: '5rem',
//             color: theme.colors.quaternary[900],
//             fontWeight: 'bold',
//           }}
//         >
//           ReedVogt.com
//         </h1>
//       </motion.div>

//       {Particle && <Particle />}
//       <CardDeckAnimation />
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         <motion.p
//           className="loading_text"
//           variants={textVariants}
//           style={{
//             rotateX: [0, 10, -10, 0],
//             transition: {
//               repeat: Infinity,
//               repeatType: 'mirror',
//               duration: 4,
//             },
//             color: theme.colors.quaternary[500],
//           }}
//         >
//           Loading
//         </motion.p>
//         <motion.span
//           className="loading_ellipsis"
//           variants={ellipsisVariants}
//           style={{
//             fontSize: 'inherit',
//             marginLeft: '5px',
//           }}
//         >
//           <motion.span>.</motion.span>
//           <motion.span>.</motion.span>
//           <motion.span>.</motion.span>
//         </motion.span>
//       </div>

//       <div
//         className="github_calendar_container"
//         style={{ position: 'relative' }}
//       >
//         <svg
//           className="rotating-border"
//           viewBox={`0 0 ${calendarSize.width} ${calendarSize.height}`}
//           style={{ position: 'absolute', zIndex: 0 }}
//         >
//           <rect
//             x="0"
//             y="0"
//             rx="15"
//             ry="15"
//             width={calendarSize.width}
//             height={calendarSize.height}
//           />
//         </svg>
//         <Box
//           className="calendar-box"
//           ref={calendarRef}
//           minW="50vw"
//           style={{ position: 'relative', zIndex: 1 }}
//         >
//           <GitHubCalendar username="reedoooo" />
//         </Box>
//       </div>
//     </motion.div>
//   );
// }

function Splash() {
  const [redirected, setRedirected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setTimeout(() => setRedirected(true), 10000);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (redirected) {
      navigate('/');
    }
  }, [redirected, navigate]);

  return redirected ? null : <CardDeckAnimation />;
  // return redirected ? null : <AnimatedSplash />;
}

export default Splash;
