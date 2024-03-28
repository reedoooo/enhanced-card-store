// import React, { useState, useEffect, useContext } from 'react';
// import Chart from 'react-apexcharts';
// import { ThemeContext } from '../../../context/ThemeContext'; // Adjust the path as necessary
// import { Card, InfoStack } from '../../../';

// const Wrapper = ({ cardTitle, value, label, series }) => {
//   const theme = useContext(ThemeContext); // Assuming theme is provided through context

//   const cardStyle = {
//     height: theme.heightCardMd,
//     minHeight: theme.heightCardMd,
//     maxHeight: theme.heightCardMd,
//   };

//   const chartStyle = {
//     position: 'relative',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: theme.lenLg1,
//     height: theme.heightChartMd,
//     transform: 'translateX(0)',
//     marginTop: '2rem',
//   };

//   const chartWrapperStyle = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     minWidth: '240px',
//   };

//   const [options, setOptions] = useState({
//     chart: {
//       animations: {
//         enabled: false,
//       },
//     },
//     grid: {
//       padding: {
//         top: 40,
//         left: 0,
//         right: 0,
//         bottom: 20,
//       },
//     },
//     stroke: {
//       show: false,
//     },
//     tooltip: { enabled: false },
//     legend: { show: false },
//     dataLabels: { enabled: false },
//     plotOptions: { pie: { donut: { size: '75%' } } },
//   });

//   useEffect(() => {
//     if (theme) {
//       setOptions((prevOptions) => ({
//         ...prevOptions,
//         colors: [
//           theme.colorPrimary,
//           theme.colorAccent,
//           theme.colorDefaultBackground,
//         ],
//       }));
//     }
//   }, [theme]);

//   return (
//     <Card style={cardStyle} cardTitle={cardTitle}>
//       <InfoStack value={value} label={label} />
//       <div style={chartStyle}>
//         <div style={chartWrapperStyle}>
//           {options.colors && (
//             <Chart
//               options={options}
//               series={series}
//               type="donut"
//               width="100%"
//             />
//           )}
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default Wrapper;
