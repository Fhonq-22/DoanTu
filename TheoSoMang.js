import { loaiBoKyTuDacBiet, loaiBoTuHienTai, xaoTron, chonTu } from './DoanTatCa.js';

let dsTu = [];
let tuHienTai = '';
let soMang = getSoMangFromURL();
let lichSuSai = [];
let soTuDoanDung = 0;
let maxStreak = 0;
let maxStreak_unit = 0;
let tongThoiGianDoan = 0;
let thoiGianBatDau = 0;
let thoiGianKetThuc = 0;

function getSoMangFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const soMang = parseInt(urlParams.get('soMang'));
    document.getElementById('soMang').textContent = soMang;
    return soMang;
}

function kiemTra() {
    const doan = document.getElementById('inputDoan').value.trim();
    if (doan === tuHienTai) {
        maxStreak_unit++;
        if (maxStreak_unit > maxStreak) {
            maxStreak = maxStreak_unit;
        }
        document.getElementById('message').textContent = 'Chính xác!';
        document.getElementById('message').classList.remove('message-incorrect');
        document.getElementById('message').classList.add('message-correct');
        document.getElementById('inputDoan').value = '';
        soTuDoanDung++;
        loaiBoTuHienTai();
        chonTu();
    } else {
        if (maxStreak_unit > maxStreak) {
            maxStreak = maxStreak_unit;
        }
        maxStreak_unit = 0;
        soMang--;
        document.getElementById('soMang').textContent = soMang;
        lichSuSai.push(tuHienTai);
        document.getElementById('message').textContent = 'Sai rồi, hãy thử lại!';
        document.getElementById('message').classList.remove('message-correct');
        document.getElementById('message').classList.add('message-incorrect');
        if (soMang === 0) {
            ketThucTroChoi();
        }
    }
}

function boQua() {
    if (soMang === 0) return;
    soMang--;
    document.getElementById('soMang').textContent = soMang;
    lichSuSai.push(tuHienTai);
    if (soMang === 0) {
        ketThucTroChoi();
    } else {
        loaiBoTuHienTai();
        chonTu();
    }
}

function capNhatLichSuSai() {
    const ul = document.getElementById('danhSachSai');
    ul.innerHTML = '';
    const lichSuCounts = {};
    lichSuSai.forEach(tu => {
        if (!lichSuCounts[tu]) {
            lichSuCounts[tu] = 1;
        } else {
            lichSuCounts[tu]++;
        }
    });
    for (const tu in lichSuCounts) {
        const li = document.createElement('li');
        li.textContent = `${tu} (${lichSuCounts[tu]})`;
        ul.appendChild(li);
    }
}

function ketThucTroChoi() {
    document.getElementById('inputDoan').disabled = true;
    document.getElementById('btnDoan').disabled = true;
    document.getElementById('btnBoQua').disabled = true;
    document.getElementById('btnHuyBo').disabled = true;
    document.getElementById('message').textContent = 'Trò chơi kết thúc!';
    thoiGianKetThuc = Date.now();
    tongThoiGianDoan = thoiGianKetThuc - thoiGianBatDau;
    hienThiKetThuc();
    capNhatLichSuSai();
}

function hienThiKetThuc() {
    const ketThucDiv = document.getElementById('ketThucDiv');
    const lichSuSai = document.getElementById('lichSuSai');
    ketThucDiv.style.display = 'block';
    lichSuSai.style.display = 'block';
    document.getElementById('maxStreak').textContent = `${maxStreak} câu`;
    document.getElementById('soTuDoanDung').textContent = `${soTuDoanDung} câu`;
    document.getElementById('tongThoiGian').textContent = `${(tongThoiGianDoan / 1000).toFixed(2)} giây`;
    document.getElementById('soMangBanDau').textContent = `${new URLSearchParams(window.location.search).get('soMang')} mạng`;
}

function choiLai() {
    soMang = getSoMangFromURL();
    soTuDoanDung = 0;
    tongThoiGianDoan = 0;
    lichSuSai = [];
    document.getElementById('soMang').textContent = soMang;
    document.getElementById('inputDoan').disabled = false;
    document.getElementById('btnDoan').disabled = false;
    document.getElementById('btnBoQua').disabled = false;
    document.getElementById('inputDoan').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('ketThucDiv').style.display = 'none';
    document.getElementById('lichSuSai').style.display = 'none';
    capNhatLichSuSai();
    chonTu();
}

document.getElementById('inputDoan').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        kiemTra();
    }
});
document.getElementById('btnDoan').addEventListener('click', kiemTra);
document.getElementById('btnBoQua').addEventListener('click', boQua);
document.getElementById('btnHuyBo').addEventListener('click', () => {
    document.getElementById('inputDoan').value = '';
    document.getElementById('message').textContent = '';
});
document.getElementById('choiLai').addEventListener('click', choiLai);
document.getElementById('troVeTrangChu').addEventListener('click', function() {
    window.location.href = 'TrangChu.html';
});

fetch('https://raw.githubusercontent.com/Fhonq-22/DoanTu/main/Data.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error('Mạng không ổn định');
        }
        return response.text();
    })
    .then(data => {
        dsTu = data.trim().split('\n').map(tu => tu.trim());
        thoiGianBatDau = Date.now();
        chonTu();
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });
