import React from 'react'
import '../styles/Test.css'

const FrameHoverEffect = () => {
    return (
        <div>
            <img src="https://picsum.photos/id/1015/300/300" alt="a canyon and a lake" />
            <img src="https://picsum.photos/id/1016/300/300" alt="a canyon" style={{ "--g": "20px", "--b": "5px", "--c": "#D95B43" }} />
        </div>
    )
}

export default FrameHoverEffect