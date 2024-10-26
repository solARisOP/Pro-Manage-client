import { useLoaderData } from 'react-router-dom'
import './index.css'
const arr = [16, 10, 8, 10]

function Analytics() {

    // const x = useLoaderData()

    return (
        <div className='analytics'>
            <p className='analytics__heading'>
                Analytics
            </p>
            <div className='analytics__container'>
                <div className='analytics__section'>
                    {arr.map(x =>
                        <div className='analytics__display'>
                            <div className='analytics__display analytics__element'>
                                <div className='analytics__text__dot' />
                                <p className='analytics__text'>Backlog</p>
                            </div>
                            <p className='analytics__stat'>{x}</p>
                        </div>
                    )}
                </div>
                <div className='analytics__section'>
                    {arr.map(x =>
                        <div className='analytics__display'>
                            <div className='analytics__display analytics__element'>
                                <div className='analytics__text__dot' />
                                <p className='analytics__text'>Low Priority</p>
                            </div>
                            <p className='analytics__stat'>{x}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Analytics