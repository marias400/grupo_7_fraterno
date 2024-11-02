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
  Object.keys(category).forEach(function(key,i) {
    allCategory.push({id:i,label:key.charAt(0).toUpperCase() + key.slice(1) , value:category[key]});
  });

  
//console.log(allCategory)

  return (    <div className="category">
      <div className="category-title">
        <h3>Categoria de Productos</h3>
      </div>
      
    <div className="category-content">
      <PieChart 
        series={[
          {
            data: allCategory,
            cornerRadius: 5,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 20, additionalRadius: -20, color: 'gray' },
        
            
          },
        ]}
        margin={{ top: 10, bottom: 10, left: 10, right:10 }}
        // width={500}
        height={300}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: {top: 0},
            itemMarkWidth: 20,
            itemMarkHeight: 2,
            markGap: 5,
            itemGap: 10,
            hidden: true,
          },
        }}
        />
    </div>
        </div>
  );
}
