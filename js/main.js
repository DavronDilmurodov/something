let elTemplate = selectElement("#student-template").content;
let elFilterForm = selectElement(".filter");
let elTableBody = selectElement("#students-table-body");
let elSearch = selectElement("#search");

let onRender = (arr) => {
  elTableBody.innerHTML = null;
  arr.forEach((element) => {
    let student = elTemplate.cloneNode(true);

    let studentId = student.querySelector(".student-id");
    let studentName = student.querySelector(".student-name");
    let studentMarkedDate = student.querySelector(".student-marked-date");
    let studentMark = student.querySelector(".student-mark");
    let studentStatus = student.querySelector(".student-pass-status");

    studentId.textContent = element.id;
    studentName.innerHTML = element.name + " " + element.lastName;
    studentMarkedDate.textContent = element.markedDate;
    studentMark.textContent = element.mark;

    if (element.mark >= 104) {
      studentStatus.textContent = "success";
      studentStatus.classList.add("bg-success");
    } else {
      studentStatus.textContent = "reject";
      studentStatus.classList.add("bg-danger");
    }

    elTableBody.append(student);
  });
};

let onFilter = (event) => {
  event.preventDefault();

  let inputValue = elSearch.value.trim();

  if (!inputValue) {
    return alert("Add Some Value");
  }

  let regexp = new RegExp(inputValue, "gi");

  let filteredStudents = [];

  students.forEach((student) => {
    if (`${student.name} ${student.lastName}`.match(regexp)) {
      return filteredStudents.push({
        ...student,
        name: student.name.replace(
          inputValue,
          `<mark>${inputValue.toUpperCase()}</mark>`
        ),
      });
    }
  });
  onRender(filteredStudents);
};

onRender(students);
elFilterForm.addEventListener("submit", onFilter);
