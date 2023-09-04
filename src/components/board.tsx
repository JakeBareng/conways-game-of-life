import { useSelector, useDispatch } from "react-redux";
import { toggleCell, createGridSize, modifyGrid } from "../slices/gridSlice";
import { useEffect, useState } from "react";
import { gridState } from "../store";
import { checkCells } from "./util/boardUtil";
import Cell from "./cell";

function Board() {
    let gridData = useSelector(((state: gridState) => state.grid));
    const dispatch = useDispatch();
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        dispatch(createGridSize([10, 10]));
    }, [dispatch]);

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

    let cellElements = renderGrid();
    return (
        <>
            <button onClick={toggleTimer}>
                {isRunning? "stop" : "start"}
            </button>
            {/* <button onClick={toggleTimer}>stop</button> */}
            <div className="grid-container">
                {Object.values(cellElements)}
            </div>
        </>

    )

};

export default Board;