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

const mains = [mainHome, mainAttendanceSheet, mainGradebook];

// MAINS' CHILDREN ELEMENTS

// MAIN HOME
const ulStudents = document.getElementById("ul-students");

// MAIN ATTENDANCE SHEET
const formAttendanceSheet = document.getElementById("form-attendance-sheet");
const btnSubmitAttendanceSheet = document.getElementById("btn-submit-attendance-sheet");

const periodsSelect = document.getElementById("periods"); // attendance-related
const inputCourseId = document.getElementById("input-courseId");
const tbodyAttendanceSheet = document.getElementById("tbody-attendance-sheet");

const checkboxEvaluationDay = document.getElementById("evaluation-day"); // new-evaluation-related
const sectionSetEvaluation = document.getElementById("set-evaluation");
const divEvaluationInfo = document.getElementById("evaluation-info");

// MAIN GRADEBOOK
const formGradebook = document.getElementById("form-gradebook");
const btnSubmitGradebook = document.getElementById("btn-submit-gradebook");

const gradebookEvaluationSelect = document.getElementById("gradebook-evaluation-select");
const gradebookChart = document.getElementById("gradebook-chart");
const divContainer = document.getElementById("container");
const divInputFields = document.getElementById("input-fields");

const tbodyGradebook = document.getElementById("tbody-gradebook");
const theadGradebook = document.getElementById("thead-gradebook");




window.addEventListener("load", () => fetchData());

schoolSelect.addEventListener("change", () => callSelectedSchoolRelatedFunctions());
classSelect.addEventListener("change", () => callSelectedClassRelatedFunctions());
subjectSelect.addEventListener("change", () => callSelectedSubjectRelatedFunctions());
termSelect.addEventListener("change", () => callSelectedTermRelatedFunctions());

// form btn
btnAttendanceSheet.addEventListener("click", () => toggleMainVisibility(mainAttendanceSheet, btnAttendanceSheet));
formAttendanceSheet.addEventListener("submit", (evt) => confirmFormSubmition(evt));

periodsSelect.addEventListener("change", () => { populateAttendanceSheetWithMarks(); enableSubmitionButton(btnSubmitAttendanceSheet) });
checkboxEvaluationDay.addEventListener("change", () => createEvaluation());

// form btn
btnGradebook.addEventListener("click", () => toggleMainVisibility(mainGradebook, btnGradebook));
formGradebook.addEventListener("submit", (evt) => confirmFormSubmition(evt, true));

gradebookEvaluationSelect.addEventListener("change", () => enableSelectedStudentGradeInputs());





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

            getTermEvaluations();
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
    listStudents(); // main home

    populateTbody(tbodyAttendanceSheet);
    populateTbody(tbodyGradebook);
    removeEvaluationFromAttendanceSheet();
};

const callSelectedSubjectRelatedFunctions = () => {
    enableTermSelect();
    enableNavReportsAndContactBtns();
    fetchCourseLessonsAndEvaluations();
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
    termSelect.disabled = false;
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
};

/****************** 
    OTHER MAINS
******************/

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

    if (!termEvaluations.length) {
        return;
    }
    termEvaluations.forEach(eval => {
        const th = document.createElement("th");
        th.classList.add("evaluation", `evaluation${eval[0].id}`);

        const label = document.createElement("label");
        label.className = "title";
        label.style.color = eval[0].color;
        label.innerText = eval[0].title;

        th.append(label);
        row.append(th);
    });

    const notEval = document.createElement("th");
    notEval.className = "not-evaluated";
    notEval.id = "not-evaluated-header"
    notEval.innerText = "N/A";

    const avg = document.createElement("th");
    avg.className = "term-final-grade";
    avg.innerText = "MÉDIA";

    row.append(notEval, avg);
};

const populateTbody = (tbody) => {

    const selectedClass = getSelectedOption(classSelect);
    removeChildNodes(tbody);
    classes.forEach(c => {
        if (c.id == selectedClass.value) {
            const students = c.students;
            students.forEach(student => {
                if (student.name) {
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
                }
            });
        }
    });
    if (termEvaluations.length) {
        populateGradebookTbody(tbodyGradebook);
        gradebookChart.hidden = false;
    } else {
        gradebookChart.hidden = true;
    }
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

/*****************
    MAIN GRADE
*****************/

const populateGradebookTbody = (tbody) => {
    const rows = tbody.childNodes;
    rows.forEach(row => {
        const studentId = row.childNodes[1].id;

        let totalPoints = null;
        let gradedEvaluations = 0;

        termEvaluations.forEach(eval => {
            let grade;
            eval[0].studentsGrades.forEach(studentEval => {
                if (studentEval.studentId == studentId) {

                    gradedEvaluations++;

                    if (studentEval.evaluated == 1) {
                        grade = Number(studentEval.grade);
                        const normalizedGrade = grade / eval[0].maxGrade;

                        totalPoints += normalizedGrade;
                    }
                    else {
                        grade = "N/A"
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

            input.addEventListener("change", () => enableSubmitionButton(btnSubmitGradebook));
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
        const avg = document.createElement("td");
        avg.className = "term-final-grade";

        if (totalPoints != null) {
            const schoolMaxGrade = getSelectedSchoolMaxGrade();
            avg.innerText = (totalPoints * schoolMaxGrade / gradedEvaluations).toFixed(1);
        } else {
            avg.innerText = "-";
        }

        label.append(checkbox, checkmark);
        notEval.append(label);
        row.append(notEval, avg);

        checkbox.addEventListener("change", () => markAsNotEvaluated(checkbox, `input.grade.student${studentId}`));
    });
};

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

/**** CHART ****/

const setGradebookChart = () => {
    populateDivContainer();
    createChartControllers();
};

const populateDivContainer = () => {
    removeChildNodes(divContainer);
    let possibleTotalPoints = 0;
    termEvaluations.forEach(eval => {
        possibleTotalPoints += Number(eval[0].maxGrade);
    });
    termEvaluations.forEach(eval => {
        createChartBar(eval, possibleTotalPoints);
    });
};

const createChartBar = (eval, possibleTotalPoints) => {
    const bar = document.createElement("div");
    bar.classList.add("bar", `evaluation${eval[0].id}`);
    bar.style.width = Math.round(100 * Number(eval[0].maxGrade) / possibleTotalPoints) + "%";
    bar.style.backgroundColor = eval[0].color;

    divContainer.append(bar);
};

const createChartControllers = () => {
    removeChildNodes(divInputFields);
    termEvaluations.forEach(eval => {
        const div = document.createElement("div");

        const label = document.createElement("label");
        label.className = "title";
        label.style.color = eval[0].color;
        label.innerText = eval[0].title;

        const input = createGradeInput();
        input.classList.add("max-grade", `evaluation${eval[0].id}`);
        input.name = `max-grade-evaluation${eval[0].id}`;
        input.value = `${Number(eval[0].maxGrade)}`;

        divInputFields.append(div);
        div.append(label, input);
    });
};