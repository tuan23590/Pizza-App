export const typeDefs = `#graphql

type DonHang {
    id: String,
    maDonHang: String,
    tenKhachHang: String,
    soDienThoai: String,
    email: String,
    ngayDatHang: String,
    thoiGianGiaoHang: String,
    diaChiGiaoHang: String,
    tamTinh: Float,
    giamGia: Float,
    tongTien: Float,
    ghiChuDiaChi: String,
    phuongThucThanhToan: String,
    trangThai: [TrangThaiGiaoHang],
    danhSachSanPham: [SanPhamDaMua]
},
type TrangThaiGiaoHang {
    id: String,
    thoiGian: String,
    trangThai: String,
    lyDoHuyDonHang: String,
},
type DanhMuc {
    id: String,
    tenDanhMuc: String,
    maDanhMuc: String,
    soLuongSanPham: Int,
    trangThai: String,
},

type SanPham {
    id: String,
    maSanPham: String,
    tenSanPham: String,
    kichThuoc: String,
    moTa: String,
    hinhAnh: String,
    danhMuc: DanhMuc,
    trangThai: String,
    loaiDe: String,
    giaSanPham: Float,
    soLuong: Int,
    donViTinh: String,
},

type SanPhamDaMua {
    maDonHang: String,
    maSanPham: String,
    tenSanPham: String,
    kichThuoc: String,
    soLuong: Int,
    moTa: String,
    hinhAnh: String,
    danhMuc: String,
    giaSanPham: Float,
    loaiDe: String,
    donViTinh: String,
},

type TinhTp {
    name: String,
    slug: String,
    type: String,
    name_with_type: String,
    code: String,
},
type QuanHuyen{
    name: String,
    type: String,
    slug: String,
    name_with_type: String,
    path: String,
    path_with_type: String,
    code: String,
    parent_code: String,
},
type XaPhuong {
    name: String,
    type: String,
    slug: String,
    name_with_type: String,
    path: String,
    path_with_type: String,
    code: String,
    parent_code: String,
},
type NhaCungCap {
    id: String,
    maNhaCungCap: String,
    tenNhaCungCap: String,
    soDienThoai: String,
    email: String,
    ghiChu: String,
    danhSachDanhMuc: [DanhMuc],
    tinhTp: String,
    quanHuyen: String,
    xaPhuong: String,
    soNhaTenDuong: String,
},
type ChiTietDonNhap {
    id: String,
    sanPham: SanPham,
    soLuong: Int,
    giaNhap: Float,
    nhaCungCap: NhaCungCap,
    ghiChu: String,
    thanhTien: Float,
},
type DonNhap {
    id: String,
    maDonNhap: String,
    ngayNhap: String,
    tongTien: Float,
    chiTietDonNhap: [ChiTietDonNhap],
    ghiChu: String,
},
type Message {
    message: String,
    type: String,
}
type ThongBao {
    id: String,
    noiDung: String,
    nguoiNhan: [String],
    trangThai: String,
    hinhAnh: String,
    createdAt: String,
},
type ThongKe {
    labels: [String],
    datas: [Float],
    percent: Float,
    quantity: Float,
    oldDatas: [Float],
},
type ChiTiet{
    tenChiTiet: String,
    loaiChiTiet: String,
},
type TaiKhoan {
    uid: String,
    email: String,
    phanQuyen: String,
    hoTen: String,
    soDienThoai: String,
    diaChi: String,
    lanCuoiDangNhap: String,
    soDonHang: Int,
},
type Query {
    danhSachSanPham: [SanPham],
    danhSachDanhMuc: [DanhMuc],
    danhSachDanhMucChoNguoiDung: [DanhMuc],
    danhSachSanPhamTheoMaDanhMuc(maDanhMuc: String): [SanPham],
    danhSachSanPhamTheoMaDanhMucNguoiDung(maDanhMuc: String): [SanPham],
    danhSachDonHang(type: Int): [DonHang],
    donHangTheoEmail(email: String): [DonHang],
    danhSachTinhTp: [TinhTp],
    danhSachTinhTpDayDu: [TinhTp],
    danhSachQuanHuyen(idTinhTP: String): [QuanHuyen],
    danhSachXaPhuong(idQuanHuyen: String): [XaPhuong],
    danhSachNhaCungCap: [NhaCungCap],
    danhSachDonNhap: [DonNhap],
    danhSachNhaCungCapTheoDanhMuc(id: String): [NhaCungCap],
    danhSachDanhMucThemSanPham: [DanhMuc],
    thongKeGiaTriDonHang(type: Int): ThongKe,
    thongKeSoLuongDonHang(type: Int): ThongKe,
    thongKeSoLuongDonNhap(type: Int): ThongKe,
    thongKeGiaTriDonNhap(type: Int): ThongKe,
    thongKeSanPhamTheoDanhMuc(loaiThongKe: Int, maDanhMuc: String, type: Int): ThongKe,
    danhMucTheoNhaCungCap(maNhaCungCap: String): [DanhMuc],
    danhSachChiTiet: [ChiTiet],
    danhSachTaiKhoan: [TaiKhoan],
},
type Mutation {
    themDanhMuc(tenDanhMuc: String): DanhMuc,
    xoaDanhMuc(id: String): String,
    capNhatDanhMuc(id: String, tenDanhMuc: String): DanhMuc,
    xoaSanPham(id: String): String,
    themSanPham(
    danhMuc: String, 
    tenSanPham: String, 
    kichThuoc: String,
    loaiDe: String,
    giaSanPham: Float,
    moTa: String, 
    hinhAnh: String, 
    donViTinh: String,
    trangThai: String): SanPham,

    capNhatSanPham(
    id: String,
    danhMuc: String,
    tenSanPham: String,
    kichThuoc: String,
    giaSanPham: Float,
    moTa: String,
    hinhAnh: String,
    trangThai: String,
    soLuong: Int,
    donViTinh: String,
    loaiDe: String): SanPham,

    themDonHang(
    tenKhachHang: String,
    soDienThoai: String,
    email: String,
    danhSachSanPham: String,
    phuongThucThanhToan: String,
    diaChiGiaoHang: String,
    ghiChuDiaChi: String,
    thoiGianGiaoHang: String,
    tongTien: Float,
    giamGia: Float,
    tamTinh: Float
    ): DonHang,

    capNhatTrangThaiDonHang(maDonHang: String, trangThai: String): DonHang,

    themNhaCungCap(
    tenNhaCungCap: String,
    soDienThoai: String,
    email: String,
    ghiChu: String,
    danhSachDanhMuc: [String],
    tinhTp: String,
    quanHuyen: String,
    xaPhuong: String,
    soNhaTenDuong: String
    ): NhaCungCap,

    capNhatNhaCungCap(
    id: String,
    tenNhaCungCap: String,
    soDienThoai: String,
    email: String,
    ghiChu: String,
    danhSachDanhMuc: [String],
    tinhTp: String,
    quanHuyen: String,
    xaPhuong: String,
    soNhaTenDuong: String
    ): NhaCungCap,

    themDonNhap(
    nhaCungCap: String,
    tongTien: Float,
    danhSachSanPham: String,
    ghiChu: String
    ): DonNhap,

    capNhatDonNhap(
    id: String,
    ngayNhap: String,
    nhaCungCap: String,
    tongTien: Float,
    danhSachSanPham: String,
    ghiChu: String
    ): DonNhap,

    themThongBao(
    noiDung: String,
    nguoiNhan: [String],
    trangThai: String,
    hinhAnh: String
    ): ThongBao,

    themChiTiet(
    tenChiTiet: String,
    loaiChiTiet: String
    ): ChiTiet,

    themTaiKhoan(
    uid: String,
    email: String,
    phanQuyen: String,
    hoTen: String,
    soDienThoai: String,
    diaChi: String,
    ): TaiKhoan,

    xoaTaiKhoan(email: String): String,
}
    type Subscription {
    Notify: Message
}
`;