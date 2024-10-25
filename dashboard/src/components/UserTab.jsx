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
    console.log(user)
    return (
        <div className="tab">
            <div className="tab-title">
                <h3>Último usuario registrado</h3>
            </div>
            <div className="tab-content">
                <p>Id {user.id}</p>
                <p>{user.name}</p>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <p>{user.address}</p>
                <img src={user.image}></img>
                <a>localhost:8000/api/users/{user.id}</a>
                {/* <p>{user.detail}</p> */}
            </div>
        </div>
    )
}