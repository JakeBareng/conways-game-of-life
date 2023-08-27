import { createSlice } from '@reduxjs/toolkit';

const gridSlice = createSlice({
    name: 'grid',
    initialState: {} as Record<string, boolean>,
    reducers: {
        toggleCell: (state, action) => {
            const [x, y] = action.payload;
            state[`${x},${y}`] = !state[`${x},${y}`];
        },
    },
});

export const { toggleCell } = gridSlice.actions;

export default gridSlice.reducer;
