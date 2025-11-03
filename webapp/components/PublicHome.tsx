'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import HeroCard from "./Layout/HeroCard"

export default function ShowUpPage() {
    const router = useRouter()

    const services = [
        {
            id: 1,
            name: "Nhà hàng The Garden",
            category: "Restaurant",
            img: "https://images.unsplash.com/photo-1555992336-03a23cda1e63",
            rating: 4.9,
            reviews: 312,
            desc: "Ẩm thực Âu – Á cao cấp, không gian sang trọng và ấm cúng.",
        },
        {
            id: 2,
            name: "Spa Zen Garden",
            category: "Spa & Wellness",
            img: "https://images.unsplash.com/photo-1600334129128-7a3b46e92a7f",
            rating: 4.8,
            reviews: 201,
            desc: "Liệu pháp thư giãn cơ thể và tinh thần, chuẩn Nhật Bản.",
        },
        {
            id: 3,
            name: "Hotel Breeze",
            category: "Hotel",
            img: "https://images.unsplash.com/photo-1501117716987-c8e1ecb21024",
            rating: 4.7,
            reviews: 157,
            desc: "Khách sạn ven biển phong cách tối giản, gần trung tâm.",
        },
        {
            id: 4,
            name: "SmilePro Dental",
            category: "Dental",
            img: "https://images.unsplash.com/photo-1588776814546-9815cf1f2d3b",
            rating: 4.9,
            reviews: 98,
            desc: "Chuyên phục hình, tẩy trắng và chỉnh nha thẩm mỹ hiện đại.",
        },
        {
            id: 5,
            name: "GoCar Premium",
            category: "Car Rental",
            img: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e",
            rating: 4.6,
            reviews: 215,
            desc: "Thuê xe hạng sang, đưa đón sân bay, trải nghiệm 5 sao.",
        },
    ]

    const reviews = [
        {
            id: 1,
            user: "Linh Tran",
            avatar: "https://randomuser.me/api/portraits/women/45.jpg",
            text: "Tôi đã đặt spa qua Socigo, dịch vụ rất chuyên nghiệp, giao diện dễ dùng 💆‍♀️",
        },
        {
            id: 2,
            user: "Minh Pham",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            text: "Nhà hàng The Garden thật tuyệt! Mình còn được tích điểm cho lần sau 🍽️",
        },
        {
            id: 3,
            user: "Anh Vu",
            avatar: "https://randomuser.me/api/portraits/men/15.jpg",
            text: "Thuê xe GoCar rất nhanh và tiện, đội ngũ hỗ trợ nhiệt tình 🚗",
        },
    ]

    const posts = [
        {
            id: 1,
            user: "Anna Nguyen",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
            caption: "Một buổi tối tuyệt vời tại nhà hàng The Garden 🍷✨",
            likes: 542,
            comments: 32,
        },
        {
            id: 2,
            user: "Linh Tran",
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
            caption: "Trải nghiệm nha khoa SmilePro – nhẹ nhàng và hiện đại 😁",
            likes: 287,
            comments: 9,
        },
    ]

    const categories = [
        { name: "Nhà hàng", icon: "🍽️" },
        { name: "Khách sạn", icon: "🏨" },
        { name: "Spa", icon: "💆‍♀️" },
        { name: "Thuê xe", icon: "🚗" },
        { name: "Nha khoa", icon: "🦷" },
    ]

    return (
        <div className="min-h-screen bg-gray-50 text-black">
            {/* Subhero Section */}
            <section className="w-full bg-linear-to-b from-white to-gray-50 py-16 px-6 md:px-12 flex flex-col md:flex-row items-center gap-10 md:gap-16 overflow-hidden">
                {/* Left: Text Content */}
                <div className="md:w-1/2 text-center md:text-left space-y-6">
                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                        <span className="block">Khám phá. Kết nối.</span>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-800 to-black">
                            Trải nghiệm cùng Socigo
                        </span>
                    </h2>

                    <p className="text-gray-600 text-lg leading-relaxed">
                        Socigo là nền tảng nơi người dùng có thể đặt bàn, đặt phòng, làm đẹp, chăm sóc sức khỏe,
                        thuê xe, đánh giá và chia sẻ cảm xúc — tất cả trong một không gian cộng đồng sống động.
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                        <button className="px-6 py-3 bg-black text-white rounded-xl text-base font-semibold shadow hover:scale-105 hover:shadow-md transition-transform">
                            Bắt đầu trải nghiệm
                        </button>
                        <button className="px-6 py-3 border border-gray-300 rounded-xl text-base font-semibold hover:bg-gray-100 transition">
                            Dành cho doanh nghiệp
                        </button>
                    </div>

                    {/* Feature highlights */}
                    <div className="grid grid-cols-2 gap-6 pt-8 text-sm md:text-base">
                        <div className="flex items-start gap-3">
                            <span className="text-xl">🍽️</span>
                            <p className="text-gray-700"><b>Nhà hàng, Spa, Hotel</b><br />Đặt lịch, nhận ưu đãi dễ dàng</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-xl">⭐</span>
                            <p className="text-gray-700"><b>Đánh giá chân thực</b><br />Từ cộng đồng người dùng thật</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-xl">💬</span>
                            <p className="text-gray-700"><b>Kết nối & chia sẻ</b><br />Giao lưu cùng bạn bè & doanh nghiệp</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-xl">🎁</span>
                            <p className="text-gray-700"><b>Tích điểm & quà tặng</b><br />Cho mỗi trải nghiệm và đánh giá</p>
                        </div>
                    </div>
                </div>

                {/* Right: Slideshow */}
                {/* <div className="md:w-1/2 relative w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-md">
                    <div className="absolute inset-0 animate-fadeSlideShow">
                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                            alt="Restaurant"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                    <div className="absolute inset-0 animate-fadeSlideShow delay-[5s]">
                        <img
                            src="https://images.unsplash.com/photo-1556228578-397c82bd0b7b?auto=format&fit=crop&w=800&q=80"
                            alt="Spa"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                    <div className="absolute inset-0 animate-fadeSlideShow delay-[10s]">
                        <img
                            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                            alt="Hotel"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                    <div className="absolute inset-0 animate-fadeSlideShow delay-[15s]">
                        <img
                            src="./hotel.jpg"
                            alt="Dentist"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </div>
                </div> */}
                <HeroCard />
            </section>

            {/* Hero: Carousel Services */}
            <section className="px-6 py-10">
                <h2 className="text-2xl font-bold mb-4">🔥 Dịch vụ được đánh giá cao</h2>
                <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
                    {services.map((s) => (
                        <div
                            key={s.id}
                            className="snap-start shrink-0 w-72 bg-white rounded-2xl shadow hover:shadow-md transition overflow-hidden"
                        >
                            <img src={s.img} alt={s.name} className="w-full h-44 object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg">{s.name}</h3>
                                <p className="text-sm text-gray-500">{s.desc}</p>
                                <div className="mt-2 flex justify-between text-sm text-gray-600">
                                    <span>⭐ {s.rating}</span>
                                    <span>{s.reviews} đánh giá</span>
                                </div>
                                <Button
                                    size="sm"
                                    className="w-full mt-3 bg-black text-white hover:bg-gray-800"
                                    onClick={() => router.push("/signup")}
                                >
                                    Xem chi tiết
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reviews */}
            <section className="bg-white py-12 px-6">
                <h2 className="text-2xl font-bold mb-6">💬 Đánh giá từ khách hàng</h2>
                <div className="grid md:grid-cols-3 gap-6">
                    {reviews.map((r) => (
                        <Card key={r.id} className="shadow-sm hover:shadow-md transition">
                            <CardContent className="p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <Avatar>
                                        <AvatarImage src={r.avatar} />
                                        <AvatarFallback>{r.user[0]}</AvatarFallback>
                                    </Avatar>
                                    <p className="font-semibold">{r.user}</p>
                                </div>
                                <p className="text-gray-600 text-sm">{r.text}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section className="py-12 px-6 bg-gray-50">
                <h2 className="text-2xl font-bold mb-6">📈 Ngành dịch vụ phổ biến</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {categories.map((c, i) => (
                        <Card
                            key={i}
                            className="text-center py-6 hover:bg-white transition cursor-pointer shadow-sm hover:shadow-md"
                        >
                            <CardContent className="p-0">
                                <div className="text-3xl mb-2">{c.icon}</div>
                                <p className="font-medium">{c.name}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Feed */}
            <section className="max-w-5xl mx-auto py-12 px-4">
                <h2 className="text-2xl font-bold mb-6">🌟 Cộng đồng Socigo</h2>

                <Card className="p-4 bg-white mb-6">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <Input placeholder="Chia sẻ trải nghiệm của bạn..." disabled />
                    </div>
                    <div className="text-xs text-gray-400 text-center mt-2">
                        <Button variant="ghost" className="text-gray-500" onClick={() => router.push("/signup")}>
                            Đăng nhập để chia sẻ bài viết ✍️
                        </Button>
                    </div>
                </Card>

                <div className="space-y-6">
                    {posts.map((p) => (
                        <Card key={p.id} className="overflow-hidden bg-white hover:shadow-md transition">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <Avatar>
                                        <AvatarImage src={p.avatar} />
                                        <AvatarFallback>{p.user[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{p.user}</p>
                                        <p className="text-xs text-gray-500">1 giờ trước</p>
                                    </div>
                                </div>
                                <p className="mb-3">{p.caption}</p>
                                <img src={p.image} alt="" className="w-full rounded-xl mb-3 object-cover" />
                                <div className="flex justify-between text-sm text-gray-500 opacity-50">
                                    <span>❤️ {p.likes}</span>
                                    <span>💬 {p.comments}</span>
                                    <span>↗️ Chia sẻ</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* CTA for Businesses */}
            <section className="text-center py-20 bg-black text-white">
                <h2 className="text-3xl font-bold mb-4">🚀 Gia nhập Socigo ngay hôm nay</h2>
                <p className="text-white/70 mb-6">
                    Đăng dịch vụ của bạn, tiếp cận hàng ngàn khách hàng đang tìm kiếm trải nghiệm mới mỗi ngày.
                </p>
                <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-200"
                    onClick={() => router.push("/signup")}
                >
                    Đăng ký doanh nghiệp
                </Button>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 text-gray-600 py-8 text-center text-sm">
                © 2025 Socigo. All rights reserved.
            </footer>
        </div>
    )
}
