import React, { useState } from 'react';
import { CheckCircle, Loader2, ArrowRight, ChevronDown, AlertTriangle } from 'lucide-react';

// Định nghĩa types cho formData
interface FormData {
    fullName: string;
    phone: string;
    email: string;
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

// Endpoint của Server Node.js/Express
const API_ENDPOINT = 'https://socigo.onrender.com/register'; 

// Hàm gửi dữ liệu thực tế đến backend
const sendDataToApi = async (data: FormData) => {
    // Ứng dụng sẽ tự động thử lại với Exponential Backoff nếu gặp lỗi mạng hoặc lỗi 5xx
    const maxRetries = 3;
    let lastError = null;

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                // Ném lỗi nếu response không phải là 2xx (ví dụ: 400 hoặc 500)
                throw new Error(result.message || `Lỗi từ Server (Status ${response.status})`);
            }

            return result; // Thành công, thoát khỏi vòng lặp
            
        } catch (error) {
            lastError = error;
            console.error(`Lần thử ${i + 1} thất bại.`, error);
            if (i < maxRetries - 1) {
                // Đợi 2^i * 1000ms trước khi thử lại
                const delay = Math.pow(2, i) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                // Lần thử cuối cùng thất bại, ném lỗi ra ngoài
                throw lastError;
            }
        }
    }
};

