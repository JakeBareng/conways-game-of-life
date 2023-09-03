const countNeighbours = (x: number, y: number, grid: Record<string, boolean>): number => {
    const coords = [`${x - 1},${y + 1}`, `${x},${y + 1}`, `${x + 1},${y + 1}`, `${x - 1},${y}`, `${x + 1},${y}`, `${x - 1},${y - 1}`, `${x},${y - 1}`, `${x + 1},${y - 1}`]
    let count = 0;
    // check for each coord
    coords.forEach(coord => {
        if (grid[coord]) {
            count++;
        }
    });
    return count;
}

/* 
Any live cell with two or three live neighbours survives.
Any dead cell with three live neighbours becomes a live cell.
All other live cells die in the next generation. Similarly, all other dead cells stay dead.
 */
const checkCells = (grid: Record<string, boolean> ): Record<string,boolean> => {
    const gridCopy = {...grid};
    Object.keys(grid).map((coord) => {
        const [x, y] = coord.split(",").map(Number);
        const isAlive = grid[coord];
        const neighbours = countNeighbours(x, y, grid);
        if (!isAlive && neighbours == 3) grid[coord] = true;
        else if (isAlive && (neighbours > 3 || neighbours < 2)) grid[coord] = false;
    })
    return gridCopy;
}

export {countNeighbours, checkCells};