//Helper function that accepts a decimal value and returns a monetary formatted string representation

const priceFormat = (int) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(int);
};

//console.log(priceFormat(793322.23)); returns $793,322.23


module.exports = priceFormat;
