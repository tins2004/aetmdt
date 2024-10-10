import _assign from 'lodash/assign.js'
import { Router } from 'express'
import SanPham from './models/sanpham.js'

const router = Router()

router.delete('/sanpham', async (req, res) => { 
  try {
    const idDT = parseInt(req.body.idDT, 10); 
    const result = await SanPham.deleteOne({ idDT: idDT });

    if (result.deletedCount > 0) {
      return res.send({
        message: `Đã xóa thành công sản phẩm với idDT = ${idDT}`
      });
    } else {  
      return res.status(404).send({
        message: `Không tìm thấy sản phẩm với idDT = ${idDT}`
      });
    }
  } catch (e) {
    return res.status(500).send({
      message: 'Lỗi khi xóa sản phẩm!',
      error: e
    });
  }
});

  router.post(
    '/sanpham',
    async (req, res) => {
      try {
        const sanpham = await new SanPham(req.body).save();
  
        return res.send({
          message: 'Thêm sản phẩm mới thành công!',
          data: sanpham
        });
      } catch (e) {
        return res.status(500).send({
          message: 'Lỗi khi thêm sản phẩm!',
          error: e
        });
      }
    }
  );


router.get('/sanpham', async (req, res) => {
  try {
    const sanphams = await SanPham.find({});

    return res.json(sanphams);
  } catch (e) {
    return res.status(500).send({ message: 'Lỗi khi lấy dữ liệu', error: e });
  }
});

router.get('/sp', async (req, res) => {
  try {
    const idLoai = parseInt(req.query.idLoai, 10); 
    const sanPhams = await SanPham.find({ idLoai: idLoai });

    if (sanPhams.length > 0) {
      return res.send({
        message: `Đã tìm thấy sản phẩm với idLoai = ${idLoai}`,
        data: sanPhams
      });
    } else {
      return res.status(404).send({
        message: `Không tìm thấy sản phẩm với idLoai = ${idLoai}`
      });
    }
  } catch (e) {
    return res.status(500).send({
      message: 'Lỗi khi tìm sản phẩm!',
      error: e
    });
  }
});

router.put('/sanpham', async (req, res) => {
  try {
    const idDT = parseInt(req.query.idDT, 10);
    const { TenDT, Gia } = req.body; 

    if (isNaN(idDT)) {
      return res.status(400).send({ message: 'idDT không hợp lệ!' });
    }

    const sanPham = await SanPham.findOneAndUpdate(
      { idDT: idDT }, 
      { TenDT: TenDT, Gia: Gia },
      { new: true }
    );

    if (sanPham) {
      return res.send({
        message: `Cập nhật sản phẩm thành công!`,
        data: sanPham
      });
    } else {
      return res.status(404).send({
        message: `Không tìm thấy sản phẩm với idDT = ${idDT}`
      });
    }
  } catch (e) {
    return res.status(500).send({
      message: 'Lỗi khi cập nhật sản phẩm!',
      error: e
    });
  }
});

export default router
