import { useLoaderData } from 'react-router-dom'
import {
    appIcon,
    checkIcon
} from '../../assets'
import './index.css'
import { 
    useEffect, 
    useState
 } from 'react'

function Task() {
    const task = useLoaderData()
    const [checkCnt, setcheckCnt] = useState(0)

    useEffect(() => {
        let cnt = 0;
        task.checklist.forEach(x => cnt += x.isDone)
        setcheckCnt(cnt)
    }, [])

    const convertDate = () => {
        const dateStr = new Date(task.dueDate).toDateString().split(" ");
        return `${dateStr[1]} ${dateStr[2]}`
    }

    return (
        <div className='task'>
            <div className='task__app__title'>
                <img src={appIcon} />
                <p className='task__app__title__text'>Pro Manage</p>
            </div>
            <div className='task__body'>

                <div className='task__body__head'>
                    <div className={`task__priority__dot task__priority--${task.priority}`} />
                    <p className='task__priority__text'>{task.priority.toUpperCase()} PRIORITY</p>
                </div>

                <p className='task__title'>{task.title.slice(0, 40) + (task.title.length > 40 ? "..." : "")}</p>

                <p className='task__checklist__title'>Checklist ({checkCnt}/{task.checklist.length})</p>

                <div className='task__checklist'>
                    {task.checklist.map(todo =>
                        <div className='task__checklist__element'>
                            {todo.isDone
                                ? <div className='task__checklist__checkbox task__checklist__checkbox--1' > <img src={checkIcon} /> </div>
                                : <div className='task__checklist__checkbox task__checklist__checkbox--0' />}
                            <p className='task__checklist__text'>{todo.text}</p>
                        </div>
                    )}
                </div>

                {task.dueDate ? <div className='task__footer'>
                    <p>Due Date</p>
                    <button className='task__date__btn'>{convertDate()}</button>
                </div> : null}

            </div>
        </div>
    )
}

export default Task