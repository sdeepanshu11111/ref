import axios from "axios";

export const uploadMediaApi = async (apiPayload) => {
  try {
    const response = await axios({
      url: import.meta.env.VITE_REACT_API_URL + "/disputes/upload_dispute_file",
      method: "POST",
      data: apiPayload,
      withCredentials: true,
    });
    if (response.data.success === 1) {
      return response.data;
    } else {
      throw new Error(
        response.data.msg || "An error occurred while fetching data"
      );
    }
  } catch (err) {
    throw new Error(err.msg || "An error occurred while fetching data");
  }
};
