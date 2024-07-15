const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/model/User.js');  // Đảm bảo đường dẫn này là chính xác

dotenv.config();

// Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  const username = 'admin';
  const password = 'admin123';

  // Kiểm tra xem tài khoản admin đã tồn tại hay chưa
  let user = await User.findOne({ username });
  if (user) {
    console.log('Admin account already exists');
  } else {
    user = new User({ username, password, role: 'admin' });  // Tạo tài khoản admin mới

    await user.save();
    console.log('Admin account created successfully');
  }

  // Đóng kết nối tới MongoDB
  mongoose.connection.close();
});
