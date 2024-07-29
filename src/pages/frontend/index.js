import { Route, Routes } from 'react-router-dom'
import Header from '../../components/Header'
import Home from './Home'
import Users from './Users'
import Todos from './Todos'
import AddTodos from './Todos/AddTodos'
import Footer from '../../components/Footer'

export default function Frontend() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/todos' element={<Todos />} />
        <Route path='/add-todo' element={<AddTodos />} />
        <Route path='*' element={<p className='fs-1 text-white text-center'>Page Not Found<br /> 404 Error</p>} />
      </Routes>
      <Footer />
    </>
  )
}
