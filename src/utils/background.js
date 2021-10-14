const hexToRgb = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const calculateColorInBetween = (start, end, temp) => {
  const startRGB = hexToRgb(start);
  const endRGB = hexToRgb(end);
  const percent = (Math.abs(temp) + 10) / 40;

  const resultRed = startRGB.r + percent * (endRGB.r - startRGB.r);
  const resultGreen = startRGB.g + percent * (endRGB.g - startRGB.g);
  const resultBlue = startRGB.b + percent * (endRGB.b - startRGB.b);

  return `rgb(${resultRed}, ${resultGreen}, ${resultBlue})`;
};

export const setBackgroundColor = (temp) => {
  if (temp <= -10) {
    return '#00ffff';
  } else if (temp > -10 && temp < 10) {
    return calculateColorInBetween('#00ffff', '#fff700', temp);
  } else if (temp == 10) {
    return '#fff700';
  } else if (temp > 10 && temp < 30) {
    return calculateColorInBetween('#fff700', '#ff8c00', temp);
  } else if (temp >= 30) {
    return '#ff8c00'
  } else {
    return '#ffffff'
  }
};
