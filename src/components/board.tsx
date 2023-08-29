import { useSelector, useDispatch } from "react-redux";
import { toggleCell, createGridSize } from "../slices/gridSlice";
import { useEffect } from "react";
import { gridState, useAppDispatch } from "../store";
import Cell from "./cell";

function Board() {
    const gridData = useSelector((state: gridState) => state.grid);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(createGridSize([4, 4]));
    }, [dispatch]);

    const handleCellToggle = (x: number, y: number) => {
        dispatch(toggleCell([x, y]));
    };

    const renderGrid = () => {
        return (
            <div className="grid-container">
                {Object.keys(gridData.grid).map((coord) => {
                    const [x, y] = coord.split(',').map(Number);
                    const occupied = gridData.grid[coord];
                    return (
                        <Cell
                            key={coord}
                            toggle={() => handleCellToggle(x, y)}
                            occupied={occupied}
                        />
                    );
                })}
            </div>
        );
    };

    return <div>{renderGrid()}</div>;
}
export default Board;