import './index.css'
import EyeIcon from '../../assets/eye.svg'
import EmailIcon from '../../assets/email.svg'
import PasswordIcon from '../../assets/password.svg'
import NameIcon from '../../assets/name.svg'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setUser } from '../../features/storySlice'

const apiUrl = import.meta.env.VITE_SERVER_API;

function Update() {

	const dispatch = useDispatch()

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		oldPassword: "",
		password: ""
	})

	const [formErrors, setFormErrors] = useState({
		name: 0,
		email: 0,
		oldPassword: 0,
		password: 0,
	})

	const [password, setPassword] = useState({
		oldPassword: 1,
		password: 1
	})

	const updateFeilds = {
		name: (e) => {
			setFormData(res => {
				const newObj = { ...res, name: e.target.value };
				return newObj
			})
			setFormErrors(res => {
				const newObj = { ...res, name: 0 }
				return newObj
			})
		},
		email: (e) => {
			setFormData(res => {
				const newObj = { ...res, email: e.target.value };
				return newObj
			})
			setFormErrors(res => {
				const newObj = { ...res, email: 0 }
				return newObj
			})
		},
		oldPassword: (e) => {
			setFormData(res => {
				const newObj = { ...res, oldPassword: e.target.value };
				return newObj
			})
			setFormErrors(res => {
				const newObj = { ...res, oldPassword: 0 }
				return newObj
			})
		},
		password: (e) => {
			setFormData(res => {
				const newObj = { ...res, password: e.target.value };
				return newObj
			})
			setFormErrors(res => {
				const newObj = { ...res, password: 0 }
				return newObj
			})
		}
	}

	const togglePasswordVisibility = (e) => {
		const idx = e.target.dataset.password;
		setPassword(res => {
			const newObj = { ...res }
			if (idx) newObj.password = !newObj.password
			else newObj.oldPassword = !newObj.oldPassword
			return newObj
		})
	}

	const submitForm = async () => {

		const x = [formData.email, formData.name, formData.password].filter(x => x.trim())
		if (x.length > 1) {
			toast.error("only one field is allowed for updation at a time")
			return
		}
		else if (!x.length) {
			toast.error("atleast one field is allowed for updation at a time")
			return
		}

		
		
		let field;
		if (formData.email) {
			if (!/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(formData.email)) {
				setFormErrors({ email: 1 })
				return;
			}
			field = 'email'
		}
		else if (formData.password) {
			if (!/^[\S]{6,15}$/.test(formData.oldPassword)) {
				setFormErrors({ oldPassword: 1 })
				return;
			}
			if (!/^[\S]{6,15}$/.test(formData.password)) {
				setFormErrors({ password: 1 })
				return;
			}
			field = 'password'
		}
		else field = 'name'

		try {
			const res = await axios.patch(`${apiUrl}/user/${field}`, {
				content: formData[field],
				...(field ==='password' && {password : formData.oldPassword})
			}, {
				withCredentials: true
			})
			dispatch(setUser(null))
			toast.success(res.data.message)
		} catch (error) {
			toast.error(error.response?.data?.message || error.message)
			console.log(error);
		}
	}

	return (
		<div className='update'>
			<p className='update__heading'>Settings</p>
			<div className='update__input__container update__display'>
				<div style={{ width: '100%' }}>
					<div className="update__input__wrapper">
						<img className="update__input__icon" src={NameIcon} />
						<input type="text" placeholder="Name" className="update__input" value={formData.name} onChange={updateFeilds.name} />
					</div>
					{formErrors.name ? <span className='update__input__error'>name should not be empty</span> : null}
				</div>
				<div style={{ width: '100%' }}>
					<div className="update__input__wrapper">
						<img className="update__input__icon" src={EmailIcon} />
						<input type="text" placeholder="Email" className="update__input" value={formData.email} onChange={updateFeilds.email} />
					</div>
					{formErrors.email ? <span className='update__input__error'>invalid email</span> : null}
				</div>
				<div style={{ width: '100%' }}>
					<div className="update__input__wrapper">
						<img className="update__input__icon" src={PasswordIcon} />
						<input type={password.oldPassword ? 'password' : 'text'} placeholder="Old Password" className="update__input" value={formData.oldPassword} onChange={updateFeilds.oldPassword} />
						<img className="update__eye__icon" src={EyeIcon} onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
					</div>
					{formErrors.oldPassword ? <span className='update__input__error'>password should be within 6 to 15 characters and should not contain spaces</span> : null}
				</div>
				<div style={{ width: '100%' }}>
					<div className="update__input__wrapper">
						<img className="update__input__icon" src={PasswordIcon} />
						<input type={password.password ? 'password' : 'text'} placeholder="New Password" className="update__input" value={formData.password} onChange={updateFeilds.password} />
						<img className="update__eye__icon" src={EyeIcon} onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} data-password={1} />
					</div>
					{formErrors.password ? <span className='update__input__error'>password should be within 6 to 15 characters and should not contain spaces</span> : null}
				</div>
				<button className='update__btn' onClick={submitForm}>Update</button>
			</div>
		</div>
	)
}

export default Update