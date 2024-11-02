import './index.css'
import { groupIcon } from "../../assets"
import SignMode from './components/SignMode.jsx'

function Auth({mode}) {
    return (
        <div className='auth auth__container__display'>
            <div className='auth__first auth__container__display'>
                <div className='auth__first__container auth__container__display'>
                    <div className='auth__first__circle'></div>
                    <img className='auth__first__image' src={groupIcon} alt='no image' height={'40%'} width={'40%'} />
                    <div className='auth__first__text_container'>
                        <p className='auth__first__text--1'>Welcome aboard my friend</p>
                        <p className='auth__first__text--2'>just a couple of clicks and we start</p>
                    </div>
                </div>
            </div>
            <div className='auth__second auth__container__display'>
                <SignMode mode={mode} />
            </div>
        </div>
    )
}

export default Auth