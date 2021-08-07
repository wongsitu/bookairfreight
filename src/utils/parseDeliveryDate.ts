const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sept",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

const parseDeliveryDate = (startDate: Date, endDate: Date): string => {
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();

  const startMonth = months[startDate.getMonth() as keyof typeof months];
  const endMonth = months[endDate.getMonth() as keyof typeof months];

  return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
};

export default parseDeliveryDate;
