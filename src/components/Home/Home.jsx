import Sidebar from "../Sidebar/Sidebar.jsx"
import Header from "./Header/Header.jsx"
import './index.css'
import Section from "./Section/Section.jsx"

function Home() {

	return (
		<>
			<Sidebar />
			<div className='home'>
				<Header />
				<div className="home__body">
					<Section name="Backlog" />
					<Section name="Todo" />
					<Section name="Progress" />
					<Section name="Done" />
				</div>
			</div>
		</>
	)
}

export default Home