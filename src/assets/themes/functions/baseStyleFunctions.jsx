// const pxToRem = (number, baseNumber = 16) => {
//   return `${number / baseNumber}rem`;
// };

// const hexToRgba = (hex, alpha = 1) => {
//   let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
//   hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
//   let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//   return result
//     ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
//     : null;
// };

// const rgba = (color, opacity) => {
//   return hexToRgba(color, opacity);
// };

// const linearGradient = (color, colorState, angle = 195) => {
//   return `linear-gradient(${angle}deg, ${color}, ${colorState})`;
// };

// export { pxToRem, hexToRgba, rgba, linearGradient };

// // export default {
// //   pxToRem,
// //   hexToRgba,
// //   rgba,
// //   linearGradient,
// // };
