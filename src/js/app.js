function doneWork() {
    let workListId = this.parentElement.parentElement.id.replace('li_', '');
    let workList = document.getElementById('li_' + workListId);
    let workListParentType = workList.parentElement;
    if (workListParentType == donelist) {
        todolist.appendChild(workList);
    } else {
        donelist.appendChild(workList);
    }
};
function workModify() {
    let newText = prompt('수정하시오!');
    let modifyId = this.id.replace('mod_', '');
    let workList = document.getElementById('work_' + modifyId);
    if(!newText.trim()) return false;
    workList.innerText = newText;
}
function workRemove() {
    let removeOk = confirm('삭제 할 겁니까?');
    if(removeOk === true) {
        let removeId = this.id.replace('rem_', '');
        document.getElementById('li_' + removeId).style.display = 'none';
    } else {
        return false;
    }
}
function mouseOver() {
    let workListId = this.id.replace('li_', '');
    let modify = document.getElementById('mod_' + workListId);
    let remove = document.getElementById('rem_' + workListId);
    modify.style.visibility = 'visible';
    remove.style.visibility = 'visible';
};
function mouseOut() {
    let workListId = this.id.replace('li_', '');
    let modify = document.getElementById('mod_' + workListId);
    let remove = document.getElementById('rem_' + workListId);
    modify.style.visibility = 'hidden';
    remove.style.visibility = 'hidden';
};
function workAddEvent(listUl, workText, startDateText, endDateText) {
    let date = new Date();
    let id = "" + date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
    let workList = document.createElement('li');
    workList.id = 'li_' + id;
    workList.addEventListener('mouseover', mouseOver);
    workList.addEventListener('mouseout', mouseOut);
    let workListText = document.createElement('span');
    workListText.id = "work_" + id;
    workListText.className = 'work';
    workListText.innerText = workText;
    let doneCheck = document.createElement('label');
    let doneCheckBox = document.createElement('input');
    doneCheckBox.type = 'checkbox';
    let doneCheckImg = document.createElement('span');
    doneCheckBox.onclick = doneWork;
    let dateBox = document.createElement('div');
    dateBox.className = 'date-box';
    let startDate = document.createElement('span');
    let endDate = document.createElement('span');
    startDate.innerText = startDateText;
    endDate.innerText = endDateText;
    let modify = document.createElement('i');
    modify.id = 'mod_' + id;
    modify.className = 'modify';
    modify.onclick = workModify;
    let remove = document.createElement('i');
    remove.id = 'rem_' + id;
    remove.className = 'delete';
    remove.onclick = workRemove;

    listUl.appendChild(workList);
    workList.appendChild(doneCheck);
    doneCheck.appendChild(doneCheckBox);
    doneCheck.appendChild(doneCheckImg);
    workList.appendChild(dateBox);
    if (startDateText.length > 0) {
        dateBox.appendChild(startDate);
    }
    dateBox.appendChild(endDate);
    workList.appendChild(workListText);
    workList.appendChild(modify);
    workList.appendChild(remove);
};
let inputStartDate = document.getElementById('input-Date-Start');
let inputEndDate = document.getElementById('input-Date-End');
let inputText = document.getElementById('input-Text');
let btnAdd = document.getElementById('btn-Add');
inputText.focus();

btnAdd.onclick = function() {
    let workText = inputText.value.trim();
    let startDateText = inputStartDate.value;
    let endDateText = inputEndDate.value;
    //if (!workText || workText === "") return false;
    if (!workText) return false;
    if (startDateText < endDateText) {
        workAddEvent(document.getElementById('todolist'), workText, startDateText, endDateText);
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
