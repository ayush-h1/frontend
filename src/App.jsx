import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const res = await fetch('https://bhashwaveai-2.onrender.com/chat', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: input }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply || "कोई जवाब नहीं मिला।" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "❌ सर्वर से कनेक्ट नहीं हो पाया।" },
      ]);
      console.error("Error:", err);
    }

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">🗣️ BhashaWae AI</h1>
      <div className="w-full max-w-md space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.from === "user"
                ? "bg-blue-100 text-right"
                : "bg-green-100 text-left"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2 w-full max-w-md">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="अपना सवाल लिखें..."
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          भेजें
        </button>
      </div>
    </div>
  );
}

export default App;

