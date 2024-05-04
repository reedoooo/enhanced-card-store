/**
 * Converts a hexadecimal color code to RGBA format (takes a solid hex color code and returns transparent version).
 *
 * @param {string} hex - The hexadecimal color code to convert.
 * @param {number} [alpha=1] - The alpha value (opacity) of the RGBA color. Defaults to 1.
 * @returns {string|null} The RGBA color code, or null if the input is invalid.
 */
const hexToRgba = (hex, alpha = 1) => {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
    : null;
};

export default hexToRgba;
