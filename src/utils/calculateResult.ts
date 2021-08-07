import { FormData, ResultType } from "../context/types";
import randomNumberGenerator from "./randomNumberGenerator";
import parseDeliveryDate from "./parseDeliveryDate";

interface ResponseType {
  success: boolean;
  data: ResultType;
}

const calculateResult = async (data: FormData): Promise<ResponseType> => {
  const { shippingChannel } = data;
  let startDateRange = 0;
  let endDateRange = 0;
  let startDate = new Date();
  let endDate = new Date();

  if (shippingChannel === "Air") {
    startDateRange = randomNumberGenerator(7, 3);
    endDateRange = randomNumberGenerator(4, 2);
  }
  if (shippingChannel === "Ocean") {
    startDateRange = randomNumberGenerator(30, 25);
    endDateRange = randomNumberGenerator(10, 5);
  }

  startDate.setDate(startDate.getDate() + startDateRange);
  endDate.setDate(endDate.getDate() + startDateRange + endDateRange);

  const estimatedDelivery = parseDeliveryDate(startDate, endDate);

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return {
    success: true,
    data: {
      ...data,
      lowerBoundRangeDate: startDateRange,
      upperBoundRangeDate: endDateRange + startDateRange,
      estimatedDelivery,
      formattedPrice: `US${formatter.format(data.quotePrice)}`,
    },
  };
};

export default calculateResult;
