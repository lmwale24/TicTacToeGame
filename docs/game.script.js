document.addEventListener("DOMContentLoaded", function () {
    // Selectors
    var restartButton = document.querySelector("#restartButton");
    var squares = document.querySelectorAll("td");
    var gameStartPrompt = document.querySelector(".game-start-prompt");

    // Initialize the current marker
    var currentMarker = "X";

    // Flag to indicate if a winner is found
    var winnerFound = false;

    // Function to toggle text color for a specific line
    function toggleTextColor(line) {
        const flashingColor = currentMarker === 'X' ? '#9898e6' : '#9898e6';
        let isFlashing = false;

        const flashInterval = setInterval(function () {
            for (const index of line) {
                squares[index].style.color = isFlashing ? flashingColor : 'black';
            }
            isFlashing = !isFlashing;
        }, 400);

        setTimeout(function () {
            clearInterval(flashInterval);
            for (const index of line) {
                squares[index].style.color = 'black';
            }
        }, 3000);
    }

    // Function to check for a winner
    function checkWinner() {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const line of lines) {
            const [a, b, c] = line;
            if (squares[a].textContent && squares[a].textContent === squares[b].textContent && squares[a].textContent === squares[c].textContent) {
                return { marker: squares[a].textContent, line: line };
            }
        }

        return null;
    }

    // Check if draw
    function checkDraw() {
        let allSquaresFilled = true;
        for (const square of squares) {
            if (!square.textContent) {
                allSquaresFilled = false;
                break;
            }
        }

        if (allSquaresFilled) {
            gameStartPrompt.textContent = "This is a Draw!";
        }
    }
    

    // Clear all the squares
    function clearBoard() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = "";
            squares[i].style.color = 'black';
        }
        currentMarker = "X";
        winnerFound = false;
        handleGameLogic();
    }

    // Function to handle the game logic
    function handleGameLogic() {
        function changeMarker() {
            if (!winnerFound && this.textContent === "") {
                this.textContent = currentMarker;
                currentMarker = currentMarker === "X" ? "O" : "X";

                const winner = checkWinner();
                if (winner) {
                    winnerFound = true;
                    toggleTextColor(winner.line);
                    gameStartPrompt.textContent = winner.marker + ' wins!';
                } else {
                    checkDraw();
                }
            }
        }

        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener("click", changeMarker);
        }
    }

    // Attach event listeners 
    handleGameLogic();
    restartButton.addEventListener("click", clearBoard);
});



