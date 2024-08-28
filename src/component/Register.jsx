import { Button, Input, Box, Heading } from "@chakra-ui/react";
import React, { useState } from "react";

const Register = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.some(user => user.username === username);

    if (userExists) {
      alert("Username already taken. Please choose another one.");
      setUsername("");
      setPassword("");
    } else if (username && password) {
      const newUser = {
        username,
        password,
        score: { wins: 0, losses: 0, draws: 0 },
      };
      
      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));

      console.log("New user registered:", newUser);
      console.log("All users:", users);

      setUser(username);
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <Box
      w="50%"
      margin="auto"
      border="1px dashed grey"
      p="10px"
      borderRadius="5px"
    >
      <Heading as="h4" mb="4">Register</Heading>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        mb="2"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        mb="4"
      />
      <Button onClick={handleRegister}>Register</Button>
    </Box>
  );
};

export default Register;
