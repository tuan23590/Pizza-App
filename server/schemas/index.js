export const typeDefs = `#graphql
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
    danhMuc: [DanhMuc],
    trangThai: String,
    loaiDe: [LoaiDe],
    giaSanPham: Float
}

type Query {
    danhSachSanPham: [SanPham],
    danhSachDanhMuc: [DanhMuc],
    danhSachLoaiDe: [LoaiDe],
    danhSachKichThuoc: [KichThuoc],
    danhSachSanPhamTheoMaDanhMuc(maDanhMuc: String): [SanPham]
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
    danhMuc: [String], 
    trangThai: String): SanPham
}
`;