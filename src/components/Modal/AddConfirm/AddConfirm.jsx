import React from 'react'
import Modal from '../Modal.jsx'
import './index.css'

function AddConfirm({toggleAddConfirm}) {
	return (
		<Modal>
			<div className='addconfirm__body'>
				<p className='addconfirm__heading'>nitishraosnr2001@gmail.com added to board</p>
				<button className='addconfirm__btn' onClick={()=>toggleAddConfirm(0)}>Okay, got it!</button>
			</div>
		</Modal>
	)
}

export default AddConfirm