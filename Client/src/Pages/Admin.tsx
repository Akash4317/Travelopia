import { useEffect } from 'react'
import Navbar from '../Components/Navbar'

const Admin = () => {
    // const [query, setQuery] = useState([]);
    useEffect(() => {
        const fetchquery = async () => {
            const res = await fetch('http://localhost:4500/query');
            console.log(res);
            const data = await res.json();
            // setQuery(data);
            console.log(data);
        }

        fetchquery();
    })
    return (
        <div>
            <Navbar />
            <h1>this is admin page </h1>
        </div>
    )
}

export default Admin
