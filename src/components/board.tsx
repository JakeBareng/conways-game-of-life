import { useSelector, useDispatch } from "react-redux";
import { toggleCell, createGridSize, modifyGrid } from "../slices/gridSlice";
import { useEffect, useState } from "react";
import { gridState } from "../store";
import { checkCells } from "./util/boardUtil";
import Cell from "./cell";

function Board() {
    const gridData = useSelector(((state: gridState) => state.grid));
    const dispatch = useDispatch();
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [size, setSize] = useState<number>(10);

    useEffect(() => {
        dispatch(createGridSize([size, size]));
    }, [dispatch, size]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        const startInterval = () => {
            intervalId = setInterval(() => {
                dispatch(modifyGrid(checkCells(gridData.grid)));
            }, 200);
        };

        const stopInterval = () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };

        if (isRunning) {
            startInterval();
        } else {
            stopInterval();
        }

        return () => {
            stopInterval(); // Clean up the interval on unmount
        };
    }, [isRunning, dispatch, gridData.grid]);

    const toggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const handleCellToggle = (x: number, y: number) => {
        dispatch(toggleCell([x, y]));
    };

    const renderGrid = () => {
        const map: Record<string, JSX.Element> = {}
        Object.keys(gridData.grid).map((coord) => {
            const [x, y] = coord.split(',').map(Number);
            const occupied = gridData.grid[coord];
            map[coord] = <Cell key={coord} toggle={() => handleCellToggle(x, y)} occupied={occupied} />
        })
        return map;
    }

    const cellElements = renderGrid();
    return (
        <>

            <div className="controls">
                <button onClick={toggleTimer}>
                    {isRunning ? "stop" : "start"}
                </button>
                <input type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} />

            </div>
            <div className="grid-container"
                style={
                    { "gridTemplateColumns": `repeat(${size}, 1fr)` }
                }
            >
                {Object.values(cellElements)}
            </div>
        </>

    )

}

export default Board;