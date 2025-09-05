// pages/About.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid'; // make sure nanoid is installed: `npm install nanoid`
import './chatroom.css';

const Chatroom = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  function createRoom() {
    const id = nanoid(6); // generate random 6-character ID
    navigate(`/room/${id}`);
  }

  function joinRoom(e) {
    e.preventDefault();
    if (roomId.trim()) {
      navigate(`/room/${roomId.trim()}`);
    }
  }

  return (
    <div className="room-lobby">
      <h2>Join or Create a Chat Room</h2>

      {/* Create new random room */}
      <button className="btn" onClick={createRoom}>
        Create Random Room
      </button>

      {/* Join existing room */}
      <form onSubmit={joinRoom} className="room-form">
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter room ID"
          className="room-input"
        />
        <button type="submit" className="btn">
          Join Room
        </button>
      </form>
    </div>
  );
};

export default Chatroom;