export default function RegisterForm() {
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        phone: '',
        email: '',
        userType: 'Khách hàng',
        businessField: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submittedEmail, setSubmittedEmail] = useState<string>(''); // Lưu email đã submit

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

        // Lưu email trước khi gửi để hiển thị trong thông báo thành công
        setSubmittedEmail(formData.email); 
        
        try {
            // Gửi dữ liệu đến backend
            await sendDataToApi(formData);
            
            setSubmitSuccess(true);
            // Xóa form data sau khi gửi thành công
            setFormData({
                fullName: '',
                phone: '',
                email: '',
                userType: 'Khách hàng',
                businessField: '',
            });

        } catch (error) {
            console.error("Gửi form thất bại:", error);
            // Cập nhật thông báo lỗi rõ ràng hơn
            setSubmitError(`Đã xảy ra lỗi: ${(error as Error).message}. Vui lòng kiểm tra Server Node.js (port 3001) đã chạy chưa hoặc xem log lỗi chi tiết.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const isBusiness = formData.userType === 'Doanh nghiệp';

    return (
        <section id="dang-ky" className="py-8 sm:py-12 lg:py-16 relative overflow-hidden bg-linear-to-br from-gray-50 via-gray-50/30 to-gray-100 min-h-screen flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif' }}>
            {/* Background linears */}
            <div className="absolute inset-0 bg-[radial-linear(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-linear(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)]"></div>

            <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-8 md:p-10 border border-gray-200/50 shadow-2xl relative overflow-hidden transition-all duration-500 hover:shadow-blue-500/20">

                    {/* Title Section */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-1 sm:mb-2 text-gray-900 relative z-10 tracking-tight">
                        Đồng Hành Cùng <span className="bg-linear-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">SOCIGO</span>
                    </h2>
                    <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base relative z-10 px-2 leading-relaxed">
                        Đăng ký để cùng SOCIGO chia sẻ trải nghiệm và phát triển kinh doanh
                    </p>

                    {/* Error Display */}
                    {submitError && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg flex items-center text-sm sm:text-base animate-pulse">
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            <span className="wrap-break-words">{submitError}</span>
                        </div>
                    )}

                    {submitSuccess ? (
                        /* Success State */
                        <div className="text-center p-6 sm:p-10 bg-linear-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 text-green-700 rounded-xl sm:rounded-2xl relative z-10 shadow-lg">
                            <CheckCircle className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-green-500" />
                            <h3 className="text-lg sm:text-xl font-bold mt-3 text-gray-900">Đăng ký thành công!</h3>
                            <p className="mt-2 text-sm sm:text-base text-gray-700">Cảm ơn bạn đã đồng hành cùng SOCIGO. Thông tin đã được gửi đến email quản trị. Chúng tôi sẽ liên hệ với bạn qua email **{submittedEmail}** sớm nhất.</p>
                            <button
                                onClick={() => setSubmitSuccess(false)}
                                className="mt-4 sm:mt-5 px-6 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                            >
                                Đăng ký lại
                            </button>
                        </div>
                    ) : (
                        /* Registration Form */
                        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-7 relative z-10">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 sm:gap-y-5">

                                {/* Full Name & Phone - Column 1 */}
                                <div className="space-y-4 sm:space-y-5">
                                    <div className="relative group">
                                        <label htmlFor="fullName" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Họ và Tên</label>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Nguyễn Văn A"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300 text-sm sm:text-base shadow-sm hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                                        />
                                    </div>

                                    <div className="relative group">
                                        <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Số Điện Thoại</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="090 123 4567"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300 text-sm sm:text-base shadow-sm hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                                        />
                                    </div>
                                    
                                    {/* Placeholder to align the grid on large screens */}
                                    {!isBusiness && <div className="hidden md:block h-4"></div>}
                                </div>

                                {/* Email, UserType, and Business Field - Column 2 */}
                                <div className="space-y-4 sm:space-y-5">
                                    <div className="relative group">
                                        <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Email</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="email@example.com"
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-300 text-sm sm:text-base shadow-sm hover:border-gray-300 bg-white/50 backdrop-blur-sm"
                                        />
                                    </div>

                                    <div className="relative">
                                        <span className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-2.5">Bạn là:</span>
                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">

                                            {/* Khách hàng Radio Button */}
                                            <label className={`flex-1 flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all duration-300 text-sm sm:text-base font-semibold ${isBusiness ? 'border-gray-200 bg-white/50 text-gray-700 hover:bg-gray-50 hover:border-gray-300' : 'border-gray-500 bg-linear-to-r from-gray-800 to-gray-900 text-white shadow-lg scale-105'}`}>
                                                <input
                                                    type="radio"
                                                    name="userType"
                                                    value="Khách hàng"
                                                    checked={!isBusiness}
                                                    onChange={handleChange}
                                                    className="hidden"
                                                />
                                                <span>Khách hàng</span>
                                            </label>

                                            {/* Doanh nghiệp Radio Button */}
                                            <label className={`flex-1 flex items-center justify-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 cursor-pointer transition-all duration-300 text-sm sm:text-base font-semibold ${isBusiness ? 'border-gray-800 bg-linear-to-r from-gray-800 to-gray-900 text-white shadow-lg scale-105' : 'border-gray-200 bg-white/50 text-gray-700 hover:bg-gray-50 hover:border-gray-300'}`}>
                                                <input
                                                    type="radio"
                                                    name="userType"
                                                    value="Doanh nghiệp"
                                                    checked={isBusiness}
                                                    onChange={handleChange}
                                                    className="hidden"
                                                />
                                                <span>Doanh nghiệp</span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Business Field Dropdown (Conditional) */}
                                    {isBusiness && (
                                        <div className="relative transition-all duration-500 ease-in-out animate-fadeIn">
                                            <label htmlFor="businessField" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">Lĩnh vực kinh doanh</label>
                                            <div className="relative">
                                                <select
                                                    id="businessField"
                                                    name="businessField"
                                                    required={isBusiness}
                                                    value={formData.businessField}
                                                    onChange={handleChange}
                                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-black focus:ring-2 focus:ring-black focus:outline-none transition-all duration-300 text-sm sm:text-base shadow-sm hover:border-gray-300 appearance-none bg-white/50 backdrop-blur-sm pr-10"
                                                >
                                                    <option value="" disabled>Chọn lĩnh vực</option>
                                                    {businessCategories.map(category => (
                                                        <option key={category} value={category}>{category}</option>
                                                    ))}
                                                </select>
                                                {/* Replaced SVG with ChevronDown icon */}
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
                                                    <ChevronDown className="fill-current h-4 w-4" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-linear-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 group/btn mt-6 sm:mt-8"
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    {isSubmitting ? (
                                        <>
                                            {/* Replaced SVG with Loader2 icon */}
                                            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                            Đang xử lý...
                                        </>
                                    ) : (
                                        <>
                                            Đăng ký ngay
                                            {/* Replaced SVG with ArrowRight icon */}
                                            <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-linear-to-r from-gray-900 to-gray-800 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <p className="text-xs sm:text-sm text-gray-500 text-center relative z-10 mt-3 sm:mt-4 leading-relaxed px-2">
                                Bằng cách đăng ký, bạn đồng ý với Điều khoản sử dụng của chúng tôi
                            </p>

                        </form>
                    )}

                </div>
            </div>
        </section>
    );
}
