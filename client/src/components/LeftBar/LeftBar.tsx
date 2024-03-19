import "./Leftbar.css"

interface visibleProps {
    visible: boolean;
}

function LeftBar({ visible }: visibleProps) {
    return (
        <div className={`block-left-bar ${!visible ? 'hidden' : ''}`}>
            <div className="block-left-bar-content">
                <div className="block-navbar">
                    <p>Your chat</p>
                    <ul>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LeftBar
