import { Box, Button, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("users"))||[];
    console.log(storedUser.length)
    if (storedUser.length>0) {
      let found=0;
      for(let i=0;i<storedUser.length-1;i++){

        if (storedUser[i].username === username && storedUser[i].password === password) {
          setUser(username);
          found++;
          return;
        } 
        
      }
      if(found===0){
        alert("User not found")
      }
    } else {
      alert("No user found. Please register first.");
    }
  };

  return (
    <Box w='50%' margin='auto' border='1px dashed grey' p='10px' borderRadius='5px'>
      <Heading as='h4'>Login</Heading>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
    </Box>
  );
};

export default Login;
