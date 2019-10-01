const todolistObj = document.querySelector('#todolist');
const donelistObj = document.querySelector('#donelist');
const sampleObj = todolistObj.querySelector('[sample]');
sampleObj.parentNode.removeChild(sampleObj);

const workData = getWork();

function saveWork() {
    const data = window.localStorage;
    data.setItem('workData', JSON.stringify(workData));
};

function getWork() {
    const data = window.localStorage;
    const savedData = data.getItem('workData');
    if (savedData) {
        return JSON.parse(savedData);
    } else {
        return [];
    }
};

function printWork(workData) {
    let index = 1;
    workData.forEach(function(data) {
        const newWorkObj = addWorkList(data['subject'], data['startDate'].substr('2'), data['endDate'].substr('2'), data['doneFlag']);
        newWorkObj['todoIndex'] = index;
        index++;
    });
};
printWork(workData);

function doneWork(newWorkObj) {
    const workCurrentUl = newWorkObj.parentElement;
    if (workCurrentUl == todolistObj) {
        donelistObj.appendChild(newWorkObj);
    } else {
        todolistObj.appendChild(newWorkObj);
    }
    workData.forEach(function(data) {
        if (newWorkObj['todoIndex'] == data['idx']) {
            if (workCurrentUl == todolistObj) {
                data['doneFlag'] = true;
            } else {
                data['doneFlag'] = false;
            }
        }
    });
    sortWork(todolistObj);
    sortWork(donelistObj);
    saveWork();
    //console.log(workData);
};
function modifyWork(newWorkObj) {
    let modifyText = prompt('할일을 수정하시오!');
    if (!modifyText.trim()) return false;
    newWorkObj.querySelector('.work').innerText = modifyText;
    workData.forEach(function(data) {
        if (newWorkObj['todoIndex'] == data['idx']) {
            data['subject'] = modifyText;
        }
    });
    saveWork();
};
function removeWork(newWorkObj) {
    let removeAsk = confirm('삭제 하시겠습니까?');
    if (removeAsk) {
        newWorkObj.parentNode.removeChild(newWorkObj);
        for(let i = 0; i < workData.length; i++) {
            if (workData[i]['idx'] == newWorkObj['todoIndex']) {
                workData.splice(i, 1);
            }
        }
        saveWork();
    }
};

function sortWork(sortListObj) {
    let lis = [];
    for(let i = sortListObj.childNodes.length; i--;) {
        if(sortListObj.childNodes[i].nodeName === 'LI') {
            lis.push(sortListObj.childNodes[i]);
        }
    }
    lis.sort(function(a, b) {
        const aDate = a.querySelector('.end-date').textContent.replace(/-/gi, '');
        const bDate = b.querySelector('.end-date').textContent.replace(/-/gi, '');
        const aTime = parseInt(a.getAttribute('add-time'));
        const bTime = parseInt(b.getAttribute('add-time'));
        if (aDate > bDate) {
            return 1;
        } else if (aDate < bDate) {
            return -1;
        } else {
            if (aTime > bTime) {
                return 1;
            } else if (aTime < bTime) {
                return -1;
            } else {
                return 0;
            }
        }
    });
    for(let i = 0; i < lis.length; i++) {
        sortListObj.appendChild(lis[i]);
    }
}

function addWorkList(workText, dateStartText, dateEndText, doneFlag) {
    const newWorkObj = sampleObj.cloneNode(true);
    const checkBoxObj = newWorkObj.querySelector('label input[type="checkbox"]');
    const addWorkObj = newWorkObj.querySelector('.work');
    const startDateObj = newWorkObj.querySelector('.start-date');
    const EndDateObj = newWorkObj.querySelector('.end-date');
    const modifyObj = newWorkObj.querySelector('.modify');
    const removeObj = newWorkObj.querySelector('.remove');
    const getTime = new Date().getTime();
    checkBoxObj.onclick = () => {doneWork(newWorkObj)};
    addWorkObj.innerText = workText;
    startDateObj.innerText = dateStartText;
    EndDateObj.innerText = dateEndText;
    if (dateStartText === dateEndText || dateStartText < 1) {
        startDateObj.parentNode.removeChild(startDateObj);
    }
    modifyObj.onclick = () => {modifyWork(newWorkObj)};
    removeObj.onclick = () => {removeWork(newWorkObj)};
    newWorkObj.setAttribute('add-time', getTime);
    todolistObj.appendChild(newWorkObj);
    if (doneFlag) {
        doneWork(newWorkObj);
        checkBoxObj.setAttribute('checked', 'checked');
    }
    return newWorkObj;
};

const inputDateStart = document.querySelector('#input-Date-Start');
const inputDateEnd = document.querySelector('#input-Date-End');
const inputText = document.querySelector('#input-Text');
const btnAdd = document.querySelector('#btn-Add');
let today = new Date();
let yy = String(today.getFullYear());
let mm = String(today.getMonth() + 1).padStart(2, '0');
let dd = String(today.getDate()).padStart(2, '0');
today = `${yy}-${mm}-${dd}`;
inputDateStart.value = today;
inputDateEnd.value = today;
inputText.focus();

btnAdd.onclick = () => {
    let dateStartText = inputDateStart.value.substr('2');
    let dateEndText = inputDateEnd.value.substr('2');
    let workText = inputText.value.trim();
    if (!workText) return false;
    if (dateStartText <= dateEndText) {
        const newWorkObj = addWorkList(workText, dateStartText, dateEndText);
        sortWork(todolistObj);
        const indexArray = [];
        workData.forEach(function(data) {
            indexArray.push(data['idx']);
        });
        let lastIndex = Math.max.apply(null, indexArray);
        if (indexArray.length == 0) {
            lastIndex = 0;
        }
        newWorkObj['todoIndex'] = lastIndex + 1;
        workData.push({
            idx: lastIndex + 1,
            subject: workText,
            startDate: inputDateStart.value,
            endDate: inputDateEnd.value,
            doneFlag: false,
        });
        saveWork();
    } else {
        alert('날짜를 확인하시오!');
    }
    inputText.focus();
    inputText.select();
};
inputText.onkeyup = (event) => {
    if (event.which === 13) {
        btnAdd.onclick();
    }
};