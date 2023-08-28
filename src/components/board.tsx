import { useSelector, useDispatch } from "react-redux";
import { toggleCell } from "../slices/gridSlice";
import { RootState } from "../store";

function Board() {
    const gridData = useSelector((state: RootState) => state.grid);
    console.log(gridData);
    
    return (
        <div>
            grid
        </div>
    )
}

export default Board;