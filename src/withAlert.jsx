import {useContext} from 'react';
import { AlertContext } from './Contexts';

function withAlert(IncomingComponent){
  function OutgoingComponent(props){
    const { alert,setAlert } = useContext(AlertContext);
    return <IncomingComponent {...props} alert={alert} setAlert={setAlert} />
  } 
  return OutgoingComponent;
}

export default withAlert;