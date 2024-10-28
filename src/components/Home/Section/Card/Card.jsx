import threeDotIcon from '../../../../assets/threeDot.svg'
import dropDownIcon from '../../../../assets/dropDown.svg'
import dropUpIcon from '../../../../assets/dropUp.svg'
import checkIcon from '../../../../assets/check.svg'
import './index.css'
import { useSelector } from 'react-redux'
import { useState } from 'react'

function Card({ task, category, isOpen, idx, toggleTask }) {

    const categories = Object.keys(useSelector(state=>state.tasks))

    const [checkCnt] = useState(()=>{
        let cnt = 0;
        task.checklist.forEach(x => cnt += x.isDone);
        return cnt;
    })

    const convertDate = (date)=>{
        const dateStr = new Date(task.dueDate).toDateString().split(" ");
        return `${dateStr[1]} ${dateStr[2]}`
    }

    return (
        <div className='card'>

            <div className='card__head'>
                <div className='card__flex'>
                    <div className='card__flex' style={{gap: '5px'}}>
                        <div className={`card__priority__dot card__priority--${task.priority}`} />
                        <p className='card__priority__text'>{task.priority.toUpperCase()} PRIORITY</p>
                        <div />
                    </div>
                    <img src={threeDotIcon} />
                </div>
                <p className='card__title'>{task.title.slice(0, 40) + (task.title.length > 40 ? "..." : "")}</p>
            </div>

            <div className='card__flex'>
                <p className='card__checklist__title'>Checklist ({checkCnt}/{task.checklist.length})</p>
                <img src={isOpen ? dropUpIcon : dropDownIcon} onClick={()=>toggleTask(idx)} style={{cursor: 'pointer'}}/>
            </div>

            <div className='card__checklist'>
                {isOpen ? task.checklist.map(todo=>
                    <div className='card__checklist__element'>
                        {todo.isDone 
                        ? <div className='card__checklist__checkbox card__checklist__checkbox--1 card__flex' style={{justifyContent: 'center'}}> <img src={checkIcon} /> </div> 
                        : <div className='card__checklist__checkbox card__checklist__checkbox--0' /> }
                        <p className='card__checklist__text'>{todo.text}</p>
                    </div>
                ) : null}
            </div>

            <div className='card__flex'>
                <div className='card__flex'>
                    {task.dueDate ? <button className='card__btn'>{convertDate(task.dueDate)}</button> : null}
                </div>
                <div className='card__flex' style={{gap: '5px'}}>
                    {categories.map(x=>x!=category.toLowerCase() ? <button className='card__btn'>{x.toUpperCase()}</button> : null)}
                </div>
            </div>

        </div >
    )
}

export default Card