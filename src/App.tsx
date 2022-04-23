import './App.css'
import { useEffect, useState } from 'react'
import consumerTagApi from "./api/consumerTagApi";
import consumerTagToFoodTagApi from "./api/consumerTagToFoodTagApi";
import ConsumerTagToFoodTag from "./interfaces/ConsumerTagToFoodTag";
import ConsumerTag from "./interfaces/ConsumerTag";
import foodApi from "./api/foodApi";
import EatMode from "./interfaces/EatMode";
import eatModeApi from "./api/eatModeApi";
import Food from "./interfaces/Food";

function App() {
    const [foodList, setFoodList] = useState<Food[]>([])
    const [eatModeList, setEatModeList] = useState<EatMode[]>([])
    const [currentEatMode, setCurrentEatMode] = useState<EatMode>({ id: '', name: '' })
    const [consumerTagList, setConsumerTagList] = useState<ConsumerTag[]>([])
    const [consumerTagToFoodTagList, setConsumerTagToFoodTagList] = useState<ConsumerTagToFoodTag[]>([])
    const [currentConsumerTag, setCurrentConsumerTag] = useState<ConsumerTag>({ id: '', name: '' })
    const [page, setPage] = useState(1)
    const [size, setSize] = useState(1000)

    // 加载用户标签
    useEffect(() => {
        consumerTagApi.getConsumerTagList(page, size).then(res => {
            console.log('getConsumerTagList', res)
            setConsumerTagList(res.data.items)
            setCurrentConsumerTag(res.data.items[0])
        })
    }, [])

    // 加载饮食模式
    useEffect(() => {
        eatModeApi.getEatModeList(page, size).then(res => {
            console.log('getEatModeList', res)
            setEatModeList(res.data.items)
            setCurrentEatMode(res.data.items[0])
        })
    }, [])

    // 加载食物标签
    useEffect(() => {
        if (!currentConsumerTag.id || !currentEatMode.id) {
            return
        }
        consumerTagToFoodTagApi.getConsumerTagToFoodTagListByConsumerTagId(currentConsumerTag.id, currentEatMode.id).then(res => {
            console.log('getConsumerTagToFoodTagListByConsumerTagId', res)
            setConsumerTagToFoodTagList(res.data)
        })
    }, [currentConsumerTag, currentEatMode])

    // 加载食物
    useEffect(() => {
        console.log('consumerTagToFoodTagList', consumerTagToFoodTagList)
        if (!consumerTagToFoodTagList || consumerTagToFoodTagList.length === 0) {
            return
        }

        const foodTagIdList = consumerTagToFoodTagList.map(item => item.foodTagId)

        const postData = {
            'foodTagIdList': foodTagIdList
        }
        foodApi.getFoodListByFoodTagIdList(postData).then(response => {
            console.log('getFoodListByFoodTagIdList', response)
            setFoodList(response.data)
        })


    }, [consumerTagToFoodTagList])

    return (
        <div>
            {/*选择用户标签*/ }
            <select
                onChange={ e => {
                    const currentConsumerTagId = e.target.value
                    const currentConsumerTag = consumerTagList.find(item => item.id === currentConsumerTagId)
                    if (!currentConsumerTag) {
                        return
                    }
                    setCurrentConsumerTag(currentConsumerTag)
                } }
                value={ currentConsumerTag.id }
            >
                {
                    consumerTagList.map(item => (
                        <option key={ item.id } value={ item.id }>{ item.name }</option>
                    ))
                }
            </select>
            {/*选择饮食模式*/ }
            <select
                onChange={ e => {
                    const currentEatModeId = e.target.value
                    const currentEatMode = eatModeList.find(item => item.id === currentEatModeId)
                    if (!currentEatMode) {
                        return
                    }
                    setCurrentEatMode(currentEatMode)
                } }
                value={ currentEatMode.id }
            >
                {
                    eatModeList.map(item => (
                        <option key={ item.id } value={ item.id }>{ item.name }</option>
                    ))
                }
            </select>
            {/*食物*/ }
            <div>
                {
                    foodList.map(item => (
                        <div key={ item.id }>
                            { item.name }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default App
