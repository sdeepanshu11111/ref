import { useState } from "react";
import axios from "axios";

function usePostRequest() {
  const [loading, setLoading] = useState(false);

  const sendPostRequest = async (url, data) => {
    setLoading(true);
    try {
      const res = await axios({
        // url: import.meta.env.VITE_REACT_API_URL + url,
        url: 'https://2f29-2405-201-802c-f800-8f72-c190-ca7f-b811.ngrok-free.app/users/signup' ,
        method: "post",
      
        data,

        withCredentials: false,
      });
      setLoading(false);
      return res.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return { loading, sendPostRequest };
}

export default usePostRequest;
