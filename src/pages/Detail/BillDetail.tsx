import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../utils/firebase'

interface Bill {
  title: string
  participants: string[]
  items: { name: string; amount: number; paidBy: string }[]
}

const BillDetail = () => {
  const { id } = useParams()
  const [bill, setBill] = useState<Bill | null>(null)

  useEffect(() => {
    const fetchBill = async () => {
      if (!id) return
      const ref = doc(db, 'bills', id)
      const snapshot = await getDoc(ref)
      if (snapshot.exists()) {
        setBill(snapshot.data() as Bill)
      } else {
        console.error('Bill not found')
      }
    }

    fetchBill()
  }, [id])

  if (!bill) return <div>Loading bill...</div>

  return (
    <div style={{ padding: '1rem' }}>
      <h2>{bill.title}</h2>
      <h3>Participants:</h3>
      <ul>
        {bill.participants.map((p, idx) => (
          <li key={idx}>{p}</li>
        ))}
      </ul>
      <h3>Items:</h3>
      <ul>
        {bill.items.map((item, idx) => (
          <li key={idx}>
            {item.name} - Rp{item.amount} paid by {item.paidBy}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BillDetail
