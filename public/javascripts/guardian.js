const endpoint = "http://localhost:3000/api/";

// NAV SELECTS
const studentSelect = document.getElementById("student");
const yearSelect = document.getElementById("year");
const schoolSelect = document.getElementById("school");
const classSelect = document.getElementById("class");
const subjectSelect = document.getElementById("subject");

// NAV BUTTONS
const btnNotific = document.getElementById("btn-notific");
const btnJustify = document.getElementById("btn-justify");
const navButtons = [btnNotific, btnJustify];

// MAIN
const main = document.querySelector('main')
const tableGeneral = document.querySelector('.general');
const tableSubject = document.querySelector('.subject');
const tbodyGeneral = document.querySelector('.tbodyGeneral');
const tbodySubject = document.querySelector('.tbodySubject');
const section = document.querySelector('section');
const sectionTitle = document.querySelector('section h2');
const teacherName = document.querySelector('.teacherName');
section.hidden = true;

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
    if (subjectSelect.value == '') {
        populateSubjectSelect();
    } else {
        subjectFilter();
    }
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
    const getStudent = getSelectedOption(studentSelect);
    studentSelected = student.find(s => s.id == getStudent.value)
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
            createSelectOption(c.class.code, c.class.grade + ' - Turma ' + c.class.code, classSelect);
        }
    })

    if (classSelect.options.length < 2) { // there is only one class
        classSelect.disabled = false;
        callSelectedClassRelatedFunctions();
    } else {
        sortSelect(classSelect);
    }
}

const populateSubjectSelect = async () => {
    tableGeneral.hidden = false;
    section.hidden = true;
    subjectSelect.disabled = false;
    btnNotific.disabled = false;
    removeChildNodes(subjectSelect);
    removeChildNodes(tbodyGeneral);

    const classSelected = getSelectedOption(classSelect);
    const classesIds = [];
    const subjectsIds = [];
    const subjects = [];
    /********************************************************************** */
    await fetch(`${endpoint}classes`)
        .then(res => res.json())
        .then(data => {
            let classes = data.filter(item => item.code == classSelected.value);
            classes.map(item => classesIds.push(item.id))
        })
        .catch(error => console.log(error))
    /********************************************************************** */
    await fetch(`${endpoint}courses`)
        .then(res => res.json())
        .then(data => {
            let courses = data.filter(item => classesIds.includes(item.classId));
            courses.map(item => subjectsIds.push(item.subjectId));
        })
        .catch(error => console.log(error))
    /********************************************************************** */
    await fetch(`${endpoint}subjects`)
        .then(res => res.json())
        .then(data => {
            subjectsIds.forEach(id => {
                subjects.push(data.find(item => item.id == id))
            })
        })
        .catch(error => console.log(error))
    /********************************************************************** */
    const studentEvaluations = studentSelected.studentEvaluations;
    const lessons = studentSelected.lessons;
    const attendances = studentSelected.attendances;

    subjects.forEach(subject => {
        createSelectOption(subject.id, subject.name, subjectSelect);

        let grade = 0;
        let maxGrade = 0;
        let nAttendances = 0;
        let nPresents = 0;

        lessons.map(lesson => {
            if (lesson.course.subject.id == subject.id) {

                studentEvaluations.map(student => {
                    if (student.evaluation.lessonId == lesson.id) {
                        grade += Number(student.grade);
                        maxGrade += Number(student.evaluation.maxGrade);
                    }
                })
                attendances.map(attendance => {
                    attendance.lessonId == lesson.id ? nAttendances++ : '';
                    attendance.lessonId == lesson.id && attendance.mark == 'present' ? nPresents++ : '';
                });
            }
        })
        let media = grade ? (grade * (10 / maxGrade)).toFixed(1) : 'N/A';
        let progress = grade ? (grade / maxGrade * 100).toFixed(1) : 0;
        let presence = nPresents ? (nPresents / nAttendances * 100).toFixed() : '';

        /********************************************************************** */
        createRowTableGeneral(subject.name, media, progress, `${presence}%`, '@');
    })

    if (subjectSelect.options.length < 2) {
        callSelectedSubjectRelatedFunctions();
    } else {
        sortSelect(subjectSelect);
    }
    setSelectTitle("Todas as disciplinas", subjectSelect, false);
}

