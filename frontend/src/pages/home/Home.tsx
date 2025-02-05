import { authClient } from '../../utils/auth-client'
import './Home.css'

export default function Home() {
    // authClient.signUp.email({
    //     name: "florian",
    //     email: "fl.gonzales5790@gmail.com",
    //     password: "testjklhkjlgjhgfjkhgjhghjgjkh",
    // })

    authClient.signIn.email({
        email: "fl.gonzales5790@gmail.com",
        password: "testjklhkjlgjhgfjkhgjhghjgjkh",
    })
    return <div className="home-container">

    </div>
}