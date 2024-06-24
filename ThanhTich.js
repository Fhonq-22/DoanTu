const url = new URLSearchParams(window.location.search);
const data = giaiMaDuLieu(url.get('data'));

function giaiMaDuLieu(mahoa) {
    const giaima = decodeURIComponent(escape(atob(mahoa)));
    return JSON.parse(giaima);
}

function getType() {
    return data.type;
}
function getStreak() {
    return data.streak;
}

function getRight() {
    return data.right;
}

function getWrong() {
    return data.wrong;
}

function getTime() {
    return data.time;
}

function getSkip() {
    return data.skip;
}



function hienThiThanhTich(type) {
    document.getElementById('maxStreak').textContent = getStreak() + " câu";
    document.getElementById('soTuDoanDung').textContent = getRight() + " câu";
    document.getElementById('soTuDoanSai').textContent = getWrong() + " câu";
    document.getElementById('tiLeDoanDung').textContent = (getRight()/(getRight()+getWrong())*100).toFixed(0) + '%';
    document.getElementById('tongThoiGian').textContent = getTime() + " giây";
    document.getElementById('soLanBoQua').textContent = getSkip() + " lần";
    switch (type) {
        case 'time':
            document.getElementById('type').textContent = 'Theo thời gian';
            document.getElementById('tongThoiGian').textContent = (parseFloat(getTime())+parseInt(getSkip())*15) + " giây";
            break;
        case 'heart':
            document.getElementById('type').textContent = 'Theo số mạng';
            break;
        case 'all':
            document.getElementById('type').textContent = 'Theo tất cả';
            break;
        default:
            document.getElementById('type').textContent = 'Khác';
            break;
    }
}

function themIconNgauNhien() {
    const thanhTichDivs = document.querySelectorAll('.thanhTich > div');
    const randomIndex = Math.floor(Math.random() * thanhTichDivs.length);
    const randomDiv = thanhTichDivs[randomIndex];

    const starIcon = document.createElement('i');
    starIcon.classList.add('fi', 'fi-sr-star', 'star-icon');
    starIcon.style.fontSize = '0.7em';

    const divWidth = randomDiv.offsetWidth;
    const divHeight = randomDiv.offsetHeight;
    const randomTop = Math.random() * (divHeight - 40);
    const randomLeft = Math.random() * (divWidth - 40);

    starIcon.style.top = `${randomTop}px`;
    starIcon.style.left = `${randomLeft}px`;

    randomDiv.appendChild(starIcon);

    setTimeout(() => {
        starIcon.style.transform = 'rotate(360deg)';
    }, 10);

    setTimeout(() => {
        starIcon.remove();
    }, 2000);
}

setInterval(() => {
    for (let i = 0; i < 5; i++) {
        themIconNgauNhien();
    }
}, 1000);

hienThiThanhTich(getType());