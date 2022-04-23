import Axios from 'axios'

const axios = Axios.create({
    baseURL: `http://127.0.0.1:1323/`,
})

export default axios
