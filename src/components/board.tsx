import { useSelector, useDispatch } from "react-redux";
import { toggleCell, createGridSize } from "../slices/gridSlice";
import { useEffect, useState } from "react";
import { gridState } from "../store";
import Cell from "./cell";

function Board() {
    const gridData = useSelector((state: gridState) => state.grid);
    const dispatch = useDispatch();
    const [intervalRef, setIntervalRef] = useState<NodeJS.Timer>();

    useEffect(() => {
        dispatch(createGridSize([10, 10]));
    }, [dispatch]);

    const countNeighbours = (x: number, y: number) => {
        const coords = [`${x - 1},${y + 1}`, `${x},${y + 1}`, `${x + 1},${y + 1}`, `${x - 1},${y}`, `${x + 1},${y}`, `${x - 1},${y - 1}`, `${x},${y - 1}`, `${x + 1},${y - 1}`]
        let count = 0;
        // check for each coord
        coords.forEach(coord => {
            if (gridData.grid[coord]) {
                count++;
            }
        });
        return count;
    }

    const handleCellToggle = (x: number, y: number) => {
        dispatch(toggleCell([x, y]));
    };

    const renderGrid = () => {
        return (
            <>
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

    /* 
    Any live cell with two or three live neighbours survives.
    Any dead cell with three live neighbours becomes a live cell.
    All other live cells die in the next generation. Similarly, all other dead cells stay dead.
     */
    const checkCells = () => {
        Object.keys(gridData.grid).map((coord) => {
            const [x, y] = coord.split(",").map(Number);
            const isAlive = gridData.grid[coord];
            const neighbours = countNeighbours(x, y);
            if (!isAlive && neighbours == 3) dispatch(toggleCell([x, y]));
            else if (isAlive && (neighbours > 3 || neighbours < 2)) dispatch(toggleCell([x, y]));
        })
    }

    const startIteration = () => {
        if (!intervalRef) setIntervalRef(setInterval(() => { 
            checkCells(),
            renderGrid()
         }, 1000));
    }

    const stopIteration = () => {
        if (intervalRef)  {
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