import React, {useState, useEffect} from "react";
import Note from "./Note";
import noteService from "../services/noteService";
import Notification from "./Notification";
import Footer from "./Footer";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const notesToShow = showAll ? notes : notes.filter((note) => note.important);

    useEffect(() => {
        noteService.getNotes().then((initialNotes) => {
            setNotes(initialNotes);
        });
    }, []);

    const addNote = (event) => {
        event.preventDefault();
        const noteObj = {
            content: newNote,
            date: new Date().toISOString,
            important: Math.random() < 0.5,
        };
        noteService.addNote(noteObj).then((returnedNote) => {
            setNotes(notes.concat(returnedNote));
            setNewNote("");
        });
    };

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    };

    const toggleImportanceOf = (id) => {
        const note = notes.find((n) => n.id === id);
        const changedNote = {...note, important: !note.important};

        noteService
            .updateStatus(id, changedNote)
            .then((changedNote) => {
                setNotes(notes.map((note) => (note.id !== id ? note : changedNote)));
            })
            .catch(() => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from the server.`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 2000)
                setNotes(notes.filter((n) => n.id !== id));
            });
    };

    const handleLogin = (event) => {
        event.preventDefault()
        console.log(`Logging with username: ${username}, password: ${password}.`)
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input type="text"
                    value={username}
                    name="Username"
                    onChange={({target})=>setUsername(target.value)}/>
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type={"submit"}>login</button>
            </form>
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? "important" : "all"}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => (
                    <Note
                        key={note.id}
                        note={note}
                        toggleImportanceOf={() => toggleImportanceOf(note.id)}
                    />
                ))}
            </ul>
            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange}/>
                <button type="submit">Save</button>
            </form>
            <Footer/>
        </div>
    );
};

export default App;
