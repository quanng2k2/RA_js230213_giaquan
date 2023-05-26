const express = require("express");
const router = express.Router();

const database = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    // sử dụng database lấy về toàn bộ user
    let data = await database.execute("SELECT * FROM content.content");
    let [content] = data;
    console.log(content);
    // let users = data[0]

    // response về cho client
    res.json({
      message: "success",
      content,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

// API lấy thông tin một bản ghi theo Id
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // Câu lệnh truy vấn lấy thông tin tất cả bản ghi
    const queryString = `SELECT * FROM content WHERE contentId=${id}`;

    const [rows] = await database.query(queryString);
    return res.status(200).json({
      status: "OK",
      data: rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
});

// API thêm mới 1 bản ghi
router.post("/", async (req, res) => {
  try {
    // Lấy dữ liệu từ body
    const { contentName } = req.body;
    // Tạo một dữ liệu mới
    const newContent = [contentName];

    // Viết câu lệnh query string
    const queryString = "insert into content(ContentName) values (?)";

    await database.query(queryString, newContent);
    return res.status(201).json({
      status: "OK",
      message: "Thêm mới thành công",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
});

// API xóa một bản ghi theo Id
router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // Câu lệnh truy vấn xóa bản ghi
    const queryString = `delete from content where contentId=${id}`;

    await database.query(queryString);
    return res.status(200).json({
      status: "OK",
      message: "Xóa thành công",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
});

// API sửa thông tin một bản ghi theo Id
router.put("/:id", (req, res) => {
  let { id } = req.params;

  // Lấy dữ liệu từ body
  const { Content } = req.body;
  // Tạo một dữ liệu mới
  const newContent = [Content, Points, id];

  // Viết câu lệnh query string
  const queryString = `update content set ContentName=? where contentId=${id}`;

  connection.query(queryString, newContent, (err) => {
    if (err) {
      return res.status(500).json({
        status: "Failed",
        error: err,
      });
    } else {
      return res.status(200).json({
        status: "OK",
        message: "Cập nhật thành công",
      });
    }
  });
});

module.exports = router;
