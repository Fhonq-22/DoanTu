let timeConLai = 0;
let timer;

function batDauDoanTheoThoiGian() {
    const urlParams = new URLSearchParams(window.location.search);
    const timeDuocChon = parseInt(urlParams.get('thoiGian'));
    timeConLai = timeDuocChon;

    chonTu();
    hienThiThoiGianConLai();
    timer = setInterval(function() {
        timeConLai--;
        hienThiThoiGianConLai();
        if (timeConLai <= 0) {
            clearInterval(timer);
            hetThoiGian();
        }
    }, 1000);
}

function hienThiThoiGianConLai() {
    document.getElementById('timeConLai').textContent = `Thời gian còn lại: ${timeConLai} giây`;
}

function hetThoiGian() {
    document.getElementById('message').textContent = 'Hết thời gian!';
    document.getElementById('inputDoan').disabled = true;
    document.getElementById('btnDoan').disabled = true;
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
        batDauDoanTheoThoiGian();
    })
    .catch(error => {
        console.error('Đã xảy ra sự cố khi tìm nạp dữ liệu:', error);
    });

import { loaiBoKyTuDacBiet } from 'DoanTatCa.js';
import { loaiBoTuHienTai } from 'DoanTatCa.js';
import { chonTu } from 'DoanTatCa.js';
import { xaoTron } from 'DoanTatCa.js';
import { kiemTra } from 'DoanTatCa.js';