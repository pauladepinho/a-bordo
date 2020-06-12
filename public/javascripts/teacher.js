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
const mainGradebook = document.getElementById("grade");

const mains = [mainHome, mainAttendanceSheet, mainGradebook];

// MAINS' CHILDREN ELEMENTS

// MAIN HOME
const ulStudents = document.getElementById("ul-students");

// MAIN ATTENDANCE SHEET
const periodsSelect = document.getElementById("periods"); // attendance-related
const tbodyAttendanceSheet = document.getElementById("tbody-attendance-sheet");
const inputCourseId = document.getElementById("input-courseId");

const checkboxEvaluationDay = document.getElementById("evaluation-day"); // new-evaluation-related
const sectionSetEvaluation = document.getElementById("set-evaluation");
const divEvaluationInfo = document.getElementById("evaluation-info");

// MAIN GRADEBOOK
const qntBarsSelect = document.getElementById("qnt-bars");
const divContainer = document.getElementById("container");



window.addEventListener("load", () => fetchData());

schoolSelect.addEventListener("change",
    () => {
        toggleMainVisibility(mainHome),
            disableNavReportsAndContactBtns(),
            disableNavFormsBtns(),
            populateClassSelect(),
            populateTermSelect()
    });
classSelect.addEventListener("change",
    () => {
        populateSubjectSelect(),
            listStudents(),
            populateTableWithStudents(tbodyAttendanceSheet),
            removeEvaluationFromAttendanceSheet()
    });
subjectSelect.addEventListener("change",
    () => {
        enableTermSelect(),
            enableNavReportsAndContactBtns(),
            fetchCourseLessonsAndEvaluations(),
            removeEvaluationFromAttendanceSheet()
    });
termSelect.addEventListener("change", () => {
    enableNavFormsBtns(),
        removeEvaluationFromAttendanceSheet(),
        getTermEvaluations()
});

// form btn
btnAttendanceSheet.addEventListener("click", () => toggleMainVisibility(mainAttendanceSheet, btnAttendanceSheet));

periodsSelect.addEventListener("change", () => populateAttendanceSheetWithMarks());
checkboxEvaluationDay.addEventListener("change", () => createEvaluation());

// form btn
btnGradebook.addEventListener("click", () => {
    toggleMainVisibility(mainGradebook, btnGradebook)
});

// qntBarsSelect.addEventListener("change", );



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
    const term = getSelectedOption(termSelect).value;
    if (!term) { return; }
    lessons.forEach(lesson => {
        if (lesson.academicTerm == term && lesson.evaluations.length) {
            termEvaluations.push(lesson.evaluations);
        }
    });
    populateQntBarsSelect();
    populateDivContainer();
};




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

const getSelectedOption = (select) => {
    return select.options[select.selectedIndex];
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




const populateSchoolSelect = () => {
    classes.forEach(c => {
        createSelectOption(c.school.id, c.school.name, schoolSelect);
    });
    if (schoolSelect.options.length < 2) { // there is only one school
        toggleMainVisibility(mainHome);
        disableNavReportsAndContactBtns();
        disableNavFormsBtns();
        populateClassSelect();
        populateTermSelect();
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
        populateSubjectSelect();
        listStudents();
        populateTableWithStudents(tbodyAttendanceSheet);
        removeEvaluationFromAttendanceSheet();
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
        enableTermSelect();
        enableNavReportsAndContactBtns();
        fetchCourseLessonsAndEvaluations();
        removeEvaluationFromAttendanceSheet();
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

    removeEvaluationFromAttendanceSheet();
};

const enableTermSelect = () => { // when a subject is selected
    termSelect.disabled = false;
};




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

const populateTableWithStudents = (tbody) => {
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
        const evalValue = document.createElement("input");
        evalValue.type = "number";
        evalValue.name = "evaluation-value";
        evalValue.className = "eval-data";
        evalValue.min = "0.5";
        evalValue.step = "0.5";
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

/*****************
    MAIN GRADE
*****************/

const populateQntBarsSelect = () => {
    removeChildNodes(qntBarsSelect);
    termEvaluations.forEach(eval => {
        createSelectOption(eval[0].id, eval[0].title, qntBarsSelect);
    });
    sortSelect(qntBarsSelect);
    setSelectTitle("Selecione uma avaliação", qntBarsSelect);

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

    qntBarsSelect.append(optionDivider, optionAdd, optionDel);
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


/*

    <div id="input-fields">
        <% evaluations.forEach(evaluation => { %>
            <div>
                <label class="title" style=< <%= evaluation.title %></label>

                <input class="<%= 'max-grade evaluation' + evaluation.number %>" type='number'
                value="<%= evaluation.maxGrade.toFixed(1) %>" step='0.5' min='0' max='10'
                name=<%= "max-grade-evaluation" + evaluation.number %>>
            </div>
        <% }) %>
    </div >


    <section class="table">

        <table class="table-striped">
            <thead>
                <tr>
                    <th class="student-number">Nº</th>
                    <th class="student-name">ALUNO</th>

                    <% evaluations.forEach(evaluation => { %>
                        <th class="<%= 'evaluation evaluation' + evaluation.id %>">
                            <label class="title" style=< <%= evaluation.title %></label>
                        </th>
                    <% }) %>

                    <th class="not-evaluated" id="not-evaluated-header">N/A</th>
                    <th class="term-final-grade">MÉDIA</th>
                </tr>
            </thead>

            <tbody>
                <% students.forEach(student => { %>
                    <tr>
                        <td class="student-number"><%= student.number %></th>
                        <td class="student-name"><%= student.name %></td>

                        <% evaluations.forEach(evaluation => {
                            this.student_id = student.id;
                        %>
                            <td class="<%= 'evaluation evaluation' + evaluation.id %>" %>>
                                <input type="number" name=<%= "student" + student.id + "-grades[]" %> max="10" min="0" step="0.5" value="<%= evaluation.grade %>" placeholder="Nota" disabled>
                            </td>
                        <% }) %>

                        <td class="not-evaluated" id=<%= "student" + student.id + "not-evaluated-check" %>>
                            <label for="not-evaluated" class="checkbox-container">
                                <input type="checkbox" name="not-evaluated" id="not-evaluated" />
                                <span class="checkmark"></span>
                            </label>
                        </td>

                        <%
                            let totalPoints = 0;
                            let gradedEvaluations = 0;
                            evaluations.forEach(evaluation => {
                                if(evaluation.grade != null) {
                                    totalPoints += Number(evaluation.grade);
                                    gradedEvaluations++;
                                }
                            });
                        %>

                        <td class="term-final-grade" id=<%= "student" + student.id + "-term-final-grade" %>>
                            <%= Math.round(totalPoints / gradedEvaluations).toFixed(1) %>
                        </td>
                    </tr >
                <% }) %>
            </tbody >
        </table >
    </section >

*/