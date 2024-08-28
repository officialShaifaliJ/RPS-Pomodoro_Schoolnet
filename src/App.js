import React, { useState, useEffect } from "react";
import "./App.css";
import Register from "./component/Register";
import Login from "./component/Login";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

const choices = ["rock", "paper", "scissors"];

const App = () => {
  const [user, setUser] = useState(null);
  const [userChoice, setUserChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState({ wins: 0, losses: 0, draws: 0 });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("users")) || [];
    if (loggedInUser.length > 0) {
      for (let i = 0; i < loggedInUser.length; i++) {
        if (user === loggedInUser[i].username) {
          setScore(loggedInUser[i].score);
        }
      }
    }
  }, [user]); // Add 'user' to the dependency array

  useEffect(() => {
    if (user) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) => {
        if (u.username === user) {
          return { ...u, score };
        }
        return u;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  }, [score, user]);

  const handleClick = (choice) => {
    setUserChoice(choice);
    const computerChoice = getComputerChoice();
    setComputerChoice(computerChoice);
    determineWinner(choice, computerChoice);
  };

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
      setResult("It's a draw! Both chose " + userChoice + ".");
      setScore((prevScore) => ({ ...prevScore, draws: prevScore.draws + 1 }));
    } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      setResult(
        `You win! ${
          userChoice
        } beats ${computerChoice}.`
      );
      setScore((prevScore) => ({ ...prevScore, wins: prevScore.wins + 1 }));
    } else {
      setResult(
        `You lose! ${
          computerChoice
        } beats ${userChoice}.`
      );
      setScore((prevScore) => ({ ...prevScore, losses: prevScore.losses + 1 }));
    }
  };

  const resetGame = () => {
    setUserChoice("");
    setComputerChoice("");
    setResult("");
    setScore({ wins: 0, losses: 0, draws: 0 });
  };

  if (!user) {
    return (
      <Box className="App">
        <Heading>Rock Paper Scissors</Heading>
        <Login setUser={setUser} />
        <br />
        <br />
        <Register setUser={setUser} />
      </Box>
    );
  }

  return (
    <div className="App">
      <Heading>Rock Paper Scissors</Heading>
      <Box className="choices">
        {choices.map((choice, index) => (
          <Button key={index} onClick={() => handleClick(choice)}>
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </Button>
        ))}
      </Box>
      <Box className="results">
        <Text>Your Choice: {userChoice}</Text>
        <Text>Computer's Choice: {computerChoice}</Text>
        {/* <Text>{result}</Text> */}
      </Box>
      <Box className="scoreboard">
        <Text>Wins: {score.wins}</Text>
        <Text>Losses: {score.losses}</Text>
        <Text>Draws: {score.draws}</Text>
      </Box>
      {result}
      <br />
      <Button className="restart-button" onClick={resetGame}>
        Restart
      </Button>

      <Button className="logout-button" onClick={() => setUser(null)}>
        Logout
      </Button>
    </div>
  );
};

export default App;
