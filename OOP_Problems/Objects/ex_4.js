/*
Create an object factory for a student object. The student object should have the following methods and 
it should produce the expected results demonstrated in the sample code:

info: Logs the name and year of the student.
addCourse: Enrolls student in a course. A course is an object literal that has properties for its name and code.
listCourses: Returns a list of the courses student has enrolled in.
addNote: Adds a note property to a course. Takes a code and a note as an argument. If a note already exists, 
the note is appended to the existing one.
updateNote: Updates a note for a course. Updating a note replaces the existing note with the new note.
viewNotes: Logs the notes for all the courses. Courses without notes are not displayed.

createStudent: should take two arguments: name, grade
set the two arguments as properties of the newly created object
- name: name
- grade: grade
- info: return string student's name is a student'year student
- addCourse

*/

function createStudent(name, grade) {
  return {
    name,
    grade,
    courses: [],
    info () {
      console.log(`${this.name} is a ${this.grade} student.`);
    },
    listCourses () {
      console.log(this.courses);
    },
    addCourse(course) {
      this.courses.push(course);
    },
    addNote(courseCode, note) {
      this.courses.forEach(course => {
        if (course.code === courseCode) {
          if (course.notes !== undefined) {
            course.notes = course.notes.concat(`; ${note}`);
          } else {
            course.notes = note;
          }
        }
      });
    },
    updateNote(courseCode, note) {
      this.courses.forEach(course => {
        if (course.code === courseCode) {
          course.notes = note;
        }
      })
    },
    viewNotes() {
      for (let index = 0; index < this.courses.length; index++) {
        let course = this.courses[index];
        if (course.notes !== undefined) {
          console.log(`${course.name}: ${course.notes}`);
        }
      }
    }
  };
}


let foo = createStudent('Foo', '1st');
// foo.info();
// "Foo is a 1st year student"
// foo.listCourses();
// // [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
// foo.listCourses();
// // [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
// // console.log(foo);
// foo.viewNotes();
// // "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
// foo.viewNotes();
// // "Math: Fun course; Remember to study for algebra"
// // "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"