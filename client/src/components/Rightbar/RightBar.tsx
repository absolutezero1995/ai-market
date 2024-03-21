import "./RightBar.css"

interface visibleProps {
    visibleR: boolean;
}

function RightBar({ visibleR }: visibleProps) {
<<<<<<< HEAD


=======
>>>>>>> 11a0cdf14687070b217a1e3c66e15b960ed90fc0
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