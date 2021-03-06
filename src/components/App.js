import React, {useState, useEffect} from "react";
import Note from "./Note";
import noteService from "../services/noteService";
import loginService from "../services/loginService";
import Notification from "./Notification";
import Footer from "./Footer";

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState("");
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const notesToShow = showAll ? notes : notes.filter((note) => note.important);

    useEffect(() => {
        noteService.getNotes().then((initialNotes) => {
            setNotes(initialNotes);
        });
    }, []);

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser')
        if (loggedUser){
            const user = JSON.parse(loggedUser)
            setUser(user)
            noteService.setToken(user.token)
        }
    },[])

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

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedUser')
        setUser(null)
        setUsername('')
        setPassword('')
        setIsLoggedIn(false)
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem('loggedUser', JSON.stringify(user))

            noteService.setToken(user.token)
            setIsLoggedIn(true)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
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
            <button type="submit">login</button>
        </form>
    )

    const noteForm = () => (

        <form onSubmit={addNote}>
            <input
                value={newNote}
                onChange={handleNoteChange}
            />
            <button type="submit">save</button>
        </form>
    )

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage}/>
            {user === null ? loginForm() : <div>
                <p>Hi {user.name}, post some notes!</p>
                <button onClick={handleLogout}>Log out</button>
                {noteForm()}
            </div>}
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
            <Footer/>
        </div>
    );
};

export default App;
