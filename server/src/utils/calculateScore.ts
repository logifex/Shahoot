const MAX_ROUND_SCORE = 1000;
const MINIMUM_RESPONSE_TIME = 1000 * 0.5;

const calculateScore = (startTime: number, timer: number): number => {
  const currentTime = Date.now();
  const responseTime = currentTime - startTime;

  if (responseTime < MINIMUM_RESPONSE_TIME) {
    return MAX_ROUND_SCORE;
  }

  return Math.round((1 - responseTime / (1000 * timer) / 2) * MAX_ROUND_SCORE);
};

export default calculateScore;
