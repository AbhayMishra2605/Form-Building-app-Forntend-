import { leftNavImage } from "../data"
import { rightNavImage } from "../data"
import './module.pageContainer.css'
import { useNavigate } from "react-router-dom"

function TopContainer() {
    const navigate = useNavigate()
    return (
        <div >
            <div className="topContainerImage">
            <img src={leftNavImage}/>
            <div className="topContainerText">
            <h1>Build advanced chatbots
                visually</h1>
                <p>Typebot gives you powerful blocks to create unique chat experiences. Embed them
                anywhere on your web/mobile apps and start collecting results like magic.</p>
                <button onClick={()=>navigate('/login')}>Create a FormBot  for free</button>
                </div>
            <img src={rightNavImage}/>
            </div>
            
        </div>
    )
}

export default TopContainer
