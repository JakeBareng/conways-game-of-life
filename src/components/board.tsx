import { useSelector, useDispatch } from "react-redux";
import { toggleCell, createGridSize, modifyGrid } from "../slices/gridSlice";
import { useEffect, useState } from "react";
import { gridState } from "../store";
import { checkCells } from "./util/boardUtil";
import Cell from "./cell";

function Board() {
    const gridData = useSelector((state: gridState) => state.grid);
    const dispatch = useDispatch();
    const [intervalRef, setIntervalRef] = useState<NodeJS.Timer | null>();

    useEffect(() => {
        dispatch(createGridSize([10, 10]));
    }, [dispatch]);

    const handleCellToggle = (x: number, y: number) => {
        dispatch(toggleCell([x, y]));
    };

    const renderGrid = () => {
        return (<>
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
        </>
        );
    };



    const startIteration = () => {
        if (!intervalRef) setIntervalRef(setInterval(() => {
            let newGrid = checkCells(gridData.grid);
            dispatch(modifyGrid(newGrid));
        }, 1000));
    }

    const stopIteration = () => {
        if (intervalRef) {
            clearInterval(intervalRef);
            setIntervalRef(undefined);
        }
    }

    return (
        <>
            <button onClick={startIteration}>start</button>
            <button onClick={stopIteration}>stop</button>
            <div className="grid-container">
                {renderGrid()}
            </div>
        </>

    )
}
export default Board;