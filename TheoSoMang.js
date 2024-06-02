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

function ketThucTroChoi() {
    document.getElementById('inputDoan').disabled = true;
    document.getElementById('btnDoan').disabled = true;
    document.getElementById('btnBoQua').disabled = true;
    document.getElementById('ketThucDiv').style.display = 'block';
    document.getElementById('soTuDoanDung').textContent = soTuDoanDung;
    document.getElementById('lichSuSai').textContent = lichSuSai.join(', ');
    document.getElementById('maxStreak').textContent = " " + maxStreak;
    thoiGianKetThuc = new Date().getTime();
    tongThoiGianDoan = (thoiGianKetThuc - thoiGianBatDau) / 1000;
    document.getElementById('tongThoiGianDoan').textContent = tongThoiGianDoan.toFixed(2) + ' giây';
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnDoan').addEventListener('click', kiemTra);
    document.getElementById('inputDoan').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            kiemTra();
            document.getElementById('btnDoan').focus();
        }
    });

    document.getElementById('btnBoQua').addEventListener('click', boQua);

    document.getElementById('troVeTrangChu').addEventListener('click', function() {
        window.location.href = 'TrangChu.html';
    });

    document.getElementById('choiLai').addEventListener('click', function() {
        location.reload();
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
            console.log('Mảng dsTu ban đầu:', dsTu);
            chonTu();
        })
        .catch(error => {
            console.error('Đã xảy ra sự cố khi tìm nạp dữ liệu:', error);
        });

    thoiGianBatDau = new Date().getTime();
});
