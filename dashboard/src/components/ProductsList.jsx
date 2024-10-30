import { useFetch } from "../hooks/useFetch"
import "./productList.css"

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
        <div className="productList">
            <div className="productList-title">
                <h3>Listado de Productos</h3>
            </div>
            <ul className="productList-content">
                {products.map((product)=>{
                    return <li key={product.id}>{product.name}</li>
                    
                })}
                
                
                
            </ul>
        </div>
    )
}