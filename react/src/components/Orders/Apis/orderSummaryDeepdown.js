import axios from "axios";

export const orderSummaryDeepdownApi = async (data) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_REACT_API_URL
      }/v2/orders/get_order_summary_deepdown`,
      {
        ...data,
      },
      { withCredentials: true, cancelToken: axios.CancelToken.source().token }
    );

    if (response.data.success === 1) {
      return response.data;
    } else {
      throw new Error(
        response.data.msg || "An error occurred while fetching data"
      );
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn("API request canceled");
    } else {
      throw error;
    }
  }
};
