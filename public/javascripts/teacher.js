const endpoint = "http://localhost:3000/api/";

const userId = document.getElementById("userId").value;

const schoolSelect = document.getElementById("school");
const classSelect = document.getElementById("class");
const subjectSelect = document.getElementById("subject");
const termSelect = document.getElementById("term");

// schoolSelect.addEventListener("change", () => { populateSubjectSelect(schoolSelect, subjectSelect), populateClassSelect(schoolSelect, classSelect) })
// schoolSelect.addEventListener("change", () => populateSelects(schoolSelect, subjectSelect, classSelect, termSelect));

// const populateClassSelect = (schoolSelect, classSelect) => {

//     [...classSelect.options].map(opt => opt.remove());

//     const selectedSchool = schoolSelect.options[schoolSelect.selectedIndex];
//     const schoolId = selectedSchool.value;

//     fetch(`${endpoint}classes/${schoolId}`)
//         .then(res => res.json())
//         .then(classes => {

//             for (c of classes) {
//                 const option = document.createElement("option");
//                 option.innerHTML = c.code;

//                 classSelect.append(option);
//             }
//             sortSelect(classSelect);
//         })
//         .catch(error => console.log(error));
// };

// const populateSubjectSelect = (schoolSelect, subjectSelect) => {
//     [...subjectSelect.options].map(opt => opt.remove());

//     const selectedSchool = schoolSelect.options[schoolSelect.selectedIndex];
//     const schoolId = selectedSchool.value;

//     fetch(`${endpoint}subjects/${schoolId}`)
//         .then(res => res.json())
//         .then(subjects => {

//             for (subj of subjects) {
//                 const option = document.createElement("option");
//                 option.innerHTML = subj.name;

//                 subjectSelect.append(option);
//             }
//             sortSelect(subjectSelect);
//         })
//         .catch(error => console.log(error));
// };

// const populateSelects = (schoolSelect, subjectSelect, classSelect, termSelect) => {

//     [...subjectSelect.options].map(opt => opt.remove());
//     [...classSelect.options].map(opt => opt.remove());
//     [...termSelect.options].map(opt => opt.remove());

//     const selectedSchool = schoolSelect.options[schoolSelect.selectedIndex];
//     const schoolId = selectedSchool.value;

//     fetch(`${endpoint}subjects/${schoolId}`)
//         .then(res => res.json())
//         .then(subjects => {

//             for (subj of subjects) {
//                 const subjOption = document.createElement("option");
//                 subjOption.innerHTML = subj.name;

//                 const classOption = document.createElement("option");
//                 classOption.innerHTML = subj.name;

//                 subjectSelect.append(subjOption);
//             }
//             sortSelect(subjectSelect);
//         })
//         .catch(error => console.log(error));
// };


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