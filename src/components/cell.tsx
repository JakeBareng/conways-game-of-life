interface Props {
    toggle: () => void,
    occupied: boolean,
}

const Cell = ({ toggle, occupied } : Props) => {
    return (
        <div className="cell clickable">
        {occupied 
            ? <div onClick={toggle}> * </div>
            : <div onClick={toggle}> - </div>
        }            
        </div>


    );
};

export default Cell;
