// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Allow requests from any origin
//     methods: ["GET", "POST"],
//   },
// });

// app.use(cors());

// // Store meeting rooms and their users
// const meetingRooms = {};

// // When a client connects
// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   // Join a specific room based on the meeting code
//   socket.on("join", ({ username, meetingCode }) => {
//     if (!meetingCode || !username) {
//       socket.emit("error", "Meeting code and username are required!");
//       return;
//     }

//     if (!meetingRooms[meetingCode]) {
//       meetingRooms[meetingCode] = [];
//     }

//     meetingRooms[meetingCode].push({ id: socket.id, username });
//     socket.join(meetingCode);

//     console.log(`${username} joined meeting room: ${meetingCode}`);

//     // Notify the user about the join success
//     socket.emit("chat", [
//       { user: "System", message: `Welcome to the chat, ${username}!` },
//     ]);
//   });

//   // Handle chat messages
//   socket.on("chat", ({ meetingCode, message, files, user }) => {
//     if (meetingRooms[meetingCode]) {
//       // Send the message to the specific meeting room
//       io.to(meetingCode).emit("message", { user, message, files });
//     } else {
//       socket.emit("error", "Invalid meeting code.");
//     }
//   });

//   // Handle disconnect
//   socket.on("disconnect", () => {
//     for (const meetingCode in meetingRooms) {
//       meetingRooms[meetingCode] = meetingRooms[meetingCode].filter(
//         (participant) => participant.id !== socket.id
//       );

//       // Notify remaining users in the room
//       io.to(meetingCode).emit("chat", [
//         { user: "System", message: `A user has left the chat.` },
//       ]);
//     }
//     console.log("A user disconnected:", socket.id);
//   });
// });

// // Start server
// const PORT = 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// Store users in meeting rooms
const meetingRooms = {};

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Join a specific meeting room
  socket.on("join", ({ username, meetingCode }) => {
    if (!meetingRooms[meetingCode]) {
      meetingRooms[meetingCode] = [];
    }

    // Add the user to the meeting room
    meetingRooms[meetingCode].push({ id: socket.id, username });
    socket.join(meetingCode);

    console.log(`${username} joined room: ${meetingCode}`);

    // Notify room participants
    io.to(meetingCode).emit("chat", [
      { user: "ONLINE", message: `${username} joined the room.` },
    ]);
  });

  // Handle chat messages
  socket.on("chat", (data) => {
    const { meetingCode, message, files, user } = data;

    if (meetingRooms[meetingCode]) {
      // Emit the message to everyone in the room
      io.to(meetingCode).emit("message", { user, message, files });
    }
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    for (const meetingCode in meetingRooms) {
      meetingRooms[meetingCode] = meetingRooms[meetingCode].filter(
        (participant) => participant.id !== socket.id
      );

      // Notify others in the room about the user leaving
      io.to(meetingCode).emit("chat", [
        { user: "OFFLINE", message: `A user has left the room.` },
      ]);
    }

    console.log("A user disconnected:", socket.id);
  });
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
