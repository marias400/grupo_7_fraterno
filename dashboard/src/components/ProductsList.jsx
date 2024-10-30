import { useFetch } from "../hooks/useFetch"

export default function ProductsList() {
    const { data, isLoading } = useFetch("api/products")

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    const products = data?.products

    if (!products) {
        return <p>No hay usuarios registrados</p>;
    }
    
    return (
        <div className="tab">
            <div className="tab-title">
                <h3>Listado de Productos</h3>
            </div>
            <ul className="tab-content">
                {products.map((product)=>{
                    return <li key={product.id}>{product.name}</li>
                    
                })}
                
                
                
            </ul>
        </div>
    )
}