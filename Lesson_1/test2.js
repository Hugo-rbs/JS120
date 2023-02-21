/* eslint-disable max-len */
/*
Create an object factory for a student object. The student object should have the following methods
and it should produce the expected results demonstrated in the sample code:

info: Logs the name and year of the student.
addCourse: Enrolls student in a course. A course is an object literal that has properties for its name and code.
listCourses: Returns a list of the courses student has enrolled in.
addNote: Adds a note property to a course. Takes a code and a note as an argument. If a note already exists,
the note is appended to the existing one.
updateNote: Updates a note for a course. Updating a note replaces the existing note with the new note.
viewNotes: Logs the notes for all the courses. Courses without notes are not displayed.

*/

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },
    listCourses() {
      console.log(this.courses);
    },
    addCourse(course) {
      this.courses.push(course);
    },
    addNote(code, note) {
      // search in the courses array to find a course with the code name
      // add the note to the course, if a note already exists the new note needs to be appended to the existing one
      this.courses.map(course => {
        if (course.code === code) {
          if (course.notes) {
            course.notes = course.notes.concat(`; ${note}`);
          } else {
            course.notes = note;
          }
        }
      });
    },
    viewNotes() {
      this.courses.forEach(course => {
        if (course.notes) {
          console.log(`${course.name}: ${course.notes}`);
        }
      });
    },
    updateNote(code, note) {
      this.courses.map(course => {
        if (course.code === code) {
          course.notes = note;
        }
      });
    },
    addGrade(courseName, grade) {
      this.courses.forEach(course => {
        if (course.name === courseName) {
          course.grade = grade;
        }
      });
    },
    getGrades() {
      this.courses.forEach(course => {
        if (course.grade) {
          console.log(`${course.name}: ${course.grade}`);
        } else {
          console.log(`${course.name}: In progress`);
        }
      });
    }
  };
}


// let foo = createStudent('Foo', '1st');
// foo.info();
// // "Foo is a 1st year student"
// foo.listCourses();
// // // [];
// foo.addCourse({ name: 'Math', code: 101 });
// foo.addCourse({ name: 'Advanced Math', code: 102 });
// foo.listCourses();
// // // [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
// foo.addNote(101, 'Fun course');
// foo.addNote(101, 'Remember to study for algebra');
// foo.viewNotes();
// // // "Math: Fun course; Remember to study for algebra"
// foo.addNote(102, 'Difficult subject');
// foo.viewNotes();
// // // "Math: Fun course; Remember to study for algebra"
// // // "Advance Math: Difficult subject"
// foo.updateNote(101, 'Fun course');
// foo.viewNotes();
// // // "Math: Fun course"
// // // "Advanced Math: Difficult subject"

/*
Create a school object. The school object uses the student object from the previous exercise.
It has methods that use and update information about the student.
Be sure to check out the previous exercise for the other arguments that might be needed by the school object.
Implement the following methods for the school object:

- addStudent: Adds a student by creating a new student and adding the student to a collection of students.
  The method adds a constraint that the year can only be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'.
  Returns a student object if year is valid otherwise it logs "Invalid Year".
- enrollStudent: Enrolls a student in a course.
- addGrade: Adds the grade of a student for a course.
- getReportCard: Logs the grades of a student for all courses. If the course has no grade, it uses "In progress" as the grade.
- courseReport: Logs the grades of all students for a given course name. Only student with grades are part of the course report.
  To test your code, use the three student objects listed below. Using the three student objects,
  produce the following values from the getReportCard and courseReport methods respectively.


factory function createSchool
should create an a school object with the following properties:
- students: array holding students objects

Methods:
- addStudent(name, year)
  invoke the create student function to create a new student then add the given student to the "students" property
  and return the student object
  IF the year is not one of the following: '1st', '2nd', '3rd', '4th', or '5th'
  return invalid year
- enrollStudent(studentName, course)
  invoke the addCourse method on the student object
- addGrade(studentName, courseName, grade)
  filter the courses of the student to add the given grade to the given course
- getReportCard(studentName)
  return the grade of the student for each course like so : Math: 95
                                                            Advanced Math: 90
                                                            Physics: In progress (in progress should show if no grade)
- courseReport: Logs the grades of all students for a given course name. Only student with grades are part of the course report
*/

// Examples of created student objects with grades; methods on the objects are not shown here for brevity.
// The following are only showing the properties that aren't methods for the three objects


function createSchool () {
  return {
    students: [],
    addStudents(name, year) {
      // done
      const VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];
      let newStudent = createStudent(name, year);
      if (!VALID_YEARS.includes(year)) {
        return `Invalid Year`;
      }
      this.students.push(newStudent);
      return newStudent;
    },
    enrollStudent(studentName, course) {
      this.students.forEach(student => {
        if (student.name === studentName) {
          student.addCourse(course);
        }
      });
    },
    addGrade(studentName, courseName, grade) {
      // look for the given student in the students array
      // filter the student courses to add the grade to the desired course
      this.students.forEach(student => {
        if (student.name === studentName) {
          student.addGrade(courseName, grade);
        }
      });
    },
    getReportCard(studentName) {
      this.students.forEach(student => {
        if (student.name === studentName) {
          return student.getGrades();
        }
      });
    },
    courseReport(courseName) {
      // iterate through students
      let grades = [];
      console.log(`=${courseName} Grades=`);
      this.students.forEach(student => {
        // if (student.courses.some(course => course === courseName)) {
        //   // grades.push(student.courses.course.grade)

        // }
        console.log(`${student.courses}: `);
      });
      console.log(`---`);
      // console.log(`Course Average: ${grades.reduce((acc,el) => acc + el)}`);
    }
  };
}

let hogwart = createSchool();
hogwart.addStudents('Harry', '1st');
hogwart.addStudents('Brent', '2nd');
// console.log(hogwart.addStudents('Harry', '1st'));
// console.log(hogwart.students);
hogwart.enrollStudent('Harry', { name: 'Math', code: 101 });
hogwart.enrollStudent('Harry', { name: 'Advanced Math', code: 102});
hogwart.enrollStudent('Brent', { name: 'Math', code: 101 });
// hogwart.students.forEach(student => student.listCourses());
hogwart.addGrade('Harry', 'Math', 95);
hogwart.addGrade('Brent', 'Math', 90);
// hogwart.getReportCard('Harry');

hogwart.courseReport('Math');

