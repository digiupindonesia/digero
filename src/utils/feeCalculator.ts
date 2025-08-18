const feeCalculator = (amount: number, fee: number) => {
    return (amount * fee) / 100;
  };

export default feeCalculator;