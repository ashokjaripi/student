const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "studentsData.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server Running at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

const convertDbObjectToResponseObject = (eachStudent) => {
  return {
    studentId: eachStudent.student_id,
    studentName: eachStudent.student_name,
    department: eachStudent.department,
    emailId: eachStudent.email_id,
    mobileNumber: eachStudent.mobile_number,
    yearPassed: eachStudent.year_passed,
    graduationStatus: eachStudent.graduation_status,
  };
};

app.get("/students/", async (request, response) => {
  try {
    const getStudentsQuery = `
    SELECT
      *
    FROM
      students;`;
  const studentsArray = await database.all(getStudentsQuery);
  const formattedStudentArray = studentsArray.map((eachStudent) =>
       convertDbObjectToResponseObject(eachStudent)
     )
    response.status(200).json({
      studentsArray : formattedStudentArray
    })
  } catch (error) {
    console.log(error.message)
    response.status(500).json({errors : [{ msg : error.message}]})
  }
});
 
app.get("/students/count/", async (request, response) => {
  try {
    const getCompletedCountQuery = `
    SELECT
  count('Completed') AS completed
FROM
  students
WHERE
graduation_status = 'Completed';`;
  const completedCount = await database.all(getCompletedCountQuery);

  const getPursuingCountQuery = `
    SELECT
  count('Pursuing') AS pursuing
FROM
students
WHERE
graduation_status = 'Pursuing';`;
  const pursuingCount = await database.all(getPursuingCountQuery);

  const getUnknownCountQuery = `
    SELECT
  count('Unknown') AS unknown
FROM
students
WHERE
graduation_status = 'Unknown';`;
  const unknownCount = await database.all(getUnknownCountQuery);
  const countData = {
    completed: completedCount,
    pursuing: pursuingCount,
    unknown: unknownCount
  }

    response.status(200).json({
      count : countData
    })
  } catch (error) {
    console.log(error.message)
    response.status(500).json({errors : [{ msg : error.message}]})
  }
});

app.post("/students/", async (request, response) => {
  try {
    const { studentId, studentName, department, emailId, mobileNumber, yearPassed, graduationStatus } = request.body;
  const postStudentsQuery = `
  INSERT INTO
    students (student_id, student_name, department, email_id, mobile_number, year_passed, graduation_status)
  VALUES
    ('${studentId}', '${studentName}', '${department}', '${emailId}', '${mobileNumber}', '${yearPassed}', '${graduationStatus}');`;
  const student = await database.run(postStudentsQuery);
  response.status(200).json({
    msg : 'Student Added to List'
  })
  } catch (error) {
    console.log(error.message)
    response.status(500).json({errors : [{ msg : error.message}]})
  }
});

app.put("/students/:studentId/", async (request, response) => {
  try {
    const { graduationStatus } = request.body;
  const { studentId } = request.params;
  const updateStudentQuery = `
  UPDATE
    students
  SET
  graduation_status = '${graduationStatus}'
  WHERE
  student_id = '${studentId}';`;
    
  await database.run(updateStudentQuery);
  response.status(200).json({
    msg : 'Status updated'
  })
  } catch (error) {
    console.log(error.message)
    response.status(500).json({errors : [{ msg : error.message}]})
  }
});

app.delete("/students/:studentId/", async (request, response) => {
  try {
    const { studentId } = request.params;
  const deletePlayerQuery = `
  DELETE FROM
    students
  WHERE
  student_id = '${studentId}';`;
  await database.run(deletePlayerQuery);
  response.status(200).json({
    msg : 'Student Deleted from List'
  })
  } catch (error) {
    console.log(error.message)
    response.status(500).json({errors : [{ msg : error.message}]})
  }
});

module.exports = app;

/*
###

POST http://localhost:5500/students/
Content-Type: application/json
{
    "studentId":"125", 
    "studentName": "Khan",
    "department": "CSE",
    "emailId": "khan@gmail.com",
    "mobileNumber": "8742136497",
    "yearPassed": "2017",
    "graduationStatus" : "completed"
}
###
*/