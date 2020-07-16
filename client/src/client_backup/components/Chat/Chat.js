//need boilerplate for every components
import React, { useState, useEffect } from "react"; //useEffect help to perform life-cycle or side effects in function components, but used to do cleanups, HOOKs component
import queryString from "query-string"; //help to retrieve data from URL
import io from "socket.io-client"; //https://socket.io/docs/

let socket; //empty variable

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setName(room);
    socket.emit("join", { name: name, room: room }, () => {}); //helps to emit the event from the server to the rest of the users , this data is received by the server, by using socket.on('join')
    //console.log(socket);

    /*
    //first need to retrieve data that user have entered
    const data = queryString.parse(location.search);
    //queryString simply return the object, i.e name and room
    //location comes from react-router and gives props called 'location'
    console.log(location.search); //check in F12>consoleLog
    console.log(data);
    */

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]); // as request arehappening twice, we need to activate only one if the value of the list changes i.e ENDPOINT and location.search, no more unnecessary side effect

  useEffect(() => {
    socket.on(
      "message",
      (message) => {
        setMessages([...messages, message]); //adding all msgs send by admin to messages array
      },
      [messages]
    );
  });

  // need to create function for sending messages
  const sendMessage = (event) => {
    event.preventDefault(); //prevent default behaviour of browser refresh

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) => (event.key === "Enter" ? sendMessage() : null)}
        />
      </div>
    </div>
  );
};
// all the important socket.io logic going to be stored in this chat.js file

export default Chat;
