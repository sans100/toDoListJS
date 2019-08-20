const todolistObj = document.querySelector('#todolist');
const donelistObj = document.querySelector('#donelist');
const sampleObj = todolistObj.querySelector('[sample]');
sampleObj.parentNode.removeChild(sampleObj);
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yy = String(today.getFullYear());
today = yy+'-'+mm+'-'+dd;

function doneWork(newWorkObj) {
    let workListParentType = newWorkObj.parentElement;
    if (workListParentType == donelist) {
        todolistObj.appendChild(newWorkObj);
    } else {
        donelistObj.appendChild(newWorkObj);
    }
    sortWork(todolistObj);
    sortWork(donelistObj);
};
function modifyWork(newWorkObj) {
    let newText = prompt('수정하시오!');
    if(!newText.trim()) return false;
    newWorkObj.querySelector('.work').innerText = newText;
}
function deleteWork(newWorkObj) {
    newWorkObj.parentNode.removeChild(newWorkObj);
}
function sortWork(sortListObj) {

    var lis = [];
    for(var i = sortListObj.childNodes.length; i--;){
        if(sortListObj.childNodes[i].nodeName === 'LI')
            lis.push(sortListObj.childNodes[i]);
        }

    lis.sort(function(a, b){
        const aDate = parseInt(a.querySelector('.end-date').textContent.split('-').join(''));
        const bDate = parseInt(b.querySelector('.end-date').textContent.split('-').join(''));
        const aAddTime = parseInt(a.getAttribute('add-time'));
        const bAddTime = parseInt(b.getAttribute('add-time'));
        console.log(aDate, aAddTime, bDate, bAddTime);
        //.querySelector('#input-Date-End').textContent.split('-').join('');
        if (aDate > bDate) {
            return 1;
        } else if (aDate < bDate) {
            return -1;
        } else {
            if (aAddTime > bAddTime) {
                return 1;
            } else if (aAddTime < bAddTime) {
                return -1;
            } else {
                return 0;
            }
        }
    });
    for(var i = 0; i < lis.length; i++) {
        console.log(lis[i]);
        sortListObj.appendChild(lis[i]);
    }
}
function workAddEvent(workText, startDateText, endDateText) {
    const newWorkObj = sampleObj.cloneNode(true);
    const labelObj = newWorkObj.querySelector('label');
    const checkBoxObj = labelObj.querySelector('input[type="checkbox"]');
    checkBoxObj.addEventListener('click', function() {
        doneWork(newWorkObj);
    });
    const subjectObj = newWorkObj.querySelector('.work');
    const startDateObj = newWorkObj.querySelector('.start-date');
    const endDateObj = newWorkObj.querySelector('.end-date');
    startDateObj.innerText = startDateText;
    if (startDateText.length < 1 || startDateText === endDateText) {
        startDateObj.parentNode.removeChild(startDateObj);
    }
    endDateObj.innerText = endDateText;
    subjectObj.innerText = workText;
    const modifyObj = newWorkObj.querySelector('.modify');
    modifyObj.addEventListener('click', function() {
        modifyWork(newWorkObj);
    });
    const deleteObj = newWorkObj.querySelector('.delete');
    deleteObj.addEventListener('click', function() {
        deleteWork(newWorkObj);
    });
    const addTime = (new Date()).getTime();
    newWorkObj.setAttribute('add-time', addTime);
    todolistObj.appendChild(newWorkObj);
};

const inputStartDate = document.getElementById('input-Date-Start');
const inputEndDate = document.getElementById('input-Date-End');
inputEndDate.value = today;
inputStartDate.value = today;
const inputText = document.getElementById('input-Text');
const btnAdd = document.getElementById('btn-Add');
inputText.focus();

btnAdd.onclick = function() {
    let workText = inputText.value.trim();
    let startDateText = inputStartDate.value.substr('2');
    let endDateText = inputEndDate.value.substr('2');
    if (!workText) return false;
    if (startDateText <= endDateText) {
        workAddEvent(workText, startDateText, endDateText);
        sortWork(todolistObj);
    } else {
        alert('일정을 확인하시오!');
    }
    inputText.focus();
    inputText.select();
};
inputText.onkeyup = function(event) {
    if(event.which === 13) {
        btnAdd.click();
    }
};
