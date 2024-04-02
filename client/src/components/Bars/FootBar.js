export default function FootBar({user}){

    function username(){
        if (!user){
            return "No one"
        }
        else {
            return user.userName
        }
    }
   
    return(
        <h4>{username()} logged</h4>
        )
}