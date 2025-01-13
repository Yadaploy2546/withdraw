import React, {useState} from 'react'
import Swal from 'sweetalert2';
import './App.css';
const App = () => {
  const [accBalance, setAccBalance] = useState(10000);
  const[withDrawAmount, setwithDrawAmount] = useState('');
  const[history, setHistory] = useState([]);

  const withDraw = (amount) => {
    if(!isNaN(amount) && amount > 0 && amount <= accBalance - 100){
      const newHistory = [...history, {amount, amounAfter: accBalance - amount}]
      setAccBalance(prevBalance => prevBalance - amount)
      setHistory(newHistory)
      Swal.fire({
        icon: 'success',
        title: 'ถอนเงินสำเร็จ',
        text: 'ทำการถอนเงินเสร็จสิ้น',
        confirmButtonText: 'ตกลง',
      });
    }else {
      Swal.fire({
        icon: 'error',
        title: 'ถอนไม่เงินสำเร็จ',
        text: 'จำนวนเงินไม่เพียงพอ หรือระบบไม่อนุญาตให้ถอนหมดบัญชี',
        confirmButtonText: 'ตกลง',
      });
    }

  }

  return (
    <>
      <h1>โปรแกรมถอนเงิน</h1>
      <p>ยอดเงินคงเหลือ {accBalance}</p>
      <input  class="border-2 border-rose-600 " type="number" value={withDrawAmount} onChange={(e)=> setwithDrawAmount(e.target.value)} />
      <button  class="border-double border-4 border-indigo-600" onClick={() => withDraw(parseInt(withDrawAmount))}>ถอนเงิน</button>

      <h3>ประวัติการถอนเงิน</h3>
      <ul>
      {
        history.map((entry,index) => (
          <li key={index}>
            <span>ถอนเงิน: {entry.amount}</span>
            <span>เงินคงเหลือ: {entry.amounAfter}</span>
          </li>
          
        ))
      }
      </ul>
    </>
  )
}

export default App