import {useState} from "react";


type LoginPageProps = {
    handleLogin: (username: string, password: string) => void
    handleRegister: (newUsername: string, newPassword: string) => void
}

export default function LoginPage(props: LoginPageProps) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [newUsername, setNewUsername] = useState("")
    const [newPassword, setNewPassword] = useState("")


    return <>
        <h3>Login</h3>
        <input value={username} onChange={event => setUsername(event.target.value)}/>
        <input type="password" value={password} onChange={event => setPassword(event.target.value)}/>
        <button onClick={() => props.handleLogin(username, password)}>Login</button>

        <h3>Sign Up</h3>
        <input value={newUsername} onChange={event => setNewUsername(event.target.value)}/>
        <input type="password" value={newPassword} onChange={event => setNewPassword(event.target.value)}/>
        <button onClick={() => props.handleRegister(newUsername, newPassword)}>Sign Up</button>
    </>
}