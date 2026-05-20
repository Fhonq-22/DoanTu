import { layDanhSachTu2AmTiet, layTu2AmTiet } from "../Controllers/Tu2AmTietController.js";

let dsTu = [];
let tuHienTai = '';
let soLanBoQua = 5;
let maxStreak = 0;
let maxStreak_unit = 0;
let soTuDoanDung = 0;
let soLanDoanSai = 0;
let tongThoiGianDoan = 0;
let batDauThoiGian = Date.now();
let daDoanLanDau = false;

function loaiBoKyTuDacBiet(tu) {
    return tu.replace(/[\n\r]/g, '');
}

function loaiBoTuHienTai() {
    const index = dsTu.indexOf(tuHienTai);
    if (index !== -1) dsTu.splice(index, 1);
}

function xaoTron(word) {
    return word
        .replace(/\s/g, '')
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('/');
}

function chonTu() {
    if (dsTu.length === 0) {
        document.getElementById('message').textContent = 'Bạn đã đoán hết tất cả các từ!';
        document.getElementById('inputDoan').disabled = true;
        document.getElementById('btnDoan').disabled = true;
        document.getElementById('btnBoQua').disabled = true;
        hienThiKetThuc();
        return;
    }

    const index = Math.floor(Math.random() * dsTu.length);
    tuHienTai = dsTu[index];
    const tuXaoTron = xaoTron(tuHienTai);
    document.getElementById('word').textContent = tuXaoTron;
}

function kiemTra() {
    const doan = document.getElementById('inputDoan').value.trim();
    tongThoiGianDoan += Date.now() - batDauThoiGian;
    batDauThoiGian = Date.now();

    if (!daDoanLanDau) {
        document.getElementById('btnKetThuc').disabled = false;
        daDoanLanDau = true;
    }

    if (doan === tuHienTai) {
        maxStreak_unit++;
        soTuDoanDung++;

        if (maxStreak_unit > maxStreak) maxStreak = maxStreak_unit;

        document.getElementById('message').textContent = 'Chính xác!';
        document.getElementById('message').className = 'message-correct';

        document.getElementById('inputDoan').value = '';
        loaiBoTuHienTai();
        chonTu();
    } else {
        if (maxStreak_unit > maxStreak) maxStreak = maxStreak_unit;

        maxStreak_unit = 0;
        soLanDoanSai++;

        document.getElementById('message').textContent = 'Sai rồi, hãy thử lại!';
        document.getElementById('message').className = 'message-incorrect';
    }

    document.getElementById('inputDoan').value = '';
}

function boQua() {
    if (soLanBoQua > 0) {
        soLanBoQua--;
        document.getElementById('boQuaCount').textContent = soLanBoQua;
        document.getElementById('message').textContent = `Đáp án: ${tuHienTai}`;
        document.getElementById('message').className = '';

        if (soLanBoQua === 0) {
            document.getElementById('btnBoQua').disabled = true;
            document.getElementById('boQuaCount').textContent = 'Hết';
        }

        setTimeout(() => {
            chonTu();
            document.getElementById('message').textContent = '';
        }, 2000);
    }
}

function hienThiKetThuc() {
    document.getElementById('ketThucDiv').style.display = 'block';
    document.getElementById('maxStreak').textContent = maxStreak;

    document.getElementById('btnDoan').disabled = true;
    document.getElementById('btnBoQua').disabled = true;
    document.getElementById('btnKetThuc').disabled = true;
    document.getElementById('inputDoan').disabled = true;
}

function encodeBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

function chiaSeThanhTich() {
    const data = {
        type: 'all',
        streak: maxStreak,
        right: soTuDoanDung,
        wrong: soLanDoanSai,
        time: (tongThoiGianDoan / 1000).toFixed(2),
        skip: 5 - soLanBoQua
    };

    const encodedData = encodeBase64(JSON.stringify(data));

    navigator.share({
        title: 'Thành tích Đoán từ',
        text: 'Xem thành tích của tôi tại:',
        url: `${window.location.origin}/DoanTu/ThanhTich.html?data=${encodedData}`
    });
}

function bindEvents() {
    document.getElementById('inputDoan').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') kiemTra();
    });

    document.getElementById('btnDoan').addEventListener('click', kiemTra);
    document.getElementById('btnBoQua').addEventListener('click', boQua);
    document.getElementById('btnKetThuc').addEventListener('click', hienThiKetThuc);

    document.getElementById('troVeTrangChu').addEventListener('click', () => {
        window.location.href = 'TrangChu.html';
    });

    document.getElementById('choiLai').addEventListener('click', () => {
        location.reload();
    });

    document.getElementById('chiaSeThanhTich').addEventListener('click', chiaSeThanhTich);
}

async function init() {
    bindEvents();

    const keys = await layDanhSachTu2AmTiet();

    const allWords = [];

    for (const key of keys) {
        const obj = await layTu2AmTiet(key);
        if (!obj || !obj.danhSachAmTietCuoi) continue;

        const list = obj.danhSachAmTietCuoi
            .split(",")
            .map(x => x.trim())
            .filter(Boolean);

        allWords.push(key, ...list);
    }

    dsTu = allWords;
    chonTu();
}

init();