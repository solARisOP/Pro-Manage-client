import './index.css'
import { IoCubeOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GoDatabase } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";

function Sidebar() {
	return (
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
			<div className='sidebar__list__element element__text--red'>
				<HiOutlineLogout size={20} />
				Logout
			</div>
		</div>
	)
}

export default Sidebar