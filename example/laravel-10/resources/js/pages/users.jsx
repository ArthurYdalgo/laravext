import usePrivacy from "@/hooks/usePrivacy";
import { useEffect,useState } from "react"

export default () => {

    const { active: eyeToggle } = usePrivacy();
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const response = await fetch('/api/users')
        const data = await response.json()
        setUsers(data.users)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div>
            <h1 className="text-white">Users</h1>
            {users.map(user => <div key={user.id} className="text-white">{user.name} - {eyeToggle ? '***@***.com' : user.email}</div>)}
        </div>
    )
}