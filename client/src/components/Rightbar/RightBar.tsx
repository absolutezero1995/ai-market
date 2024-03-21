import "./RightBar.css"

interface visibleProps {
    visibleR: boolean;
}

function RightBar({ visibleR }: visibleProps) {
    return(
        <div className={`block-right-bar ${!visibleR ? 'closeR' : 'openR'}`}>
            <div className="block-right-bar-content">
                <div className="block-navbar">
                    <p>Category</p>
                    <ul>
                        <li>chat1</li>
                        <li>chat2</li>
                        <li>chat3</li>
                        <li>chat4</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default RightBar