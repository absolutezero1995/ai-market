import LeftBar from "../LeftBar/LeftBar"
import RightBar from "../Rightbar/RightBar"
import './ActionBars.css';


const ActionBars = () => {
    return (
        <div className="action-bar-container">
            <div className="hide-icon-left-container">
            <LeftBar />
            </div>
            <div className="hide-icon-right-container">
            <RightBar />
            </div>
        </div>
    )
}

export default ActionBars
