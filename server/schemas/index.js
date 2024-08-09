export const typeDefs = `#graphql


type DonHang {
    id: String,
    maDonHang: String,
    tenKhachHang: String,
    soDienThoai: String,
    email: String,
    ngayDatHang: String,
    thoiGianGiao: String,
    diaChiGiaoHang: String,
    tamTinh: Float,
    giamGia: Float,
    tongTien: Float,
    phuongThucThanhToan: String,
    trangThai: String,
    danhSachSanPham: String
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
    maDanhMuc: String
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
}

type Query {
    danhSachSanPham: [SanPham],
    danhSachDanhMuc: [DanhMuc],
    danhSachLoaiDe: [LoaiDe],
    danhSachKichThuoc: [KichThuoc],
    danhSachSanPhamTheoMaDanhMuc(maDanhMuc: String): [SanPham],
    danhSachDonHang: [DonHang],
    donHangTheoMaDonHangHoacSoDienThoai(duLieuTimKiem: String): [DonHang]
},
type Mutation {
    themDanhMuc(tenDanhMuc: String): DanhMuc,

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
    hoTen: String,
    soDienThoai: String,
    email: String,
    gioHang: String,
    phuongThucThanhToan: String,
    diaChiGiaoHang: String,
    thoiGianGiao: String,
    tongTien: Float,
    giamGia: Float,
    tamTinh: Float
    ): DonHang
}
`;