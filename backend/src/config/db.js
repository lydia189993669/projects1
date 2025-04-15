// src/config/db.js
import { Sequelize } from 'sequelize';

// 基础配置（适合本地开发）
const sequelize = new Sequelize(
  process.env.PG_DATABASE || 'legal_db', // 数据库名
  process.env.PG_USER || 'postgres',     // 用户名
  process.env.PG_PASSWORD || 'postgres', // 密码
  {
    host: process.env.PG_HOST || 'localhost',
    dialect: 'postgres',
    logging: false // 关闭SQL日志（开发时可设为console.log）
  }
);

// 简易连接测试
sequelize.authenticate()
  .then(() => console.log('数据库连接成功'))
  .catch(err => console.error('连接失败:', err));

export default sequelize;
// db.js
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'your_password',
  database: 'legal_db'
});