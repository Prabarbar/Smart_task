
import NavBarLogOut from "./NavBarLogOut"
import NavBarLogIn from "./NavBarLogIn"

export default function NavBar({user, setUser, setJwt}){

    return(
        user ?(
            <NavBarLogOut setUser={setUser}/>
        )
        :
        (
            <NavBarLogIn setUser={setUser} setJwt={setJwt}/>
        )     
    )
}