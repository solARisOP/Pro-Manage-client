import './index.css'
import { MdOutlineGroup } from "react-icons/md";
import AddPeople from "../../Modal/AddPeople/AddPeople.jsx";
import AddConfirm from "../../Modal/AddConfirm/AddConfirm.jsx";
import ConfirmModal from "../../Modal/ConfirmModal/ConfirmModal.jsx";
import { useState } from 'react';

const date = new Date()
function Header() {

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
        <div className='head__section head__padd'>
            <p className='head__text__1'> Welcome Kumar!</p>
            <p className='head__text__2 head__text__grey'>{date.toDateString()}</p>
        </div>
        <div className='head__section head__padd'>
            <div className='head__section' style={{gap: '20px'}}>
                <p className='head__text__3'> Board</p>
                <div className='head__section head__text__grey' style={{gap: '5px', cursor: 'pointer'}} onClick={()=>toggleAddPeople(1)}>
                    <MdOutlineGroup size={20} />
                    <p className='head__text__4'>Add People</p>
                </div>
            </div>
            <div>
                <p className='head__text__5'>This week v</p>
            </div>
        </div>

        {addPeople ? <AddPeople toggleAddPeople={toggleAddPeople} toggleAddConfirm={toggleAddConfirm} /> : null}
        {addconfirm ? <AddConfirm toggleAddConfirm={toggleAddConfirm} /> : null}
        {deleteModal ? <ConfirmModal toggleModal={toggleDelete} mode="Delete" /> : null}
    </>
  )
}

export default Header