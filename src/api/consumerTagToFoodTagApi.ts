import axios from './api'

const consumerTagToFoodTagApi = {
    getConsumerTagToFoodTagListByConsumerTagId: (consumerTagId: string, currentEatModeId: string) => {
        return axios.get(`v1/consumerTagToFoodTag/listByConsumerTagAndEatMode?consumerTagId=${ consumerTagId }&currentEatModeId=${ currentEatModeId }`)
    },
}

export default consumerTagToFoodTagApi
