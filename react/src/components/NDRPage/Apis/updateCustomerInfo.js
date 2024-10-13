import axios from "axios";

export const updateCustomerInfoApi = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/v2/ndr/reattempt_delivery`,
      {
        ...data,
      },
      { withCredentials: true, cancelToken: axios.CancelToken.source().token }
    );

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn("API request canceled");
    } else {
      throw error;
    }
  }
};
