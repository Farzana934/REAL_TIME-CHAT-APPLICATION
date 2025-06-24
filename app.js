function ChatApp() {
  const [messages, setMessages] = React.useState([
    { id: 1, text: 'Welcome to the chat!', sender: 'received' }
  ]);
  const [input, setInput] = React.useState('');
  const bottomRef = React.useRef(null);

  const sendMessage = () => {
    if (input.trim() === '') return;
    const newMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'sent'
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <header>Simple React Chat</header>
      <div className="chat-history">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

// Mount the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ChatApp />);
