import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Participant from './pages/Participant/Participant'
import CreateBill from './pages/Create/CreateBill'
import BillDetail from './pages/Detail/BillDetail'

function App() {
  return (
    <>
      <ToastContainer newestOnTop />
      <Routes>
        <Route path="/" element={<Participant />} />
        <Route path="/bill/create" element={<CreateBill />} />
        <Route path="/bill/:id" element={<BillDetail />} />
      </Routes>
    </>
  )
}
export default App
