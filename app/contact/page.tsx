"use client";
import React, { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const formSubmission = (event: React.FormEvent) => {
    event.preventDefault();

    if (name !== "" && message !== "") {
      console.log(name + " " + message);
      setMessage("");
      setName("");
      setError("");
    } else {
      console.log("Failed");
      setError("Ensure fields are filled in.");
    }
  };

  return (
    <div className="m-5">
      <h1 className="text-red-800 font-bold text-3xl mb-1">Contact Us</h1>
      <p>Let us know what you think of our content here...</p>

      <form onSubmit={formSubmission}>
        <input
          type="text"
          onChange={handleNameChange}
          placeholder="Name"
          value={name}
          className="mb-2 p-1 border border-gray-400"
        />
        <input
          type="text"
          onChange={handleMessageChange}
          placeholder="Message"
          value={message}
          className="mb-2 p-1 border border-gray-400"
        />
        <button type="submit" className="mt-3 p-2 bg-blue-500 text-white">
          Submit
        </button>
      </form>
      {error && <p className="text-red-800 text-sm">{error}</p>}
    </div>
  );
}
