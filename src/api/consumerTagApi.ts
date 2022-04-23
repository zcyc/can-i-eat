import axios from './api'

const consumerTagApi = {
    getConsumerTagList: (page: number, size: number) => {
        return axios.get(`v1/consumerTag/list?page=${ page }&size=${ size }`)
    },
}

export default consumerTagApi
