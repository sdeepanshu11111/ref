import axios from "axios";

let cancelTokenSource = null;

async function getOrders(apiPayload) {
  // Cancel the previous request if it exists
  if (cancelTokenSource) {
    cancelTokenSource.cancel("Request canceled due to new request");
  }

  // Create a new cancel token
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/v2/orders/get_orders`,
      apiPayload,
      { withCredentials: true, cancelToken: cancelTokenSource.token }
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
      console.warn("API request canceled:", error.message);
      throw new Error("cancel request");
    } else {
      throw error;
    }
  }
}

export default getOrders;
