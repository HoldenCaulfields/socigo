// components/Social/PostReviewForm.tsx
"use client";

import { useState, FormEvent } from 'react';
import { useReviewPost } from '@/hooks/useReviewPost'; // Hook đã tạo trước đó
import { Star, Send } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface PostReviewFormProps {
    serviceId?: string; // Nếu có -> tạo Review. Nếu không -> tạo Social Post
    onPostSuccess: () => void; // Callback để load lại danh sách bài viết/review
}

const PostReviewForm = ({ serviceId, onPostSuccess }: PostReviewFormProps) => {
    const { user } = useAuth();
    const isReview = !!serviceId;
    const { loading, error, submitPost } = useReviewPost();
    
    const [text, setText] = useState('');
    // Khởi tạo rating mặc định là 5 nếu là Review, hoặc undefined nếu là Post
    const [rating, setRating] = useState(isReview ? 5 : undefined); 
    const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

    const handleRating = (r: number) => {
        if (isReview) {
            setRating(r);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (!user) {
            setMessage({ type: 'error', text: 'Vui lòng đăng nhập để đăng bài/đánh giá.' });
            return;
        }

        const postData = {
            serviceId,
            // Đảm bảo rating là number hoặc undefined khi gửi đi
            rating: isReview ? rating : undefined, 
            text,
            images: [], // Tạm thời bỏ qua việc upload ảnh
        };

        const result = await submitPost(postData);
        
        if (result.success) {
            setMessage({ type: 'success', text: result.message });
            setText('');
            setRating(isReview ? 5 : undefined);
            onPostSuccess(); // Kích hoạt callback để làm mới dữ liệu
        } else {
            setMessage({ type: 'error', text: result.message });
        }
    };
    
    // Nếu chưa đăng nhập, hiển thị nút đăng nhập thay vì form
    if (!user) {
        return (
            <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 text-center">
                <p className="mb-4 text-gray-600">Bạn cần đăng nhập để {(isReview ? 'viết đánh giá' : 'đăng bài viết')}.</p>
                <Link href="/login?modal=true" className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Đăng Nhập Ngay
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4">
                {isReview ? `⭐ Viết Đánh Giá Dịch Vụ` : `✍️ Chia Sẻ Bài Viết Mới`}
            </h3>
            
            {isReview && (
                <div className="flex items-center space-x-1 mb-4">
                    <span className="font-medium text-gray-700 mr-2">Đánh giá:</span>
                    {[1, 2, 3, 4, 5].map((r) => (
                        <Star 
                            key={r} 
                            size={24} 
                            onClick={() => handleRating(r)}
                            className={`cursor-pointer transition-colors ${
                                rating !== undefined && r <= rating 
                                ? 'text-yellow-500 fill-yellow-500' 
                                : 'text-gray-300 fill-gray-100 hover:text-yellow-400'
                            }`}
                        />
                    ))}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder={isReview ? "Hãy chia sẻ trải nghiệm của bạn về dịch vụ này..." : "Bạn đang nghĩ gì? Chia sẻ ngay..."}
                    rows={4}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />

                {/* Tạm thời bỏ qua phần Upload ảnh */}
                
                {(message || error) && (
                    <div className={`p-3 rounded text-sm ${message?.type === 'error' || error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message?.text || error}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={loading || !text} 
                    className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-gray-400 space-x-2"
                >
                    <Send size={18} />
                    <span>{loading ? 'Đang gửi...' : (isReview ? 'Gửi Đánh Giá' : 'Đăng Bài Viết')}</span>
                </button>
            </form>
        </div>
    );
};

export default PostReviewForm;