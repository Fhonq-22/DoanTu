let timeConLai = 0;
let timer;
let dsTu = [];
let tuHienTai = '';
let maxStreak = 0;
let maxStreak_unit = 0;
let tongThoiGianDoan = 0;
let thoiGianBatDau = 0;
let lichSuSai = [];
let soTuDoanDung = 0;
let soLanBoQua = 0;

function loaiBoKyTuDacBiet(tu) {
    return tu.replace(/[\n\r]/g, '');
}

function loaiBoTuHienTai() {
    const index = dsTu.indexOf(tuHienTai);
    if (index !== -1) {
        dsTu.splice(index, 1);
        console.log("Mảng dsTu sau khi loại bỏ '" + tuHienTai + "':", dsTu);
    }
}

function xaoTron(word) {
    let characters = word.split('');
    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    return characters.join('/');
}

function chonTu() {
    if (dsTu.length === 0) {
        document.getElementById('message').textContent = 'Bạn đã đoán hết tất cả các từ!';
        document.getElementById('inputDoan').disabled = true;
        document.getElementById('btnDoan').disabled = true;
        hienThiKetThuc();
        return;
    }
    const index = Math.floor(Math.random() * dsTu.length);
    tuHienTai = loaiBoKyTuDacBiet(dsTu[index]);
    const tuXaoTron = xaoTron(tuHienTai.replace(/\s/g, ''));
    document.getElementById('word').textContent = tuXaoTron;
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
        maxStreak_unit = 0;
        lichSuSai.push(tuHienTai);
        document.getElementById('message').textContent = 'Sai rồi, hãy thử lại!';
        document.getElementById('message').classList.remove('message-correct');
        document.getElementById('message').classList.add('message-incorrect');
    }
    document.getElementById('inputDoan').value = '';
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
    const lichSuSaiDiv = document.getElementById('lichSuSai');
    const endGameContainer = document.querySelector('.end-game-container');
    
    ketThucDiv.style.display = 'block';
    lichSuSaiDiv.style.display = 'block';
    endGameContainer.style.display = 'flex';
    
    document.getElementById('maxStreak').textContent = `${maxStreak} câu`;
    document.getElementById('soTuDoanDung').textContent = `${soTuDoanDung} câu`;
    document.getElementById('tongThoiGian').textContent = `${(tongThoiGianDoan / 1000).toFixed(2)} giây`;
    document.getElementById('soLanBoQua').textContent = `${soLanBoQua} lần`;
    
    const btnBoQua = document.getElementById('btnBoQua');
    btnBoQua.disabled = true;
    if (timeConLai > 15) {
        btnBoQua.disabled = false;
    }
}

function batDauDoanTheoThoiGian() {
    const urlParams = new URLSearchParams(window.location.search);
    const timeDuocChon = parseInt(urlParams.get('thoiGian'));
    timeConLai = timeDuocChon;

    chonTu();
    thoiGianBatDau = Date.now();
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
    lichSuSai.push(tuHienTai);
    document.getElementById('message').textContent = 'Hết thời gian!';
    document.getElementById('inputDoan').disabled = true;
    document.getElementById('btnDoan').disabled = true;
    ketThucTroChoi();
}

function boQua() {
    if (timeConLai <= 15) {
        document.getElementById('message').textContent = 'Thời gian quá ít, không thể bỏ qua!';
        return;
    }
    
    lichSuSai.push(tuHienTai);
    soLanBoQua++;
    timeConLai -= 15;
    chonTu();
    hienThiThoiGianConLai();
}

function chiaSeThanhTich() {
    const streak = maxStreak;
    const right = soTuDoanDung;
    const time = (tongThoiGianDoan / 1000).toFixed(2);
    const skip = soLanBoQua;
    const wrong = new Set(lichSuSai).size;

    const data = {
        type: 'time',
        streak: streak,
        right: right,
        wrong: wrong,
        time: time,
        skip: skip
    };

    const encodedData = encodeBase64(JSON.stringify(data));

    const shareData = {
        title: 'Thành tích Đoán từ theo thời gian',
        text: `Xem thành tích của tôi tại:`,
        url: `${window.location.origin}/DoanTu/ThanhTich.html?data=${encodedData}`
    };

    navigator.share(shareData)
        .then(() => console.log('Chia sẻ thành công!'))
        .catch((error) => console.error('Lỗi khi chia sẻ:', error));
}

function encodeBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
}

document.getElementById('btnDoan').addEventListener('click', kiemTra);
document.getElementById('inputDoan').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        kiemTra();
    }
});
document.getElementById('btnBoQua').addEventListener('click', boQua);
document.getElementById('btnHuyBo').addEventListener('click', () => {
    document.getElementById('inputDoan').value = '';
    document.getElementById('message').textContent = '';
});
document.getElementById('choiLai').addEventListener('click', function() {
    location.reload();
});
document.getElementById('troVeTrangChu').addEventListener('click', function() {
    window.location.href = 'TrangChu.html';
});
document.getElementById('chiaSeThanhTich').addEventListener('click', chiaSeThanhTich);

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
