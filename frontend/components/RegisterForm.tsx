import React, { useState } from 'react';
import { CheckCircle, Loader2, ArrowRight, ChevronDown, AlertTriangle } from 'lucide-react';

// Định nghĩa types cho formData
interface FormData {
    fullName: string;
    phone: string;
    email: string;
    address: string; 
    userType: 'Khách hàng' | 'Doanh nghiệp';
    businessField: string;
}

const businessCategories = [
    'Nhà hàng & Ăn uống',
    'Khách sạn & Lưu trú',
    'Spa & Chăm sóc sức khỏe',
    'Nha khoa & Thẩm mỹ',
    'Thuê xe & Vận chuyển',
    'Bar & Club',
    'Khác',
];

const API_ENDPOINT = 'https://socigo.onrender.com/register'; 

const sendDataToApi = async (data: FormData) => {
    const maxRetries = 3;
    let lastError = null;

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || `Lỗi từ Server (Status ${response.status})`);
            return result;
        } catch (error) {
            lastError = error;
            console.error(`Lần thử ${i + 1} thất bại.`, error);
            if (i < maxRetries - 1) {
                const delay = Math.pow(2, i) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            } else throw lastError;
        }
    }
};

export default function RegisterForm() {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        phone: '',
        email: '',
        address: '', // 🆕 thêm field địa chỉ
        userType: 'Khách hàng',
        businessField: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submittedEmail, setSubmittedEmail] = useState<string>('');

    React.useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value as any }));
        if (name === 'userType' && value === 'Khách hàng') {
            setFormData(prev => ({ ...prev, businessField: '' }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(false);
        setSubmitError(null);
        setSubmittedEmail(formData.email); 
        
        try {
            await sendDataToApi(formData);
            setSubmitSuccess(true);
            setFormData({
                fullName: '',
                phone: '',
                email: '',
                address: '', // 🆕 reset địa chỉ sau submit
                userType: 'Khách hàng',
                businessField: '',
            });
        } catch (error) {
            console.error("Gửi form thất bại:", error);
            setSubmitError(`Đã xảy ra lỗi: ${(error as Error).message}.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isBusiness = formData.userType === 'Doanh nghiệp';

    return (
        <section id="dang-ky" className="py-8 sm:py-12 lg:py-16 relative overflow-hidden bg-linear-to-br from-gray-50 via-gray-50/30 to-gray-100 min-h-screen flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-gray-200/50 shadow-2xl relative overflow-hidden transition-all duration-500 hover:shadow-blue-500/20">
                    
                    <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-900">
                        Đồng Hành Cùng <span className="bg-linear-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">SOCIGO</span>
                    </h2>

                    {submitError && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center text-sm animate-pulse">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            <span>{submitError}</span>
                        </div>
                    )}

                    {submitSuccess ? (
                        <div className="text-center p-8 bg-linear-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 text-green-700 rounded-xl shadow-lg">
                            <CheckCircle className="mx-auto h-10 w-10 text-green-500" />
                            <h3 className="text-lg font-bold mt-3 text-gray-900">Đăng ký thành công!</h3>
                            <p className="mt-2 text-sm text-gray-700">
                                Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ qua email <b>{submittedEmail}</b> sớm nhất.
                            </p>
                            <button
                                onClick={() => setSubmitSuccess(false)}
                                className="mt-4 px-6 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-300 shadow-md hover:scale-105"
                            >
                                Đăng ký lại
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Cột 1 */}
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">Họ và Tên</label>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Nguyễn Văn A"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Số Điện Thoại</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="090 123 4567"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        />
                                    </div>

                                    {/* 🆕 Địa chỉ */}
                                    <div>
                                        <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ</label>
                                        <input
                                            id="address"
                                            name="address"
                                            type="text"
                                            required
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Ví dụ: 123 Nguyễn Trãi, Q.1, TP.HCM"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Cột 2 */}
                                <div className="space-y-5">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="email@example.com"
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        />
                                    </div>

                                    <div>
                                        <span className="block text-sm font-semibold text-gray-700 mb-2">Bạn là:</span>
                                        <div className="flex gap-3">
                                            <label className={`flex-1 text-center py-3 rounded-xl border-2 cursor-pointer font-semibold ${!isBusiness ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 bg-white hover:border-gray-400'}`}>
                                                <input type="radio" name="userType" value="Khách hàng" checked={!isBusiness} onChange={handleChange} className="hidden" />
                                                Khách hàng
                                            </label>
                                            <label className={`flex-1 text-center py-3 rounded-xl border-2 cursor-pointer font-semibold ${isBusiness ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-300 bg-white hover:border-gray-400'}`}>
                                                <input type="radio" name="userType" value="Doanh nghiệp" checked={isBusiness} onChange={handleChange} className="hidden" />
                                                Doanh nghiệp
                                            </label>
                                        </div>
                                    </div>

                                    {isBusiness && (
                                        <div>
                                            <label htmlFor="businessField" className="block text-sm font-semibold text-gray-700 mb-2">Lĩnh vực kinh doanh</label>
                                            <select
                                                id="businessField"
                                                name="businessField"
                                                required
                                                value={formData.businessField}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-2 focus:ring-black outline-none transition-all"
                                            >
                                                <option value="" disabled>Chọn lĩnh vực</option>
                                                {businessCategories.map(category => (
                                                    <option key={category} value={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-60"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center"><Loader2 className="animate-spin h-5 w-5 mr-3" />Đang xử lý...</span>
                                ) : (
                                    <span className="flex items-center justify-center">Đăng ký ngay <ArrowRight className="ml-2 w-5 h-5" /></span>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}
