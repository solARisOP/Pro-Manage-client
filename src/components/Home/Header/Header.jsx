import './index.css'
import peopleIcon from "../../../assets/people.svg";
import dropIcon from "../../../assets/drop.svg";
import AddPeople from "../../Modal/AddPeople/AddPeople.jsx";
import AddConfirm from "../../Modal/AddConfirm/AddConfirm.jsx";
import ConfirmModal from "../../Modal/ConfirmModal/ConfirmModal.jsx";
import { useState } from 'react';
import { useSelector } from 'react-redux';

const date = new Date()
function Header() {
    
	const user = useSelector(state=>state.user)

    const [addPeople, setAddPeople] = useState(0)
    const [addconfirm, setAddConfirm] = useState(0)
    const [deleteModal, setDeleteModal] = useState(0)

    const toggleAddPeople = (x) => {
        setAddPeople(x);
    }

    const toggleAddConfirm = (x) => {
        setAddConfirm(x)
    }

    const toggleDelete = (x) => {
        setDeleteModal(x)
    }

  return (
    <>
        <div className='head__section'>
            <p className='head__text__1'> Welcome {user?.name}!</p>
            <p className='head__text__2 head__text__grey'>{date.toDateString()}</p>
        </div>
        <div className='head__section'>
            <div className='head__section' style={{gap: '20px'}}>
                <p className='head__text__3'> Board</p>
                <div className='head__section head__text__grey' style={{gap: '5px', cursor: 'pointer', marginBottom: '0'}} onClick={()=>toggleAddPeople(1)}>
                    <img src={peopleIcon} />
                    <p className='head__text__4'>Add People</p>
                </div>
            </div>
            <div>
                <p className='head__text__5'>This week <img src={dropIcon} /></p>
            </div>
        </div>

        {addPeople ? <AddPeople toggleAddPeople={toggleAddPeople} toggleAddConfirm={toggleAddConfirm} /> : null}
        {addconfirm ? <AddConfirm toggleAddConfirm={toggleAddConfirm} /> : null}
        {deleteModal ? <ConfirmModal toggleModal={toggleDelete} mode="Delete" /> : null}
    </>
  )
}

export default Header