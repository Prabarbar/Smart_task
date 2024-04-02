import { useState } from "react";
import { useNavigate } from "react-router-dom" 

export default function NavBarLogIn({setUser, setJwt}){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const[error, setError] = useState(null);

    const navigate = useNavigate()


    async function handleLogin(){
        try{
            const postRes = await fetch(`http://localhost:8080/login?username=${username}&password=${password}`,{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'}
            })
            if(postRes.ok){
                const info =  await postRes.json()
                setUsername(info.userName)
                setUser(info)
                navigate('/menu')
            }
            else{
                setError("Wrong username or password")
                setUsername('')
                setPassword('')
                setTimeout(()=>{
                    setError('')
                }, 1000)
            }
        }
        catch(err){
            console.error(err)
        }
    }


    return(
        <div style={{textAlign:'center'}} > 
        <h4>Log in</h4>
            <label>Username:
                <input value={username} onChange={(e)=>setUsername(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleLogin()
                }
              }}/>
            </label>
            <label>Password:
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleLogin()
                }
              }} />
            </label>
            <button onClick={handleLogin}>Log In</button>
            {error && <h2 style={{color: 'red'}}>{error}</h2>}
        <p>-------------------------------------------------------------------------------</p>  
        </div>
    )
}