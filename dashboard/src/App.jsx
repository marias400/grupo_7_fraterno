import './App.css'
import Panel from './components/Panel'
import { faUser, faClipboard, faUtensils } from "@fortawesome/free-solid-svg-icons";
import UserTab from './components/userTab'

function App() {


  return (
    <>
      <Panel title="Total Usuarios" icon={faUser} endpoint="api/users" dataprop="count"/>
      <Panel title="Total Productos" icon={faUtensils} endpoint="api/products" dataprop="count"/>
      <Panel title="Total Categorias" icon={faClipboard} endpoint="api/products" dataprop="CountByCategory.sanguche">
      6
      </Panel>
        
      <UserTab/>
    </>
  )
}

export default App
