// Express Initialisation
const express = require("express");
const app = express();
const port = 3000;

// Sequelize Initialisation
const sequelize = require("./sqlite/sequelize");

// Import created models
const University = require("./models/university");
const Student = require("./models/student");
const Course = require("./models/course");

//define entities relationship
University.hasMany(Student);
University.hasMany(Course);
Student.belongsToMany(Course, {through: "enrollments"});
Course.belongsToMany(Student, {through: "enrollments"});


// Express middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Kickstart the Express aplication
app.listen(port, () => {
  console.log("The server is running on http://localhost:" + port);
});

// Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
  console.error("[ERROR]:" + err);
  res.status(500).json({ message: "500 - Server Error" });
});

/**
 * Create a special GET endpoint so that when it is called it will
 * sync our database with the models.
 */
app.get("/create", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created with the models." });
  } catch (err) {
    next(err);
  }
});

/**
 * GET all the universities from the database.
 */
app.get("/universities", async (req, res, next) => {
  try {
    const universities = await University.findAll();
    res.status(200).json(universities);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new university to the database.
 */
app.post("/university", async (req, res, next) => {
  try {
    await University.create(req.body);
    res.status(201).json({ message: "University Created!" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET all students.
 */
app.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new student into a university.
 */
app.post("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const student = new Student(req.body);
      student.universityId = university.id;
      await student.save();
      res.status(201).json({ message: 'Student crated!'});
    } else {
      res.status(404).json({ message: '404 - University Not Found'});
    }
  } catch (error) {
    next(error);
  }
});

/**
 * GET a specific university's students.
 */
app.get("/universities/:universityId/students", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId, {
      include: [Student],
    });
    if (university) {
      res.status(200).json(university.students);
    } else {
      res.status(404).json({ message: "404 - University Not Found!" });
    }
  } catch (err) {
    next(err);
  }
});

/**
 * GET a specific student from a university.
 */
app.get("/universities/:universityId/students/:studentId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const students = await university.getStudents({id: req.params.studentId});
      const student = students.shift();
      if (student) {
        res.status(200).json(student);
      } else {
        res.status(404).json({ message: '404 - Student Not Found!' });
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!' });
    }
  } catch (error) {
    next(error);
  }
});

/**
 * PUT in order to update a student from a university.
 */
app.put("/universities/:universityId/students/:studentId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const students = await university.getStudents({id: req.params.studentId});
      const student = students.shift();
      if (student) {
        student.studentFullName = req.body.fullName;
        student.studentStatus = req.body.status;
        await student.save();
        res.status(202).json({ message: 'Student updated!' });
      } else {
        res.status(404).json({ message: '404 - Student Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!'});
    }
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE a student from a university.
 */
app.delete("/universities/:universityId/students/:studentId", async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);
    if (university) {
      const students = await university.getStudents({id: req.params.studentId});
      const student = students.shift();
      if (student) {
        await student.destroy();
        res.status(200).json({ message: 'Student deleted!' });
      } else {
        res.status(404).json({ message: '404 - Student Not Found!'});
      }
    } else {
      res.status(404).json({ message: '404 - University Not Found!'});
    }
  } catch (error) {
    next(error);
  }
});

app.get('/universities/:universityId/courses/:courseId/enrollments', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);

    if (university) {
      const courses = await university.getCourses({id: req.params.courseId});
      const course = courses.shift();

      if (course) {
          const students = await course.getStudents();
          if (students.length > 0) {
            res.json(students);
          } else {
            res.sendStatus(204);
          }
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }

  } catch (error) {
    next(error);
  }
});

app.post('/universities/:universityId/courses/:courseId/enrollments/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);

    if (university) {
      const courses = await university.getCourses({id: req.params.courseId});
      const course = courses.shift();
      const students = await university.getStudents({id: req.params.studentId});
      const student = students.shift();
      if (course && student) {
         await course.addStudent(student);
         res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }

  } catch (error) {
    next(error);
  }
});

app.delete('/universities/:universityId/courses/:courseId/enrollments/:studentId', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);

    if (university) {
      const courses = await university.getCourses({id: req.params.courseId});
      const course = courses.shift();
      const students = await university.getStudents({id: req.params.studentId});
      const student = students.shift();
      if (course && student) {
         await course.removeStudent(student);
         res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }

  } catch (error) {
    next(error);
  }
});

app.get('/universities/:universityId/students/:studentId/enrollments', async (req, res, next) => {
  try {
    const university = await University.findByPk(req.params.universityId);

    if (university) {
      const students = await university.getStudents({id: req.params.studentId});
      const student = students.shift();

      if (student) {
        const courses = await student.getCourses();
        if (courses.length > 0) {
          res.json(courses);
        } else {
          res.sendStatus(204);
        }
      } else {
        res.sendStatus(404);
      }
    } else {
      res.sendStatus(404);
    }

  } catch (error) {
    next(error);
  }
});

app.get('/', async(req, res, next) => {
  try{
    const universities = await University.findAll();
    const result = [];

    for(let university of universities){
      const students = await university.getStudents();
      const courses = await university.getCourses();
      const enrollments = [];

      for(let course of courses){
        const enrolledStudents = await course.getStudents();
        for(let student of enrolledStudents){
          enrollments.push({
            studentId: student.id,
            courseId: course.id
          });
        }
      }

      result.push({
        id: university.id,
        universityName: university.universityName,
        students: students,
        courses: courses,
        enrollments: enrollments
      });
    }

    res.json(result);
  }catch(error){
    next(error);
  }
});

app.post('/', async(request, response, next) =>{
  try{
    const registry = {};
    for (let u of request.body){
      const university = await University.create(u);
      for (let s of u.students){
        const student = await Student.create(s);
        registry[s.key] = student;
        await university.addStudent(student);
      }
      for(let c of u.courses){
        const course = await Course.create(c);
        registry[c.key] = course;
        await university.addCourse(course);
      }
      for (let e of u.enrollments){
        await registry[e.courseKey].addStudent(registry[e.studentKey]);
      }
      await university.save();
    }
    response.sendStatus(201);
   }catch(error){
    next(error);
  }
});

