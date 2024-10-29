import axios from "axios";
const apiUrl = import.meta.env.VITE_SERVER_API;

const loader = async() => {
    try {
        const {data : { data : analytics }} = await axios.get(`${apiUrl}/feed/analytics`, {
            withCredentials: true
        })
        return analytics
    } catch (error) {
        console.log(error.response?.data?.message || error.message);
    }
}

export default loader