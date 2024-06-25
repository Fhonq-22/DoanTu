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
        document.getElementById('btnBoQua').disabled = true;
        hienThiKetThuc();
        return;
    }
    const index = Math.floor(Math.random() * dsTu.length);
    tuHienTai = loaiBoKyTuDacBiet(dsTu[index]);
    const tuXaoTron = xaoTron(tuHienTai.replace(/\s/g, ''));
    document.getElementById('word').textContent = tuXaoTron;
    console.log('Từ hiện tại đã được chọn:', tuHienTai);
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
        if (maxStreak_unit > maxStreak) {
            maxStreak = maxStreak_unit;
        }

        document.getElementById('message').textContent = 'Chính xác!';
        document.getElementById('message').classList.remove('message-incorrect');
        document.getElementById('message').classList.add('message-correct');
        document.getElementById('inputDoan').value = '';
        loaiBoTuHienTai();
        chonTu();
    } else {
        if (maxStreak_unit > maxStreak) {
            maxStreak = maxStreak_unit;
        }
        maxStreak_unit = 0;
        soLanDoanSai++;

        document.getElementById('message').textContent = 'Sai rồi, hãy thử lại!';
        document.getElementById('message').classList.remove('message-correct');
        document.getElementById('message').classList.add('message-incorrect');
    }
    document.getElementById('inputDoan').value = '';
}

function boQua() {
    if (soLanBoQua > 0) {
        soLanBoQua--;
        document.getElementById('boQuaCount').textContent = soLanBoQua;
        document.getElementById('message').textContent = `Đáp án: ${tuHienTai}`;
        document.getElementById('message').classList.remove('message-incorrect', 'message-correct');

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
    document.getElementById('message').textContent = '';
    document.getElementById('ketThucDiv').style.display = 'block';
    document.getElementById('maxStreak').textContent = " " + maxStreak;

    document.getElementById('btnDoan').disabled = true;
    document.getElementById('btnBoQua').disabled = true;
    document.getElementById('btnKetThuc').disabled = true;
    document.getElementById('inputDoan').disabled = true;
}

function chiaSeThanhTich() {
    const streak = maxStreak;
    const right = soTuDoanDung;
    const wrong = soLanDoanSai;
    const time = (tongThoiGianDoan / 1000).toFixed(2);
    const skip = 5 - soLanBoQua;

    const data = {
        type: 'all',
        streak: streak,
        right: right,
        wrong: wrong,
        time: time,
        skip: skip
    };

    const encodedData = encodeBase64(JSON.stringify(data));

    const shareData = {
        title: 'Thành tích Đoán từ theo số mạng',
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

document.getElementById('inputDoan').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        kiemTra();
        document.getElementById('btnDoan').focus();
    }
});
document.getElementById('btnDoan').addEventListener('click', kiemTra);
document.getElementById('btnBoQua').addEventListener('click', boQua);
document.getElementById('btnKetThuc').addEventListener('click', hienThiKetThuc);
document.getElementById('btnKetThuc').disabled = true;
document.getElementById('troVeTrangChu').addEventListener('click', function() {
    window.location.href = 'TrangChu.html';
});
document.getElementById('choiLai').addEventListener('click', function() {
    location.reload();
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
        console.log('Mảng dsTu ban đầu:', dsTu);
        chonTu();
    })
    .catch(error => {
        console.error('Đã xảy ra sự cố khi tìm nạp dữ liệu:', error);
    });
