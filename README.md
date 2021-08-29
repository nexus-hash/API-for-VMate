# API For Vmate

This API is made for Motorq Hiring process assignment. It is an backend for the website Vmate.

## The API has following endpoints

- **GET /student/{studentId}**   
This endpoint returns student name as per provided Id. If the Id has not registered yet It returns 0.  
<pre><code>{  
    "roll":"",  
    "name":"",   
 }</code></pre>

- **POST /student**  
    Adds student to the student entity   
    Body:
<pre><code>{
 "name": "Student_Name",
 “rollNo”: “17BCE2138”
}</code></pre>
- **GET /classes/{courseCode}**  
Returns array of classes for a given course  
Sample request  
/courses/CSE1002    
Will return an array of classes of the course CSE1002
- **Post /class/{studentId}:**  
o Adds a class to student’s entity if there are no clashes
- **Delete /class/{studentId}/{classId}**  
Deletes a class with the given classId from the student’s entity  
- **Get /class/{studentId}/**  
Gets all the classes registered by the student with rollNo = studentId  
- **Get /classes-on-map/{courseCode}**  
Get an array of classes of the given courseCode with the given additional information:
sum of students registered to a given class  
building location associated to that class  
Sample req: Get /classes-on-map/CSE1002  
<pre><code>
[
   {
   "id": "classId_1",
   "courseCode": "CSE1002",
   "coursename":"Operating System",
   "faculty": "Murli Sir",
   "building": "SJT",
   "time": "Monday 5pm-6pm",
   "studentsRegistered": x,
   "location": {
   "lat": 37.7,
   "lon":-127.5
 }
 },
</code></pre>
- **GET /courses**  
Gets all the courses available

## How to Compile and run

The Database for this website is hosted on heroku postgres. The connection link is already provided for no confusions rather than the use of process environment.  
This api is already hosted but still if someone wants to compile it the instruction are as follows:  
1. Fork this Repository
2. Clone the forked repository
3. Go to teminal section and run `npm install`
4. After all dependencies are installed run `npm start`
5. The server should be live on `https://localhost:3030`