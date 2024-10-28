import './index.css'
import dropCloseIcon from '../../../assets/dropClose.svg'
import { useSelector } from 'react-redux'
import Card from './Card/Card.jsx';
import { useState } from 'react';

function Section({ name }) {
    const tasks = useSelector(state => state.tasks[name.toLowerCase()]);

    const [tasksOpen, setTasksOpen] = useState(new Array(tasks.length).fill(0))

    const closeSection = ()=>{
        setTasksOpen(new Array(tasks.length).fill(0))
    }

    const toggleTask = (idx) => {
        setTasksOpen(res=>{
            const arr = [...res]
            arr[idx] = !arr[idx]
            return arr
        })
    }

    return (
        <div className='section'>
            <div className='section__head'>
                <p className='section__head__text'>{name}</p>
                <img src={dropCloseIcon} onClick={closeSection} style={{cursor: 'pointer'}} />
            </div>
            <div className='section__tasks'>
                {tasks.map((task, idx)=><Card task={task} category={name} isOpen={tasksOpen[idx]} idx={idx} toggleTask={toggleTask} />)}
            </div>
        </div>
    )
}

export default Section