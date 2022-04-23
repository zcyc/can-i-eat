import axios from './api'

const foodApi = {
    getFoodList: (page: number, size: number) => {
        return axios.get(`v1/food/list?page=${ page }&size=${ size }`)
    },

    getFoodListByFoodTagIdList: (postData: { foodTagIdList: string[] }) => {
        return axios.post(`v1/food/listByFoodTagList`, postData)
    },
}

export default foodApi
