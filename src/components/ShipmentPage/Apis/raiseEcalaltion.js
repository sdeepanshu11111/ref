
import axios from "axios";
export const raiseEcalaltion = async (apiPayload) => {

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/disputes/raise_shipment_dispute`,
      apiPayload,
      { withCredentials: true }
    );

    if (response.data.success === 1) {
      return response.data;
    } else {
      throw new Error(
        response.data.msg || "An error occurred while fetching data"
      );
    }
  } catch (error) {
    throw error;
  }
};
