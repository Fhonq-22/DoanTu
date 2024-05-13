function loaiBoKyTuDacBiet(tu) {
    return tu.replace(/[\n\r]/g, '');
}

function loaiBoTuHienTai() {
    const index = dsTu.indexOf(tuHienTai);
    if (index !== -1) {
        dsTu.splice(index, 1);
        console.log("Mảng dsTu sau khi loại bỏ '"+tuHienTai+"':", dsTu);
    }
}

function chonTu() {
    if (dsTu.length === 0) {
        document.getElementById('message').textContent = 'Bạn đã đoán hết tất cả các từ!';
        document.getElementById('inputDoan').disabled = true;
        document.getElementById('btnDoan').disabled = true;
        return;
    }
    const index = Math.floor(Math.random() * dsTu.length);
    tuHienTai = dsTu[index];
    tuHienTai = loaiBoKyTuDacBiet(tuHienTai);
    const tuXaoTron = xaoTron(tuHienTai.replace(/\s/g, ''));
    document.getElementById('word').textContent = tuXaoTron;
    console.log('Từ hiện tại đã được chọn:', tuHienTai);
}

function xaoTron(word) {
    let characters = word.split('');
    for (let i = characters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    return characters.join('/');
}

function kiemTra() {
    const doan = document.getElementById('inputDoan').value.trim();
    if (doan === tuHienTai) {
        document.getElementById('message').textContent = 'Chính xác!';
        document.getElementById('message').classList.remove('message-incorrect');
        document.getElementById('message').classList.add('message-correct');
        document.getElementById('inputDoan').value = '';
        loaiBoTuHienTai();
        chonTu();
    } else {
        console.log('.'+doan+'.');
        console.log('.'+tuHienTai+'.');
        document.getElementById('message').textContent = 'Sai rồi, hãy thử lại!';
        document.getElementById('message').classList.remove('message-correct');
        document.getElementById('message').classList.add('message-incorrect');
    }
}

document.getElementById('btnDoan').addEventListener('click', kiemTra);
document.getElementById('inputDoan').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        kiemTra();
    }
});

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
        // Xử lý dữ liệu
        dsTu = data.trim().split('\n').map(tu => tu.trim());
        console.log('Mảng dsTu ban đầu:', dsTu);
        chonTu();
    })

    .catch(error => {
        console.error('Đã xảy ra sự cố khi tìm nạp dữ liệu:', error);
    });

export { loaiBoKyTuDacBiet };
export { loaiBoTuHienTai };
export { chonTu };
export { xaoTron };
export { kiemTra };
