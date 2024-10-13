import axios from "axios";

let cancelTokenSource = null;

export const getSaveFilters = async (data) => {
  // Cancel the previous request if it exists
  if (cancelTokenSource) {
    cancelTokenSource.cancel("Request canceled due to new request");
  }

  // Create a new cancel token
  cancelTokenSource = axios.CancelToken.source();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_API_URL}/v2/shipments/get_save_filters`,
      { ...data },
      { withCredentials: true, cancelToken: cancelTokenSource.token }
    );

    if (response.data.success === 1) {
      return response.data;
    } else {
      throw new Error(
        response.data.msg || "An error occurred while adding note"
      );
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn("API request canceled:", error.message);
    } else {
      throw error;
    }
  }
};
