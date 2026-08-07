import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Send } from "lucide-react";

const PHONE_NUMBER = "250785726750";
const DEFAULT_MESSAGE = "Hi Bosswebber! I'm interested in your services.";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2c-5.523 0-10 4.477-10 10 0 1.75.454 3.462 1.318 4.966L2 22l5.146-1.35A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12.001 2zm0 18.222a8.19 8.19 0 01-4.176-1.14l-.3-.177-3.104.814.828-3.03-.196-.31A8.19 8.19 0 013.778 12c0-4.535 3.687-8.222 8.223-8.222 4.535 0 8.222 3.687 8.222 8.222 0 4.536-3.687 8.222-8.222 8.222z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const openWhatsApp = () => {
    const text = message.trim() || DEFAULT_MESSAGE;
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[320px] sm:w-[360px] rounded-2xl overflow-hidden shadow-2xl border border-black/5"
            role="dialog"
            aria-label="WhatsApp chat"
          >
            {/* Header */}
            <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shrink-0 bg-white">
                <img
                  src="/images/bosswebber-logo.png"
                  alt="Bosswebber"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">Bosswebber</p>
                <p className="text-white/70 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
                  Typically replies instantly
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat body */}
            <div
              className="px-4 py-5 space-y-3 min-h-[140px]"
              style={{
                backgroundColor: "#E5DDD5",
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d5cdc2' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              }}
            >
              <div className="max-w-[85%] bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm">
                <p className="text-sm text-slate-800">
                  Hi there! 👋 Welcome to Bosswebber. How can we help you build something great today?
                </p>
                <span className="block text-right text-[10px] text-slate-400 mt-1">Bosswebber</span>
              </div>
            </div>

            {/* Composer */}
            <div className="bg-[#F0F0F0] p-3 flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") openWhatsApp();
                }}
                placeholder="Type a message"
                className="flex-1 rounded-full bg-white px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#25D366]/40"
              />
              <button
                type="button"
                onClick={openWhatsApp}
                aria-label="Send message on WhatsApp"
                className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white shrink-0 hover:bg-[#20BD5C] transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating action button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        aria-label={isOpen ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "chat"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
          >
            {isOpen ? <X size={26} className="text-white" /> : <WhatsAppIcon className="w-7 h-7 text-white" />}
          </motion.span>
        </AnimatePresence>

        {!isOpen && <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />}
      </motion.button>
    </div>
  );
}
