// routes/serviceRoutes.js

import express from 'express';
// Giả định bạn có các controllers đã tạo trước đó
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getTopServices,
} from '../controllers/serviceController.js'; 
import { protect } from '../middleware/auth.js'; // Middleware xác thực

const router = express.Router();
// 1. ROUTE CỤ THỂ (Top)
router.route('/top').get(getTopServices); 

// 2. ROUTE GỐC (/, GET/POST)
router.route('/')
  .post(protect, createService)
  .get(getServices);

// 3. ROUTE ĐỘNG (/:id)
router.route('/:id')
  .get(getServiceById)
  .put(protect, updateService)
  .delete(protect, deleteService);

export default router;