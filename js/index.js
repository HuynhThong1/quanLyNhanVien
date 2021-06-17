document.getElementById('btnLuuThongTin').style.display = 'none';
function getNhanVienAPI() {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',
        responseType: 'json'
    });

    promise.then(function (result) {
        console.log(result.data);

        renderTableNhanVien(result.data);
    })

    promise.catch(function (error) {
        console.log('error', error);
    })
}
getNhanVienAPI();

function renderTableNhanVien(arrNV) {
    var content = '';
    for (var i = 0; i < arrNV.length; i++) {
        var nv = arrNV[i];

        var nhanVien = new NhanVien(nv.maNhanVien, nv.tenNhanVien, nv.chucVu, nv.heSoChucVu, nv.luongCoBan, nv.soGioLamTrongThang);

        var trNhanVien = `
            <tr>
                <td>${nhanVien.maNhanVien}</td>
                <td>${nhanVien.tenNhanVien}</td>
                <td>${nhanVien.chucVu}</td>
                <td>${nhanVien.luongCoban}</td>
                <td>${nhanVien.tongLuong()}</td>
                <td>${nhanVien.soGiolamTrongThang}</td>
                <td>${nhanVien.xepLoai()}</td>
                <td><button class="btn btn-primary" onclick="suaThongTin('${nhanVien.maNhanVien}')">Sửa</button> <button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')">Xóa</button></td>
            </tr>
        `;
        content += trNhanVien;
    }
    if (content != null) {
        document.querySelector('#tblNhanVien').innerHTML = content;
    }
}

var kiemTraDuLieu = new validation();

document.querySelector('#btnThemNhanVien').onclick = function (e) {
    e.preventDefault();

    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;


    var x = document.querySelector('#chucVu').value;
    var chucVuNV = x;
    y = '';
    if (chucVuNV == 3) {
        y = 'Giám Đốc';
    } else if (chucVuNV == 2) {
        y = 'Quản Lý';
    } else {
        y = 'Nhân Viên';
    }
    console.log('ChucVu', y);
    nhanVien.chucVu = y;


    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    var valid = true;

    //kiểm tra rỗng
    valid &= kiemTraDuLieu.kiemTraRong(nhanVien.maNhanVien, '#error_required_maNhanVien', 'Mã Nhân Viên')
        & kiemTraDuLieu.kiemTraRong(nhanVien.tenNhanVien, '#error_required_tenNhanVien', 'Tên Nhân Viên')
        & kiemTraDuLieu.kiemTraRong(nhanVien.luongCoBan, '#error_required_luongCoBan', 'Lương Cơ Bản')
        & kiemTraDuLieu.kiemTraRong(nhanVien.soGioLamTrongThang, '#error_required_soGioLamTrongThang', 'Số Giờ Làm Trong Tháng');

    //Kiểm tra mã nhân viên 4 - 6 ký tự

    valid &= kiemTraDuLieu.kiemTraDoDai(nhanVien.maNhanVien, '#error_limited_maNhanVien', 4, 6, 'Mã Nhân Viên');


    //kiểm tra tên nhân viên phải là chữ

    valid &= kiemTraDuLieu.kiemTraTatCaKyTu(nhanVien.tenNhanVien, '#error_text_tenNhanVien', 'Tên Nhân Viên');

    //kiểm tra lương cơ bản từ 1tr - 20tr

    valid &= kiemTraDuLieu.kiemTraGiaTri(nhanVien.luongCoBan, '#error_range_luongCoBan', 1000000, 20000000, 'Lương Cơ Bản', 'triệu đồng!!!');

    //kiểm tra số giờ làm từ 50 = 150 giờ

    valid &= kiemTraDuLieu.kiemTraGiaTri(nhanVien.soGioLamTrongThang, '#error_limited_soGioLamTrongThang', 50, 150, 'Số Giờ Làm Trong Tháng', 'giờ!!!')


    if (!valid) {
        return;
    }

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        method: 'POST',
        data: nhanVien,
    });

    promise.then(function (result) {
        console.log('result', result);
        getNhanVienAPI();
        alert('Thêm nhân viên thành công!');
        document.querySelector('#maNhanVien').value = '';
        document.querySelector('#tenNhanVien').value = '';
        document.querySelector('#chucVu').value = '';
        document.querySelector('#luongCoBan').value = '';
        document.querySelector('#soGioLamTrongThang').value = '';
    })

    promise.catch(function (error) {
        console.log('error', error);
    })



}

