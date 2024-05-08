interface Props {
    toggle: () => void,
    occupied: boolean,
}

const Cell = ({ toggle, occupied } : Props) => {
    return (
        <div className="cell clickable">
        {occupied 
            ? <div className="cell-active" onClick={toggle}></div>
            : <div className="cell-empty" onClick={toggle}></div>
        }            
        </div>


    );
};

export default Cell;
