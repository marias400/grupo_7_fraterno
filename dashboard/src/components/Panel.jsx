import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Panel.css'
import { useFetch } from '../hooks/useFetch';

export default function Panel({icon,title,endpoint,dataprop}){
    const { data, isLoading } = useFetch(`${endpoint}`)

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    // Función para acceder a propiedades anidadas de acuerdo con `dataprop`
    const getPropertyByString = (obj, path) => {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    };

    const count = getPropertyByString(data, dataprop);


    // const count = data[dataprop]

    if (!count) {
        return <p>No fue posible obtener la cantidad</p>;
    }
    // console.log(count)
    return (
        <>
        <div className="panel">
            <div className="panel-title">
                {icon && <FontAwesomeIcon icon={icon} size='xl' className='panel-icon' fixedWidth/>}
                <h3>{title}</h3>
            </div>
            <div className="panel-content">
                {count}
            </div>
        </div>
        </>
    )
}