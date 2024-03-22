import { useNavigate } from 'react-router-dom';

export default function Home(){
    const navigate = useNavigate()

    return(
        <>
            <h1>Welcome to Smart App</h1>
            <button onClick={()=> navigate("coordinator-page")}>Coordinator</button>
            <button onClick={()=> navigate('goods-table-employee')}>Employee</button>
        </>
    )
}