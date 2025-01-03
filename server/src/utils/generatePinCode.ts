const generatePinCode = (): string => {
  return Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");
};

export default generatePinCode;
