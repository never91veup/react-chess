import React, {useEffect, useState} from 'react';
import "./App.css"
import BoardComponent from "./components/BoardComponent";
import {Board} from "./model/Board";
import {Colors} from "./model/Colors";
import {Player} from "./model/Player";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

const App = () => {
    const [board, setBoard] = useState(new Board())
    // eslint-disable-next-line
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    // eslint-disable-next-line
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer);
        // eslint-disable-next-line
    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
        <div className="app">
            <Timer
                currentPlayer={currentPlayer}
                restart={restart}
            />
            <BoardComponent
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swapPlayer={swapPlayer}
            />
            <div>
                <LostFigures
                    title="Чёрные фигуры"
                    figures={board.lostBlackFigures}
                />
                <LostFigures
                    title="Белые фигуры"
                    figures={board.lostWhiteFigures}
                />
            </div>
        </div>
    );
};

export default App;