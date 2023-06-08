// Hiện header
function showHeader() {
    document.querySelector('.topHeader').classList.toggle('showHeader');
}
// Hiển thị Modal1
function showModal1() {
    document.querySelector('.modal1').classList.add('showModal1');
}

// Ẩn Modal1
function hideModal1() {
    document.querySelector('.modal1').classList.remove('showModal1');
}

// Xóa dữ liệu localStorage
function clearLS() {
    window.localStorage.clear();
}
// Lấy thông tin thời gian hoat động
function addInfoWeek() {
    let time1 = document.querySelector('#timeFrom').value;
    let time2 = document.querySelector('#timeTo').value;
    let listWeek = {
        timeFrom : time1,
        timeTo : time2,
    }
    localStorage.setItem('listTimeWork',JSON.stringify(listWeek));
}

// Lấy thông tin nội dung hoạt động

function addInfoMain() {
    let s1 = document.getElementById('lang-select');
    let value1 = s1.options[s1.selectedIndex].text;
    let value2 = document.getElementById('hour1').value;
    let value3 = document.getElementById('content1a').value;
    let value4 = document.getElementById('content1b').value;
    let value5 = document.getElementById('content1c').value;
    let listContent = localStorage.getItem("list-Content") ? JSON.parse(localStorage.getItem('list-Content')) : [];
    let obj = {
        week : value1,
        time1 : value2,
        content1 : value3,
        address1 : value4,
        componet: value5,
    }
    listContent.push(obj);
    localStorage.setItem('list-Content', JSON.stringify(listContent));
}

// Không có thông tin
function notInfo() {
    alert('Không có dữ liệu, Vui lòng nhập thông tin đầy đủ. Hoặc đóng cửa sổ để thoát. Xin cảm ơn.');
}
// Hiển thị thông tin
function renderInfo() {
    let arr0 = localStorage.getItem("listTimeWork") ? JSON.parse(localStorage.getItem('listTimeWork')) : notInfo();
    let yearFrom = arr0['timeFrom'].slice(0, 4);
    let monthFrom = arr0['timeFrom'].slice(5, 7);
    let dayFrom = arr0['timeFrom'].slice(8, 10);
    let yearTo = arr0['timeTo'].slice(0, 4);
    let monthTo = arr0['timeTo'].slice(5, 7);
    let dayTo = arr0['timeTo'].slice(8, 10);
    let DateFrom = `${dayFrom}/${monthFrom}/${yearFrom}`;
    let DateTo = `${dayTo}/${monthTo}/${yearTo}`;
    let html0 = `
        <p>LỊCH CÔNG TÁC TUẦN PHÒNG 7</p>
        <p>(Tuần từ <span>${DateFrom}</span> đến <span>${DateTo}</span>)</p>
    `
    document.querySelector('#titleMain').innerHTML = html0;
    let arr1 = localStorage.getItem("list-Content") ? JSON.parse(localStorage.getItem('list-Content')) : notInfo();
    arr1.sort(function(sv1, sv2) {
        let a = sv1.week.toLowerCase();
        let b = sv2.week.toLowerCase();
        return a === b ? 0 : a > b ? 1 : -1;
    });
    let lengthArr1 = arr1.length;
    let html1 = `
            <tr>
                <th>THỨ</th>
                <th>THỜI GIAN</th>
                <th>NỘI DUNG</th>
                <th>ĐỊA ĐIỂM</th>
                <th>THÀNH PHẦN</th>
            </tr>
    `
    for (let i = 0; i < lengthArr1; i++) {
        let html2 = `
        <tr>
            <td>${arr1[i]['week']}</td>
            <td>${arr1[i]['time1']}</td>
            <td>${arr1[i]['content1']}</td>
            <td>${arr1[i]['address1']}</td>
            <td>${arr1[i]['componet']}</td>
        </tr>
        `
        html1 = html1 + html2;
    }
    document.querySelector('#table2').innerHTML = html1;
    hideModal1();
}

// Hàm Hiện cửa sổ chỉnh sửa 
function showModal2() {
    document.querySelector('.modal2').classList.add('showModal2');
    renderInfoEdit();
}

