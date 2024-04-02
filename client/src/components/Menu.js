import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

export default function Menu({user}){
    const location = useLocation()
    const navigate = useNavigate()

    const [role, setRole] = useState()

    useEffect(()=>{
        const role = user.roles[0]
        setRole(role)
    },[])

    async function createRequest(){
        try{
            await fetch('http://localhost:8080/request/add-request',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({employeeName:user.userName, comment:'', status:'New'})
            })
        }
        catch(err){
            console.error(err)
        }
    }

    return(
        role === 'coordinator' ?
        <>
            <button onClick={()=>{navigate('/goods-table-coordinator')}}>Goods Table</button>
            <button onClick={()=>{navigate('/requests-table')}}>Requests Table</button>
            
        </>
        :
        (
        <>
            <button onClick={()=>{navigate('/goods-table-employee')}}>Goods Table</button>
        </>
        )
    )
}