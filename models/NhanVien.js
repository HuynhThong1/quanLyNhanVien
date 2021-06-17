function NhanVien(maNhanVien, tenNhanVien, chucVu, heSoChucVu, luongCoban, soGiolamTrongThang) {
    this.maNhanVien = maNhanVien;
    this.tenNhanVien = tenNhanVien;
    this.chucVu = chucVu;
    this.heSoChucVu = heSoChucVu;
    this.luongCoban = luongCoban;
    this.soGiolamTrongThang = soGiolamTrongThang;
    this.tongLuong = function () {
        var tongluong = 0;
        switch (heSoChucVu) {
            case 1:
                tongluong = luongCoban * 1;
                return tongluong;
            case 2:
                tongluong = luongCoban * 2;
                return tongluong;
            case 3:
                tongluong = luongCoban * 3;
                return tongluong;
            default:
                break;
        }
    }
    this.xepLoai = function (){
        var xepLoai = '';
        if(soGiolamTrongThang >= 50 && soGiolamTrongThang < 80){
            xepLoai = 'Nhân Viên Trung Bình';
        }
        else if(soGiolamTrongThang >= 80 && soGiolamTrongThang < 100){
            xepLoai = 'Nhân Viên Khá';
        }
        else if(soGiolamTrongThang >= 100 && soGiolamTrongThang <= 120){
            xepLoai = 'Nhân Viên Giỏi';
        }
        else if(soGiolamTrongThang > 120){
            xepLoai = 'Nhân Viên Xuất Sắc';
        }
        else{
            xepLoai = 'Số giờ làm chưa đạt tiêu chuẩn';
        }
        return xepLoai;
    }
}