let soMangConLai = 0;

function batDauDoanTheosoMangConLai() {
    const urlParams = new URLSearchParams(window.location.search);
    const mangDuocChon = parseInt(urlParams.get('soMang'));
    soMangConLai = mangDuocChon;

    chonTu();
    hienThiSoMangConLai();
}

function hienThiSoMangConLai() {
    document.getElementById('mangConLai').textContent = `Số mạng còn lại: ${soMangConLai}`;
}

function hetMang() {
    document.getElementById('message').textContent = 'Hết số mạng!';
    document.getElementById('inputDoan').disabled = true;
    document.getElementById('btnDoan').disabled = true;
}

document.getElementById('btnDoan').addEventListener('click', kiemTra);
document.getElementById('inputDoan').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        kiemTra();
    }
});
// import { kiemTra } from './DoanTatCa.js';
function kiemTra() {
    const doan = document.getElementById('inputDoan').value.trim();
    if (doan === tuHienTai) {
        document.getElementById('message').textContent = 'Chính xác!';
        document.getElementById('inputDoan').value = '';
        loaiBoTuHienTai();
        chonTu();
    } else {
        document.getElementById('message').textContent = 'Sai rồi, hãy thử lại!';
        soMangConLai--;
        document.getElementById('mangConLai').textContent = `Số mạng còn lại: ${soMangConLai}`;
        if (soMangConLai <= 0) {
            hetMang();
        }
    }
}

let dsTu = [];
let tuHienTai = '';

fetch('https://raw.githubusercontent.com/Fhonq-22/DoanTu/main/Data.txt')
    .then(response => {
        if (!response.ok) {
            throw new Error('Mạng không ổn định');
        }
        return response.text();
    })
    .then(data => {
        dsTu = data.trim().split('\n').map(tu => tu.trim());
        batDauDoanTheosoMangConLai();
    })
    .catch(error => {
        console.error('Đã xảy ra sự cố khi tìm nạp dữ liệu:', error);
    });

import { loaiBoKyTuDacBiet } from './DoanTatCa.js';
import { loaiBoTuHienTai } from './DoanTatCa.js';
import { chonTu } from './DoanTatCa.js';
import { xaoTron } from './DoanTatCa.js';