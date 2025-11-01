

export default function Subcribe() {

    return (
       <section className="py-20 relative overflow-hidden">
               <div className="absolute inset-0 bg-linear-to-br from-gray-100 via-white to-gray-50"></div>
               <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                 <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-3xl p-12 md:p-16 border-4 border-gray-900 shadow-2xl relative overflow-hidden group">
                   <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                   <h2 className="text-4xl md:text-5xl font-bold mb-6 relative z-10">Sẵn sàng tham gia?</h2>
                   <p className="text-xl text-gray-600 mb-8 relative z-10">
                     Đăng ký ngay để nhận <span className="font-bold text-gray-900 bg-linear-to-r from-yellow-200 to-yellow-300 px-2 py-1 rounded">5 voucher miễn phí</span> và tham gia cộng đồng SOCIGO
                   </p>
       
                   <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6 relative z-10">
                     <input
                       type="email"
                       placeholder="Email của bạn"
                       className="flex-1 px-6 py-4 rounded-full border-2 border-gray-300 focus:border-gray-900 focus:outline-none text-lg transition-all duration-300 shadow-sm focus:shadow-lg"
                     />
                     <button className="bg-linear-to-r from-gray-900 to-gray-700 text-white px-8 py-4 rounded-full font-medium hover:shadow-2xl hover:shadow-gray-500/50 transition-all duration-300 transform hover:scale-105 shadow-lg whitespace-nowrap group/btn relative overflow-hidden">
                       <span className="relative z-10">Đăng ký ngay</span>
                       <div className="absolute inset-0 bg-linear-to-r from-gray-700 to-gray-900 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                     </button>
                   </div>
       
                   <p className="text-sm text-gray-500 relative z-10">
                     Bằng cách đăng ký, bạn đồng ý với Điều khoản sử dụng của chúng tôi
                   </p>
                 </div>
               </div>
             </section>
    );
}