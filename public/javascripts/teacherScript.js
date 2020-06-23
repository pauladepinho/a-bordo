const endpoint = "http://localhost:3000/api/";

// NAV SELECTS
const schoolSelect = document.getElementById("school");
const classSelect = document.getElementById("class");
const subjectSelect = document.getElementById("subject");
const termSelect = document.getElementById("term");

// NAV BUTTONS
const btnAttendanceSheet = document.getElementById("btn-attendance-sheet"); // form btn
const btnGradebook = document.getElementById("btn-gradebook"); // form btn
const btnRecords = document.getElementById("btn-records"); // reports btn
const btnStatistics = document.getElementById("btn-statistics"); // reports btn
const btnContact = document.getElementById("btn-contact"); // contact btn

const navButtons = [btnAttendanceSheet, btnGradebook, btnRecords, btnStatistics, btnContact];

// MAINS
const mainHome = document.getElementById("home");
const mainAttendanceSheet = document.getElementById("attendance-sheet");
const mainGradebook = document.getElementById("gradebook");
const mainRecordsBook = document.getElementById("record-book");
const mainStatistics = document.getElementById("statistics");

const mains = [mainHome, mainAttendanceSheet, mainGradebook, mainRecordsBook, mainStatistics];

// ELEMENTS IN MAIN...

// ...HOME
const ulStudents = document.getElementById("ul-students");

// ...ATTENDANCE SHEET
const formAttendanceSheet = document.getElementById("form-attendance-sheet");
const btnSubmitAttendanceSheet = document.getElementById("btn-submit-attendance-sheet");

const periodsSelect = document.getElementById("periods"); // attendance-related
const inputCourseId = document.getElementById("input-courseId");
const tbodyAttendanceSheet = document.getElementById("tbody-attendance-sheet");

const checkboxEvaluationDay = document.getElementById("evaluation-day"); // new-evaluation-related
const sectionSetEvaluation = document.getElementById("set-evaluation");
const divEvaluationInfo = document.getElementById("evaluation-info");

// ...GRADEBOOK
const formGradebook = document.getElementById("form-gradebook");
const btnSubmitGradebook = document.getElementById("btn-submit-gradebook");

const gradebookEvaluationSelect = document.getElementById("gradebook-evaluation-select");
const gradebookChart = document.getElementById("gradebook-chart");
const divContainer = document.getElementById("container");
const divInputFields = document.getElementById("input-fields");

const theadGradebook = document.getElementById("thead-gradebook");
const tbodyGradebook = document.getElementById("tbody-gradebook");

// ...RECORDS BOOK
const btnAttendances = document.getElementById("attendances");
const btnGrades = document.getElementById("grades");

const tableAttendances = document.getElementById("table-attendances");
const tableGrades = document.getElementById("table-grades");

const theadAttendancesRecords = document.getElementById("thead-attendances-table");
const tbodyAttendancesRecords = document.getElementById("tbody-attendances-table");

const theadGradesRecords = document.getElementById("thead-grades-table");
const tbodyGradesRecords = document.getElementById("tbody-grades-table");

const recordedGradesChart = document.getElementById("recorded-grades-chart");
const termsBarsContainer = document.getElementById("terms-bars-container");
const finalGradeBar = document.getElementById("final-grade-bar");




const colors = { present: "#30C1F9", late: "#FFCC33", absent: "#FE539B", success: "#30C1f9", warning: "#FE539B" };




window.addEventListener("load", () => fetchData());

// ELEMENTS IN NAV

schoolSelect.addEventListener("change", () => callSelectedSchoolRelatedFunctions());
classSelect.addEventListener("change", () => callSelectedClassRelatedFunctions());
subjectSelect.addEventListener("change", () => callSelectedSubjectRelatedFunctions());
termSelect.addEventListener("change", () => callSelectedTermRelatedFunctions());

btnAttendanceSheet.addEventListener("click", () => toggleMainVisibility(mainAttendanceSheet, btnAttendanceSheet)); // form btn
btnGradebook.addEventListener("click", () => toggleMainVisibility(mainGradebook, btnGradebook)); // form btn
btnRecords.addEventListener("click", () => toggleMainVisibility(mainRecordsBook, btnRecords)); // reports btn
btnStatistics.addEventListener("click", () => toggleMainVisibility(mainStatistics, btnStatistics)); // reports btn

// ELEMENTS IN MAIN...

// ...ATTENDANCE SHEET
formAttendanceSheet.addEventListener("submit", (evt) => confirmFormSubmition(evt));
periodsSelect.addEventListener("change", () => { populateAttendanceSheetWithMarks(); enableSubmitionButton(btnSubmitAttendanceSheet) });
checkboxEvaluationDay.addEventListener("change", () => createEvaluation());

// ...GRADEBOOK
formGradebook.addEventListener("submit", (evt) => confirmFormSubmition(evt, true));
gradebookEvaluationSelect.addEventListener("change", () => enableSelectedStudentGradeInputs());

// ...RECORDS BOOK
btnAttendances.addEventListener("mouseup", () => switchViewedTable(tableAttendances, btnAttendances));
btnGrades.addEventListener("mouseup", () => switchViewedTable(tableGrades, btnGrades));

// ...STATISTICS





// DATABASE DATA FROM API

let teacher = {};
let classes = [];
let course = {};
let lessons = [];
let termEvaluations = [];


const fetchData = () => {
    const userId = document.getElementById("userId").value;
    fetch(`${endpoint}teacher/user/${userId}`)
        .then(res => res.json())
        .then(data => {
            teacher = data;
            classes = data.classes;
            populateSchoolSelect();
        })
        .catch(error => console.log(error))
};

const fetchCourseLessonsAndEvaluations = async () => {
    const teacherId = teacher.id;
    const subjectId = getSelectedOption(subjectSelect).value;
    const classId = getSelectedOption(classSelect).value;
    await fetch(`${endpoint}lessons/teacher/${teacherId}/subject/${subjectId}/class/${classId}`)
        .then(res => res.json())
        .then(course => {
            course = course;
            lessons = course.lessons;

            // ATTENDANCE SHEET NECESSARY DATA
            inputCourseId.value = course.id;

            getTermEvaluations(); // if a term is selected

            populateTHead(theadAttendancesRecords);
            populateTHead(theadGradesRecords);

            populateTbody(tbodyAttendancesRecords);
            populateTbody(tbodyGradesRecords);
            setRecordedGradesChart();
        })
        .catch(error => console.log(error))
};

