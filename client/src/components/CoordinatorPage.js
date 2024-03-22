import { useNavigate } from "react-router-dom"

export default function CoordinatorPage(){

    const navigate = useNavigate()
    return(
        <>
            <button onClick={()=>{navigate('/')}}>Back</button>
            <br></br>
            <button onClick={()=>{navigate('goods-table-coordinator')}}>Goods Table</button>
            <button onClick={()=>{navigate('/coordinator-page/requests-table')}}>Requests Table</button>
        </>
    )
}