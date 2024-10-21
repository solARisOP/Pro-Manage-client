import './index.css'
import { MdOutlineGroup } from "react-icons/md";

const date = new Date()
function Header() {
  return (
    <>
        <div className='head__section head__padd'>
            <p className='head__text__1'> Welcome Kumar!</p>
            <p className='head__text__2 head__text__grey'>{date.toDateString()}</p>
        </div>
        <div className='head__section head__padd'>
            <div className='head__section' style={{gap: '20px'}}>
                <p className='head__text__3'> Board</p>
                <div className='head__section head__text__grey' style={{gap: '5px'}}>
                    <MdOutlineGroup size={20} />
                    <p className='head__text__4'>Add People</p>
                </div>
            </div>
            <div>
                <p className='head__text__5'>This week v</p>
            </div>
        </div>
    </>
  )
}

export default Header