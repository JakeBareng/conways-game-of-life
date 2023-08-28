import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const gridSlice = createSlice({
    name: 'grid',
    initialState: {} as Record<string, boolean>,
    reducers: {
        toggleCell: (state, action: PayloadAction<[number, number]>) => {
            const [x, y] = action.payload;
            const coord = `${x},${y}`;
            state[coord] = !state[coord];
        },
        createGridSize: (state, action: PayloadAction<[number, number]>) => {
            const [sizeX, sizeY] = action.payload;
            for (let i = 0; i < sizeX; i++) {
                for (let j = 0; j < sizeY; j++) {
                    state[`${i},${j}`] = false;
                }
            }
        }
    },
});

export const { toggleCell, createGridSize } = gridSlice.actions;

export default gridSlice.reducer;
