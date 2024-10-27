import './index.css'
import Modal from '../Modal.jsx'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../features/storySlice.js';
import { useRef } from 'react';
const apiUrl = import.meta.env.VITE_SERVER_API;

function confimModal({toggleModal, mode, idx}) {
	const dispatch = useDispatch()
	const model = useRef()

	const submit = async(e) => {
		model.current.style.pointerEvents = 'none'
		
		if(mode === 'Delete') {
			try {
				await axios.delete(`${apiUrl}/task/:${idx}`, {
					withCredentials: true
				})
				toggleModal(0)
			} catch (error) {
				toast.error(error.response?.data?.message || error.message)
			}
		}
		else {
			try {
				await axios.patch(`${apiUrl}/user/logout`, {
					withCredentials: true
				})
				toggleModal(0)
				dispatch(setUser(null))
			} catch (error) {
				toast.error(error.response?.data?.message || error.message)
			}
		}
		model.current.style.pointerEvents = 'auto'
	}

	return (
		<Modal>
			<div className='confimModal__body' ref={model}>
				<p className='confimModal__heading'>Are you sure you want to {mode}?</p>
				<div className='confimModal__btn__container'>
					<button className='confimModal__btn confimModal__btn--blue' onClick={submit}>Yes, {mode}</button>
					<button className='confimModal__btn confimModal__btn--red' onClick={() => toggleModal(0)}>Cancel</button>
				</div>
			</div>
		</Modal>
	)
}

export default confimModal