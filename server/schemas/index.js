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
    trangThai: String,
    danhSachSanPham: [SanPhamDaMua]
},
type KichThuoc {
    id: String,
    tenKichThuoc: String,
    giaKichThuoc: Float
},
type LoaiDe {
    id: String,
    tenLoaiDe: String,
    giaLoaiDe: Float
},
type DanhMuc {
    id: String,
    tenDanhMuc: String,
    maDanhMuc: String,
    soLuongSanPham: Int
},

type SanPham {
    id: String,
    maSanPham: String,
    tenSanPham: String,
    kichThuoc: [KichThuoc],
    ghiChu: String,
    moTa: String,
    hinhAnh: String,
    danhMuc: DanhMuc,
    trangThai: String,
    loaiDe: [LoaiDe],
    giaSanPham: Float,
    soLuong: Int
},

type SanPhamDaMua {
    maSanPham: String,
    tenSanPham: String,
    kichThuoc: KichThuoc,
    soLuong: Int,
    ghiChu: String,
    moTa: String,
    hinhAnh: String,
    danhMuc: String,
    giaSanPham: Float,
    loaiDe: LoaiDe,
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

type Query {
    danhSachSanPham: [SanPham],
    danhSachDanhMuc: [DanhMuc],
    danhSachDanhMucChoNguoiDung: [DanhMuc],
    danhSachLoaiDe: [LoaiDe],
    danhSachKichThuoc: [KichThuoc],
    danhSachSanPhamTheoMaDanhMuc(maDanhMuc: String): [SanPham],
    danhSachDonHang: [DonHang],
    donHangTheoEmail(email: String): [DonHang],
    danhSachTinhTp: [TinhTp],
    danhSachQuanHuyen(idTinhTP: String): [QuanHuyen],
    danhSachXaPhuong(idQuanHuyen: String): [XaPhuong],
},
type Mutation {
    themDanhMuc(tenDanhMuc: String): DanhMuc,

    xoaDanhMuc(id: String): String,
    
    capNhatDanhMuc(id: String, tenDanhMuc: String): DanhMuc,
    
    themSanPham(
    tenSanPham: String, 
    kichThuoc: [String],
    loaiDe: [String], 
    ghiChu: String, 
    moTa: String, 
    hinhAnh: String, 
    danhMuc: String, 
    trangThai: String): SanPham,

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

    capNhatTrangThaiDonHang(maDonHang: String, trangThai: String): DonHang
}
`;