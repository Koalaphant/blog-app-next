"use client";
import React, { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value) {
      setNameError(""); // Clear error when user starts typing
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    if (e.target.value) {
      setMessageError(""); // Clear error when user starts typing
    }
  };

  const formSubmission = (event: React.FormEvent) => {
    event.preventDefault();

    let valid = true;

    if (name === "") {
      setNameError("Name field cannot be empty");
      valid = false;
    }

    if (message === "") {
      setMessageError("Message field cannot be empty");
      valid = false;
    }

    if (!valid) {
      setError("Please fill out all required fields.");
      return;
    }

    // If no errors, clear all error states and proceed
    setError("");
    setNameError("");
    setMessageError("");
    setName("");
    setMessage("");

    console.log("Form submitted successfully");
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
        {nameError && <p className="text-red-800 text-sm">{nameError}</p>}

        <input
          type="text"
          onChange={handleMessageChange}
          placeholder="Message"
          value={message}
          className="mb-2 p-1 border border-gray-400"
        />
        {messageError && <p className="text-red-800 text-sm">{messageError}</p>}

        <button type="submit" className="mt-3 p-2 bg-blue-500 text-white">
          Submit
        </button>

        {error && <p className="text-red-800 text-sm">{error}</p>}
      </form>
    </div>
  );
}