const getTermEvaluations = () => {
    termEvaluations = [];
    const selectedTerm = getSelectedOption(termSelect).value;
    if (!selectedTerm) { return; }
    lessons.forEach(lesson => {
        if (lesson.academicTerm == selectedTerm && lesson.evaluations.length) {
            termEvaluations.push(lesson.evaluations);
        }
    });
    setGradebookChart();
    populateTHead(theadGradebook);
    populateTbody(tbodyGradebook);
    populateGradebookEvaluationSelect();
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

const setSelectTitle = (title, select) => { // must be called only after other select options are created
    const option = document.createElement("option");
    option.value = "";
    option.innerText = title;
    option.disabled = true;
    if (select.options.length != 1) { // else, if select has only one available enabled option, that option will be automatically selected
        option.selected = true;
    }
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

const callSelectedSchoolRelatedFunctions = () => {
    // order of functions matters
    disableNavReportsAndContactBtns();
    disableNavFormsBtns();
    removeEvaluationFromAttendanceSheet();

    toggleMainVisibility(mainHome);
    populateTermSelect();
    populateClassSelect();
};

const callSelectedClassRelatedFunctions = () => {
    populateSubjectSelect();

    toggleMainVisibility(mainStatistics, btnStatistics);
    listStudents(); // main home

    populateTbody(tbodyAttendancesRecords);
    populateTbody(tbodyGradesRecords);
    setRecordedGradesChart();

    populateTbody(tbodyAttendanceSheet);
    populateTbody(tbodyGradebook);

    removeEvaluationFromAttendanceSheet();
};

const callSelectedSubjectRelatedFunctions = () => {
    enableTermSelect();
    enableNavReportsAndContactBtns();
    fetchCourseLessonsAndEvaluations(); // calls important functions
    removeEvaluationFromAttendanceSheet();
};

const callSelectedTermRelatedFunctions = () => {
    enableNavFormsBtns();
    removeEvaluationFromAttendanceSheet();
    getTermEvaluations(); // calls important functions
};



// POPULATE NAV SELECTS

const populateSchoolSelect = () => {
    classes.forEach(c => {
        createSelectOption(c.school.id, c.school.name, schoolSelect);
    });
    if (schoolSelect.options.length < 2) { // there is only one school
        callSelectedSchoolRelatedFunctions();
    } else {
        sortSelect(schoolSelect);
        setSelectTitle("Turma", classSelect);
    }
    setSelectTitle("Escola", schoolSelect);
    setSelectTitle("Disciplina", subjectSelect);
    setSelectTitle("Etapa", termSelect);
}

const populateClassSelect = () => { // when a school is selected
    const selectedSchool = getSelectedOption(schoolSelect);
    removeChildNodes(classSelect);
    removeChildNodes(ulStudents);
    if (subjectSelect.disabled == false) { // another class had already been selected
        removeChildNodes(subjectSelect);
        setSelectTitle("Disciplina", subjectSelect);
        subjectSelect.disabled = true;
        termSelect.disabled = true;
        disableNavReportsAndContactBtns();
    }
    classes.forEach(c => {
        if (selectedSchool.innerText == c.school.name) {
            createSelectOption(c.id, c.code, classSelect);
        }
    });
    if (classSelect.options.length < 2) { // there is only one class
        callSelectedClassRelatedFunctions();
    } else {
        sortSelect(classSelect);
    }
    setSelectTitle("Turma", classSelect);
    classSelect.disabled = false;
};

const populateSubjectSelect = () => { // when a class is selected
    const selectedClass = getSelectedOption(classSelect);
    removeChildNodes(subjectSelect);
    classes.forEach(c => {
        if (selectedClass.value == c.id) {
            const subjects = c.subjects;
            subjects.forEach(s => {
                createSelectOption(s.id, s.name, subjectSelect);
            });
        }
    });
    if (subjectSelect.options.length < 2) {  // there is only one subject
        callSelectedSubjectRelatedFunctions();
    }
    else {
        termSelect.disabled = true;
        sortSelect(subjectSelect);
    }
    setSelectTitle("Disciplina", subjectSelect);
    subjectSelect.disabled = false;
};

const populateTermSelect = () => { // when a school is selected
    const selectedSchool = getSelectedOption(schoolSelect);
    removeChildNodes(termSelect);
    let yearDivision;
    classes.forEach(c => {
        if (selectedSchool.innerText == c.school.name) {
            const numberOfterms = c.school.academicTerms;
            yearDivision = numberOfterms == 3 ? "Trimestre" : "Bimestre";
            for (let i = 1; i <= numberOfterms; i++) {
                createSelectOption(i, `${i + "º " + yearDivision.toLowerCase()}`, termSelect);
            }
        }
    });
    sortSelect(termSelect);
    setSelectTitle(yearDivision, termSelect);
    termSelect.disabled = true;

    // removeEvaluationFromAttendanceSheet();
};

const enableTermSelect = () => { // when a subject is selected
    if (termSelect.disabled) {
        termSelect.disabled = false;
    }
};

// TOGGLE NAV BUTTONS

const enableNavReportsAndContactBtns = () => {
    btnRecords.disabled = false;
    btnStatistics.disabled = false;
    btnContact.disabled = false;
};
const disableNavReportsAndContactBtns = () => {
    btnRecords.disabled = true;
    btnStatistics.disabled = true;
    btnContact.disabled = true;
};

const enableNavFormsBtns = () => {
    btnAttendanceSheet.disabled = false;
    btnGradebook.disabled = false;
};
const disableNavFormsBtns = () => {
    btnAttendanceSheet.disabled = true;
    btnGradebook.disabled = true;
};




const hideDropDownMenu = (dropdownMenu) => {
    dropdownMenu.hidden = true;
};

/*************** 
    ALL MAINS
***************/

const toggleMainVisibility = (main, navButton) => {
    if (main.hidden) {
        mains.forEach(main => main.hidden = true);
        main.hidden = false;
        navButtons.forEach(btn => btn.classList.remove("selected"));
        if (navButton && !navButton.classList.contains("selected")) {
            navButton.classList.add("selected");
        }
    }
};

/**************** 
    MAIN HOME
****************/

const listStudents = () => {
    const selectedClass = getSelectedOption(classSelect);
    removeChildNodes(ulStudents);
    classes.forEach(c => {
        if (c.id == selectedClass.value) {
            const students = c.students;
            students.forEach(student => {
                if (student.name) {
                    const li = document.createElement("li");
                    li.innerText = student.name;
                    ulStudents.append(li);
                }
            });
        }
    });

    document.getElementById("dashboard").hidden = true;
};

/********************
    MAINS' TABLES
********************/

// TABLE HEAD

const populateTHead = (thead) => {

    removeChildNodes(thead);

    const row = document.createElement("tr");

    const studentNumber = document.createElement("th");
    studentNumber.className = "student-number";
    studentNumber.innerText = "Nº";

    const studentName = document.createElement("th");
    studentName.className = "student-name";
    studentName.innerText = "ALUNO";

    row.prepend(studentNumber, studentName);
    thead.append(row);

    switch (thead) {
        case theadGradebook:
            populateTheadGradebook(row);
            break;
        case theadAttendancesRecords:
            populateTheadAttendancesRecords(row);
            break;
        case theadGradesRecords:
            populateTheadGradesRecords(row);
            break;
        default:
            console.log("thead", thead);
    }
};

const populateTheadGradebook = (row) => {
    termEvaluations.forEach(eval => {
        const th = document.createElement("th");
        th.classList.add("evaluation", `evaluation${eval[0].id}`);

        const label = document.createElement("label");
        label.className = "title";
        label.innerText = eval[0].title;
        label.style.color = eval[0].color;
        label.style.fontWeight = 500;

        th.append(label);
        row.append(th);
    });

    const notEval = document.createElement("th");
    notEval.className = "not-evaluated";
    notEval.id = "not-evaluated-header"
    notEval.innerText = "N/A";

    const term = getSelectedOption(termSelect).value
    const avg = createAverageGradeTh(term);

    row.append(notEval, avg);
};

const populateTheadAttendancesRecords = (row) => {

    const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    let thereWasAnEntry = false;

    lessons.forEach(lesson => {

        thereWasAnEntry = true;

        const date = new Date(lesson.date);
        const weekDay = weekDays[date.getDay()].toUpperCase().substr(0, 3);
        const day = date.getDate();
        const month = date.getMonth() + 1;

        const th = document.createElement("th");
        th.innerText = `${weekDay}.`;

        const div = document.createElement("div");
        div.innerText = `${day}/${month}`;
        th.append(div);

        row.append(th);
    });
    if (thereWasAnEntry) {
        const presences = document.createElement("th");
        presences.innerText = "P";
        presences.style.color = "white";
        presences.style.fontWeight = 700;
        presences.style.backgroundColor = colors.present;

        let percentage = document.createElement("div");
        percentage.innerText = "(em %)";
        presences.append(percentage);

        const absences = document.createElement("th");
        absences.innerText = "F";
        absences.style.color = "white";
        absences.style.fontWeight = 700;
        absences.style.backgroundColor = colors.absent;

        percentage = document.createElement("div");
        percentage.innerText = "(em %)";
        absences.append(percentage);

        const latenesses = document.createElement("th");
        latenesses.innerText = "A";
        latenesses.style.color = "white";
        latenesses.style.fontWeight = 700;
        latenesses.style.backgroundColor = colors.late;

        percentage = document.createElement("div");
        percentage.innerText = "(em %)";
        latenesses.append(percentage);

        row.insertBefore(presences, row.children[2]);
        row.insertBefore(absences, row.children[3]);
        row.insertBefore(latenesses, row.children[4]);
    }
};

const populateTheadGradesRecords = (row) => {
    const schoolId = getSelectedOption(schoolSelect).value;
    const schoolMaxGrade = getSelectedSchoolMaxGrade();
    let academicTerms;
    classes.forEach(c => {
        if (c.school.id == schoolId) {
            academicTerms = c.school.academicTerms;
        }
    });
    let thereWasAnyEntryAtAll = false;

    for (let term = 1; term <= academicTerms; term++) {

        let evalThisTerm = false; // teacher didn't fill student's grade input field

        lessons.forEach(lesson => {

            if (lesson.evaluations.length && lesson.academicTerm == term) {

                thereWasAnyEntryAtAll = true;
                evalThisTerm = true;

                const title = lesson.evaluations[0].title;
                const evalMaxGrade = Number(lesson.evaluations[0].maxGrade) % 1 == 0 ?
                    Number(lesson.evaluations[0].maxGrade).toFixed(0) :
                    Number(lesson.evaluations[0].maxGrade);

                const color = lesson.evaluations[0].color;

                const th = document.createElement("th");
                th.innerText = title;
                th.style.color = color;
                th.style.fontWeight = 500;

                const div = document.createElement("div");
                div.innerText = `val. ${evalMaxGrade} pts.`

                th.append(div);
                row.append(th);
            }
        });
        if (evalThisTerm) {
            const avg = createAverageGradeTh(term);

            const div = document.createElement("div");
            div.innerText = `val. ${schoolMaxGrade} pts.`;

            avg.append(div);
            row.append(avg);
        }
    }
    if (thereWasAnyEntryAtAll) {
        const finalGrade = document.createElement("th");
        // finalGrade.innerText = "RESULTADO";
        finalGrade.innerText = "RESULT. PARCIAL";
        // finalGrade.style.backgroundColor = "rgba(48, 193, 249, 0.2)";
        finalGrade.style.backgroundColor = "rgba(249, 95, 47, 0.2)";

        const div = document.createElement("div");
        div.innerText = `val. ${schoolMaxGrade} pts.`

        finalGrade.append(div);
        row.insertBefore(finalGrade, row.children[2]);
    };
}

const createAverageGradeTh = (term) => {
    const termType = defineTermType();
    const avg = document.createElement("th");
    avg.innerText = `NOTA`;
    avg.style.backgroundColor = "rgba(48, 193, 249, 0.2)";

    const div = document.createElement("div");
    div.innerText = `${term + termType}`;

    avg.append(div);
    return avg;
}

// TABLE BODY

const populateTbody = (tbody) => {
    const selectedClass = getSelectedOption(classSelect);
    removeChildNodes(tbody);
    classes.forEach(c => {
        if (c.id == selectedClass.value) {
            const students = c.students;
            students.forEach(student => {
                if (student.name) {
                    populateTbodyWithStudents(student, tbody);
                }
            });
        }
    });
    if (termEvaluations.length) { gradebookChart.hidden = false; }
    else { gradebookChart.hidden = true; }

    switch (tbody) {
        case tbodyGradebook:
            populateTbodyGradebook();
            break;
        case tbodyAttendancesRecords:
            populateTbodyAttendancesRecords();
            break;
        case tbodyGradesRecords:
            populateTbodyGradesRecords();
            break;
        default:
        // tbodyAttendanceSheet
    }
};

const populateTbodyWithStudents = (student, tbody) => {
    const tr = document.createElement("tr");

    const number = document.createElement("td");
    number.className = "student-number";
    number.innerText = student.number.number;

    const name = document.createElement("td");
    name.id = student.id;
    name.className = "student-name";
    name.innerText = student.name;

    tbody.append(tr);
    tr.append(number, name);
};

const populateTbodyGradebook = () => {
    const rows = tbodyGradebook.childNodes;
    const schoolMaxGrade = getSelectedSchoolMaxGrade();
    const passGrade = getSelectedSchoolPassingGrade();

    rows.forEach(row => {
        const studentId = row.childNodes[1].id;

        let totalPossiblePoints = null;
        let termAchievedGrades = [];

        termEvaluations.forEach(eval => {

            let grade;

            eval[0].studentsGrades.forEach(studentEval => {
                if (studentEval.studentId == studentId) {

                    totalPossiblePoints += Number(eval[0].maxGrade);

                    if (studentEval.evaluated == 1) {
                        grade = Number(studentEval.grade);
                        termAchievedGrades.push(grade);
                    }
                    else {
                        grade = "N/A";
                        termAchievedGrades.push(0);
                    }
                }
            });
            // STUDENT GRADES INPUTS
            const td = document.createElement("td");
            td.className = "evaluation";

            const input = createGradeInput(eval[0].maxGrade);
            input.classList.add("grade", `student${studentId}`, `evaluation${eval[0].id}`);
            input.name = `student${studentId}-evaluation${eval[0].id}`;
            input.placeholder = "Nota";
            if (grade == "N/A") {
                input.type = "text";
                input.addEventListener("keydown", (evt) => { if (input.type == "text") { evt.preventDefault() } });
            }
            input.value = grade;
            input.disabled = true;

            td.append(input);
            row.append(td);

            input.addEventListener("change", () => {
                enableSubmitionButton(btnSubmitGradebook);
                updateAverageGrade(studentId, schoolMaxGrade, passGrade, row);
            });
        });
        // NOT EVALUATED CHECKBOX
        const notEval = document.createElement("td");
        notEval.className = "not-evaluated";

        const label = document.createElement("label");
        label.className = "checkbox-container";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("not-evaluated", `student${studentId}`);
        checkbox.disabled = true;

        const checkmark = document.createElement("span");
        checkmark.className = "checkmark";

        // AVERAGE GRADE
        const avg = createAverageGrade(totalPossiblePoints, termAchievedGrades, schoolMaxGrade, passGrade);
        avg.classList.add(`student${studentId}`);

        label.append(checkbox, checkmark);
        notEval.append(label);
        row.append(notEval, avg);

        checkbox.addEventListener("change", () => markAsNotEvaluated(checkbox, `input.grade.student${studentId}`));
    });
};

const populateTbodyAttendancesRecords = () => {
    const rows = tbodyAttendancesRecords.childNodes;
    let thereWasAnEntry = false;

    rows.forEach(row => {
        const studentId = row.childNodes[1].id;
        let presenceCount = 0;
        let absentCount = 0;
        let lateCount = 0;
        let marksCount = 0;

        lessons.forEach(lesson => {
            const td = document.createElement("td");
            const div = document.createElement("div");
            div.className = "attendance";
            td.append(div);

            lesson.attendances.forEach(attendance => {

                thereWasAnEntry = true;

                if (attendance.studentId == studentId) {
                    const span = document.createElement("span");
                    span.className = attendance.mark;
                    switch (attendance.mark) {
                        case "present":
                            span.innerText = "P";
                            presenceCount++;
                            break;
                        case "absent":
                            span.innerText = "F";
                            absentCount++;
                            break;
                        case "late":
                            span.innerText = "A";
                            lateCount++;
                            break;
                        default:
                    }
                    div.append(span);
                    marksCount++;
                }
            });
            row.append(td);
        });
        if (thereWasAnEntry) {
            const presences = document.createElement("td");
            let pieChart = createPieChart(presenceCount / marksCount, colors.present, `${(presenceCount / marksCount * 100).toFixed()}`);
            presences.append(pieChart);
            presences.style.backgroundColor = "rgba(48, 193, 249, 0.2)";

            const absences = document.createElement("td");
            pieChart = createPieChart(absentCount / marksCount, colors.absent, `${(absentCount / marksCount * 100).toFixed()}`);
            absences.append(pieChart);
            absences.style.backgroundColor = "rgba(254, 83, 155, 0.2)";

            const latenesses = document.createElement("td");
            pieChart = createPieChart(lateCount / marksCount, colors.late, `${(lateCount / marksCount * 100).toFixed()}`);
            latenesses.append(pieChart);
            latenesses.style.backgroundColor = "rgba(255, 204, 51, 0.2)";

            row.insertBefore(presences, row.children[2]);
            row.insertBefore(absences, row.children[3]);
            row.insertBefore(latenesses, row.children[4]);
        }
    });
};

const populateTbodyGradesRecords = () => {

    const rows = tbodyGradesRecords.childNodes;
    rows.forEach(row => {
        const studentId = row.childNodes[1].id;

        const schoolId = getSelectedOption(schoolSelect).value;
        const schoolMaxGrade = getSelectedSchoolMaxGrade();
        const passGrade = getSelectedSchoolPassingGrade();

        let achievedGrades = [];
        let qntOfTermsWithGradedEval = 0;
        let academicTerms;
        classes.forEach(c => {
            if (c.school.id == schoolId) { academicTerms = c.school.academicTerms; }
        });

        let thereWasAnyEntryAtAll = false;

        for (let term = 1; term <= academicTerms; term++) {

            let evalThisTerm = false; // teacher didn't fill up student's grade input field
            let totalPossiblePoints = null;
            let termAchievedGrades = [];

            lessons.forEach(lesson => {
                if (lesson.evaluations.length && lesson.academicTerm == term) {

                    evalThisTerm = true;
                    let thereWasAnEntry = false; // teacher didn't fill student's grade input field

                    const studentsEvaluations = lesson.evaluations[0].studentsGrades;
                    if (studentsEvaluations.length) {
                        for (let i = 0; i < studentsEvaluations.length; i++) {
                            if (studentsEvaluations[i].studentId == studentId) {

                                const maxGrade = Number(lesson.evaluations[0].maxGrade);
                                const grade = Number(studentsEvaluations[i].grade) % 1 == 0 ?
                                    Number(studentsEvaluations[i].grade).toFixed(0) :
                                    Number(studentsEvaluations[i].grade);

                                thereWasAnEntry = true;
                                totalPossiblePoints += maxGrade;
                                termAchievedGrades.push(grade);

                                const td = document.createElement("td"); // must be created inside of the if statement
                                td.className = "recorded-grade";

                                const normalizedGrade = grade / maxGrade;
                                const color = lesson.evaluations[0].color;
                                const text = studentsEvaluations[i].evaluated == 1 ? grade : "N/A";

                                const pieChart = createPieChart(normalizedGrade, color, text);

                                td.append(pieChart);
                                row.append(td);
                            }
                            else if (i == studentsEvaluations.length - 1 && !thereWasAnEntry) { // this student's evaluation has not been graded yet, although others may have
                                const td = document.createElement("td");
                                td.className = "recorded-grade";
                                td.innerText = "-";
                                row.append(td);
                            }
                        }
                    } else { // there is an evaluation, but no student has been graded yet
                        const td = document.createElement("td");
                        td.className = "recorded-grade";
                        td.innerText = "-";
                        row.append(td);
                    }
                }
            });
            if (evalThisTerm) { // calculate the average for this term
                const avg = createAverageGrade(totalPossiblePoints, termAchievedGrades, schoolMaxGrade, passGrade);
                row.append(avg);

                thereWasAnyEntryAtAll = true; // teacher graded at least one student this academic year

                if (avg.innerText != "-") {
                    const termAvgGrade = Number(avg.childNodes[0].childNodes[2].innerText);
                    achievedGrades.push(termAvgGrade);

                    qntOfTermsWithGradedEval++;
                }
            }
        }
        if (thereWasAnyEntryAtAll) {
            const totalPossiblePoints = schoolMaxGrade * qntOfTermsWithGradedEval;
            const finalGrade = createAverageGrade(totalPossiblePoints, achievedGrades, schoolMaxGrade, passGrade);
            finalGrade.style.backgroundColor = "rgba(249, 95, 47, 0.1)";
            row.insertBefore(finalGrade, row.children[2]);
        }
    });
};

const createAverageGrade = (totalPossiblePoints, achievedGrades, schoolMaxGrade, passGrade) => {
    const avg = document.createElement("td");
    avg.className = "recorded-grade";
    avg.style.backgroundColor = "rgba(48, 193, 249, 0.2)";

    if (totalPossiblePoints != null && achievedGrades.length) {

        let normalizedGrade = 0;
        achievedGrades.forEach(grade => {
            normalizedGrade += (grade / totalPossiblePoints);
        });
        const avgGrade = Number(normalizedGrade * schoolMaxGrade);

        const color = avgGrade >= passGrade ? colors.success : colors.warning;
        const text = schoolMaxGrade == 100 && avgGrade % 1 == 0 ? avgGrade.toFixed(0) : avgGrade.toFixed(1);

        const pieChart = createPieChart(normalizedGrade, color, text);
        avg.append(pieChart);
    }
    else { avg.innerText = "-"; }

    return avg;
};

const updateAverageGrade = (studentId, schoolMaxGrade, passGrade, row) => {

    const inputsStudentGrades = document.getElementsByClassName(`student${studentId}`);
    const inputsStudentGradesArray = [...inputsStudentGrades];

    let avg = inputsStudentGradesArray.pop();

    inputsStudentGradesArray.pop(); // exclude checkbox input

    let termAchievedGrades = [];

    for (let i = 0; i < inputsStudentGradesArray.length; i++) {
        const input = inputsStudentGradesArray[i];
        const value = input.value;

        if (input.type == "number" && value) {
            termAchievedGrades.push(value);
        }
        else if (input.type == "text") { // N/A
            termAchievedGrades.push(0);
        }
    }
    let totalPossiblePoints = null;
    const inputsMaxGrades = document.getElementsByClassName("max-grade");
    [...inputsMaxGrades].forEach(inputMaxGrade => {
        totalPossiblePoints += inputMaxGrade.valueAsNumber;
    });

    avg.remove();

    avg = createAverageGrade(totalPossiblePoints, termAchievedGrades, schoolMaxGrade, passGrade);
    avg.classList.add(`student${studentId}`);

    row.append(avg);
};

/**** MAINS WITH FORMS */

const confirmFormSubmition = (evt, isGradebook) => {
    const res = confirm("Tem certeza que deseja salvar as alterações?");
    if (!res) {
        evt.preventDefault();
    }
    else if (isGradebook) {
        enableAllStudentGradeInputs();
    }
};

const enableSubmitionButton = (submitBtn) => {
    if (submitBtn.disabled) { submitBtn.disabled = false };
};

/**************************** 
    MAIN ATTENDANCE SHEET
****************************/

/**** ATTENDANCE ****/

const populateAttendanceSheetWithMarks = () => {

    const selected = getSelectedOption(periodsSelect);
    const numberOfPeriods = selected.value;

    const rows = tbodyAttendanceSheet.childNodes;
    rows.forEach(row => {
        const tds = row.childNodes;
        if (tds.length == 3) {
            tds[2].remove();
        }
    });
    for (let student = 0; student < rows.length; student++) {

        const tdAttendanceCheck = document.createElement("td");
        tdAttendanceCheck.className = "attendance-check";
        rows[student].append(tdAttendanceCheck);

        const studentId = rows[student].childNodes[1].id;

        for (let period = 1; period <= numberOfPeriods; period++) {

            const divAttendanceCheck = document.createElement("div");
            divAttendanceCheck.className = "attendance-check";
            tdAttendanceCheck.append(divAttendanceCheck);

            const inputNameAttr = `attendance_student${studentId}-period${period}`;

            createAttendanceMark("present", "PRESENTE", inputNameAttr, "present", divAttendanceCheck);
            createAttendanceMark("absent", "FALTOU", inputNameAttr, "absent", divAttendanceCheck);
            createAttendanceMark("late", "ATRASADO", inputNameAttr, "late", divAttendanceCheck);
        }
    }

};

const createAttendanceMark = (className, innerText, name, value, divAttendanceCheck) => {
    const label = document.createElement("label");
    label.className = className;
    label.innerText = innerText;

    const input = document.createElement("input");
    input.type = "checkbox";
    input.name = name;
    input.value = value;
    input.required = true;

    divAttendanceCheck.append(label);
    label.append(input);

    input.addEventListener("change", () => checkAttendance(input));
};

const checkAttendance = (input) => {

    const label = input.parentNode;
    const div = label.parentNode;

    if (input.checked) {
        [...div.childNodes].forEach(label => {
            label.hidden = true;
            label.childNodes[1].required = false; // hidden inputs cannot required
        });
        label.hidden = false;
        label.style.width = "36px";
        input.required = true;

        const text = label.innerText;
        label.innerText = text.charAt(0);
        label.append(input);

    } else {
        [...div.childNodes].forEach(label => label.hidden = false);
        label.style.width = "132px";

        const text = label.innerText;
        if (text == "P") {
            label.innerText = "PRESENTE";
            label.append(input);
        } else if (text == "F") {
            label.innerText = "FALTOU";
            label.append(input);
        } else if (text == "A") {
            label.innerText = "ATRASADO";
            label.append(input);
        }
    }
};

/**** NEW EVALUATION ****/

const removeEvaluationFromAttendanceSheet = () => {
    sectionSetEvaluation.style.marginTop = "0";
    sectionSetEvaluation.style.marginBottom = "0";
    sectionSetEvaluation.style.backgroundColor = "";
    removeChildNodes(divEvaluationInfo);

    if (checkboxEvaluationDay.checked) {
        checkboxEvaluationDay.checked = false;
    }
};

const createEvaluation = async () => {
    if (!checkboxEvaluationDay.checked) {
        removeEvaluationFromAttendanceSheet();
    } else {
        let evaluationsCount = 0;
        const term = getSelectedOption(termSelect).value;
        lessons.forEach(lesson => {
            if (lesson.academicTerm == term && lesson.evaluations.length) {
                evaluationsCount++;
            }
        });
        sectionSetEvaluation.style.marginTop = "0.75rem";
        sectionSetEvaluation.style.marginBottom = "0.75rem";
        sectionSetEvaluation.style.backgroundColor = "#B6ECFD";

        /**** CREATE ELEMENTS ****/

        // EVALUATION TITLE
        const evalTitle = document.createElement("input");
        evalTitle.type = "text";
        evalTitle.name = "evaluation-title";
        evalTitle.className = "eval-data";
        evalTitle.value = `Aval. ${evaluationsCount + 1}`;
        evalTitle.required = true;

        // EVALUATION COLOR
        const colorBox = createColorBox();

        // EVALUATION TYPE
        const evalType = document.createElement("select");
        evalType.name = "evaluation-type";
        evalType.className = "eval-data";
        evalType.required = true;

        createSelectOption("Prova", "Prova", evalType);
        createSelectOption("Teste", "Teste", evalType);
        createSelectOption("Trabalho", "Trabalho", evalType);
        setSelectTitle("Tipo", evalType);

        // EVALUATION VALUE
        const evalValue = createGradeInput();
        evalValue.className = "eval-data";
        evalValue.name = "evaluation-value";
        evalValue.placeholder = "Valor máx.";
        evalValue.required = true;

        /**** APPEND ELEMENTS ****/

        divEvaluationInfo.append(evalTitle, colorBox, evalType, evalValue);
    }
};

const createColorBox = () => {

    const colors = {
        blue: "#54A2EB", // selected by default
        pink: "#FF92AA", yellow: "#FAE155", violet: "#C979FB", orange: "#FFAC60", green: "#41E5AA"
    };

    // CREATE ELEMENTS
    const colorBox = document.createElement("div");
    colorBox.className = "eval-data";
    colorBox.id = "color-box"

    const evalColor = document.createElement("input");
    evalColor.type = "text";
    evalColor.name = "evaluation-color";
    evalColor.value = colors.blue;
    evalColor.hidden = true;
    evalColor.required = true;

    const selectedColor = document.createElement("div");
    selectedColor.id = "selected-color";
    selectedColor.style.backgroundColor = colors.blue;

    const colorPicker = document.createElement("div");
    colorPicker.id = "color-picker";
    colorPicker.hidden = true;

    for (color in colors) {
        createColorOption(colors[color], colorPicker, selectedColor, evalColor);
    }
    colorPicker.firstChild.classList.add("selected");

    // APPEND ELEMENTS
    colorBox.append(evalColor, selectedColor, colorPicker);
    // LISTEN TO EVENT
    colorBox.addEventListener("mousedown", () => toggleColorPicker(colorPicker));
    colorBox.addEventListener("mouseleave", () => hideDropDownMenu(colorPicker));
    // RETURN
    return colorBox;
};

const createColorOption = (color, colorPicker, selectedColor, evalColor) => {
    const divColorOption = document.createElement("div");
    divColorOption.className = "color-option";
    divColorOption.style.backgroundColor = color;

    colorPicker.append(divColorOption);
    divColorOption.addEventListener("mousedown", () => selectColor(divColorOption, color, colorPicker, selectedColor, evalColor));
};

const selectColor = (divColorOption, color, colorPicker, selectedColor, evalColor) => {

    [...colorPicker.childNodes].forEach(div => {
        if (div.classList.contains("selected")) {
            div.classList.remove("selected");
        }
    });
    divColorOption.classList.add("selected");
    selectedColor.style.backgroundColor = color;
    evalColor.value = color;
};

const toggleColorPicker = (colorPicker) => {
    if (colorPicker.hidden) { colorPicker.hidden = false; }
    else { colorPicker.hidden = true; }
};

const createGradeInput = (evalMaxGrade) => {
    const input = document.createElement("input");
    input.type = "number";

    const schoolMaxGrade = getSelectedSchoolMaxGrade(); // 100 or 10
    input.step = 0.05 * schoolMaxGrade;
    if (evalMaxGrade) { // input for student grade
        input.min = 0;
        input.max = evalMaxGrade;
    }
    else { // input for evaluation maximum grade
        input.min = 0.05 * schoolMaxGrade; // 5 or 0.5
        input.max = schoolMaxGrade;
    }
    return input;
};

const getSelectedSchoolPassingGrade = () => {
    const schoolId = getSelectedOption(schoolSelect).value;
    let passingGrade;
    for (let i = 0; i < classes.length; i++) {
        if (schoolId == classes[i].school.id) {
            const school = classes[i].school;
            passingGrade = school.passingGrade;
        }
    }
    return passingGrade;
};

const getSelectedSchoolMaxGrade = () => {
    const passingGrade = getSelectedSchoolPassingGrade();
    let schoolMaxGrade;

    switch (passingGrade % 10) { // 70 % 10 == 0 // 7 % 10 != 0
        case 0:
            schoolMaxGrade = 100;
            break;
        default:
            schoolMaxGrade = 10;
    }
    return schoolMaxGrade;
};

const getSelectedSchoolAcademicTerms = () => {
    const schoolId = getSelectedOption(schoolSelect).value;
    let academicTerms;
    for (let i = 0; i < classes.length; i++) {
        if (schoolId == classes[i].school.id) {
            const school = classes[i].school;
            academicTerms = school.academicTerms;
        }
    }
    return academicTerms;
};

const defineTermType = () => {
    const academicTerms = getSelectedSchoolAcademicTerms();
    switch (academicTerms) {
        case 4:
            return "º bimestre";
        case 3:
            return "º trimestre";
        default:
    }
}

/*********************
    MAIN GRADEBOOK
*********************/

const populateGradebookEvaluationSelect = () => {
    removeChildNodes(gradebookEvaluationSelect);
    termEvaluations.forEach(eval => {
        createSelectOption(eval[0].id, eval[0].title, gradebookEvaluationSelect);
    });
    if (gradebookEvaluationSelect.options.length == 1) { // there is only one evaluation
        enableSelectedStudentGradeInputs();
    } else {
        sortSelect(gradebookEvaluationSelect);
    }
    setSelectTitle("Selecione uma avaliação", gradebookEvaluationSelect);

    const optionDivider = document.createElement("option");
    optionDivider.value = "";
    optionDivider.innerText = "•-•-•-•-•";
    optionDivider.disabled = true;

    const optionAdd = document.createElement("option");
    optionAdd.value = "add";
    optionAdd.innerText = "Adicionar uma nova avaliação";

    const optionDel = document.createElement("option");
    optionDel.value = "del";
    optionDel.innerText = "Excluir avaliação selecionada";

    gradebookEvaluationSelect.append(optionDivider, optionAdd, optionDel);
};

const enableSelectedStudentGradeInputs = () => {
    const allGradeInputs = document.querySelectorAll("input.grade");
    allGradeInputs.forEach(input => input.disabled = true);

    const selectedEvaluation = getSelectedOption(gradebookEvaluationSelect);
    const gradeInputs = document.querySelectorAll(`input.evaluation${selectedEvaluation.value}`);
    gradeInputs.forEach(input => input.disabled = false);

    const notEvalCheckbokes = document.querySelectorAll("input.not-evaluated");
    notEvalCheckbokes.forEach(checkbox => {
        checkbox.disabled = false;
        if (checkbox.checked) { checkbox.checked = false; }
    });

    gradeInputs.forEach(input => {
        if (input.value == "N/A") {
            const checkbox = document.querySelector(`input.not-evaluated.${input.classList[1]}`);
            checkbox.checked = true;
        }
    });
};

const enableAllStudentGradeInputs = () => {
    const allGradeInputs = document.querySelectorAll("input.grade");
    allGradeInputs.forEach(input => input.disabled = false);
};

const markAsNotEvaluated = (checkbox, inputSelector) => {
    const studentGradesInputs = document.querySelectorAll(inputSelector);
    let targetInput;
    studentGradesInputs.forEach(input => {
        if (input.disabled == false) {
            targetInput = input;
        }
    });
    if (checkbox.checked) {
        targetInput.type = "text";
        targetInput.value = "N/A";
    } else {
        targetInput.type = "number";
    }
};

/************************
    MAIN RECORDS BOOK
************************/


const switchViewedTable = (table, btn) => {
    if (btn.classList.contains("selected")) { return; }
    btn.className = "selected";
    switch (table) {
        case tableAttendances:
            tableAttendances.hidden = false;
            tableGrades.hidden = true;
            recordedGradesChart.hidden = true;
            btnGrades.classList.remove("selected");
            break;
        case tableGrades:
            tableGrades.hidden = false;
            recordedGradesChart.hidden = false;
            tableAttendances.hidden = true;
            btnAttendances.classList.remove("selected");
            break;
        default:
            console.log(`error: table ${table} is invalid.`);
    }
};


/*************
    CHARTS
*************/

/**** BARS CHARTS ****/

const setRecordedGradesChart = () => {

    removeChildNodes(termsBarsContainer);

    const schoolId = getSelectedOption(schoolSelect).value;
    let academicTerms;
    classes.forEach(c => {
        if (c.school.id == schoolId) {
            academicTerms = c.school.academicTerms;
        }
    });
    let termsAndGradedEvaluations = [];
    for (let i = 1; i <= academicTerms; i++) {

        const termBar = document.createElement("div");
        termBar.className = "term-bar";
        termsBarsContainer.append(termBar);

        termsAndGradedEvaluations.push({
            term: i,
            gradedEval: false
        });
        let possibleTotalPoints = 0;
        lessons.forEach(lesson => {
            if (lesson.academicTerm == i && lesson.evaluations.length) {
                termsAndGradedEvaluations[i - 1].gradedEval = true;
                possibleTotalPoints += Number(lesson.evaluations[0].maxGrade);
            }
        });
        lessons.forEach(lesson => {
            if (lesson.academicTerm == i && lesson.evaluations.length) {
                createEvaluationChartBar(lesson.evaluations, possibleTotalPoints, termBar, lesson.academicTerm);
            }
        });
    }
    let qntOfTermsWithGradedEval = 0;
    termsAndGradedEvaluations.forEach(term => {
        if (term.gradedEval) { qntOfTermsWithGradedEval++; }
    });
    finalGradeBar.style.width = `${qntOfTermsWithGradedEval / academicTerms * 100}%`
};

const setGradebookChart = () => {
    removeChildNodes(divContainer);
    removeChildNodes(divInputFields);

    let possibleTotalPoints = 0;
    termEvaluations.forEach(eval => {
        possibleTotalPoints += Number(eval[0].maxGrade);
    });

    termEvaluations.forEach(eval => {
        createEvaluationChartBar(eval, possibleTotalPoints, divContainer);
        createChartController(eval);
    });
};

const createEvaluationChartBar = (eval, possibleTotalPoints, parent, lessonAcademicTerm) => {

    const width = Math.round(100 * Number(eval[0].maxGrade) / possibleTotalPoints);

    const bar = document.createElement("div");
    bar.classList.add("bar", `evaluation${eval[0].id}`);
    bar.style.width = width + "%";
    bar.style.backgroundColor = eval[0].color;
    parent.append(bar);

    bar.addEventListener("mouseover", () => showPercentage(bar, width, lessonAcademicTerm));
    bar.addEventListener("mouseout", () => hidePercentage(bar));
};

const showPercentage = (bar, barwidth, lessonAcademicTerm) => {
    const div = document.createElement("div");
    div.className = "grade-percentage";
    div.style.position = "absolute";

    let academicTerm;
    if (lessonAcademicTerm) { // records-book
        div.style.top = "24px";
        const termType = defineTermType();
        academicTerm = lessonAcademicTerm + termType;
    }
    else { // gradebook
        div.style.top = "32px";
        academicTerm = getSelectedOption(termSelect).innerText;
    }
    div.innerText = "Vale " + barwidth + "% da nota do " + academicTerm;

    bar.append(div);
};

const hidePercentage = (bar) => {
    bar.innerText = "";
};

const createChartController = (eval) => {
    const div = document.createElement("div");

    const label = document.createElement("label");
    label.className = "title";
    label.style.color = eval[0].color;
    label.style.fontWeight = 500;
    label.innerText = eval[0].title;

    const input = createGradeInput();
    input.classList.add("max-grade", `evaluation${eval[0].id}`);
    input.name = `max-grade-evaluation${eval[0].id}`;
    input.value = `${Number(eval[0].maxGrade)}`;

    divInputFields.append(div);
    div.append(label, input);

    input.addEventListener("change", () => { changeBarWidth(input); enableSubmitionButton(btnSubmitGradebook) });
};

const changeBarWidth = (input) => {
    if (input.value > 0) {
        // RESET FRACTION DENOMINATOR
        let totalPoints = 0;
        const otherinputs = document.querySelectorAll("input.max-grade");
        otherinputs.forEach(input => {
            totalPoints += Number(input.value);
        });
        console.log(totalPoints);
        // REDEFINE BARS WIDTHS
        otherinputs.forEach(input => {
            let width = input.value / totalPoints;
            const bars = document.querySelectorAll(".bar");
            bars.forEach(bar => {
                if (bar.classList.contains(input.classList[1])) {
                    bar.style.width = `${width * 100}%`;
                }
            });
        });
    } else {
        const disclaimer = document.getElementById("disclaimer");
        const error = "Digite um número maior que zero!"
        const p = document.createElement("p");
        p.innerText = error;
        disclaimer.append(p);
        setTimeout(() => {
            p.remove();
        }, 4000);
    }
};

/**** PIE CHART ****/

const createPieChart = (normalizedGrade, color, text) => {

    const pieContainer = document.createElement("div");
    pieContainer.className = "pie-container";

    const cutterRightHalf = document.createElement("div");
    cutterRightHalf.classList.add("cutter", "right-half");

    const sliceRightHalf = document.createElement("div");
    sliceRightHalf.classList.add("slice", "right-half");
    sliceRightHalf.style.backgroundColor = color;

    const cutterLeftHalf = document.createElement("div");
    cutterLeftHalf.classList.add("cutter", "left-half");

    const sliceLeftHalf = document.createElement("div");
    sliceLeftHalf.classList.add("slice", "left-half");
    sliceLeftHalf.style.backgroundColor = color;

    const innerCircle = document.createElement("div");
    innerCircle.className = "inner-circle";
    innerCircle.innerText = text;
    innerCircle.style.color = color;

    cutterRightHalf.append(sliceRightHalf);
    cutterLeftHalf.append(sliceLeftHalf);
    pieContainer.append(cutterRightHalf, cutterLeftHalf, innerCircle);

    const eachPoint = 3.6; // 3.6 degrees in a circle
    const totalDegrees = normalizedGrade * eachPoint * 100;

    if (totalDegrees <= 180) {
        sliceRightHalf.style.transform = `rotate(${totalDegrees}deg)`;
    } else {
        sliceRightHalf.style.transform = "rotate(180deg)";
        sliceLeftHalf.style.transform = `rotate(${totalDegrees - 180}deg)`;
    }

    return pieContainer;
};