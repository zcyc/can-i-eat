import axios from './api'

const eatModeApi = {
    getEatModeList: (page: number, size: number) => {
        return axios.get(`v1/eatMode/list?page=${ page }&size=${ size }`)
    },
}

export default eatModeApi
