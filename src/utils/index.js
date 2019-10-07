const determineWinner = (boxesArray) => {
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let winner = null;

    for (let combination in winningCombination) {
        const [a, b, c] = winningCombination[combination];
        if (boxesArray[a] && boxesArray[a] === boxesArray[b] && boxesArray[a] === boxesArray[c]) {
            winner = boxesArray[a];   
        }
    }
    return winner;
}

const checkIfAllBoxesAreClicked = (boxesArray) => {
    let count = 0;
    boxesArray.forEach(box => {
        if (typeof box !== typeof null) {
            count++;
        }
    });

    if (count === boxesArray.length) {
        return true;
    } else {
        return false;
    }  
};

const findEmptyBoxes = (boxesArray) => {
    return boxesArray
    .map((box, index) => [box, index])
    .filter(arr => typeof arr[0] === typeof null);
}

const checkAvailableMoves = (boxesArray) => {
    return findEmptyBoxes(boxesArray).length > 0;
}

const replace = (boxesArray, index, value) => {
    return [...boxesArray.slice(0, index), value, ...boxesArray.slice(index + 1, boxesArray.length)];
}

const evaluateWinnerScore = (boxesArray, playerType) => {
    const winningCombination = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combination in winningCombination) {
        const [a, b, c] = winningCombination[combination];
        if (boxesArray[a] && boxesArray[a] === boxesArray[b] && boxesArray[a] === boxesArray[c]) {
            if (boxesArray[a] === playerType) return 10;
            return -10    
        }
    }
    return 0;
}

const minimax = (boxesArray, depth, playerType, isMaxPlayer) => {
    const score = evaluateWinnerScore(boxesArray, playerType);

    if (score === 10) return score - depth;
    if (score === -10) return score + depth;

    if (!checkAvailableMoves(boxesArray)) return 0;

    const boxCount = boxesArray.length;
    let best;

    if (isMaxPlayer) {
        best = -1000;
        
        for (let index = 0; index < boxCount; index++) {
            const box = boxesArray[index];

            if (typeof box === typeof null) {
                const newBoxesArray = replace(boxesArray, index, playerType);
                best = Math.max(best, minimax(newBoxesArray, depth + 1, playerType, !isMaxPlayer));
            }    
        }

    } else {
        best = 1000;

        for (let index = 0; index < boxCount; index++) {
            const box = boxesArray[index];

            if (typeof box === typeof null) {
                const newBoxesArray = replace(boxesArray, index, 1 - playerType);
                best = Math.min(best, minimax(newBoxesArray, depth + 1, playerType, !isMaxPlayer));
            }
            
        }
    }

    return best;
}

const computeBestMove = (boxesArray, playerType) => {
    let bestValue = -1000;
    let bestMove = 1000;
    const boxCount = boxesArray.length;

    for (let index = 0; index < boxCount; index++) {
        const box = boxesArray[index];

        if ( typeof box === typeof null) {
            const newBoxesArray = replace(boxesArray, index, playerType);
            const moveValue = minimax(newBoxesArray, 0, playerType, false);

            if (moveValue > bestValue) {
                bestValue = moveValue;
                bestMove = index;
            }
        }
        
    }

    return bestMove;
}

export {
    determineWinner,
    checkIfAllBoxesAreClicked,
    computeBestMove
};

