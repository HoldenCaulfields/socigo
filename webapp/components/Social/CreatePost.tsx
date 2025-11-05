"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface CreatePostProps {
  onSubmit: (post: {
    text: string;
    mood?: string;
    music?: string;
    rating?: number;
    serviceName?: string;
  }) => void;
  userAvatar?: string;
}

export default function CreatePost({ onSubmit, userAvatar }: CreatePostProps) {
  const [text, setText] = useState("");
  const [music, setMusic] = useState("");
  const [mood, setMood] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [serviceName, setServiceName] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit({
      text,
      mood,
      music,
      rating: rating || undefined,
      serviceName: serviceName || undefined,
    });
    setText("");
    setMusic("");
    setMood("");
    setRating(null);
    setServiceName("");
  };

  return (
    <Card className="p-4 bg-white mb-6 border border-gray-100 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar>
          {userAvatar ? <AvatarImage src={userAvatar} /> : <AvatarFallback>U</AvatarFallback>}
        </Avatar>
        <div className="flex-1 space-y-3">
          <Textarea
            placeholder="Chia sẻ cảm xúc hoặc trải nghiệm của bạn..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Input
            placeholder="🎵 Link Spotify (tùy chọn)"
            value={music}
            onChange={(e) => setMusic(e.target.value)}
          />
          <Input
            placeholder="😊 Tâm trạng (vd: vui vẻ, thư giãn...)"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />

          <div className="flex justify-end">
            <Button onClick={handleSubmit}>Đăng bài ✍️</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
