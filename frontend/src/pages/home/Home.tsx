// import { useState } from 'react'
import { authClient } from '../../utils/auth-client'
import './Home.css'

export default function Home() {
    // authClient.signUp.email({
    //     name: "florian",
    //     email: "fl.gonzales5790@gmail.com",
    //     password: "testjklhkjlgjhgfjkhgjhghjgjkh",
    // })

    // authClient.signIn.email({
    //     email: "fl.gonzales5790@gmail.com",
    //     password: "testjklhkjlgjhgfjkhgjhghjgjkh",
    // })

    // const [connectedUser, setConnectedUser] = useState();

    const displaySessionUser = async () => {
        const user = await authClient.getSession();
        if(user.data) {
            // setConnectedUser(user.data.user)

        }
        console.log("le user: ", user.data)
    } 

    return <div className="home-container">

        <button onClick={displaySessionUser}>coucou</button>
        {/* {connectedUser && <div> {connectedUser.email}</div>} */}

    </div>
}