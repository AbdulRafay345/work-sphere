import  Routes  from './Routes';
import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Routes />
    <ToastContainer />
    </>
  );
}

export default App;
