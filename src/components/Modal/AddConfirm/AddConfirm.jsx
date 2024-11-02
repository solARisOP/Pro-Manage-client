import  Modal from '../Modal.jsx'
import './index.css'

function AddConfirm({toggleAddConfirm, email}) {
	return (
		<Modal>
			<div className='addconfirm__body'>
				<p className='addconfirm__heading'>{email} added to board</p>
				<button className='addconfirm__btn' onClick={()=>toggleAddConfirm(0)}>Okay, got it!</button>
			</div>
		</Modal>
	)
}

export default AddConfirm