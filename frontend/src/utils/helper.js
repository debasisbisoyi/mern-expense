import moment from "moment";
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < words.length; i++) {
    initials += words[i][0];
  }
  return initials;
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, fractionPart] = num.toString().split(".");
  const integerPartWithCommas = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  return fractionPart
    ? `${integerPartWithCommas}.${fractionPart}`
    : integerPartWithCommas;
};

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
  return chartData;
};
export const prepareIncomeBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    source: item?.source,
    amount: item?.amount,
  }));
  return chartData;
};

export const prepareIncomeBarChartData2 = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("DD MMM"),
    source: item?.source,
    amount: item?.amount,
  }));
  return chartData;
};

export const prepareExpenseBarChartData2 = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("DD MMM"),
    category: item?.category, // Updated for expenses
    amount: item?.amount,
  }));

  return chartData;
};