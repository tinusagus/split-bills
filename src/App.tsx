import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Participant from './pages/Home/Home'
import CreateBill from './pages/Create/CreateBill'
import BillDetail from './pages/Detail/BillDetail'
import { PAGE_ENUM } from './utils/helper'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'

function App() {
  return (
    <>
      <ToastContainer newestOnTop />
      <ThemeToggle />

      <Routes>
        <Route path={PAGE_ENUM.HOME} element={<Participant />} />
        <Route path={PAGE_ENUM.BILL_CREATE} element={<CreateBill />} />
        <Route path={PAGE_ENUM.BILL_DETAIL} element={<BillDetail />} />
      </Routes>
    </>
  )
}
export default App
