import { Component } from "react";

import {v4 as uuidv4} from 'uuid'

import './index.css'

// studentName, department, emailId, mobileNumber, yearPassed, graduationStatus

class AddStudent extends Component{
    state = {
        studentName:"",
        department:"",
        emailId:"",
        mobileNumber:"",
        yearPassed:"", 
        graduationStatus:""
    }

    

    onChangeStudentNameInput = (event) => {
        this.setState({ studentName: event.target.value });
      };

    onChangeDepartmentInput = (event) => {
        this.setState({ department: event.target.value });
      };

      onChangeEmailIdInput = (event) => {
        this.setState({ emailId: event.target.value });
      };

      onChangeMobileNumberInput = (event) => {
        this.setState({ mobileNumber: event.target.value });
      };

      onChangeYearPassedInput = (event) => {
        this.setState({ yearPassed: event.target.value });
      };

      onChangeGraduationStatusInput = (event) => {
        console.log(event.target.value)
        this.setState({ graduationStatus: event.target.value });
      };

      submitForm = async (event) => {
      try {
        event.preventDefault();
        const id = uuidv4()
        const { studentName, emailId, department, yearPassed, graduationStatus, mobileNumber } = this.state
        const url = `http://localhost:3000/students/`;
    const options = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        studentName: studentName,
        emailId: emailId,
        department: department,
        yearPassed: yearPassed,
        graduationStatus: graduationStatus,
        mobileNumber: mobileNumber,
      }),
    };
    const response = await fetch(url, options)
    const data = await response.json()
        this.setState({
          studentName:"",
          department:"",
          emailId:"",
          mobileNumber:"",
          yearPassed:"", 
          graduationStatus:""
      }
  )
      } catch (error) {
        console.log(error.message)
      }  
      }

    renderStudentNameField = () => {
        const { studentName } = this.state

        return(
            <>
            <label className="input-label" htmlFor="StudentName">
            Student Name
            </label>
            <input
            type="text"
            id="StudentName"
            className="input-filed"
            onChange={this.onChangeStudentNameInput}
            value={studentName}
          />
            </>
        );
    }

    renderDepartmentField = () => {
      const { department } = this.state

        return(
            <>
            <label className="input-label" htmlFor="department">
            Department
            </label>
            <input
            type="text"
            id="department"
            className="input-filed"
            onChange={this.onChangeDepartmentInput}
            value={department}
          />
            </>
        );
    }

    renderEmailIdField = () => {
      const { emailId } = this.state 

        return(
            <>
            <label className="input-label" htmlFor="emailId">
            Email Id
            </label>
            <input
            type="email"
            id="emailId"
            className="input-filed"
            onChange={this.onChangeEmailIdInput}
            value={emailId}
          />
            </>
        );
    }

    renderMobileNumberField = () => {
      const { mobileNumber } = this.state

        return(
            <>
            <label className="input-label" htmlFor="mobileNumber">
            Mobile Number
            </label>
            <input
            type="tel"
            className="input-filed"
            pattern="[0-9]{10}"
            name="mobileNumber"
            id="mobileNumber"
            onChange={this.onChangeMobileNumberInput}
            value={mobileNumber}
          />
            </>
        );
    }

    renderYearPassedField = () => {
      const { yearPassed } = this.state 

        return(
            <>
            <label className="input-label" htmlFor="yearPassed">
            Year Passed
            </label>
            <input
            type="text"
            className="input-filed"
            id="yearPassed"
            onChange={this.onChangeYearPassedInput}
            value={yearPassed}
          />
            </>
        );
    }

    renderGraduationStatusField = () => {
      const { graduationStatus } = this.state
       
        return(
            <>
            <label className="input-label" htmlFor="graduationStatus">
            Graduation Status
            </label>
          <select 
          onChange={this.onChangeGraduationStatusInput}
            value={graduationStatus}
             className="input-filed"
              id="graduationStatus">
                <option>Select</option>
                <option value="Completed">Completed</option>
                <option value="Pursuing">Pursuing</option>
                <option value="Unknown">Unknown</option>
            </select>
            </>
        );
    }

    render(){

    return (
        <div className="login-form-container ">
            <h1 className="add-student-form-heading">Add Student</h1>
            <form className="form-container" onSubmit={this.submitForm}>
            <div className="input-container">{this.renderStudentNameField()}</div>
          <div className="input-container">{this.renderDepartmentField()}</div>
          <div className="input-container">{this.renderEmailIdField()}</div>
          <div className="input-container">{this.renderMobileNumberField()}</div>
          <div className="input-container">{this.renderYearPassedField()}</div>
          <div className="input-container">{this.renderGraduationStatusField()}</div>
          <div>
          <button type="submit" className="submit-button">
            Save
          </button>
          </div>
            </form>
        </div>
    )
}
}
export default AddStudent