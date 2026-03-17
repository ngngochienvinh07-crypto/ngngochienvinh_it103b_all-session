let list = [];

let code = document.getElementById("product-code");
let name = document.getElementById("product-name");
let price = document.getElementById("product-price");

function update() {
    let getInput = name.value;
}

function validateProduct(code, name, price) {
    // Validate mã
    if (!code || code.trim() === '') {
        alert('Mã sản phẩm không được để trống!');
        return false;
    }

    // Kiểm tra trùng mã (khi thêm mới)
    if (isAdding && products.some(p => p.code === code)) {
        alert('Mã sản phẩm đã tồn tại!');
        return false;
    }

    // Validate tên
    if (!name || name.trim() === '') {
        alert('Tên sản phẩm không được để trống!');
        return false;
    }

    if (name.trim().length < 3) {
        alert('Tên sản phẩm phải có ít nhất 3 ký tự!');
        return false;
    }

    // Validate giá
    if (!price || price === '') {
        alert('Giá sản phẩm không được để trống!');
        return false;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
        alert('Giá sản phẩm phải là số dương!');
        return false;
    }

    if (priceNum < 1000) {
        alert('Giá sản phẩm phải tối thiểu 1,000 đ!');
        return false;
    }

    return true;
}