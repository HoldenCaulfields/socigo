import express from 'express';
import sgMail from '@sendgrid/mail';

const router = express.Router();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/', async (req, res) => {
    const { fullName, phone, email, address, userType, businessField } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!fullName || !phone || !email || !userType) {
        return res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
    }

    // Nội dung email
    const emailContent = `
    <h2>Đăng ký mới từ SOCIGO</h2>
    <p><strong>Họ và tên:</strong> ${fullName}</p>
    <p><strong>Số điện thoại:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Địa chỉ:</strong> ${address}</p>
    <p><strong>Loại người dùng:</strong> ${userType}</p>
    ${userType === 'Doanh nghiệp' ? `<p><strong>Lĩnh vực kinh doanh:</strong> ${businessField}</p>` : ''}
    `;

    try {
        console.log('TO EMAIL:', process.env.SENDGRID_TO_EMAIL);
        console.log('FROM EMAIL:', process.env.SENDGRID_FROM_EMAIL);
        // Gửi email
        await sgMail.send({
            to: process.env.SENDGRID_TO_EMAIL,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: `Đăng ký mới từ ${fullName}`,
            html: emailContent,
        });

        res.json({ success: true, message: 'Đăng ký thành công, email đã gửi.' });
    } catch (error) {
        console.error('SendGrid Error:', error);
        res.status(500).json({ success: false, message: 'Gửi email thất bại', error: error.message });
    }
});

export default router;