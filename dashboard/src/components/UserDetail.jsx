import { useFetch } from "../hooks/useFetch"

export default function UserDetail({ id }) {
    const { data, isLoading } = useFetch("api/users")

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    const user = data?.users.find((user) => user.id === id);

    if (!user) {
        return <p>No se encontró el usuario</p>;
    }

    return (
        <>
            <p>{user.firstName}</p>
        </>
    );
}