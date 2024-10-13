import axios from "axios";

export const bulkPlaceOrderApi = async (payload) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/v2/orders/bulk_order_place`,
      payload,
      { withCredentials: true, cancelToken: axios.CancelToken.source().token }
    );

    if (response.data.success === 1) {
      return response.data;
    } else {
      throw new Error(
        response.data.msg || "An error occurred while add  bulk note"
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
