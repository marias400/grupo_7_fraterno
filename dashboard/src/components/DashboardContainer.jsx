import PropTypes from 'prop-types';
import "./DashboardContainer.css"

export default function DashboardContainer({children}) {
    return (<div className='dashboard-container'>
       {children || <p>No hay contenido disponible</p>}
    </div>
)}

DashboardContainer.propTypes = {
    children: PropTypes.node,
};

DashboardContainer.defaultProps = {
    children: null,
};