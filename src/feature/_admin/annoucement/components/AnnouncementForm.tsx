"use client";

import { Button } from "@/shared/components/ui/Button";
import { useState, FormEvent } from "react";
import { usePostAnnouncement } from "../hooks/usePostAnnouncement";
import { CheckCircle2, Loader2, Send } from "lucide-react";

interface AnnouncementFormProps {
    onSuccess?: () => void;
}

const AnnouncementForm = ({ onSuccess }: AnnouncementFormProps) => {
    const [message, setMessage] = useState("");
    const { postAnnouncement, loading, error, success, reset } = usePostAnnouncement();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!message.trim()) {
            return;
        }

        const wasSuccessful = await postAnnouncement(message);

        if (wasSuccessful) {
            console.log("Submit successful, calling onSuccess callback!");
            setMessage("");
            onSuccess?.();
            reset();
        }
    };

    return (
        // Menggunakan container glassmorphism bg-[#B0BFC7]/10 dengan border tipis transparan
        <div className="font-leaguespartan text-white p-5 bg-[#B0BFC7]/10 border border-white/10 backdrop-blur-md rounded-2xl w-full shadow-xl">
            
            <div className="flex flex-col mb-4 pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Composer</span>
                <h3 className="text-base font-bold tracking-wide">Create New Announcement</h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-h-[260px]">
                {/* Textarea yang disesuaikan ke nuansa kaca transparan */}
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter announcement message text..."
                    className="w-full h-48 p-4 bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:border-white/30 focus:bg-white/10 text-white text-sm placeholder-white/30 resize-none transition-all duration-300 disabled:opacity-40"
                    disabled={loading}
                />

                {/* State Error Alert Box Transparan Kemerahan */}
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 font-medium text-xs rounded-xl text-center">
                        ⚠ {error}
                    </div>
                )}

                {/* Tombol Kirim yang Mengadopsi Warna Gradasi Figma */}
                <Button
                    type="submit"
                    size="normal"
                    disabled={loading || !message.trim()}
                    className={`w-full h-11 text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed ${
                        success 
                            ? "bg-green-500/20 border border-green-500/30 text-green-400" 
                            : "bg-gradient-to-r from-[#243642] to-[#3D5D71] border border-transparent text-white hover:scale-101 shadow-md shadow-black/10 disabled:opacity-40"
                    }`}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Broadcasting... (± 30s)</span>
                        </>
                    ) : success ? (
                        <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Successfully Published!</span>
                        </>
                    ) : (
                        <>
                            <Send size={12} />
                            <span>Publish Announcement</span>
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
};

export default AnnouncementForm;