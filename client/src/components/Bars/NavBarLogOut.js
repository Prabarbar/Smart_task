import { useNavigate } from "react-router-dom" 


export default function NavBarLogOut ({setUser}){

    const navigate = useNavigate()
    return(
        <div style={{textAlign:'center'}} >
            <button onClick={() => {
                setUser()
                navigate('/')
            }}>
                Log Out
            </button>
        </div>
    )
    
}