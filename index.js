/*
    Oppgave 1, 2 og 4:
*/

const chosenSubjectCode = "ARB0008";

async function getStudentsFiltered(chosenSubjectCode) {
  try {
    const subjectsResponse = await fetch(
      "https://recruit-task.tipcloud.trondheim.kommune.no/v1/subjects"
    );
    const studentsResponse = await fetch(
      "https://recruit-task.tipcloud.trondheim.kommune.no/v1/students"
    );

    const subjectsResult = await subjectsResponse.json();
    const studentsResult = await studentsResponse.json();

    console.log("Subjects:", subjectsResult);
    console.log("Students:", studentsResult);

    const selectedSubject = subjectsResult.subjects.find(
      (subject) => subject.subjectCode === chosenSubjectCode
    );

    if (selectedSubject) {
      const selectedSubjectId = selectedSubject.id;

      studentsResult.students.forEach((student) => {
        student.subjects.forEach((subject) => {
          const subjectId = subject.subjectId;

          if (subjectId === selectedSubjectId) {
            console.log("Name:", student.name);
            console.log("Grade:", subject.grade);
          }
        });
      });
    }
  } catch {
    console.error("Error");
  }
}

getStudentsFiltered(chosenSubjectCode);

/*
  Oppgave 3:
*/

async function getStudentsFilteredV2() {
  try {
    const username = "test";
    const password = "91bs4mGa3pNL";
    const credentials = `${username}:${password}`;
    const encodedCredentials = btoa(credentials);

    const subjectsResponse = await fetch(
      "https://recruit-task.tipcloud.trondheim.kommune.no/v2/subjects",
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
    );

    const studentsResponse = await fetch(
      "https://recruit-task.tipcloud.trondheim.kommune.no/v2/students",
      {
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
    );

    console.log(studentsResponse);

    const subjectsResult = await subjectsResponse.json();
    const studentsResult = await studentsResponse.json();

    console.log("Subjects V2:", subjectsResult);
    console.log("Students V2:", studentsResult);

    studentsResult.students.forEach((student) => {
      student.subjects.forEach((subject) => {
        const subjectID = subject.subjectId;

        if (subjectID === 0) {
          console.log("Name:", student.name);
          console.log("Grade:", subject.grade);
        }
      });
    });
  } catch {
    console.error("Error");
  }
}

getStudentsFilteredV2();
