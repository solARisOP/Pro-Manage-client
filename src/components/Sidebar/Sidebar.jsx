import './index.css'
import { IoCubeOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GoDatabase } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { useState } from 'react';
import ConfirmModal from '../Modal/ConfirmModal/ConfirmModal.jsx';

function Sidebar() {
	
	const [logoutModal, setLogoutModal] = useState(0)

	const toggleLogout = (x) => {
        setLogoutModal(x)
    }

	return (
		<>
			<div className="sidebar">
				<div>
					<div className='sidebar_head'>
						<IoCubeOutline size={20} />
						Pro Manage
					</div>
					<ul className="sidebar__list">
						<li className='sidebar__list__element list__element--selected element__text--black'>
							<MdOutlineSpaceDashboard size={20} />
							Board
						</li>
						<li className='sidebar__list__element element__text--grey'>
							<GoDatabase size={20} />
							Analytics
						</li>
						<li className='sidebar__list__element element__text--grey'>
							<IoSettingsOutline size={20} />
							Settings
						</li>
					</ul>
				</div>
				<div className='sidebar__list__element element__text--red' onClick={()=>toggleLogout(1)}>
					<HiOutlineLogout size={20} />
					Logout
				</div>
			</div>
			{logoutModal ? <ConfirmModal toggleModal={toggleLogout} mode="Logout" /> : null}
		</>
	)
}

export default Sidebar