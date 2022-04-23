import axios from './api'

const consumerTagToFoodTagApi = {
    getConsumerTagToFoodTagListByConsumerTagId: (consumerTagId: string) => {
        return axios.get(`v1/consumerTagToFoodTag/listByConsumerTagID?consumerTagId=${ consumerTagId }`)
    },
}

export default consumerTagToFoodTagApi
