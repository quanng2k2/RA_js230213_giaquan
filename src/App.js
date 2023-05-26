import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInput] = useState("");
  const [notes, setNotes] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    fetch("http://localhost:3001/api/v1/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Content: inputValue }),
    });
    setInput("");
    renderData();
  };

  const renderData = () => {
    fetch("http://localhost:3001/api/v1/content", { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/v1/content/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        renderData();
      });
  };

  useEffect(() => {
    renderData();
  }, []);

  return (
    <div className="App">
      <div className="title">Note App</div>
      <div className="create-container">
        <div className="create">
          <div className="create-title">Title</div>
          <textarea
            name=""
            id=""
            cols="38"
            rows="4"
            placeholder="Take a note..."
            value={inputValue}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <div className="add" onClick={handleClick}>
          <i class="fa-sharp fa-solid fa-plus"></i>
        </div>
      </div>
      <div className="render-container">
        {notes.data?.map((note) => (
          <>
            <div className="block">
              <div className="text">{note.Content}</div>
              <div className="delete-container">
                <div
                  className="delete"
                  onClick={(e) => handleDelete(note.Note_id)}
                >
                  <i class="fa-sharp fa-solid fa-trash"></i>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default App;
