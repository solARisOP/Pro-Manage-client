import axios from "axios";

const apiUrl = import.meta.env.VITE_SERVER_API;

export default loader = async() => {
    try {
        const {data : { data }} = await axios.get(`${apiUrl}/feed/analytics`, {
            withCredentials: true
        })
    
        return data
    } catch (error) {
        console.log(error.response?.data?.message || error.message);
    }
}