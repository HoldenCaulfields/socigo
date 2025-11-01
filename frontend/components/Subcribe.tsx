import React, { useState } from 'react';

const businessCategories = [
    'Nhà hàng & Ăn uống',
    'Khách sạn & Lưu trú',
    'Spa & Chăm sóc sức khỏe',
    'Nha khoa & Thẩm mỹ',
    'Thuê xe & Vận chuyển',
    'Bar & Club',
    'Khác',
];

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        userType: 'Khách hàng',
        businessField: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    React.useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === 'userType' && value === 'Khách hàng') {
            setFormData(prev => ({ ...prev, businessField: '' }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(false);

        console.log('Dữ liệu đăng ký:', formData);

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);
        }, 2000);
    };

    const isBusiness = formData.userType === 'Doanh nghiệp';

    return (
        <section id="dang-ky" className="py-8 sm:py-12 lg:py-16 relative overflow-hidden bg-linear-to-br from-gray-50 via-gray-50/30 to-gray-100" style={{ fontFamily: 'Inter, sans-serif' }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)]"></div>

            <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
                <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl lg:rounded-3xl p-5 sm:p-8 md:p-10 border border-gray-200/50 shadow-2xl relative overflow-hidden transition-all duration-500 hover:shadow-blue-500/20">


                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center mb-1 sm:mb-2 text-gray-900 relative z-10 tracking-tight">
                        Đồng Hành Cùng <span className="bg-linear-to-r from-blue-800 to-blue-900 bg-clip-text text-transparent">SOCIGO</span>
                    </h2>
                    <p className="text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base relative z-10 px-2 leading-relaxed">
                        Đăng ký để cùng SOCIGO chia sẻ trải nghiệm và phát triển kinh doanh
                    </p>

                    {submitSuccess ? (
                        <div className="text-center p-6 sm:p-10 bg-linear-to-br from-green-50 to-emerald-50 border-l-4 border-green-500 text-green-700 rounded-xl sm:rounded-2xl relative z-10 shadow-lg">
                            <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-lg sm:text-xl font-bold mt-3 text-gray-900">Đăng ký thành công!</h3>
                            <p className="mt-2 text-sm sm:text-base text-gray-700">Cảm ơn bạn đã đồng hành cùng SOCIGO. Chúng tôi sẽ liên hệ sớm nhất.</p>
                            <button
                                onClick={() => setSubmitSuccess(false)}
                                className="mt-4 sm:mt-5 px-6 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                            >
                                Đăng ký lại
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-7 relative z-10">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-8 gap-y-4 sm:gap-y-5">

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

                                    {!isBusiness && <div className="hidden md:block h-4"></div>}
                                </div>

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
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-linear-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg  relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 group/btn mt-6 sm:mt-8"
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Đang xử lý...
                                        </>
                                    ) : (
                                        <>
                                            Đăng ký ngay
                                            <svg className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
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