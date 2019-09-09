function doneWork() {
    let workListId = this.parentElement.parentElement.id.replace('li_', '');
    let workList = document.getElementById('li_' + workListId);
    let workListParentType = workList.parentElement;
    if (workListParentType === donelist) {
        todolist.appendChild(workList);
    } else {
        donelist.appendChild(workList);
    }
};
function workModify() {
    let newText = prompt('할일을 수정하시오!');
    if(!newText.trim()) return false;
    let modifyId = this.id.replace('mod_', '');
    let doWorks = document.getElementById('work_' + modifyId);
    doWorks.innerText = newText;
};
function workRemove() {
    let question = confirm('삭제할래요?');
    let removeId = this.id.replace('rem_', '');
    if (question) document.getElementById('li_' + removeId).style.display = 'none';
};
function mouseOver() {
    let workListId = this.id.replace('li_', '');
    let modify = document.getElementById('mod_' + workListId);
    modify.style.visibility = 'visible';
    let remove = document.getElementById('rem_' + workListId);
    remove.style.visibility = 'visible';
};
function mouseOut() {
    let workListId = this.id.replace('li_', '');
    let modify = document.getElementById('mod_' + workListId);
    modify.style.visibility = 'hidden';
    let remove = document.getElementById('rem_' + workListId);
    remove.style.visibility = 'hidden';
};
function addWorkList(listUl, workText, dateStartText, dateEndText) {
    let date = new Date();
    let id = "" + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();

    let workList = document.createElement('li');
    workList.id = 'li_' + id;
    workList.addEventListener('mouseover', mouseOver);
    workList.addEventListener('mouseout', mouseOut);
    let doneCheck = document.createElement('label');
    let doneCheckBox = document.createElement('input');
    doneCheckBox.type = 'checkbox';
    doneCheckBox.onclick = doneWork;
    let doneCheckImg = document.createElement('span');
    let dateBox = document.createElement('div');
    dateBox.className = "date-box";
    let dateStart = document.createElement('span');
    let dateEnd = document.createElement('span');
    dateStart.innerText = dateStartText;
    dateEnd.innerText = dateEndText;
    let doWorks = document.createElement('span');
    doWorks.id = 'work_' + id;
    doWorks.innerText = workText;
    let modify = document.createElement('i');
    modify.id = 'mod_' + id;
    modify.className = 'modify';
    modify.onclick = workModify;
    let remove = document.createElement('i');
    remove.id = 'rem_' + id;
    remove.className = 'remove';
    remove.onclick = workRemove;

    listUl.appendChild(workList);
    workList.appendChild(doneCheck);
    doneCheck.appendChild(doneCheckBox);
    doneCheck.appendChild(doneCheckImg);
    workList.appendChild(dateBox);
    if (dateStartText.length > 0) {
        dateBox.appendChild(dateStart);
    }
    dateBox.appendChild(dateEnd);
    workList.appendChild(doWorks);
    workList.appendChild(modify);
    workList.appendChild(remove);
};

let inputDateStart = document.getElementById('input-Date-Start');
let inputDateEnd = document.getElementById('input-Date-End');
let inputText = document.getElementById('input-text');
let btnAdd = document.getElementById('btn-Add');
inputText.focus();
btnAdd.onclick = function() {
    let workText = inputText.value.trim();
    let dateStartText = inputDateStart.value;
    let dateEndText = inputDateEnd.value;
    if (!workText) return false;
    if (dateStartText < dateEndText) {
        addWorkList(document.getElementById('todolist'), workText, dateStartText, dateEndText);
    } else {
        alert('일정를 확인하시오!');
    }
    inputText.focus();
    inputText.select();
};

inputText.onkeyup = function(event) {
    if (event.which === 13) {
        btnAdd.onclick();
    }
};