import React, { useState, useRef, useEffect } from "react";
import { HfInference } from "@huggingface/inference";

// Initialize the inference with your API token
const inference = new HfInference("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"); // Replace with your actual token

const Llama = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endOfMessagesRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { text: input, id: Date.now(), role: "user" };
      setMessages([...messages, userMessage]);
      setInput("");

      try {
        let botReply = "";
        for await (const chunk of inference.chatCompletionStream({
          model: "microsoft/phi-2", // Model specified
          messages: [{ role: "user", content: input }],
          max_tokens: 500, // Adjust if needed
        })) {
          botReply += chunk.choices[0]?.delta?.content || "";
        }

        if (botReply) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: botReply, id: Date.now(), role: "bot" },
          ]);
        }
      } catch (error) {
        console.error("Error fetching data from Hugging Face", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Sorry, we can't process your request.",
            id: Date.now(),
            role: "bot",
          },
        ]);
      }
    }
  };

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-lg font-semibold">Chat</h1>
      </header>

      <main className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-lg shadow-md max-w-md mx-auto ${
                msg.role === "user"
                  ? "bg-blue-200 text-right"
                  : "bg-white text-left"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={endOfMessagesRef} />
        </div>
      </main>

      <footer className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Llama;
