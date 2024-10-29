import './index.css'
import { 
    peopleIcon, 
    dropIcon
 } from "../../../assets";
import { 
    AddPeople, 
    AddConfirm
 } from "../../Modal";
import { useState } from 'react';
import { 
    useDispatch, 
    useSelector
 } from 'react-redux';
import axios from 'axios';
import { 
    changeTimeline, 
    setTasks
 } from '../../../features/storySlice';
import { toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_SERVER_API

const date = new Date()
function Header() {
    
	const user = useSelector(state => state.user)
	const feedTimeline = useSelector(state => state.feedTimeline)
    const dispatch = useDispatch()
    const [addPeople, setAddPeople] = useState(0)
    const [addconfirm, setAddConfirm] = useState(0)
    const [timeline, setTimeline] = useState(0)

    const toggleAddPeople = (x) => {
        setAddPeople(x);
    }

    const toggleAddConfirm = (x) => {
        setAddConfirm(x)
    }

    const filterByTime = async(e) => {
        const value = e.target.value
        try {
            const {data : {data}} = await axios.get(`${apiUrl}/feed?timeline=${value}`, {
                withCredentials: true
            })
            dispatch(setTasks(data))
            dispatch(changeTimeline(value))
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const toggleTimeline = ()=> {
        setTimeline(res => !res)
    }

  return (
    <>
        <div className='head__section'>
            <p className='head__text__1'> Welcome {user?.name}!</p>
            <p className='head__text__2 head__text__grey'>{date.toDateString()}</p>
        </div>
        <div className='head__section'>
            <div className='head__section' style={{gap: '20px'}}>
                <p className='head__text__3'> Board</p>
                <div className='head__section head__text__grey' style={{gap: '5px', cursor: 'pointer', marginBottom: '0'}} onClick={()=>toggleAddPeople(1)}>
                    <img src={peopleIcon} />
                    <p className='head__text__4'>Add People</p>
                </div>
            </div>
            <div style={{position: 'relative'}}>
                <p className='head__text__5' onClick={toggleTimeline} style={{cursor: 'pointer'}}>{feedTimeline==='today' ? 'Today' : 'This ' + feedTimeline[0].toUpperCase() + feedTimeline.slice(1)} <img src={dropIcon} /></p>
                {timeline ? <div className='head__options'>
                    <button className='head__options__btn' onClick={filterByTime} value='today'>Today</button>
                    <button className='head__options__btn' onClick={filterByTime} value='week'>This Week</button>
                    <button className='head__options__btn' onClick={filterByTime} value='month'>This Month</button>
                </div> : null}
            </div>
        </div>

        {addPeople ? <AddPeople toggleAddPeople={toggleAddPeople} toggleAddConfirm={toggleAddConfirm} /> : null}
        {addconfirm ? <AddConfirm toggleAddConfirm={toggleAddConfirm} /> : null}
    </>
  )
}

export default Header