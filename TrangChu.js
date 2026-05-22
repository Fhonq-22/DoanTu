function hienThiChonSoMang() {
    document.getElementById('chonSoMang').style.display = 'block';
    document.getElementById('chonThoiGian').style.display = 'none';
    document.querySelector('.container').classList.add('option-visible');
}

function hienThiChonThoiGian() {
    document.getElementById('chonThoiGian').style.display = 'block';
    document.getElementById('chonSoMang').style.display = 'none';
    document.querySelector('.container').classList.add('option-visible');
}

function quayLaiTuChonSoMang() {
    document.getElementById('chonSoMang').style.display = 'none';
    document.querySelector('.container').classList.remove('option-visible');
}

function quayLaiTuChonThoiGian() {
    document.getElementById('chonThoiGian').style.display = 'none';
    document.querySelector('.container').classList.remove('option-visible');
}

function chuyenDenTheoSoMang() {
    const soMang = document.getElementById('soMang').value;
    window.location.href = 'TheoSoMang.html?soMang=' + soMang;
}

function chuyenDenTheoThoiGian() {
    const thoiGian = document.getElementById('thoiGian').value;
    window.location.href = 'TheoThoiGian.html?thoiGian=' + thoiGian;
}

function chuyenDenDoanTatCa() {
    window.location.href = 'DoanTatCa.html';
}
