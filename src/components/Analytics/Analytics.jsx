import { useLoaderData } from 'react-router-dom'
import './index.css'
import Sidebar from '../Sidebar/Sidebar'

function Analytics() {

    const data = useLoaderData()

    return (
        <>
            <Sidebar />
            <div className='analytics'>
                <p className='analytics__heading'>
                    Analytics
                </p>
                <div className='analytics__container'>
                    <div className='analytics__section'>
                        <div className='analytics__display'>
                            <div className='analytics__display analytics__element'>
                                <div className='analytics__text__dot' />
                                <p className='analytics__text'>Backlog Tasks</p>
                            </div>
                            <p className='analytics__stat'>{data.category.backlog || 0}</p>
                        </div>
                        <div className='analytics__display'>
                            <div className='analytics__display analytics__element'>
                                <div className='analytics__text__dot' />
                                <p className='analytics__text'>To-do Tasks</p>
                            </div>
                            <p className='analytics__stat'>{data.category.todo || 0}</p>
                        </div>
                        <div className='analytics__display'>
                            <div className='analytics__display analytics__element'>
                                <div className='analytics__text__dot' />
                                <p className='analytics__text'>In-Progress Tasks</p>
                            </div>
                            <p className='analytics__stat'>{data.category.progress || 0}</p>
                        </div>
                        <div className='analytics__display'>
                            <div className='analytics__display analytics__element'>
                                <div className='analytics__text__dot' />
                                <p className='analytics__text'>Completed Tasks</p>
                            </div>
                            <p className='analytics__stat'>{data.category.done || 0}</p>
                        </div>
                    </div>
                    <div className='analytics__section'>
                        <div className='analytics__display'>
                            <div className='analytics__display analytics__element'>
                                <div className='analytics__text__dot' />
                                <p className='analytics__text'>Low Priority</p>
                            </div>
                            <p className='analytics__stat'>{data.priority.low || 0}</p>
                        </div>
                        <div className='analytics__display'>
                            <div className='analytics__display analytics__element'>
                                <div className='analytics__text__dot' />
                                <p className='analytics__text'>Moderate Priority</p>
                            </div>
                            <p className='analytics__stat'>{data.priority.moderate || 0}</p>
                        </div>
                        <div className='analytics__display'>
                            <div className='analytics__display analytics__element'>
                                <div className='analytics__text__dot' />
                                <p className='analytics__text'>High Priority</p>
                            </div>
                            <p className='analytics__stat'>{data.priority.high || 0}</p>
                        </div>
                        <div className='analytics__display'>
                            <div className='analytics__display analytics__element'>
                                <div className='analytics__text__dot' />
                                <p className='analytics__text'>Due Date Tasks</p>
                            </div>
                            <p className='analytics__stat'>{data.dueDate || 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Analytics