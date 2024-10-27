import { useState } from 'react'
import Modal from '../Modal.jsx'
import './index.css'
import { toast } from 'react-toastify'
import axios from 'axios';

const apiUrl = import.meta.env.VITE_SERVER_API;

function AddPeople({toggleAddPeople, toggleAddConfirm}) {
	const [email, setEmail] = useState("")

	const updateEmail = (e) => {
		setEmail(e.target.value)
	}

	const submitEmail = async()=>{
		if(!/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email)) {
			toast.error("invalid email format")
			return;
		}

		try {
			await axios.post(`${apiUrl}/user/addUser`, {email}, {
				withCredentials: true
			})
			toast.success("user added to dashboard successfully")
			toggleAddConfirm(1)
			toggleAddPeople(0)
		} catch (error) {
			toast.error(error.response?.data?.message || error.message)
		}
	}

	return (
		<Modal>
			<div className='addpeople__body'>
				<p className='addpeople__heading'>
					Add people to the board 
				</p>
				<input type="text" className='addpeople__input' placeholder='Enter the email' onChange={updateEmail} value={email} />
				<div className='addpeople__btn__container'>
					<button className='addpeople__btn addpeople__btn--red' onClick={()=>toggleAddPeople(0)}>Cancel</button>
					<button className='addpeople__btn addpeople__btn--blue' onClick={submitEmail}>Add Email</button>
				</div>
			</div>
		</Modal>
	)
}

export default AddPeople