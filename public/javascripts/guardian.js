const endpoint = "http://localhost:3000/api/";

// NAV SELECTS
const studentSelect = document.getElementById("student");
const yearSelect = document.getElementById("year");
const schoolSelect = document.getElementById("school");
const classSelect = document.getElementById("class");
const subjectSelect = document.getElementById("subject");

// NAV BUTTONS
const btnContact = document.getElementById("btn-contact");
const btnJustify = document.getElementById("btn-justify");
const navButtons = [btnContact, btnJustify];

// MAIN
const main = document.querySelector('main')

window.addEventListener("load", () => fetchData());

studentSelect.addEventListener("change", () => callSelectedStudentRelatedFunctions());
yearSelect.addEventListener("change", () => callSelectedYearRelatedFunctions());
schoolSelect.addEventListener("change", () => callSelectedSchoolRelatedFunctions());
classSelect.addEventListener("change", () => callSelectedClassRelatedFunctions());
subjectSelect.addEventListener("change", () => callSelectedSubjectRelatedFunctions());

// DATABASE DATA FROM API

let guardian = {};
let student = [];
let studentSelected = {};

const fetchData = () => {
    const userId = document.getElementById("userId").value;
    fetch(`${endpoint}guardian/user/${userId}`)
        .then(res => res.json())
        .then(data => {
            guardian = data;
            student = data.student;
            populateStudentSelect();
            dashboard();
        })
        .catch(error => console.log(error))
};

// GENERAL FUNCTIONS TO TREAT PARENT ELEMENTS

const sortSelect = (select) => {
    let tmpAry = new Array();
    for (let i = 0; i < select.options.length; i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = select.options[i].text;
        tmpAry[i][1] = select.options[i].value;
    }
    tmpAry.sort();
    tmpAry = removeDuplicates(tmpAry);
    while (select.options.length > 0) {
        select.options[0] = null;
    }
    for (let i = 0; i < tmpAry.length; i++) {
        let opt = new Option(tmpAry[i][0], tmpAry[i][1]);
        select.options[i] = opt;
    }
    return;
};

const removeDuplicates = (arr) => {
    // OBS: arr == [ [option.text, option.value], [option.text, option.value] ]
    let uniqueOpts = []
    for (let i = 0; i < arr.length; i++) {
        if (i == 0) { uniqueOpts.push(arr[i]) } // because arr[i=0 - 1] == undefined
        else if (arr[i][0] != arr[i - 1][0]) { uniqueOpts.push(arr[i]); }
    }
    return uniqueOpts;
};

const removeChildNodes = (elem) => {
    [...elem.childNodes].map(node => node.remove());
};

const setSelectTitle = (title, select, disable = true) => { // must be called only after other select options are created
    const option = document.createElement("option");
    option.value = "";
    option.innerText = title;
    option.disabled = disable;
    option.selected = select.options.length != 1 ? true : false;
    select.prepend(option);
};

const createSelectOption = (value, innerText, select) => {
    const option = document.createElement("option");
    option.value = value;
    option.innerText = innerText;
    select.append(option);
};

const getSelectedOption = (select) => {
    return select.options[select.selectedIndex];
};

// NAV SELECTS AGGREGATE FUNCTIONS

const callSelectedStudentRelatedFunctions = () => {
    populateYearSelect();
};

const callSelectedYearRelatedFunctions = () => {
    populateSchoolSelect();
};

const callSelectedSchoolRelatedFunctions = () => {
    populateClassSelect();
};

const callSelectedClassRelatedFunctions = () => {
    populateSubjectSelect();
};

const callSelectedSubjectRelatedFunctions = () => {
    // populateTermSelect();
};

// POPULATE NAV SELECTS

const populateStudentSelect = () => {
    student.forEach(student => {
        createSelectOption(student.id, student.name, studentSelect);
    })
    if (studentSelect.options.length < 2) {
        callSelectedStudentRelatedFunctions();
    } else {
        sortSelect(studentSelect);
    }
    setSelectTitle("Alunos", studentSelect);
    setSelectTitle("Ano", yearSelect);
    setSelectTitle("Escola", schoolSelect);
    setSelectTitle("Turma", classSelect);
}

