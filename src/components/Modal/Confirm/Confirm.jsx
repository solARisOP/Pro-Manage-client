import './index.css'
import Modal from '../Modal.jsx'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { 
	removeTask, 
	setUser
 } from '../../../features/storySlice.js';
import { useRef } from 'react';
const apiUrl = import.meta.env.VITE_SERVER_API;

function Confirm({closeModal, mode, task}) {
	const dispatch = useDispatch()
	const modelRef = useRef()

	const submit = async(e) => {
		modelRef.current.style.pointerEvents = 'none'
		if(mode === 'Delete') {
			try {
				await axios.delete(`${apiUrl}/task/${task._id}`, {
					withCredentials: true
				})
				dispatch(removeTask(task))
				closeModal()
				toast.success('task deleted successfully')
			} catch (error) {
				console.log(error.response?.data?.message || error.message)
			}
		}
		else {
			try {
				await axios.patch(`${apiUrl}/user/logout`, {}, {
					withCredentials: true
				})
				dispatch(setUser(null))
				closeModal()
			} catch (error) {
				toast.error(error.response?.data?.message || error.message)
			}
		}
		modelRef.current.style.pointerEvents = 'auto'
	}

	return (
		<Modal>
			<div className='confimModal__body' ref={modelRef}>
				<p className='confimModal__heading'>Are you sure you want to {mode}?</p>
				<div className='confimModal__btn__container'>
					<button className='confimModal__btn confimModal__btn--blue' onClick={submit}>Yes, {mode}</button>
					<button className='confimModal__btn confimModal__btn--red' onClick={closeModal}>Cancel</button>
				</div>
			</div>
		</Modal>
	)
}

export default Confirm