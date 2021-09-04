const fieldSize = 800;
const numberofcallesinrow = 100;
const framesPersecond = 10
const getRandomGrid = () =>{
    const grid = new Array (numberofcallesinrow)
    for (let i=0; i < grid.length; i++){
        grid[i] = new Array(numberofcallesinrow)
        for (let j=0; j< grid.length; j++){
        grid[i] [j] = Math.floor(Math.random() * 2)

    }
}
return grid
}
const cellStrockColor = "aaa"
const cellSize = fieldSize / numberofcallesinrow
const drawgrid = (ctx, grid) => {
    ctx.strokeStyle = cellStrockColor
    for (let i=0; i < grid.length; i++){
    for (let j=0; j < grid.length; j++){
        const value = grid[i][j]
        if(value){
            ctx.fillRect(
                i * cellSize,
                j * cellSize,
                 cellSize,
                 cellSize
                )
        }
        ctx.strokeRect(
        i * cellSize,
        j * cellSize,
         cellSize,
         cellSize
        )
    }
}
}
const getnextgenration = (grid) =>{
    const nextGrid = new Array(grid.length)
    for(let i=0; i < grid.length; i++){
        nextGrid[i] = new Array(grid.length)
        for (let j=0; j<grid.length; j++){
            const value = grid[i][j]
            const neighbors = countneighbors(grid, i, j)
            if (!value && neighbors === 3){
                nextGrid[i][j] = 1
            } else if (
                (value === 1) && 
                (neighbors < 2 || neighbors > 3)
            ){
                nextGrid[i][j] = 0
            } else {
                nextGrid[i][j] = value
            }
            }   
    }
    return nextGrid
}
const countneighbors = (grid, x, y) => {
    let sum = 0
    const numberofRows = grid.length
    const numberofCols = grid[0].length
    for(let i= -1; i<2; i++){
    for(let j= -1; j<2; j++){
        const row = (x + i + numberofRows)% numberofRows
        const col = (y + j + numberofCols) % numberofCols
        sum += grid[row][col]
    }
}
sum -= grid[x][y]
return sum
}
const generation = (ctx, grid) => {
    ctx.clearRect(0, 0, fieldSize, fieldSize)
    drawgrid(ctx, grid)
    const gridofnextgenration = getnextgenration(grid)
    setTimeout(()=>{
        requestAnimationFrame(() => generation(ctx, gridofnextgenration))
    }, 100/framesPersecond)
}

window.onload = () => {
   const canvas = document.getElementById('canvas')
   const ctx = canvas.getContext('2d')
   const grid = getRandomGrid()
   generation(ctx, grid)
    // console.log(grid);
}