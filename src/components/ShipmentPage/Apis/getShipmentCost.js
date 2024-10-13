import axios from "axios";

async function getShipmentCost(apiPayload) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/v2/orders/get_shipping_cost`,
      apiPayload,
      { withCredentials: true, cancelToken: axios.CancelToken.source().token }
    );

    if (response.status === 200) {
      return response;
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
}

export default getShipmentCost;