const subjectFilter = async () => {
    tableGeneral.hidden = true;
    section.hidden = false;
    removeChildNodes(tbodySubject);

    /********************************************************************** */
    await fetch(`${endpoint}subjects`)
        .then(res => res.json())
        .then(data => {
            let subject = data.find(s => s.id == subjectSelect.value)
            sectionTitle.innerHTML = subject.name
        })
        .catch(error => console.log(error))
    /********************************************************************** */

    const studentEvaluations = studentSelected.studentEvaluations;
    const lessons = studentSelected.lessons;
    const attendances = studentSelected.attendances;

    let grade = 0;
    let maxGrade = 0;
    let nAttendances = 0;
    let nPresents = 0;

    lessons.map(lesson => {
        if (lesson.course.subject.id == subjectSelect.value) {

            studentEvaluations.map(student => {
                if (student.evaluation.lessonId == lesson.id) {
                    grade += Number(student.grade);
                    maxGrade += Number(student.evaluation.maxGrade);
                }
            })
            attendances.map(attendance => {
                attendance.lessonId == lesson.id ? nAttendances++ : '';
                attendance.lessonId == lesson.id && attendance.mark == 'present' ? nPresents++ : '';
            });
        }
    })
    let media = grade ? (grade * (10 / maxGrade)).toFixed(1) : 'N/A';
    let progress = grade ? (grade / maxGrade * 100).toFixed(1) : 0;
    let presence = nPresents ? (nPresents / nAttendances * 100).toFixed() : '';
    createRowTableSubject('Geral', media, progress, `${presence}%`, '@');

    /********************************************************************** */

    let academicTerms = studentSelected.classStudents[0].class.school.academicTerms;
    for (i = 1; i <= academicTerms; i++) {
        grade = 0;
        maxGrade = 0;
        nAttendances = 0;
        nPresents = 0;
        lessons.map(lesson => {

            if (lesson.course.subject.id == subjectSelect.value && lesson.academicTerm == i) {
                studentEvaluations.map(student => {
                    if (student.evaluation.lessonId == lesson.id) {
                        grade += Number(student.grade);
                        maxGrade += Number(student.evaluation.maxGrade);
                    }
                })
                attendances.map(attendance => {
                    attendance.lessonId == lesson.id ? nAttendances++ : '';
                    attendance.lessonId == lesson.id && attendance.mark == 'present' ? nPresents++ : '';
                });
            }
        })
        media = grade ? (grade * (10 / maxGrade)).toFixed(1) : 'N/A';
        progress = grade ? (grade / maxGrade * 100).toFixed(1) : 0;
        presence = nPresents ? (nPresents / nAttendances * 100).toFixed() : '';
        createRowTableSubject(`${i}º Bimestre`, media, progress, `${presence}%`, '@');
    }
}

// CREATE TABLE ROWS

const createRowTableGeneral = (subject, note, progress, presence, grafic) => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.innerHTML = subject;

    const tdNote = document.createElement('td');
    tdNote.innerHTML = note;

    const tdProgress = document.createElement('td');
    const divProgress = document.createElement('div');
    divProgress.classList.add('progress')
    const divProgressBar = document.createElement('div');
    divProgressBar.classList.add('progress-bar');
    divProgressBar.setAttribute('role', 'progressbar');
    divProgressBar.setAttribute('style', `width: ${progress}%`);
    divProgress.appendChild(divProgressBar);
    tdProgress.appendChild(divProgress);

    const tdPresense = document.createElement('td');
    tdPresense.innerHTML = presence;

    const tdGrafic = document.createElement('td');
    tdGrafic.innerHTML = grafic;

    tr.appendChild(th);
    tr.appendChild(tdNote);
    tr.appendChild(tdProgress);
    tr.appendChild(tdPresense);
    // tr.appendChild(tdGrafic);
    tbodyGeneral.appendChild(tr);
}

const createRowTableSubject = async (period, note, progress, presence, grafic) => {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.innerHTML = period;
    teacherName.innerHTML = `Professor(a):`;

    const tdNote = document.createElement('td');
    tdNote.innerHTML = note;

    const tdProgress = document.createElement('td');
    const divProgress = document.createElement('div');
    divProgress.classList.add('progress')
    const divProgressBar = document.createElement('div');
    divProgressBar.classList.add('progress-bar');
    divProgressBar.setAttribute('role', 'progressbar');
    divProgressBar.setAttribute('style', `width: ${progress}%`);
    divProgress.appendChild(divProgressBar);
    tdProgress.appendChild(divProgress);

    const tdPresense = document.createElement('td');
    tdPresense.innerHTML = presence;

    const tdGrafic = document.createElement('td');
    tdGrafic.innerHTML = grafic;

    tr.appendChild(th);
    tr.appendChild(tdNote);
    tr.appendChild(tdProgress);
    tr.appendChild(tdPresense);
    // tr.appendChild(tdGrafic);
    tbodySubject.appendChild(tr);    
}