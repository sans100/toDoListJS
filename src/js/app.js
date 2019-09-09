const todolistObj = document.querySelector('#todolist');
const donelistObj = document.querySelector('#donelist');
const sampleObj = document.querySelector('[sample]');
sampleObj.parentNode.removeChild(sampleObj); // 목록 li태그 삭제

// 테스트 데이터 배열
let workDate = [
    {
        idx: 1,
        subject: '테스트1',
        startDate: '2019-08-22',
        endDate: '2019-09-22',
        doneFlag: false, // 진행/종료 여부
    },
    {
        idx: 2,
        subject: '테스트2',
        startDate: '2019-08-22',
        endDate: '2019-09-23',
        doneFlag: false,
    },
    {
        idx: 3,
        subject: '테스트3',
        startDate: '2019-08-22',
        endDate: '2019-09-24',
        doneFlag: true,
    },
]

// 테스트 데이터 화면 출력 함수
function printList(workDate) {
    let index = 1;
    workDate.forEach(function(data) { // 배열 순환
        const newWorkObj = addWorkList(data['subject'], data['startDate'].substr('2'), data['endDate'].substr('2'), data['doneFlag']);
        newWorkObj['todoIndex'] = index; // 목록의 순서를 매기는 'todoIndex' 키값 설정
        index++;
    });
    sortWork(todolistObj);
    sortWork(donelistObj);
};
printList(workDate);

// 체크박스 클릭 시 종료/진행 이동 함수
function doneWork(newWorkObj) {
    let newWorkObjUl = newWorkObj.parentElement;
    if (newWorkObjUl === todolist) {
        donelistObj.appendChild(newWorkObj);
    } else {
        todolistObj.appendChild(newWorkObj);
    }
    workDate.forEach(function(data) { // 배열 순환, 진행/종료 여부 기록
        if (data['idx'] == newWorkObj['todoIndex']) {
            if (newWorkObjUl != donelistObj) {
                data['doneFlag'] = true;
            } else {
                data['doneFlag'] = false;
            }
        }
    })
    sortWork(todolistObj);
    sortWork(donelistObj);
    //console.log(workDate);
};

// 목록 제목 수정 함수
function modifyWork(newWorkObj) {
    let modifyText = prompt('일정을 수정하시오!');
    if(!modifyText.trim()) return false;
    newWorkObj.querySelector('.work').innerText = modifyText;
    workDate.forEach(function(data) {
        if (data['idx'] === newWorkObj['todoIndex']) {
            data['subject'] = modifyText;
        }
    });
};

// 목록 삭제 함수
function removeWork(newWorkObj) {
    let removeAsk = confirm('삭제 하시겠습니다?');
    if (removeAsk) {
        newWorkObj.parentNode.removeChild(newWorkObj);
        for (let i = 0; i < workDate.length; i++) {
            if (workDate[i]['idx'] === newWorkObj['todoIndex']) {
                workDate.splice(i, 1);
            }
        }
    }
};

// 목록 정렬 함수
function sortWork(sortListObj) {
    let lis = [];
    for (let i = sortListObj.childNodes.length; i--;) {
        if (sortListObj.childNodes[i].nodeName === 'LI') {
            lis.push(sortListObj.childNodes[i]);
        }
    }
    lis.sort(function(a, b) {
        const aDate = a.querySelector('.end-date').textContent.split('-').join('');
        const bDate = b.querySelector('.end-date').textContent.split('-').join('');
        const aTime = a.getAttribute('add-time');
        const bTime = b.getAttribute('add-time');
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
    for (let i = 0; i < lis.length; i++) {
        sortListObj.appendChild(lis[i])
    }
};

// 목록 내 태그 구성
function addWorkList(workText, startDateText, endDateText, doneFlag) {
    const newWorkObj = sampleObj.cloneNode(true); // 목록 li태그 복제
    const checkBox = newWorkObj.querySelector('label input[type="checkbox"]');
    const workList = newWorkObj.querySelector('.work');
    const startDate = newWorkObj.querySelector('.start-date');
    const endDate = newWorkObj.querySelector('.end-date');
    const btnModify = newWorkObj.querySelector('.modify');
    const btnRemove = newWorkObj.querySelector('.remove');
    const addTime = new Date().getTime();// 목록 추가 시 시간 받아옴
    workList.innerText = workText;
    if (startDateText < 1 || startDateText === endDateText) {
        startDate.parentNode.removeChild(startDate);
    }
    startDate.innerText = startDateText;
    endDate.innerText = endDateText;
    checkBox.onclick = () => {doneWork(newWorkObj)};
    btnModify.onclick = () => {modifyWork(newWorkObj)};
    btnRemove.onclick = () => {removeWork(newWorkObj)};
    newWorkObj.setAttribute('add-time', addTime); // 속성 'add-time'에 추가 시 시간 등록
    todolistObj.appendChild(newWorkObj);
    if (doneFlag) { // true 일때 체크함
        doneWork(newWorkObj);
        checkBox.setAttribute('checked', 'checked');
    }
    return newWorkObj;
};

// UI
const inputDateStart = document.querySelector('#input-Date-Start');
const inputDateEnd = document.querySelector('#input-Date-End');
const inputText = document.querySelector('#input-Text');
const btnAdd = document.querySelector('#btn-Add');
// 시작일/종료일 오늘날짜로 설정
let today = new Date;
let yy = String(today.getFullYear());
let mm = String(today.getMonth() + 1).padStart(2, '0');
let dd = String(today.getDate()).padStart(2, '0');
today = `${yy}-${mm}-${dd}` 
inputDateStart.value = today;
inputDateEnd.value = today;
inputText.focus();

// 목록 추가 버튼 클릭 이벤트
btnAdd.onclick = () => {
    let workText = inputText.value;
    let startDateText = inputDateStart.value.substr('2');
    let endDateText = inputDateEnd.value.substr('2');
    if (!workText.trim()) return false;
    if (endDateText >= startDateText) {
        const newWorkObj = addWorkList(workText, startDateText, endDateText);
        sortWork(todolistObj);
        const indexArray = []; // 빈 배열(data idx값) 생성
        workDate.forEach(function(data) {
            indexArray.push(data['idx']);
        });
        let lastIndex = Math.max.apply(null, indexArray); // 배열에서 가장 큰 수
        newWorkObj['todoIndex'] = lastIndex + 1;
        workDate.push({
            idx: lastIndex + 1,
            subject: workText,
            startDate: inputDateStart.value,
            endDate: inputDateEnd.value,
            doneFlag: false,
        })
        //console.dir(newWorkObj);
    } else {
        alert('일정을 확인 하시오!');
    }
    inputText.focus();
    inputText.select();
};

// 엔터키 이벤트
inputText.onkeyup = (event) => {
    if (event.which === 13) {
        btnAdd.onclick();
    }
};