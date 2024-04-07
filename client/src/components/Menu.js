import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Menu({user}){
    const navigate = useNavigate()

    const [role, setRole] = useState()

    useEffect(()=>{
        const role = user.roles[0]
        setRole(role)
    },[])


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