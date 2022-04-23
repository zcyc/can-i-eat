import './App.css'
import foodList from './data/foodList.json'
import logo from './favicon.svg'
import { useState } from 'react'

const tagList = Array.from(new Set(foodList.map(item => item.tagList).flat())).sort()
const demandTagList = tagList.filter(tag => tag.includes('_'))
const foodCategoryTagList = tagList.filter(tag => tag.includes('类'))
const otherTagList = tagList.filter(tag => !tag.includes('_') && !tag.includes('类'))

function App() {
    const [checkedTagList, setCheckedTagList] = useState<string[]>([])

    const showFoodList = foodList.filter(item => checkedTagList.every(tag => item.tagList.includes(tag)))

    const [showFoodTagListFlag, setShowFoodTagListFlag] = useState(false)

    const handleTagClick = (tag: string) => {
        if (checkedTagList.includes(tag)) {
            setCheckedTagList(checkedTagList.filter(checkedTag => checkedTag !== tag))
        } else {
            setCheckedTagList([...checkedTagList, tag])
        }
    }

    return (
        <div>
            <h1>Can I Eat <img
                src={ logo }
                className="App-logo"
                alt="logo"
            /> LITE</h1>

            <fieldset>
                <legend>项目信息</legend>
                <p>
                    <a
                        href="https://github.com/jerryshell/can-i-eat-lite"
                        target="_blank"
                    >Can I Eat [LITE]</a>
                    <span> 是 </span>
                    <a
                        href="https://github.com/zcyc/can-i-eat"
                        target="_blank"
                    >Can I Eat</a>
                    <span> 的精简版本</span>
                </p>
                <p>
                    Copyright © 2022 <a
                    href="https://github.com/bitidea"
                    target="_blank"
                >BOST</a>. All rights reserved.
                </p>
            </fieldset>

            <details open>
                <summary>诉求标签列表</summary>
                <ul>
                    { demandTagList.map(tag => (
                        <li key={ tag }>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ checkedTagList.includes(tag) }
                                    onChange={ () => handleTagClick(tag) }
                                />
                                { tag }
                            </label>
                        </li>
                    )) }
                </ul>
            </details>

            <details open>
                <summary>食物类别标签列表</summary>
                <ul>
                    { foodCategoryTagList.map(tag => (
                        <li key={ tag }>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ checkedTagList.includes(tag) }
                                    onChange={ () => handleTagClick(tag) }
                                />
                                { tag }
                            </label>
                        </li>
                    )) }
                </ul>
            </details>

            <details>
                <summary>其他标签列表</summary>
                <ul>
                    { otherTagList.map(tag => (
                        <li key={ tag }>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ checkedTagList.includes(tag) }
                                    onClick={ () => handleTagClick(tag) }
                                />
                                { tag }
                            </label>
                        </li>
                    )) }
                </ul>
            </details>

            <details open>
                <summary>食物列表</summary>
                <label>
                    <input
                        type="checkbox"
                        checked={ showFoodTagListFlag }
                        onChange={ () => setShowFoodTagListFlag(!showFoodTagListFlag) }
                    />
                    显示食物的所有标签
                </label>
                <ul>
                    { showFoodList.map(food => (
                        <li key={ food.name }>
                            { food.name }
                            { showFoodTagListFlag && <ul>
                                { food.tagList.map(tag => (
                                    <li key={ tag }>{ tag }</li>
                                )) }
                            </ul> }
                        </li>
                    )) }
                </ul>
            </details>
        </div>
    )
}

export default App
