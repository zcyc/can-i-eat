import './App.css'
import { useEffect, useState } from 'react'
import consumerTagApi from "./api/consumerTagApi";
import consumerTagToFoodTagApi from "./api/consumerTagToFoodTagApi";
import ConsumerTagToFoodTag from "./interfaces/ConsumerTagToFoodTag";
import ConsumerTag from "./interfaces/ConsumerTag";

function App() {
    const [foodList, setFoodList] = useState([])
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

    // 加载用户标签
    useEffect(() => {
        if (!currentConsumerTag.id) {
            return
        }
        consumerTagToFoodTagApi.getConsumerTagToFoodTagListByConsumerTagId(currentConsumerTag.id).then(res => {
            console.log('getConsumerTagToFoodTagListByConsumerTagId', res)
            setConsumerTagToFoodTagList(res.data.items)
        })
    }, [currentConsumerTag])

    return (
        <div>
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
        </div>
    )
}

export default App