function xoaNhanVien(maNV) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNV}`,
        method: 'DELETE'
    });

    promise.then(function (result) {
        console.log('result', result.data);
        getNhanVienAPI();
        alert('Xóa nhân viên thành công!');
    })

    promise.catch(function (error) {
        console.log('error', error.response.data);
    })
}


function suaThongTin(maNV) {
    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNV}`,
        method: 'GET'
    })


    promise.then(function (result) {
        console.log('result', result.data);


        var nhanVien = result.data;

        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
        document.querySelector('#chucVu').value = nhanVien.heSoChucVu;
        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
        document.querySelector('#soGioLamTrongThang').value = nhanVien.soGioLamTrongThang;
    })

    promise.catch(function (error) {
        console.log('error', error.response.data);
    })

    document.getElementById('btnThemNhanVien').style.display = 'none';
    document.getElementById('btnLuuThongTin').style.display = 'block';
    document.getElementById('btnLuuThongTin').style.float = 'right';
}

document.querySelector('#btnLuuThongTin').onclick = function (e) {
    e.preventDefault();
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;

    var x = document.querySelector('#chucVu').value;
    var chucVuNV = x;
    y = '';
    if (chucVuNV == 3) {
        y = 'Giám Đốc';
    } else if (chucVuNV == 2) {
        y = 'Quản Lý';
    } else {
        y = 'Nhân Viên';
    }
    console.log('ChucVu', y);
    nhanVien.chucVu = y;


    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    var valid = true;

    //kiểm tra rỗng
    valid &= kiemTraDuLieu.kiemTraRong(nhanVien.maNhanVien, '#error_required_maNhanVien', 'Mã Nhân Viên')
        & kiemTraDuLieu.kiemTraRong(nhanVien.tenNhanVien, '#error_required_tenNhanVien', 'Tên Nhân Viên')
        & kiemTraDuLieu.kiemTraRong(nhanVien.luongCoBan, '#error_required_luongCoBan', 'Lương Cơ Bản')
        & kiemTraDuLieu.kiemTraRong(nhanVien.soGioLamTrongThang, '#error_required_soGioLamTrongThang', 'Số Giờ Làm Trong Tháng');

    //Kiểm tra mã nhân viên 4 - 6 ký tự

    valid &= kiemTraDuLieu.kiemTraDoDai(nhanVien.maNhanVien, '#error_limited_maNhanVien', 4, 6, 'Mã Nhân Viên');


    //kiểm tra tên nhân viên phải là chữ

    valid &= kiemTraDuLieu.kiemTraTatCaKyTu(nhanVien.tenNhanVien, '#error_text_tenNhanVien', 'Tên Nhân Viên');

    //kiểm tra lương cơ bản từ 1tr - 20tr

    valid &= kiemTraDuLieu.kiemTraGiaTri(nhanVien.luongCoBan, '#error_range_luongCoBan', 1000000, 20000000, 'Lương Cơ Bản', 'triệu đồng!!!');

    //kiểm tra số giờ làm từ 50 = 150 giờ

    valid &= kiemTraDuLieu.kiemTraGiaTri(nhanVien.soGioLamTrongThang, '#error_limited_soGioLamTrongThang', 50, 150, 'Số Giờ Làm Trong Tháng', 'giờ!!!')


    if (!valid) {
        return;
    }


    var promise = axios({
        url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVien.maNhanVien}`,
        method: 'PUT',
        data: nhanVien
    })

    promise.then(function (result) {
        console.log('result', result.data);

        getNhanVienAPI();
        alert('Sửa thông tin thành công!');
        document.querySelector('#maNhanVien').value = '';
        document.querySelector('#tenNhanVien').value = '';
        document.querySelector('#chucVu').value = '';
        document.querySelector('#luongCoBan').value = '';
        document.querySelector('#soGioLamTrongThang').value = '';
        document.getElementById('btnThemNhanVien').style.display = 'block';
        document.getElementById('btnLuuThongTin').style.display = 'none';
        document.getElementById('btnThemNhanVien').style.float = 'right';

    })

    promise.then(function (error) {
        console.log('error', error.response.data);
    })
}





