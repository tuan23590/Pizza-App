export const typeDefs = `#graphql
type TuyChon {
    id: String,
    tenTuyChon: String,
    giaTuyChon: Float
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
    tuyChon: [TuyChon],
    ghiChu: String,
    moTa: String,
    hinhAnh: String,
    danhMuc: [DanhMuc],
    trangThai: String,
}

type Query {
    danhSachSanPham: [SanPham]
},
type Mutation {
    themDanhMuc(tenDanhMuc: String): DanhMuc,
    themSanPham(
    tenSanPham: String, 
    tuyChon: [String], 
    ghiChu: String, 
    moTa: String, 
    hinhAnh: String, 
    danhMuc: [String], 
    trangThai: String): SanPham
}
`;