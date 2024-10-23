import { useFetch } from "../hooks/useFetch"

export default function UserTab() {
    const { data, isLoading } = useFetch("api/users")

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    const user = data?.users.findLast((user) => { return (user) })

    if (!user) {
        return <p>No hay usuarios registrados</p>;
    }

    return (
        <div className="tab">
            <div className="tab-title">
                <h3>Último usuario registrado</h3>
            </div>
            <div className="tab-content">
                <p>Id {user.id}</p>
                <p>{user.firstName}</p>
                <p>{user.email}</p>
                <a>localhost:8000/api/users/{user.id}</a>
                {/* <p>{user.detail}</p> */}
            </div>
        </div>
    )
}