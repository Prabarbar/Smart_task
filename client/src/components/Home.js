import { useState } from 'react';

export default function Home({user, setUser}){
    const [registerFlag, setRegisterFlag] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [info, setInfo] = useState('')


    async function handleSubmit(e){
        try{
            e.preventDefault()
            const postRes = await fetch ('http://localhost:8080/register', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({username:username, password:password, role:role})
            })
            const data = await postRes.text()
            setInfo(data)
            setTimeout(()=>{
                setInfo('')
                setRegisterFlag(false)
            }, 2000)
        }
        catch(err){
            console.error(err)
        } 
    }

    return(
        !registerFlag?(
        <>
            <button onClick={()=>setRegisterFlag(true)}>Register</button>
            <h1>Welcome to Smart App</h1>
        </>
        )
        :
        (
        <>
            <form onSubmit ={handleSubmit}>
                <label>Username: 
                    <input onChange={e => setUsername(e.target.value)} required></input>
                </label>
                <label>Password: 
                    <input type='password' onChange={e => setPassword(e.target.value)} required></input>
                </label>
                <br></br>
                <h4>Choose a role:</h4>
                <input type='radio' value='employee' name='role' onChange={e=>setRole(e.target.value)} required></input>
                <label>Employee</label>
                <br></br>
                <input type='radio' value='coordinator' name='role' onChange={e=>setRole(e.target.value)}></input>
                <label>Coordinator</label>
                <br></br>
                <br></br>
                <button type='submit'>Submit</button>
            </form>
            <button onClick={() =>setRegisterFlag(false)}>Cancel</button>
            {info && <h2 style={{color: 'green'}}>{info}</h2>}
        </>
        )
    )
}