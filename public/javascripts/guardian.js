const endpoint = "http://localhost:3000/api/";

// NAV SELECTS
const studentSelect = document.getElementById("student");
const yearSelect = document.getElementById("year");
const schoolSelect = document.getElementById("school");
const classSelect = document.getElementById("class");
const termSelect = document.getElementById("term");

// NAV BUTTONS
const btnContact = document.getElementById("btn-contact");
const btnJustify = document.getElementById("btn-justify");
const navButtons = [btnContact, btnJustify];

// MAINS
const mainHome = document.getElementById("home");
const mains = [mainHome];

window.addEventListener("load", () => fetchData());

studentSelect.addEventListener("change", () => callSelectedStudentRelatedFunctions());
yearSelect.addEventListener("change", () => callSelectedYearRelatedFunctions());
schoolSelect.addEventListener("change", () => callSelectedSchoolRelatedFunctions());
classSelect.addEventListener("change", () => callSelectedClassRelatedFunctions());
termSelect.addEventListener("change", () => callSelectedTermRelatedFunctions());

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
    // tmpAry = removeDuplicates(tmpAry);
    while (select.options.length > 0) {
        select.options[0] = null;
    }
    for (let i = 0; i < tmpAry.length; i++) {
        let opt = new Option(tmpAry[i][0], tmpAry[i][1]);
        select.options[i] = opt;
    }
    return;
};

// const removeDuplicates = (arr) => {
//     // OBS: arr == [ [option.text, option.value], [option.text, option.value] ]
//     let uniqueOpts = []
//     for (let i = 0; i < arr.length; i++) {
//         if (i == 0) { uniqueOpts.push(arr[i]) } // because arr[i=0 - 1] == undefined
//         else if (arr[i][0] != arr[i - 1][0]) { uniqueOpts.push(arr[i]); }
//     }
//     return uniqueOpts;
// };

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
    populateTermSelect();
};

// POPULATE NAV SELECTS

const populateStudentSelect = () => {
    student.forEach(student => {
        createSelectOption(student.id, student.name, studentSelect);
    })
    if (studentSelect.options.length < 2) { // there is only one school
        callSelectedStudentRelatedFunctions();
    } else {
        sortSelect(studentSelect);
    }
    setSelectTitle("Alunos", studentSelect);
    setSelectTitle("Ano", yearSelect);
    setSelectTitle("Turma", classSelect);
    setSelectTitle("Escola", schoolSelect);
    setSelectTitle("Período", termSelect);
}

const populateYearSelect = () => {
    let years = [];
    const selectedStudent = getSelectedOption(studentSelect);
    studentSelected = student[selectedStudent.value -1];
    console.log(studentSelected);    
    removeChildNodes(yearSelect);
    removeChildNodes(schoolSelect);
    removeChildNodes(classSelect);
    removeChildNodes(termSelect);

    studentSelected.classStudents.forEach(c => {
        years.push(c.class.year);
    })
    years = new Set(years);
    years.forEach(year => {
        createSelectOption(year, year, yearSelect);
    })
    setSelectTitle("Ano", yearSelect);
}

const populateSchoolSelect = () => {

    let schools = [];
    const selectYear = getSelectedOption(yearSelect);
    removeChildNodes(schoolSelect);
    removeChildNodes(classSelect);
    removeChildNodes(termSelect);
    
    studentSelected.classStudents.forEach(c => {
        if (c.class.year == selectYear.value) {
            schools.push(c.class.school);
        }
    })
    
    schools = new Set(schools);
    schools.forEach(school => {
        createSelectOption(school.id, school.name, schoolSelect);        
    })

    if (schoolSelect.options.length < 2) { // there is only one class
        callSelectedSchoolRelatedFunctions();
    } else {
        sortSelect(schoolSelect);
    }
    setSelectTitle("Escola", schoolSelect);    
}

const populateClassSelect = () => {
    const selectYear = getSelectedOption(yearSelect);
    const selectSchool = getSelectedOption(schoolSelect);
    removeChildNodes(classSelect);
    removeChildNodes(termSelect);
    
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
    setSelectTitle("Turma", classSelect);
}

const populateTermSelect = () => {
    termSelect.disabled = false; 
    removeChildNodes(termSelect);  
    
    const selectClass = getSelectedOption(classSelect);
    let nTerms = studentSelected.classStudents[selectClass.value -1].class.school.academicTerms;

    for (i = 1; i <= nTerms; i++) {
        createSelectOption(i, nTerms == 4 ? i +'º Bimestre' : i +'º Trimestre' , termSelect);
    }

    setSelectTitle("Período", termSelect);
}