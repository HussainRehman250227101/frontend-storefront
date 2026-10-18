import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  MessageCircle,
  Send,
  ShoppingBag,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";

type Product = {
  id: string;
  title: string;
  price: string;
  rating: string;
  image: string;
  badge?: string;
};

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
  products?: Product[];
};

const demoProducts: Product[] = [
  {
    id: "iphone-15",
    title: "iPhone 15 · 128GB",
    price: "Rs. 214,999",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=240&q=85",
    badge: "Best value",
  },
  {
    id: "galaxy-a55",
    title: "Samsung Galaxy A55",
    price: "Rs. 139,999",
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=240&q=85",
  },
];

const suggestions = [
  { icon: ShoppingBag, label: "Find the cheapest phone" },
  { icon: Star, label: "Top-rated iPhones" },
  { icon: Zap, label: "Best phone for the price" },
];

export default function ShoppingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Hey there! 👋 I’m your shopping sidekick. Tell me what you’re looking for and I’ll help you find a great match.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      feedRef.current?.scrollTo({
        top: feedRef.current.scrollHeight,
        behavior: "smooth",
      });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping]);

  const sendMessage = (value: string) => {
    const text = value.trim();
    if (!text || isTyping) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", content: text },
    ]);
    setInput("");
    setIsTyping(true);

    // UI-only placeholder. Connect this to the shopping-assistant API in the next step.
    window.setTimeout(() => {
      const normalized = text.toLowerCase();
      const response =
        normalized.includes("iphone") ||
        normalized.includes("rated") ||
        normalized.includes("cheap")
          ? "I’ve got a couple of popular picks to get you started. Once I’m connected to the store catalogue, I’ll compare live prices and ratings for your exact request."
          : "Got it! I can help compare phones by price, rating, and features. Next, I’ll connect this chat to your live product catalogue so recommendations use real store data.";

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: response,
          products:
            normalized.includes("phone") ||
            normalized.includes("iphone") ||
            normalized.includes("cheap") ||
            normalized.includes("rated")
              ? demoProducts
              : undefined,
        },
      ]);
      setIsTyping(false);
    }, 650);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans text-[#182230] max-[520px]:pointer-events-none max-[520px]:inset-0 max-[520px]:bottom-auto max-[520px]:right-auto">
      {isOpen && (
        <section
          className="absolute bottom-[84px] right-0 flex h-[min(650px,calc(100dvh_-_128px))] min-h-[420px] w-[min(390px,calc(100vw_-_32px))] flex-col overflow-hidden rounded-[25px] border border-[#e1e6ef]/90 bg-white shadow-[0_28px_90px_rgba(28,33,68,0.20),0_5px_18px_rgba(28,33,68,0.07)] transition duration-200 max-[520px]:pointer-events-auto max-[520px]:fixed max-[520px]:inset-0 max-[520px]:h-[100dvh] max-[520px]:min-h-0 max-[520px]:w-full max-[520px]:max-w-none max-[520px]:rounded-none max-[520px]:border-0"
          role="dialog"
          aria-modal="false"
          aria-label="Shopping assistant chat"
        >
          <header className="flex shrink-0 items-center gap-[11px] bg-gradient-to-r from-[#30277f] via-[#5142de] to-[#7866f3] px-[17px] py-[17px] text-white max-[520px]:min-h-[calc(75px_+_env(safe-area-inset-top))] max-[520px]:px-4 max-[520px]:pt-[max(16px,env(safe-area-inset-top))]">
            <div
              className="relative grid h-[43px] w-[43px] shrink-0 place-items-center rounded-[15px] border border-white/25 bg-gradient-to-br from-white/25 to-white/10 shadow-inner"
              aria-hidden="true"
            >
              <Sparkles size={21} strokeWidth={2.2} />
              <span className="absolute right-[7px] top-[7px] h-[7px] w-[7px] rounded-full border-[1.5px] border-[#4c3cd3] bg-[#9cf1c8]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h2 className="m-0 text-base font-extrabold tracking-[-0.35px]">ShopMate AI</h2>
                <span className="rounded-[5px] border border-white/30 bg-white/10 px-[6px] py-[2px] text-[9px] font-extrabold tracking-[0.8px]">
                  BETA
                </span>
              </div>
              <p className="mt-1 flex items-center gap-[6px] text-[11px] text-white/80">
                <span className="h-[6px] w-[6px] rounded-full bg-[#91f2be] shadow-[0_0_0_3px_rgba(145,242,190,0.14)]" />
                Here to find your next favourite
              </p>
            </div>
            <button
              className="grid h-[31px] w-[31px] shrink-0 place-items-center rounded-[10px] border-0 bg-white/10 text-white/90 transition hover:-translate-y-px hover:bg-white/20 max-[520px]:h-[34px] max-[520px]:w-[34px]"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize chat"
              type="button"
            >
              <ChevronDown size={21} />
            </button>
            <button
              className="hidden h-[34px] w-[34px] shrink-0 place-items-center rounded-[10px] border-0 bg-white/10 text-white/90 transition hover:bg-white/20 max-[520px]:grid"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              type="button"
            >
              <X size={19} />
            </button>
          </header>

          <div className="flex shrink-0 items-center gap-[9px] border-b border-[#edf0f6] bg-[#fafbff] px-[18px] py-[9px] text-[10px] font-semibold text-[#6e7787] max-[520px]:px-4 max-[520px]:py-[10px]">
            <span className="flex items-center gap-[5px] whitespace-nowrap text-[#6557dc]">
              <Bot size={14} />
              Personal shopping assistant
            </span>
            <span className="h-[13px] w-px shrink-0 bg-[#dce1eb]" />
            <span className="whitespace-nowrap">Product picks, made easy</span>
          </div>

          <div
            className="flex-1 overflow-y-auto overscroll-contain bg-gradient-to-b from-white to-[#fcfcff] px-[15px] pb-[14px] pt-[18px] [scrollbar-color:#e4e7ef_transparent] [scrollbar-width:thin] max-[520px]:px-4 max-[520px]:pb-[15px] max-[520px]:pt-[19px]"
            ref={feedRef}
            aria-live="polite"
          >
            <div className="mb-5 flex items-center gap-[9px] text-[9px] font-extrabold tracking-[1.2px] text-[#a3aab7]">
              <span className="h-px flex-1 bg-[#edf0f5]" />
              <span>YOUR SHOPPING SESSION</span>
              <span className="h-px flex-1 bg-[#edf0f5]" />
            </div>
            {messages.map((message) => (
              <div
                className={`mb-4 flex items-end gap-2 ${message.role === "user" ? "justify-end" : ""}`}
                key={message.id}
              >
                {message.role === "assistant" && (
                  <div
                    className="mb-[2px] grid h-7 w-7 shrink-0 place-items-center rounded-[10px] border border-[#e8e3ff] bg-[#f0edff] text-[#6555e9]"
                    aria-hidden="true"
                  >
                    <Sparkles size={15} />
                  </div>
                )}
                <div className="min-w-0 max-w-[88%]">
                  <div
                    className={
                      message.role === "user"
                        ? "[overflow-wrap:anywhere] rounded-[15px] rounded-tr-[5px] bg-gradient-to-br from-[#6656ec] to-[#5142df] px-[13px] py-[11px] text-[12px] leading-[1.65] text-white shadow-[0_4px_10px_rgba(87,72,222,0.14)] max-[520px]:text-[13px]"
                        : "[overflow-wrap:anywhere] rounded-[5px] rounded-tr-[15px] rounded-br-[15px] rounded-bl-[15px] border border-[#eff0f6] bg-[#f4f5fa] px-[13px] py-[11px] text-[12px] leading-[1.65] text-[#4d5969] max-[520px]:text-[13px]"
                    }
                  >
                    {message.content}
                  </div>
                  {message.products && (
                    <div className="mt-[14px]">
                      <p className="mb-2 text-[9px] font-extrabold tracking-[1.1px] text-[#a0a8b5]">
                        A FEW PICKS FOR YOU
                      </p>
                      {message.products.map((product) => (
                        <a
                          className="group relative mb-2 flex items-center gap-[11px] rounded-[14px] border border-[#e8ebf2] bg-white p-[10px] text-inherit no-underline shadow-[0_3px_10px_rgba(40,48,85,0.025)] transition hover:-translate-y-px hover:border-[#c8c2ff] hover:shadow-[0_8px_20px_rgba(77,65,180,0.09)]"
                          href={`/products/${product.id}`}
                          key={product.id}
                        >
                          <div className="grid h-[77px] w-[67px] shrink-0 place-items-center overflow-hidden rounded-[10px] bg-[#f5f6fa]">
                            <img
                              className="h-full w-full object-cover"
                              src={product.image}
                              alt={product.title}
                              loading="lazy"
                            />
                          </div>
                          <div className="flex min-w-0 flex-col items-start gap-1 pr-[10px]">
                            {product.badge && (
                              <span className="rounded-[5px] bg-[#f0edff] px-[6px] py-[2px] text-[8px] font-extrabold text-[#5144d4]">
                                {product.badge}
                              </span>
                            )}
                            <span className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-bold text-[#30394a]">
                              {product.title}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-[#df9c21]">
                              <Star size={13} fill="currentColor" />
                              {product.rating}
                              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[9px] font-normal text-[#969eac]">
                                · Customer rating
                              </span>
                            </span>
                            <strong className="font-sans text-xs font-extrabold text-[#332a83]">
                              {product.price}
                            </strong>
                          </div>
                          <ArrowUpRight
                            className="absolute right-[9px] top-[10px] text-[#a1a7b4] transition group-hover:text-[#6554e8]"
                            size={17}
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="mb-[7px] ml-9 mt-[21px]">
                <p className="mb-[9px] text-[9px] font-extrabold tracking-[1.1px] text-[#a0a8b5]">
                  TRY ASKING
                </p>
                {suggestions.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="mb-[7px] flex w-full items-center gap-[9px] rounded-xl border border-[#e9eaf5] bg-white px-[11px] py-[10px] text-left text-[11px] font-semibold text-[#596575] transition hover:translate-x-[2px] hover:border-[#c9c3ff] hover:bg-[#faf9ff] hover:shadow-[0_4px_12px_rgba(63,57,139,0.05)] max-[520px]:px-3 max-[520px]:py-3 max-[520px]:text-xs"
                    onClick={() => sendMessage(label)}
                    type="button"
                  >
                    <Icon className="shrink-0 text-[#7062e9]" size={15} />
                    <span>{label}</span>
                    <ArrowUpRight className="ml-auto shrink-0 text-[#9ca4b3]" size={14} />
                  </button>
                ))}
              </div>
            )}
            {isTyping && (
              <div className="mb-4 flex items-end gap-2">
                <div
                  className="mb-[2px] grid h-7 w-7 shrink-0 place-items-center rounded-[10px] border border-[#e8e3ff] bg-[#f0edff] text-[#6555e9]"
                  aria-hidden="true"
                >
                  <Sparkles size={15} />
                </div>
                <div
                  className="flex h-[34px] items-center gap-1 rounded-[5px] rounded-tr-[14px] rounded-br-[14px] rounded-bl-[14px] border border-[#eff0f6] bg-[#f4f5fa] px-[13px]"
                  aria-label="Assistant is typing"
                >
                  <i className="h-[5px] w-[5px] animate-bounce rounded-full bg-[#8c80ef]" />
                  <i className="h-[5px] w-[5px] animate-bounce rounded-full bg-[#8c80ef] [animation-delay:120ms]" />
                  <i className="h-[5px] w-[5px] animate-bounce rounded-full bg-[#8c80ef] [animation-delay:240ms]" />
                </div>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-[#edf0f5] bg-white px-[14px] pb-[11px] pt-3 max-[520px]:px-[15px] max-[520px]:pb-[max(12px,env(safe-area-inset-bottom))]">
            <form
              className="flex items-center gap-2 rounded-[15px] border border-[#e4e7f0] bg-[#fbfbfe] p-[5px] pl-[14px] transition focus-within:border-[#bab2ff] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(94,77,226,0.08)]"
              onSubmit={handleSubmit}
            >
              <input
                ref={inputRef}
                className="h-[35px] min-w-0 flex-1 border-0 bg-transparent p-0 text-xs text-[#263244] outline-none placeholder:text-[#a2a9b6] max-[520px]:text-base"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask me to find something..."
                aria-label="Message shopping assistant"
                maxLength={1000}
              />
              <button
                className="grid h-[35px] w-[35px] shrink-0 place-items-center rounded-[11px] border-0 bg-gradient-to-br from-[#6c5cec] to-[#5040db] text-white shadow-[0_3px_8px_rgba(82,64,219,0.21)] transition hover:-translate-y-px hover:shadow-[0_5px_12px_rgba(82,64,219,0.27)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                type="submit"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </form>
            <p className="mt-[9px] flex items-center justify-center gap-[5px] text-[9px] text-[#a4aab6]">
              <Sparkles className="text-[#8275e9]" size={11} />
              Smart suggestions, simpler shopping
            </p>
          </div>
        </section>
      )}

      {!isOpen && (
        <div className="group/launcher pointer-events-auto relative flex justify-end max-[520px]:absolute max-[520px]:bottom-[max(18px,env(safe-area-inset-bottom))] max-[520px]:right-[max(18px,env(safe-area-inset-right))]">
          <div className="pointer-events-none absolute right-[74px] top-1/2 -translate-y-1/2 translate-x-[5px] whitespace-nowrap rounded-[10px] bg-[#272345] px-3 py-[9px] text-[11px] font-semibold text-white opacity-0 shadow-[0_7px_20px_rgba(30,24,74,0.16)] transition group-hover/launcher:translate-x-0 group-hover/launcher:opacity-100">
            Need a hand choosing?
          </div>
          <button
            className="group relative isolate grid h-[62px] w-[62px] place-items-center rounded-[22px] border-0 bg-gradient-to-br from-[#7868fa] via-[#5c4be8] to-[#4332cd] text-white shadow-[0_14px_32px_rgba(82,63,218,0.34),inset_0_1px_0_rgba(255,255,255,0.36)] transition hover:-translate-y-[3px] hover:-rotate-2 hover:shadow-[0_19px_37px_rgba(82,63,218,0.4)] active:scale-95 max-[520px]:h-[59px] max-[520px]:w-[59px] max-[520px]:rounded-[21px]"
            onClick={() => setIsOpen(true)}
            aria-label="Open shopping assistant"
            type="button"
          >
            <span className="pointer-events-none absolute inset-[1px] rounded-[21px] border border-white/25 max-[520px]:rounded-[20px]" />
            <span className="pointer-events-none absolute -inset-[6px] -z-10 rounded-[27px] bg-[#8072ff] opacity-[0.13] blur-[9px]" />
            <MessageCircle
              className="drop-shadow-[0_2px_3px_rgba(34,24,109,0.2)]"
              size={26}
              strokeWidth={2.2}
            />
            <Sparkles className="absolute right-[11px] top-3 text-[#d8d2ff]" size={14} />
            <span className="absolute right-[3px] top-[3px] h-3 w-3 rounded-full border-2 border-white bg-[#57dda0]" />
          </button>
        </div>
      )}
    </div>
  );
}
