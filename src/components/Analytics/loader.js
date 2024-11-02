import axios from "axios";
const apiUrl = import.meta.env.VITE_SERVER_API;

const loader = async () => {
    const { data: { data: analytics } } = await axios.get(`${apiUrl}/feed/analytics`, {
        withCredentials: true
    })
    return analytics
}

export default loader