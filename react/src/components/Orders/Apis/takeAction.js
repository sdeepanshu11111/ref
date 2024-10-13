import axios from "axios";

async function takeAction(apiPayload) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/v2/orders/take_action`,
      apiPayload,
      { withCredentials: true, cancelToken: axios.CancelToken.source().token }
    );

    if (response.data.success === 1 || response.data.status === 1) {
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
}

export default takeAction;
