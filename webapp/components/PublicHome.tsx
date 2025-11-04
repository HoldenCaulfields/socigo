'use client'

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import HeroCard from "./Layout/HeroCard"
import { useState } from "react"
import LoginModal from "./LoginModal"
import SignupModal from "./SignupModal"
import TopBrandsSection from "./Services/TopBrandsSection"
import Footer from "./Layout/Footer"
import { Play } from "lucide-react"

export default function ShowUpPage() {
    const router = useRouter()
    // 🧩 Modal states
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const openLogin = () => {
        setShowSignup(false);
        setShowLogin(true);
    };
    const openSignup = () => {
        setShowLogin(false);
        setShowSignup(true);
    };
    const closeModals = () => {
        setShowLogin(false);
        setShowSignup(false);
    };

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
            caption:
                "Hôm nay cảm thấy tràn đầy năng lượng 💪✨ Cuộc sống thật tuyệt khi ta biết tận hưởng từng khoảnh khắc!",
            likes: 142,
            comments: 15,
            music: 'https://open.spotify.com/track/3n3Ppam7vgaVa1iaRUc9Lp',
        },
        {
            id: 2,
            user: "Linh Tran",
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
            caption:
                "Thời tiết hôm nay thật đẹp ☀️, đang nghe ca khúc yêu thích để bắt đầu ngày mới 🎶",
            likes: 98,
            comments: 7,
            music:
                "https://open.spotify.com/track/6dOtVTDdiauQNBQEDOtlAB",
        },
        {
            id: 3,
            user: "Minh Le",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            caption: "Một sáng cà phê cùng playlist chill ☕🎧",
            likes: 210,
            comments: 11,
            // Spotify sample
            music: "https://open.spotify.com/track/7lQ8MOhq6IN2w8EYcFNSUk",
        },
    ];
    const categories = [
        { name: "Nhà hàng", icon: "🍽️" },
        { name: "Khách sạn", icon: "🏨" },
        { name: "Spa", icon: "💆‍♀️" },
        { name: "Thuê xe", icon: "🚗" },
        { name: "Nha khoa", icon: "🦷" },
    ]

    // Component phụ xử lý loại nhạc
    function MusicEmbed({ url }: { url: string }) {
        if (!url) return null;

        if (url.includes("spotify.com")) {
            // Spotify embed
            const trackId = url.split("/track/")[1]?.split("?")[0];
            if (!trackId) return null;
            return (
                <iframe
                    src={`https://open.spotify.com/embed/track/${trackId}`}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                ></iframe>
            );
        }

        if (url.includes("soundcloud.com")) {
            // SoundCloud embed
            return (
                <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23ff5500&auto_play=false`}
                    className="rounded-lg"
                ></iframe>
            );
        }

        // Mặc định: file MP3 hoặc link trực tiếp
        return (
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-3">
                <Play size={18} className="text-blue-500 shrink-0" />
                <audio controls className="w-full">
                    <source src={url} type="audio/mpeg" />
                    Trình duyệt của bạn không hỗ trợ phát nhạc.
                </audio>
            </div>
        );
    }

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
                        <button onClick={openLogin} className="px-6 py-3 bg-black text-white rounded-xl text-base font-semibold shadow hover:scale-105 hover:shadow-md transition-transform">
                            Bắt đầu trải nghiệm
                        </button>
                        <button onClick={openSignup} className="px-6 py-3 border border-gray-300 rounded-xl text-base font-semibold hover:bg-gray-100 transition">
                            Dành cho doanh nghiệp
                        </button>

                        <LoginModal isOpen={showLogin} onClose={closeModals} onSwitchToSignup={openSignup} />
                        <SignupModal isOpen={showSignup} onClose={closeModals} onSwitchToLogin={openLogin} />
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

                <HeroCard />
            </section>

            <TopBrandsSection />

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
            <section className="py-14 px-6 bg-linear-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">
                        📈 Ngành dịch vụ phổ biến
                    </h2>

                    <div className="flex space-x-4 overflow-x-auto pb-3 snap-x snap-mandatory md:grid md:grid-cols-5 md:gap-5 md:space-x-0 md:overflow-visible">
                        {categories.map((c, i) => (
                            <Card
                                key={i}
                                className="group rounded-2xl shadow-sm hover:shadow-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50"
                            >
                                <CardContent className="p-0">
                                    <div className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110">
                                        {c.icon}
                                    </div>
                                    <p className="font-medium text-gray-700 group-hover:text-blue-600">
                                        {c.name}
                                    </p>
                                </CardContent>
                            </Card>

                        ))}
                    </div>
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
                        <Input placeholder="Chia sẻ trải nghiệm của bạn..." />
                    </div>
                    <div className="text-xs text-gray-400 text-center mt-2">
                        <Button onClick={openLogin} variant="ghost" className="text-gray-500" >
                            Đăng nhập để chia sẻ bài viết ✍️
                        </Button>
                    </div>
                </Card>

                <div className="space-y-6">
                    {posts.map((p) => (
                        <Card
                            key={p.id}
                            className="overflow-hidden bg-white hover:shadow-md transition border border-gray-100"
                        >
                            <CardContent className="p-4">
                                {/* 🧍Thông tin người dùng */}
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

                                {/* 💬 Nội dung bài đăng */}
                                <p className="text-gray-800 mb-3 leading-relaxed whitespace-pre-line">
                                    {p.caption}
                                </p>

                                {/* 🎵 Nhạc đính kèm */}
                                {p.music && <MusicEmbed url={p.music} />}

                                {/* ❤️ Tương tác */}
                                <div className="flex justify-between text-sm text-gray-500 mt-3">
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
            <section className="text-center py-20 bg-white text-black">
                <h2 className="text-3xl font-bold mb-4">🚀 Gia nhập Socigo ngay hôm nay</h2>
                <p className="text-black mb-6">
                    Đăng dịch vụ của bạn, tiếp cận hàng ngàn khách hàng đang tìm kiếm trải nghiệm mới mỗi ngày.
                </p>
                <Button
                    size="lg"
                    className="bg-black text-white hover:bg-gray-800"
                    onClick={openSignup}
                >
                    Đăng ký doanh nghiệp
                </Button>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    )
}
