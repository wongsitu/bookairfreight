const randomNumberGenerator = (upperBound: number, lowerBound: number) => {
  return Math.floor(Math.random() * (upperBound - lowerBound + 1)) + lowerBound;
};

export default randomNumberGenerator;