const populateYearSelect = () => {
    const selectedStudent = getSelectedOption(studentSelect);
    studentSelected = student[selectedStudent.value - 1];
    console.log(studentSelected);
    removeChildNodes(yearSelect);
    removeChildNodes(schoolSelect);
    removeChildNodes(classSelect);
    removeChildNodes(subjectSelect);

    studentSelected.classStudents.forEach(c => {
        createSelectOption(c.class.year, c.class.year, yearSelect);
    })

    if (yearSelect.options.length < 2) {
        callSelectedYearRelatedFunctions();
    } else {
        sortSelect(yearSelect);
    }
    setSelectTitle("Ano", yearSelect);
    setSelectTitle("Escola", schoolSelect);
    setSelectTitle("Turma", classSelect);
    // setSelectTitle("Disciplina", subjectSelect);
}

const populateSchoolSelect = () => {

    const selectYear = getSelectedOption(yearSelect);
    removeChildNodes(schoolSelect);
    removeChildNodes(classSelect);
    removeChildNodes(subjectSelect);

    studentSelected.classStudents.forEach(c => {
        if (c.class.year == selectYear.value) {
            createSelectOption(c.class.school.id, c.class.school.name, schoolSelect);
        }
    })

    if (schoolSelect.options.length < 2) { // there is only one class
        callSelectedSchoolRelatedFunctions();
    } else {
        sortSelect(schoolSelect);
    }
}

const populateClassSelect = () => {
    const selectYear = getSelectedOption(yearSelect);
    const selectSchool = getSelectedOption(schoolSelect);
    removeChildNodes(classSelect);
    removeChildNodes(subjectSelect);

    studentSelected.classStudents.forEach(c => {
        if (c.class.year == selectYear.value && c.class.schoolId == selectSchool.value) {
            createSelectOption(c.id, c.class.grade + ' ' + c.class.code, classSelect);
        }
    })

    if (classSelect.options.length < 2) { // there is only one class
        classSelect.disabled = false;
        callSelectedClassRelatedFunctions();
    } else {
        sortSelect(classSelect);
    }
}

const populateSubjectSelect = () => {
    subjectSelect.disabled = false;
    removeChildNodes(subjectSelect);

    const classSelected = getSelectedOption(classSelect);

    studentSelected.lessons.forEach(lesson => {
        if (lesson.course.classId == classSelected.value) {
            createSelectOption(lesson.course.subject.id, lesson.course.subject.name, subjectSelect);
        }
    })

    if (subjectSelect.options.length < 2) { // there is only one class
        callSelectedSubjectRelatedFunctions();
    } else {
        sortSelect(subjectSelect);
    }
    
    sortSelect(subjectSelect);
    setSelectTitle("Todas as disciplinas", subjectSelect, false);
}

/**************** 
    DASHBOARD
****************/
const dashboard = () => {
    student.forEach(student => {
        const dashboard = document.createElement('div');
        const name = document.createElement('h1');
        name.innerHTML = student.name;

        let all = student.attendances.length;
        let present = 0;
        let absent = 0;
        let late = 0;
        for (attendance of student.attendances) {
            if (attendance.mark == 'present') {
                present++;
            } else if (attendance.mark == 'absent') {
                absent++
            } else if (attendance.mark == 'late') {
                late++
            }
        }
        const attendances = document.createElement('p');
        attendances.innerHTML = `Total de aulas: ${all}`;

        const presence = document.createElement('p');
        presence.innerHTML = `Total de presenças: ${present}`;

        const absence = document.createElement('p');
        absence.innerHTML = `Total de ausências: ${absent}`;

        const delay = document.createElement('p');
        delay.innerHTML = `Total de atrasos: ${late}`;

        dashboard.appendChild(name);
        dashboard.appendChild(attendances);
        dashboard.appendChild(presence);
        dashboard.appendChild(absence);
        dashboard.appendChild(delay);
        main.appendChild(dashboard);
    })
};