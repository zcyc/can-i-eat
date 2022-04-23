import axios from './api'

const foodApi = {
    getFoodList: (page: number, size: number) => {
        return axios.get(`v1/food/list?page=${ page }&size=${ size }`)
    },
}

export default foodApi
