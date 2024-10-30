import { PieChart } from "@mui/x-charts/PieChart";
import { useFetch } from "../hooks/useFetch";
import "./CategoryChart.css";

export default function CategoryChart() {
  const { data, isLoading } = useFetch("api/products");

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  const category = data?.countByCategory;

  if (!category) {
    return <p>No hay categorias registradas</p>;
  }

let allCategory =[] 
  Object.keys(category).forEach(function(key) {
    allCategory.push({name:key , amount:category[key]});
  });
  
console.log(allCategory)

  return (    <div className="category">
      <div className="category-title">
        <h3>Categoria de Productos</h3>
      </div>
      <ul className="category-content">
        <p>{category.comida}</p>
      </ul>

      <PieChart
        series={[
          {
            data: allCategory
             
            ,
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}
