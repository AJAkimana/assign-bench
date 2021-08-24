// Question
// 	Imagine you are a teacher in Shogwe School and you teach 27 students in your class.
// Each student has a name and bench number.
// 	Every day Shogwe head master brings you a random number of students with their name and bench number.
// 	You as a teacher you are tasked to arrange student in your class following bench number.
// 	You should be under assumption that you class is extensible, meaning benches are unlimited.

interface Student {
  name: string;
  bench: number;
}
class Class {
  private students: Student[];
  constructor(students: Student[]) {
    this.students = students;
  }

  getStudents(): Student[] {
    return this.students;
  }

  /**
   *student
   * @param position Position where the first new students will be added from
   * @param newStudents List of new students
   */
  addStudents(position: number, newStudents: Student[]): void {
    let students: Student[] = this.students;
    /**
     * If position is 0
     * The new students will be added on the first postion
     * Change the bench numbers for the current students
     */
    if (position < 1) {
      students = this.students.map((student, index) => ({
        ...student,
        bench: index + newStudents.length,
      }));
      this.students = [...newStudents, ...students];
    } else if (position > this.students.length - 1) {
      /**
       * If you are to add the new students on the positions
       * We change the bench numbers for the new students
       */
      newStudents = newStudents.map((student, index) => ({
        ...student,
        bench: index + this.students.length + 1,
      }));
      this.students = [...this.students, ...newStudents];
    } else {
      /**
       * If you are to add in between
       * Change both current and new students bench numbers
       */
      const firstStudents: Student[] = this.students.slice(0, position);

      const newStudentsPostion: number = newStudents.length + position;

      const lastStudents: Student[] = this.students
        .slice(position - this.students.length)
        .map((student, index) => ({
          ...student,
          bench: index + newStudentsPostion + 1,
        }));
      newStudents = newStudents.map((student, index) => ({
        ...student,
        bench: index + position + 1,
      }));

      this.students = firstStudents.concat(newStudents, lastStudents);
    }
  }
}

const students: Student[] = Array.from({ length: 27 }, (_, index) => ({
  name: `student_${index + 1}`,
  bench: index + 1,
}));

let classe = new Class(students);

// Generate 8 new students to be added
const newStudents: Student[] = Array.from({ length: 8 }, (_, index) => ({
  name: `new_student_${index + 1}`,
  bench: index + 1,
}));

console.log("=======STUDENTS LIST==========");
console.log(classe.getStudents());
// Add the students in class from Bench 5
classe.addStudents(5, newStudents);

// Print the students
console.log("=======STUDENTS LIST AFTER ADDING==========");
console.log(classe.getStudents());
