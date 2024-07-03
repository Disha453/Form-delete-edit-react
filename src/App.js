
import { useState } from 'react';
import './App.css';

function App() {

  const [student, setStudent] = useState({ fname: "", lname: "", age: "" })
  const [data, setData] = useState(JSON.parse(localStorage.getItem("h")) || [])
  const [isEdit, setIsEdit] = useState(-1)

  const fontChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value })
  }
  // submit
  const hendelSubmit = () => {
    if (isEdit !== -1) {
      const editData = data.map((item, index) => {
        if (isEdit === index) {
          return student
        }
        return item
      })
      setData(editData);
      localStorage.setItem("h", JSON.stringify(editData))
    } else {
      setData([...data, student])
      localStorage.setItem("h", JSON.stringify([...data, student]))
    }

  }
  // delete
  const hendelDelete = (idx) => {
    const deleteData = data.filter((item, index) => { return index !== idx })
    setData(deleteData);
    localStorage.setItem("h", JSON.stringify(deleteData))
  }
  // edit
  const hendelEdit = (idx) => {
    setIsEdit(idx);
    const editData = data.find((item, index) => { return index === idx })
    setStudent(editData);

  }




  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "40px", paddingTop: "10%" }} className='bg'>
        <div className='back-color'>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label htmlFor='fname' className='txt-hedding'>Full Name:</label>
            <input type='text' id='fname' name='fname' value={student.fname} onChange={(e) => fontChange(e)} placeholder='Full Name' />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label htmlFor='lname' className='txt-hedding'>Last Name:</label>
            <input type='text' id='lname' name='lname' value={student.lname} onChange={(e) => fontChange(e)} placeholder='Last Name' />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <label htmlFor='age' className='txt-hedding'>Age:</label>
            <input type='number' id='age' name='age' value={student.age} onChange={(e) => fontChange(e)} placeholder='Age' />
          </div>

          <div>
            <button onClick={hendelSubmit} className='submit-button'>Submit</button>
          </div>
        </div>

      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "30px" }}>
        <table>
          <thead>
            <th className='txt-hedding'>Full Name</th>
            <th className='txt-hedding'>Last Name</th>
            <th className='txt-hedding'>Age</th>
          </thead>
          <tbody>
            {data?.map((item, index) => {
              return (
                <tr>
                  <td>{item.fname}</td>
                  <td>{item.lname}</td>
                  <td>{item.age}</td>
                  <td><button onClick={() => hendelDelete(index)}>Delete</button></td>
                  <td><button onClick={() => hendelEdit(index)}>Edit</button></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </>
  );
}

export default App;
