import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState('')

    const navigate = useNavigate()

    async function handleLogin(e){
        e.preventDefault()
        try{
            const postRes = await fetch(`http://localhost:8080/login?username=${username}&password=${password}`,{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'}
            })
            const info =  await postRes.json()
            
            navigate('/menu', {state:{user:info}})
            setUser(info)
            console.log(info)
        }
        catch(err){
            console.error(err)
        }
        
    }

    return(
        <>
            <form onSubmit ={handleLogin}>
                <label>Username: 
                    <input onChange={e => setUsername(e.target.value)}></input>
                </label>
                <label>Password: 
                    <input type='password' onChange={e => setPassword(e.target.value)}></input>
                </label>
                <button type='submit'>Login</button>
            </form>
            <button onClick={()=>navigate('/')}>Back</button>
        </>
    )
}