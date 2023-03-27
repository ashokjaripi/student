import { Component } from 'react'
 import {BarChart, Bar, XAxis, LabelList, ResponsiveContainer} from 'recharts'

import './index.css'


import AllStudentsData from '../AllStudentsData/index'

class Home extends Component {
    state = { 
        studentsData: [],
        searchInput:'',
        filteredList: [],
        graphData: []
    }

    componentDidMount(){
        this.getStudentsData()
    }

    getStudentsData = async () => {
        try {
            const url = `http://localhost:3000/students/`
            const options = {
                method: 'GET',
            }
            const response = await fetch(url, options)
            const responseData = await response.json()
            const studentsArray = responseData.studentsArray
            const url1 = `http://localhost:3000/students/count/`
            const options1 = {
                method: 'GET',
            }
            const response1 = await fetch(url1, options1)
            const responseData1 = await response1.json()
            const {count} = responseData1
            // const statusArray = Object.keys(count).map(eachKey => eachKey)
            // const statusCountArray = []
            // const statusCount = Object.values(count).map(eachValue => {
            //     const value1 = Object.values(eachValue[0])
            //      statusCountArray.push(...value1)
            //     return {...value1}
            // })
            const statusArray = Object.entries(count).map(eachEntry => {
              const statusName=eachEntry[0]
              const valCount = Object.values(eachEntry[1][0])
              const statusCount = valCount[0]
              return{
                name: statusName,
                count: statusCount
              }
            })
            this.setState({
                    studentsData: studentsArray,
                    graphData: statusArray,
                  })
        } catch (error) {
            console.log(error.message)
        }
    }


    getSearchedResult = () => {
        const {searchInput, studentsData} = this.state
        let getSearchStudent = []
        if (searchInput !== '') {
            getSearchStudent = studentsData.filter(eachStudent =>
                eachStudent.studentName.toLowerCase().includes(searchInput.toLowerCase()),
          )
        }
        this.setState({filteredList: getSearchStudent})
      }

    onChangeSearchInput = event => {
        this.setState({searchInput: event.target.value}, this.getSearchedResult)
      }

    //   onclickDelete = async (studentId) =>{
    //     try {
    //         const response = await fetch(`http://localhost:3000/students/${studentId}/`, { method: 'DELETE' })
    //         const data = await response.json()
    //         console.log(data)
    //      } catch (error) {
    //          console.log(error.message)
    //      }
    //   }

    render() {
        const { studentsData, filteredList, graphData } = this.state
        const { name, count } = graphData
    return (
    <div className='bg-color'>
        <div className='search-input'>
        <input
            type="search"
            className="search"
            placeholder="Search"
            onChange={this.onChangeSearchInput}
            value={this.searchInput}
          />
        </div>
        <div className='student-table-container'>
                <table className='student-union-list-container'>
                <thead className='student-union-list-header'>
                    <tr>
                        <th className='list-header'>Student Name</th>
                        <th className='list-header'>Department</th>
                        <th className='list-header'>Email ID</th>
                        <th className='list-header'>Mobile Number</th>
                        <th className='list-header'>Year Passed</th>
                        <th className='list-header'>Graduation Status</th>
                        <th className='list-header '>Update Graduation Status</th>
                        <th className='list-header'>Delete</th>
                    </tr>
                </thead>
                    {filteredList.length === 0 ? (
                    <tbody>
                        { studentsData.map((eachStudent) => (
                        <AllStudentsData eachData={eachStudent} key={eachStudent.studentId} />
                    ))}
                    </tbody>
                    ) : (
                        <tbody>
                            {filteredList.map(eachStudent => (
                            <AllStudentsData
                            key={eachStudent.studentId}
                              eachData={eachStudent}
                            />
                          ))}
                        </tbody>
                    )}
            </table>
            
        </div>
         <div className="screen">
          <ResponsiveContainer width="50%" height="100%">
          <BarChart
            width={700}
            height={300}
            data={graphData}
            margin={{
              top: 15,
            }}
          >
            <XAxis dataKey="name" />
            <Bar dataKey="count" fill='#82ca9d' radius={[5, 5, 0, 0]}>
              <LabelList
                dataKey="count"
                position="top"
                fill='#94a3b8'
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>  
      </div>  
      <div className='mobile-scrren'>
      <ResponsiveContainer width="95%" height="100%">
          <BarChart
            width={700}
            height={300}
            data={graphData}
            margin={{
              top: 15,
            }}
          >
            <XAxis dataKey="name" />
            <Bar dataKey="count" fill='#82ca9d' radius={[5, 5, 0, 0]}>
              <LabelList
                dataKey="count"
                position="top"
                fill='#94a3b8'
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>
    )
    }
}

export default Home

// /students/count/