import { useFetch } from "../hooks/useFetch"
import UserDetail from "./UserDetail"

export default function UserTab() {
    const { data, isLoading } = useFetch("api/users")
    return (
        <>
            {
                data?.users.map((user) => {
                    return (
                        <UserDetail id={user.id}>{user.firstName}</UserDetail>)
                })
            }
        </>
    )
}