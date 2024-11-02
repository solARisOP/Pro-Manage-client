import './index.css'
import { 
	eyeIcon, 
	emailIcon, 
	passwordIcon, 
	nameIcon
 } from '../../assets'
import { 
	useDispatch, 
	useSelector
 } from 'react-redux'
import { 
	useRef, 
	useState
 } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { setUser } from '../../features/storySlice'
import Sidebar from '../Sidebar/Sidebar'

const apiUrl = import.meta.env.VITE_SERVER_API;

function Update() {

	const ref = useRef()
	const dispatch = useDispatch()
	const user = useSelector(state=>state.user)

	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
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

	const submitForm = async (e) => {

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
		
		e.target.style.pointerEvents = 'none'
		try {
			const { data : { message } } = await axios.patch(`${apiUrl}/user/${field}`, {
				content: formData[field],
				...(field ==='password' && {password : formData.oldPassword})
			}, {
				withCredentials: true
			})
			dispatch(setUser(field !== 'name' ? null : {...user, name : formData[field]}))
			toast.success(message)
		} catch (error) {
			toast.error(error.response?.data?.message || error.message)
			console.log(error);
		}
		e.target.style.pointerEvents = 'auto'
	}

	return (
		<>
			<Sidebar />
			<div className='update' ref={ref}>
				<p className='update__heading'>Settings</p>
				<div className='update__input__container update__display'>
					<div style={{ width: '100%' }}>
						<div className="update__input__wrapper">
							<img className="update__input__icon" src={nameIcon} />
							<input type="text" placeholder="Name" className="update__input" value={formData.name} onChange={updateFeilds.name} />
						</div>
						{formErrors.name ? <span className='update__input__error'>name should not be empty</span> : null}
					</div>
					<div style={{ width: '100%' }}>
						<div className="update__input__wrapper">
							<img className="update__input__icon" src={emailIcon} />
							<input type="text" placeholder="Email" className="update__input" value={formData.email} onChange={updateFeilds.email} />
						</div>
						{formErrors.email ? <span className='update__input__error'>invalid email</span> : null}
					</div>
					<div style={{ width: '100%' }}>
						<div className="update__input__wrapper">
							<img className="update__input__icon" src={passwordIcon} />
							<input type={password.oldPassword ? 'password' : 'text'} placeholder="Old Password" className="update__input" value={formData.oldPassword} onChange={updateFeilds.oldPassword} />
							<img className="update__eye__icon" src={eyeIcon} onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
						</div>
						{formErrors.oldPassword ? <span className='update__input__error'>password should be within 6 to 15 characters and should not contain spaces</span> : null}
					</div>
					<div style={{ width: '100%' }}>
						<div className="update__input__wrapper">
							<img className="update__input__icon" src={passwordIcon} />
							<input type={password.password ? 'password' : 'text'} placeholder="New Password" className="update__input" value={formData.password} onChange={updateFeilds.password} />
							<img className="update__eye__icon" src={eyeIcon} onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} data-password={1} />
						</div>
						{formErrors.password ? <span className='update__input__error'>password should be within 6 to 15 characters and should not contain spaces</span> : null}
					</div>
					<button className='update__btn' onClick={submitForm}>Update</button>
				</div>
			</div>
		</>
	)
}

export default Update