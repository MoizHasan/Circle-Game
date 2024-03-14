import react, { useState } from 'react'

const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90vw',
};

const buttonStyle = {
    border: 'none',
    color: '#fff',
    height: '40px',
    width: '80px',
    fontWeight: 'bold',
    fontSize: '1rem',
}

const CircleGame = () => {
    const [activeCircles, setActiveCircles] = useState([]);
    const [removedCircles, setRemovedCircles] = useState([]);

    const handleClick = (x,y) => {
        // save coordinates
        const circles = [...activeCircles];
        circles.push([x,y]);
        setActiveCircles(circles);
    };

    const handleUndo = () => {
        const circles = [...activeCircles];
        const removed = [...removedCircles];
        const last = circles.pop();
        removed.push(last); 
        setActiveCircles(circles);
        setRemovedCircles(removed); 
    };

    const handleRedo = () => {
        const circles = [...activeCircles];
        const removed = [...removedCircles];
        const last = removed.pop();
        circles.push(last); 
        setActiveCircles(circles);
        setRemovedCircles(removed); 
    }

    return (
        <>
        <div style={{border: 'solid 1px black', width: '90vw', height: '90vh'}} onClick={(e) => handleClick(e.pageX, e.pageY)}>
            {activeCircles.map((circle) => {
                return <div key={circle[0]+circle[1]} style={{position:'fixed', top: circle[1], left: circle[0], backgroundColor: '#fcba03', borderRadius: '30px', height: '30px', width: '30px'}}></div>
            })}
        </div>
        <nav style={navStyle}>
            <button style={{...buttonStyle, backgroundColor: 'green'}} onClick={() => handleUndo()} disabled={activeCircles.length === 0}>Undo</button>
            <button style={{...buttonStyle, backgroundColor: 'red'}} onClick={() => handleRedo()} disabled={removedCircles.length === 0}>Redo</button>
        </nav>
        </>
    )
};
export default CircleGame;