import { useState } from "react";
import AuthForm from "./AuthForm";
import { useContext } from "react";
import { Context } from "../context/ContextProvider";


export default function Auth() {
    const { login, signup } = useContext(Context)
    const [toggle, setToggle] = useState(true)

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <>
            {toggle ?
                <AuthForm
                    submit={login}
                    btnText="Login"
                />
                :
                <AuthForm
                    submit={signup}
                    btnText="Signup"
                />}
            <button onClick={handleToggle}>{toggle ? "Need to signup?" : "Need to Login?"}</button>
        </>


    )
}