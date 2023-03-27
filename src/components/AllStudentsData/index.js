
import './index.css'

const AllStudentsData = props => {
    const { eachData } = props
    const {studentId, studentName, department, emailId, mobileNumber, yearPassed, graduationStatus} = eachData

    const deleteStudentRecord = async () => {
        try {
           const response = await fetch(`http://localhost:3000/students/${studentId}/`, { method: 'DELETE' })
           const data = await response.json()
           console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    const onChangeGraduationStatusInput = async (event) => {
        try {
            const updateValue = event.target.value
            const url = `http://localhost:3000/students/${studentId}/`;
    const options = {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        graduationStatus: updateValue,
      }),
    };
    const response = await fetch(url, options)
    const data = await response.json()
        console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <tr>
            <td className='list-header under-line'>{studentName}</td>
            <td className='list-header under-line'>{department}</td>
            <td className='list-header under-line'>{emailId}</td>
            <td className='list-header under-line'>{mobileNumber}</td>
            <td className='list-header under-line'>{yearPassed}</td>
            <td className='list-header under-line'>{graduationStatus}</td>
            <td className='list-header under-line update-status'>
                <select 
                 onChange={onChangeGraduationStatusInput}
             className='select'
              id="graduationStatus">
                <option>Select</option>
                <option value="Completed">Completed</option>
                <option value="Pursuing">Pursuing</option>
                <option value="Unknown">Unknown</option>
            </select>
            </td>
            <td className='under-line'>
                <button type='button' onClick={deleteStudentRecord}>Delete</button>

            </td>
        </tr>
    )
}

export default AllStudentsData