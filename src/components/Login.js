import { useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'


function Login() {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('')

    //console.log(auth?.currentUser?.photoURL)

    const signIn = async() => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, password)
            if (user){
                
                console.log("Signed in with", auth.currentUser.email);
            }
        } catch (error) {
            console.log("Error with email password:", error)
        }
    };

    const signInWithGoogle = async() => {
        try {
            const user = await signInWithPopup(auth, googleProvider)
            if (user){
                console.log(auth.currentUser.email);
            }
        } catch (error) {
            console.log("Error with Google:", error)
        }
    };

    const logOutUser = async() => {
        try {
            const userOut = await signOut(auth)
            if (userOut){
                console.log("auth.currentUser.email")
            }
        } catch (error) {
            console.log("Error in signing out:", error)
        }
    }
    return (
        <div>
            <input 
                type="text" 
                placeholder="Email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                />
            <br />
            <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={e=>setPassword(e.target.value)} />
            <br />
            <button onClick={signIn} type="submit">Sign in</button>
            <br />
            <button onClick={signInWithGoogle} type="submit">Google Account</button>
            <br />
            <button onClick={logOutUser}>Log Out</button>
        </div>
    )
}

export default Login


