import axios from "axios";
import {toast} from "react-toastify";
import {useState} from "react";
import {UserInfo} from "../model/UserInfo";


export default function useLogin() {

    const [me, setMe] = useState<UserInfo | undefined>()

    function handleLogin(username: string, password: string) {
        // log in (get session) with username and password
        axios.get("api/user/login", {auth: {username, password}})
            .then(response => response.data)
            .then((data) => setMe(data))
            .then(() => toast.success("Logged in as " + username))
            .catch(() => toast.error("Wrong user or password"))
    }

    function handleRegister(newUsername: string, newPassword: string) {
        axios.post("api/user/register", {
            username: newUsername,
            password: newPassword
        })
    }

    function handleLogout() {
        axios.get("api/user/logout")
            .then(() => setMe(undefined))
            .then(() => toast.info("Logged out"))
    }

    return {me, handleLogin, handleRegister, handleLogout}
}
