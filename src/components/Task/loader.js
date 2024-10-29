import axios from "axios"
const apiUrl = import.meta.env.VITE_SERVER_API

const loader = async({request}) => {
    try {
        const url = new URL(request.url)
        const key = url.searchParams.get('key')
        const {data : { data : task }} = await axios.get(`${apiUrl}/task?key=${key}`, {
            withCredentials: true
        })

        return task
    } catch (error) {
        console.log(error.response?.data?.message || error.message);
    }
}

export default loader