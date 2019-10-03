export const winner = (boxes) => {
    const winningRowCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let row in winningRowCombination) {
        const [a, b, c] = winningRowCombination[row];
        if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
            return boxes[a];   
        }
    }
    return null;
}

export const checkIfAllBoxesAreClicked = (boxes) => {
    let count = 0;
    boxes.forEach(box => {
        if (typeof box !== typeof null) {
            count++;
        }
    });

    if (count === boxes.length) {
        return true;
    } else {
        return false;
    }  
};
