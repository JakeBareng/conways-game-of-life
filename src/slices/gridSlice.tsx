import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type GridType = {
    grid: Record<string, boolean>,
    x: number,
    y: number
}

const initialState: GridType = {
    grid: {},
    x: 0,
    y: 0,
}

const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        toggleCell: (state, action: PayloadAction<[number, number]>) => {
            const [x, y] = action.payload;
            const coord = `${x},${y}`;
            state.grid[coord] = !state.grid[coord];
        },
        createGridSize: (state, action: PayloadAction<[number, number]>) => {
            const [sizeX, sizeY] = action.payload;
            const newGrid: Record<string, boolean> = {};
            for (let i = 0; i < sizeX; i++) {
                for (let j = 0; j < sizeY; j++) {
                    newGrid[`${i},${j}`] = false;
                }
            }
            return {
                grid: newGrid,
                x: sizeX,
                y: sizeY
            }
        },
        modifyGrid: (state, action: PayloadAction<Record<string,boolean>>) => {
            state.grid = action.payload;
        }
    },
});


export const { toggleCell, createGridSize, modifyGrid } = gridSlice.actions;

export default gridSlice.reducer;
