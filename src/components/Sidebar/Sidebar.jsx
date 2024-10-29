import './index.css'
import { useState } from 'react';
import { LogoutModal } from '../Modal';
import { 
	appIcon, 
	dashboardIcon, 
	databaseIcon, 
	logoutIcon, 
	settingsIcon
 } from '../../assets';
import { NavLink } from 'react-router-dom';

function Sidebar() {
	
	const [logoutModal, setLogoutModal] = useState(0)

	const openLogout = ()=>{
		setLogoutModal(1)
	}

	const closeLogout = ()=>{
		setLogoutModal(0)
	}

	return (
		<>
			<div className="sidebar">
				<div>
					<div className='sidebar_head'>
						<img src={appIcon} />
						Pro Manage
					</div>
					<ul className="sidebar__list">
						<NavLink className={({isActive})=>`sidebar__list__element ${isActive ? 'list__element--selected' : ''} element__text--black`} to='/'>
							<img src={dashboardIcon} />
							Board
						</NavLink>
						<NavLink className={({isActive})=>`sidebar__list__element ${isActive ? 'list__element--selected' : ''} element__text--black`} to='/analytics'>
							<img src={databaseIcon} />
							Analytics
						</NavLink>
						<NavLink className={({isActive})=>`sidebar__list__element ${isActive ? 'list__element--selected' : ''} element__text--black`} to='/settings'>
							<img src={settingsIcon} />
							Settings
						</NavLink>
					</ul>
				</div>
				<div className='sidebar__list__element element__text--red' onClick={openLogout}>
					<img src={logoutIcon} alt="" />
					Logout
				</div>
			</div>
			{logoutModal ? <LogoutModal closeModal={closeLogout} mode="Logout" /> : null}
		</>
	)
}

export default Sidebar