// Hàm ẩn cửa sổ chỉnh sửa
function hideModal2() {
    document.querySelector('.modal2').classList.remove('showModal2');
    location.reload();
}

// Hàm hiện thông tin cửa sổ chỉnh sửa
function renderInfoEdit() {
    let arr1 = JSON.parse(localStorage.getItem('list-Content'));
    arr1.sort(function(sv1, sv2) {
        let a = sv1.week.toLowerCase();
        let b = sv2.week.toLowerCase();
        return a === b ? 0 : a > b ? 1 : -1;
    });
    let lengthArr1 = arr1.length;
    let html1 = `
                    <tr>
                        <th>THỨ</th>
                        <th>THỜI GIAN</th>
                        <th>NỘI DUNG</th>
                        <th>ĐỊA ĐIỂM</th>
                        <th>THÀNH PHẦN</th>
                        <th>TÙY CHỌN</th>
                    </tr>
                `
    for (let i = 0; i < lengthArr1; i++) {
        let html2 = `
        <tr>
                        <td>
                            <select name="lang" id="lang-select${i}">
                                <option value="thu2">${arr1[i]['week']}</option>
                                <option value="thu2">Thứ 2</option>
                                <option value="thu3">Thứ 3</option>
                                <option value="thu4">Thứ 4</option>
                                <option value="thu5">Thứ 5</option>
                                <option value="thu6">Thứ 6</option>
                                <option value="thu7">Thứ 7</option>
                                <option value="chunhat">Chủ nhật</option>
                        </select></td>
                        <td><input type="time" name="" id="value${i}a"></td>
                        <td><input type="text" id="value${i}b"></td>
                        <td><input type="text" id="value${i}c"></td>
                        <td><input type="text" id="value${i}d"></td>
                        <td><button onclick="editInfoMain(${i})">Sửa</button><button onclick="delInfo(${i})">Xóa</button></td>
                    </tr>
        `
        html1 = html1 + html2;
    }
    document.querySelector('#table3').innerHTML = html1;
    for (let i = 0; i < lengthArr1; i++) {
        // let value1 = arr1[i]['week'];
        let value2 = arr1[i]['time1'];
        let value3 = arr1[i]['content1'];
        let value4 = arr1[i]['address1'];
        let value5 = arr1[i]['componet'];
        // let s1 = document.getElementById('lang-select2');
        // let value1a = s1.options[s1.selectedIndex].text;
        document.getElementById(`value${i}a`).value = value2;
        document.getElementById(`value${i}b`).value = value3;
        document.getElementById(`value${i}c`).value = value4;
        document.getElementById(`value${i}d`).value = value5;
    }
}

//Hàm chỉnh sửa thông tin

function editInfoMain(i) {
    let s1 = document.getElementById(`lang-select${i}`);
    let value1 = s1.options[s1.selectedIndex].text;
    let value2 = document.getElementById(`value${i}a`).value;
    let value3 = document.getElementById(`value${i}b`).value;
    let value4 = document.getElementById(`value${i}c`).value;
    let value5 = document.getElementById(`value${i}d`).value;
    let listContent = localStorage.getItem("list-Content") ? JSON.parse(localStorage.getItem('list-Content')) : [];
    listContent[i]['week'] = value1;
    listContent[i]['time1'] = value2;
    listContent[i]['content1'] = value3;
    listContent[i]['address1'] = value4;
    listContent[i]['componet'] = value5;
    localStorage.setItem('list-Content', JSON.stringify(listContent));
}

//Hàm xóa thông tin

function delInfo(i) {
    let listContent = localStorage.getItem("list-Content") ? JSON.parse(localStorage.getItem('list-Content')) : [];
    listContent.splice(i, 1);
    localStorage.setItem('list-Content', JSON.stringify(listContent));
    renderInfoEdit();
}



// let arr1 = JSON.parse(localStorage.getItem('list-Content'));
// arr1.sort(function(sv1, sv2) {
//     let a = sv1.week.toLowerCase();
//     let b = sv2.week.toLowerCase();
//     return a === b ? 0 : a > b ? 1 : -1;
// });
// console.log(arr1);