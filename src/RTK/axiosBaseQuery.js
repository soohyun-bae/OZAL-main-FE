import axios from "axios"

export const axiosBaseQuery = ({ baseUrl} = {baseUrl: ''}) =>
  async ({url, method, data, params}) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return {data: result.data};
    } catch(axiosError) {
      return {
        error: {
          status: axiosError.response?.status,
          data: axiosError.response?.data || axiosError.message,
        }
      }
    }
  }