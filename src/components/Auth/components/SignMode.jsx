import { useState } from 'react'
import './index.css'
import EyeIcon from '../../../assets/eye.svg'
import EmailIcon from '../../../assets/email.svg'
import PasswordIcon from '../../../assets/password.svg'
import NameIcon from '../../../assets/name.svg'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../features/storySlice'

const apiUrl = import.meta.env.VITE_SERVER_API;

function SignMode({ mode }) {

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        cnfPassword: ""
    })

    const [formErrors, setFormErrors] = useState({
        name: 0,
        email: 0,
        password: 0,
        cnfPassword: 0,
    })

    const [password, setPassword] = useState({
        password : 1,
        cnfPassword : 1
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
        password: (e) => {
            setFormData(res => {
                const newObj = { ...res, password: e.target.value };
                return newObj
            })
            setFormErrors(res => {
                const newObj = { ...res, password: 0 }
                return newObj
            })
        },
        cnfPassword: (e) => {
            setFormData(res => {
                const newObj = { ...res, cnfPassword: e.target.value };
                return newObj
            })
            setFormErrors(res => {
                const newObj = { ...res, cnfPassword: 0 }
                return newObj
            })
        }
    }

    const togglePasswordVisibility = (e) => {
        const idx = e.target.dataset.password;
        setPassword(res=>{
            const newObj = {...res}
            if(idx) newObj.password = !newObj.password
            else newObj.cnfPassword = !newObj.cnfPassword
            return newObj
        })
    }

    const submitForm = async () => {

        const errors = {}
        if (!/[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(formData.email)) {
            errors.email = 1;
        }
        if (!/^[\S]{6,15}$/.test(formData.password)) {
            errors.password = 1;
        }
        if (mode === 'Register') {
            if (formData.cnfPassword != formData.password) {
                errors.cnfPassword = 1;
            }
            if (!formData.name.trim()) {
                errors.name = 1;
            }
        }

        if (Object.keys(errors).length) {
            setFormErrors(errors)
            return;
        }
        console.log('here');

        
        try {
            var res;
            if(mode === 'Register') {
                res = await axios.post(`${apiUrl}/user`, {
                    ...formData
                }, {
                    withCredentials: true
                })
            }
            else {
                res = await axios.put(`${apiUrl}/user/login`, {
                    ...formData
                }, {
                    withCredentials: true
                })
                dispatch(setUser(res.data.data))
            }

            toast.success(res.data.message)
            console.log(res.data.data);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
            console.log(error);
            
        }
    }
    

    return (
        <div className='sign sign__display'>
            <p className='sign__heading'>
                {mode}
            </p>
            <div className='sign__input__container sign__display'>
                {mode === 'Login' ? <>
                    <div style={{ width: '100%' }}>
                        <div className="sign__input__wrapper">
                            <img className="sign__input__icon" src={EmailIcon} />
                            <input type="text" placeholder="Email" className="sign__input" value={formData.email} onChange={updateFeilds.email} />
                        </div>
                        {formErrors.email ? <span className='sign__input__error'>invalid email</span> : null}
                    </div>
                    <div style={{ width: '100%' }}>
                        <div className="sign__input__wrapper">
                            <img className="sign__input__icon" src={PasswordIcon} />
                            <input type={password.password ? 'password' : 'text'} placeholder="Password" className="sign__input" value={formData.password} onChange={updateFeilds.password} />
                            <img className="sign__eye__icon" src={EyeIcon} onClick={togglePasswordVisibility} data-password={1}/>
                        </div>
                        {formErrors.password ? <span className='sign__input__error'>password should be within 6 to 15 characters and should not contain spaces</span> : null}
                    </div>
                </> : <>
                    <div style={{ width: '100%' }}>
                        <div className="sign__input__wrapper">
                            <img className="sign__input__icon" src={NameIcon} />
                            <input type="text" placeholder="Name" className="sign__input" value={formData.name} onChange={updateFeilds.name} />
                        </div>
                        {formErrors.name ? <span className='sign__input__error'>name should not be empty</span> : null}
                    </div>
                    <div style={{ width: '100%' }}>
                        <div className="sign__input__wrapper">
                            <img className="sign__input__icon" src={EmailIcon} />
                            <input type="text" placeholder="Email" className="sign__input" value={formData.email} onChange={updateFeilds.email} />
                        </div>
                        {formErrors.email ? <span className='sign__input__error'>invalid email</span> : null}
                    </div>
                    <div style={{ width: '100%' }}>
                        <div className="sign__input__wrapper">
                            <img className="sign__input__icon" src={PasswordIcon} />
                            <input type={password.password ? 'password' : 'text'} placeholder="Password" className="sign__input" value={formData.password} onChange={updateFeilds.password} />
                            <img className="sign__eye__icon" src={EyeIcon} onClick={togglePasswordVisibility} data-password={1}/>
                        </div>
                        {formErrors.password ? <span className='sign__input__error'>password should be within 6 to 15 characters and should not contain spaces</span> : null}
                    </div>
                    <div style={{ width: '100%' }}>
                        <div className="sign__input__wrapper">
                            <img className="sign__input__icon" src={PasswordIcon} />
                            <input type={password.cnfPassword ? 'password' : 'text'} placeholder="Confirm Password" className="sign__input" value={formData.cnfPassword} onChange={updateFeilds.cnfPassword} />
                            <img className="sign__eye__icon" src={EyeIcon} onClick={togglePasswordVisibility}/>
                        </div>
                        {formErrors.cnfPassword ? <span className='sign__input__error'>passwords do not match</span> : null}
                    </div>
                </>}
            </div>
            <div className='sign__btn__container sign__display'>
                <button className='sign__btn sign__btn--1' onClick={submitForm}>{mode}</button>
                <p className='sign__btn__text'>Have no account yet?</p>
                <button className='sign__btn sign__btn--2'>{mode === 'Login' ? 'Register' : 'Login'}</button>
            </div>
        </div>
    )
}

export default SignMode