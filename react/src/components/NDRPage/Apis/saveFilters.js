import axios from "axios";

export const saveFilters = async (data) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/v2/ndr/save_filter`,
      {
       ...data
      },
      { withCredentials: true, cancelToken: axios.CancelToken.source().token }
    );

    if (response.data.success === 1) {
      return response.data;
    } else {
      throw new Error(
        response.data.msg || "An error occurred while add  note"
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