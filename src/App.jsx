import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card.jsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import "./App.css";

function TodoApp() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos")) || []);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  return (
    <div>
      <h3>TODO App</h3>
      <Input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter a new todo" />
      <Button onClick={addTodo}>Add Todo</Button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

function PomodoroTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(25 * 60);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h3>Pomodoro Timer</h3>
      <div>{formatTime(time)}</div>
      <Button onClick={startTimer} disabled={isRunning}>
        Start
      </Button>
      <Button onClick={stopTimer} disabled={!isRunning}>
        Stop
      </Button>
      <Button onClick={resetTimer}>Reset</Button>
    </div>
  );
}

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startStopwatch = () => {
    setIsRunning(true);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
  };

  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      <h3>Stopwatch</h3>
      <div>{formatTime(time)}</div>
      <Button onClick={startStopwatch} disabled={isRunning}>
        Start
      </Button>
      <Button onClick={stopStopwatch} disabled={!isRunning}>
        Stop
      </Button>
      <Button onClick={resetStopwatch}>Reset</Button>
    </div>
  );
}

function TicTacToe() {
  const [board, setBoard] = useState(() => JSON.parse(localStorage.getItem("ticTacToeBoard")) || Array(9).fill(null));
  const [player, setPlayer] = useState("X");

  useEffect(() => {
    localStorage.setItem("ticTacToeBoard", JSON.stringify(board));
  }, [board]);

  const handleClick = (index) => {
    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
  };

  const renderSquare = (index) => {
    return <Button onClick={() => handleClick(index)}>{board[index]}</Button>;
  };

  return (
    <div>
      <h3>Tic-Tac-Toe</h3>
      <div className="board">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <Button onClick={resetGame}>Reset Game</Button>
    </div>
  );
}

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <h3>Music Player</h3>
      <audio ref={audioRef} src="path/to/audio.mp3" />
      <Button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</Button>
    </div>
  );
}

function Scratchpad() {
  const [text, setText] = useState(() => localStorage.getItem("scratchpadText") || "");

  useEffect(() => {
    localStorage.setItem("scratchpadText", text);
  }, [text]);

  return (
    <div>
      <h3>Scratchpad</h3>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your notes here..." />
    </div>
  );
}

function App() {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">Mini Apps</h1>
      <Tabs defaultValue="todo" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="todo">TODO</TabsTrigger>
          <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          <TabsTrigger value="stopwatch">Stopwatch</TabsTrigger>
          <TabsTrigger value="tictactoe">Tic-Tac-Toe</TabsTrigger>
          <TabsTrigger value="music">Music</TabsTrigger>
          <TabsTrigger value="scratchpad">Scratchpad</TabsTrigger>
        </TabsList>
        <TabsContent value="todo">
          <Card>
            <CardHeader>
              <CardTitle>TODO App</CardTitle>
            </CardHeader>
            <CardContent>
              <TodoApp />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pomodoro">
          <Card>
            <CardHeader>
              <CardTitle>Pomodoro Timer</CardTitle>
            </CardHeader>
            <CardContent>
              <PomodoroTimer />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stopwatch">
          <Card>
            <CardHeader>
              <CardTitle>Stopwatch</CardTitle>
            </CardHeader>
            <CardContent>
              <Stopwatch />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tictactoe">
          <Card>
            <CardHeader>
              <CardTitle>Tic-Tac-Toe</CardTitle>
            </CardHeader>
            <CardContent>
              <TicTacToe />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="music">
          <Card>
            <CardHeader>
              <CardTitle>Music Player</CardTitle>
            </CardHeader>
            <CardContent>
              <MusicPlayer />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scratchpad">
          <Card>
            <CardHeader>
              <CardTitle>Scratchpad</CardTitle>
            </CardHeader>
            <CardContent>
              <Scratchpad />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
