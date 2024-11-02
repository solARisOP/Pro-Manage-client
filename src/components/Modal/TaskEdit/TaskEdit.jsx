import { 
	useEffect, 
	useRef, 
	useState
 } from "react"
import Modal from "../Modal.jsx"
import './index.css'
import { 
	binIcon, 
	checkIcon
 } from '../../../assets'
import axios from "axios"
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { 
	addTask, 
	removeTask
 } from "../../../features/storySlice.js"

const apiUrl = import.meta.env.VITE_SERVER_API

function TaskEdit({edit, closeModal, currTask}) {

	const dispatch = useDispatch()
	const timeline = useSelector(state => state.feedTimeline)

	const ref = useRef()

	const [assignList, setAssignList] = useState(0)
	const [calenderView, setCalenderView] = useState(0)
	const [title, setTitle] = useState("");
	const [priority, setPriority] = useState("");
	const [dueDate, setDueDate] = useState(null);
	const [checklist, setChecklist] = useState([]);
	const [members, setMembers] = useState({});
	const [originalMembers, setOriginalMembers] = useState({});
	const [users, setUsers] = useState([]);
	const [checkCnt, setCheckCnt] = useState(0);
	const [task, setTask] = useState(null);
	
	useEffect(() => {
		const fetchData = async() => {
			try {
				if(!edit) {
					const {data : {data}} = await axios.get(`${apiUrl}/user/all`, {
						withCredentials: true
					})
					setUsers(data)
				}
				else {
					const {data : {data : {task, unassignedUsers}}} = await axios.get(`${apiUrl}/task/edit?key=${currTask._id}`, {
						withCredentials: true
					})
					setChecklist(task.checklist)
					setPriority(task.priority)
					setTitle(task.title)
					setDueDate(task.dueDate)
					setTask(task)
					let cnt = 0;
					task.checklist.forEach(x=>cnt+=x.isDone)
					setCheckCnt(cnt)
					setUsers([...unassignedUsers, ...task.members])
					task.members.forEach(x=>{
						if(x.canUnassign) {
							setMembers(res=>({...res, [x.user._id] : 1}))
							setOriginalMembers(res=>({...res, [x.user._id] : 1}))
						}
					})
				}
			} catch (error) {
				if(error.response?.data?.message == 'task does not exists or does not belong to you') {
					dispatch(removeTask(currTask))
				}
				closeModal()
				toast.error(error.response?.data?.message || error.message)
			}
		}
		fetchData()
	}, [])

	const toggleList = () => {
		setAssignList(res=>!res)
	}

	const toggleCalender = () => {
		setCalenderView(res=>!res)
	}

	const updateTask = {
		title : (e) => {
			setTitle(e.target.value)
		},
		priority: (e) => {
			setPriority(e.currentTarget.value)
		},
		dueDate: (date) => {				
			setDueDate(res => { 
				date = new Date(date);
				date.setHours(0, 0, 0, 0)

				const oldDate = new Date(res);
				oldDate.setHours(0, 0, 0, 0)

				const a = oldDate.getTime()
				const b = date.getTime()			

				return a === b ? "" : date
			})
		},
		updateChecklist : (e) => {
			const idx = parseInt(e.target.dataset.idx)
			const value = e.target.value
			setChecklist(res=>{
				const arr = [...res]
				arr[idx].text = value
				return arr;
			})
		},
		toggleChecklist : (e) => {
			const idx = parseInt(e.currentTarget.dataset.idx)
			setChecklist(res=>{
				const arr = [...res]
				arr[idx].isDone = !arr[idx].isDone
				setCheckCnt(res => arr[idx].isDone ? res + 1 : res - 1)
				return arr;
			})
		},
		addChecklist: () => {
			setChecklist(res=>{
				const arr = [...res, {text: "", isDone: 0}];
				return arr;
			})
		},
		removeChecklist: (e) => {
			const idx = parseInt(e.currentTarget.dataset.idx)
			setChecklist(res=>{
				const arr = [...res]
				const x = arr.splice(idx, 1)
				setCheckCnt(res => x[0].isDone ? res - 1 : res)
				return arr;
			})
		},
		toggleMember: (e) => {
			const idx = e.target.dataset.idx
			setMembers(res=>{
				const newObj = {...res}
				if(newObj[idx]) {
					delete newObj[idx]
				}
				else {
					newObj[idx] = 1;
				}
				return newObj
			})
		}
	}

	const submitTask = async() => {		
		if(!title.trim()) {
			toast.error("title cannot be empty")
			return
		}
		else if(!priority) {
			toast.error("select a priority type")
			return
		}
		else if(!checklist.length) {
			toast.error("checklist cannot be empty")
			return
		}
		for (let i = 0; i < checklist.length; i++) {
			const x = checklist[i];
			if(!x.text.trim()) {
				toast.error("checklist value cannot be empty")
				return;
			}
		}

		console.log(dueDate);
		
		if(dueDate) {
			var date = new Date(dueDate)
			date.setHours(0,0,0,0)
		}

		ref.current.style.pointerEvents = 'none'
		if(edit) {
			const assign = [], unassign = [];
			for (const key in originalMembers) {
				if(!members[key]) {
					unassign.push(key)
				}
			}
			for (const key in members) {
				if(!originalMembers[key]) {
					assign.push(key)
				}
			}
			try {			
				const {data : {data}} = await axios.patch(`${apiUrl}/task/${currTask._id}`, {
					title,
					priority,
					...(dueDate && {dueDate : date.toDateString()}),
					checklist,
					assign,
					unassign,
					timeline
				}, {
					withCredentials: true
				})
				dispatch(removeTask(task))
				if(data) {
					dispatch(addTask({...data, assignedBy : currTask.assignedBy}))
				}
				closeModal()
				toast.success('task updated sucessfully')
			} catch (error) {
				if(error.response?.data?.statusCode == 403) {
					closeModal()
					dispatch(removeTask(task))
				}
				toast.error(error.response?.data?.message || error.message)
			}
		}
		else {
			try {
				const {data : {data} } = await axios.post(`${apiUrl}/task`, {
					title,
					priority,
					...(dueDate && {date : dueDate.toDateString()}),
					checklist,
					members,
					timeline
				}, {
					withCredentials: true
				})
				closeModal()
				if(data) {
					dispatch(addTask(data))
				}
				toast.success('task created sucessfully')
			} catch (error) {
				toast.error(error.response?.data?.message || error.message)
			}
		}
		ref.current.style.pointerEvents = 'auto'
	}

	return (
		<Modal>
			<div className="taskedit__body" ref={ref}>

				<div className="taskedit__head__container">
					<p>Title <span className="star__mark__red">*</span></p>
					<input type="text" className="taskedit__head__input taskedit__inputs" placeholder="Enter Task Title" value={title} onChange={updateTask.title} />
				</div>

				<div className="taskedit__priority__container">
					<p className="taskedit__text">Select Priority <span className="star__mark__red">*</span></p>
					<button className={`taskedit__priority__btn ${priority==='high' ? "taskedit__priority__select" : ""}`} value="high" onClick={updateTask.priority}>
						<div className="taskedit__priority__dot priority__dot--red" /> 
						<p>HIGH PRIORITY</p>
					</button>
					<button className={`taskedit__priority__btn ${priority==='moderate' ? "taskedit__priority__select" : ""}`} value="moderate" onClick={updateTask.priority}>
						<div className="taskedit__priority__dot priority__dot--blue" /> 
						<p>MODERATE PRIORITY</p>
					</button>
					<button className={`taskedit__priority__btn ${priority==='low' ? "taskedit__priority__select" : ""}`} value="low" onClick={updateTask.priority}>
						<div className="taskedit__priority__dot priority__dot--green" /> 
						<p>LOW PRIORITY</p>
					</button>
				</div>

				<div className="taskedit__assign__container">
					<p className="taskedit__text">Assign to</p>
					<div className="taskedit__inputs taskedit__assign" onClick={toggleList}> Add a assignee</div>
					{assignList ? <div className="taskedit__assign__list">
						{users.map(x=>
							<div className={`assign__list__element ${x.user && !x.canUnassign ? "assign__unlist__element" : "" }`} >
								<div className="assign__list__element__email">
									<div className="assign__list__element__logo">{`${x.user?.email || x.email}`.slice(0,2).toUpperCase()}</div>
									<p>{`${x.user?.email || x.email}`.slice(0, 26) + (`${x.user?.email || x.email}`.length > 26 ? "..." : "")}</p>
								</div>
								<button className="assign__list__element__btn" data-idx={x.user ? x.user._id : x._id} onClick={updateTask.toggleMember}>{members[x.user?._id || x._id] ? "Unassign" : "Assign"}</button>
							</div>
						)}
					</div> : null}
				</div>

				<div className="taskedit__checklist__container">
					<p className="taskedit__text">Checklist ({checkCnt}/{checklist.length}) <span className="star__mark__red">*</span></p>
					<div className="taskedit__checklist">
						{checklist.map((x, idx)=>
							<div className="checklist__input__wrapper">
								<div className={`checklist__input__check checklist__check--${!x.isDone ? '0' : '1'}`} data-idx={idx} onClick={updateTask.toggleChecklist} >{x.isDone ? <img src={checkIcon} /> :""}</div>
								<input type="text" className="checklist__input" data-idx={idx} value={x.text} onChange={updateTask.updateChecklist}/>
								<img src={binIcon} className="checklist__input__bin" onClick={updateTask.removeChecklist} data-idx={idx} />
							</div>
						)}
					</div>
					<div className="taskedit__checklist__addmore" onClick={updateTask.addChecklist}>+ Add New</div>
				</div>

				<div className="taskedit__btn__container">
					<button className="taskedit__btn taskedit__btn--grey" onClick={toggleCalender}>Select Due Date</button>
					<div className="taskedit__inner__btn__conatiner">
						<button className="taskedit__btn taskedit__btn--red" onClick={closeModal}>Cancel</button>
						<button className="taskedit__btn taskedit__btn--blue" onClick={submitTask}>Save</button>
					</div>
				</div>

				{calenderView ?  <Calendar onChange={updateTask.dueDate} value={dueDate} className='taskedit__calender' minDate={new Date()}  /> : null}

			</div>
		</ Modal>
	)
}

export default TaskEdit

