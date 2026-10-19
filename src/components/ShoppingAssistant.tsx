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
  image?: string;
  badge?: string;
};

type ApiProduct = {
  id: string | number;
  title: string;
  price: string | number;
  rating?: string | number | null;
  image?: string | null;
  in_stock?: boolean;
};

type ApiResponse = {
  message?: string;
  intent?: string;
  products?: ApiProduct[];
  detail?: string;
};

type Message = {
  id: number;
  role: "assistant" | "user";
  content: string;
  products?: Product[];
};

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

function formatPrice(value: string | number) {
  const numericPrice = Number(value);
  if (!Number.isFinite(numericPrice)) return String(value);
  return `Rs. ${numericPrice.toLocaleString("en-PK", {
    maximumFractionDigits: 2,
  })}`;
}

function getImageUrl(image?: string | null) {
  if (!image) return undefined;
  if (/^https?:\/\//i.test(image)) return image;
  return `${API_BASE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
}

function mapApiProduct(product: ApiProduct): Product {
  return {
    id: String(product.id),
    title: product.title,
    price: formatPrice(product.price),
    rating:
      product.rating === null || product.rating === undefined
        ? "N/A"
        : Number(product.rating).toFixed(1),
    image: getImageUrl(product.image),
    badge: product.in_stock === false ? "Out of stock" : undefined,
  };
}

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

  const sendMessage = async (value: string) => {
    const text = value.trim();
    if (!text || isTyping) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", content: text },
    ]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/store/assistant/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = (await response.json()) as ApiResponse;
      if (!response.ok) {
        throw new Error(
          data.detail || data.message || `Request failed (HTTP ${response.status})`,
        );
      }

      const products = Array.isArray(data.products)
        ? data.products.map(mapApiProduct)
        : [];

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: data.message || "Here are the results I found.",
          products: products.length ? products : undefined,
        },
      ]);
    } catch (error) {
      const reason =
        error instanceof Error ? error.message : "An unexpected error occurred.";
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: `Sorry, I couldn't connect to the shopping service. ${reason} Make sure Django is running and the API address is correct.`,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] font-sans text-[#182230]">
      {isOpen && (
        <section
          className="pointer-events-auto fixed inset-0 flex h-[100dvh] min-h-0 w-screen max-w-none flex-col overflow-hidden rounded-none border-0 border-[#e1e6ef]/90 bg-white shadow-[0_24px_72px_rgba(28,33,68,0.20),0_5px_18px_rgba(28,33,68,0.07)] transition duration-200 sm:inset-auto sm:bottom-[104px] sm:right-6 sm:h-[min(640px,calc(100dvh_-_128px))] sm:w-[min(400px,calc(100vw_-_32px))] sm:max-w-[400px] sm:rounded-[24px] sm:border"
          role="dialog"
          aria-modal="false"
          aria-label="Shopping assistant chat"
        >
          <header className="flex shrink-0 items-center gap-[11px] bg-gradient-to-r from-[#30277f] via-[#5142de] to-[#7866f3] px-[17px] py-[17px] text-white max-[639px]:min-h-[calc(75px_+_env(safe-area-inset-top))] max-[639px]:px-4 max-[639px]:pt-[max(16px,env(safe-area-inset-top))]">
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
              className="grid h-[31px] w-[31px] shrink-0 place-items-center rounded-[10px] border-0 bg-white/10 text-white/90 transition hover:-translate-y-px hover:bg-white/20 max-[639px]:hidden"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize chat"
              type="button"
            >
              <ChevronDown size={21} />
            </button>
            <button
              className="hidden h-[34px] w-[34px] shrink-0 place-items-center rounded-[10px] border-0 bg-white/10 text-white/90 transition hover:bg-white/20 max-[639px]:grid"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              type="button"
            >
              <X size={19} />
            </button>
          </header>

          <div className="flex shrink-0 items-center gap-[9px] border-b border-[#edf0f6] bg-[#fafbff] px-[18px] py-[9px] text-[10px] font-semibold text-[#6e7787] max-[639px]:gap-2 max-[639px]:px-4 max-[639px]:py-[10px]">
            <span className="flex items-center gap-[5px] whitespace-nowrap text-[#6557dc]">
              <Bot size={14} />
              Personal shopping assistant
            </span>
            <span className="h-[13px] w-px shrink-0 bg-[#dce1eb]" />
            <span className="min-w-0 truncate">Product picks, made easy</span>
          </div>

          <div
            className="flex-1 overflow-y-auto overscroll-contain bg-gradient-to-b from-white to-[#fcfcff] px-[15px] pb-[14px] pt-[18px] [scrollbar-color:#e4e7ef_transparent] [scrollbar-width:thin] max-[639px]:px-4 max-[639px]:pb-[15px] max-[639px]:pt-[19px]"
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
                        ? "[overflow-wrap:anywhere] rounded-[15px] rounded-tr-[5px] bg-gradient-to-br from-[#6656ec] to-[#5142df] px-[13px] py-[11px] text-[12px] leading-[1.65] text-white shadow-[0_4px_10px_rgba(87,72,222,0.14)] max-[639px]:text-[13px]"
                        : "[overflow-wrap:anywhere] rounded-[5px] rounded-tr-[15px] rounded-br-[15px] rounded-bl-[15px] border border-[#eff0f6] bg-[#f4f5fa] px-[13px] py-[11px] text-[12px] leading-[1.65] text-[#4d5969] max-[639px]:text-[13px]"
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
                            {product.image ? (
                              <img
                                className="h-full w-full object-cover"
                                src={product.image}
                                alt={product.title}
                                loading="lazy"
                              />
                            ) : (
                              <ShoppingBag
                                className="text-[#b6b9c8]"
                                size={24}
                                aria-hidden="true"
                              />
                            )}
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
                    className="mb-[7px] flex w-full items-center gap-[9px] rounded-xl border border-[#e9eaf5] bg-white px-[11px] py-[10px] text-left text-[11px] font-semibold text-[#596575] transition hover:translate-x-[2px] hover:border-[#c9c3ff] hover:bg-[#faf9ff] hover:shadow-[0_4px_12px_rgba(63,57,139,0.05)] max-[639px]:px-3 max-[639px]:py-3 max-[639px]:text-xs"
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

          <div className="shrink-0 border-t border-[#edf0f5] bg-white px-[14px] pb-[11px] pt-3 max-[639px]:px-[15px] max-[639px]:pb-[max(12px,env(safe-area-inset-bottom))]">
            <form
              className="flex items-center gap-2 rounded-[15px] border border-[#e4e7f0] bg-[#fbfbfe] p-[5px] pl-[14px] transition focus-within:border-[#bab2ff] focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(94,77,226,0.08)]"
              onSubmit={handleSubmit}
            >
              <input
                ref={inputRef}
                className="h-[35px] min-w-0 flex-1 border-0 bg-transparent p-0 text-xs text-[#263244] outline-none placeholder:text-[#a2a9b6] max-[639px]:text-base"
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
        <div className="group/launcher pointer-events-auto absolute bottom-[max(18px,env(safe-area-inset-bottom))] right-[max(18px,env(safe-area-inset-right))] flex justify-end sm:bottom-6 sm:right-6">
          <div className="pointer-events-none absolute right-[74px] top-1/2 -translate-y-1/2 translate-x-[5px] whitespace-nowrap rounded-[10px] bg-[#272345] px-3 py-[9px] text-[11px] font-semibold text-white opacity-0 shadow-[0_7px_20px_rgba(30,24,74,0.16)] transition group-hover/launcher:translate-x-0 group-hover/launcher:opacity-100 max-[639px]:hidden">
            Need a hand choosing?
          </div>
          <button
            className="group relative isolate grid h-[62px] w-[62px] place-items-center rounded-[22px] border-0 bg-gradient-to-br from-[#7868fa] via-[#5c4be8] to-[#4332cd] text-white shadow-[0_14px_32px_rgba(82,63,218,0.34),inset_0_1px_0_rgba(255,255,255,0.36)] transition hover:-translate-y-[3px] hover:-rotate-2 hover:shadow-[0_19px_37px_rgba(82,63,218,0.4)] active:scale-95 max-[639px]:h-[59px] max-[639px]:w-[59px] max-[639px]:rounded-[21px]"
            onClick={() => setIsOpen(true)}
            aria-label="Open shopping assistant"
            type="button"
          >
            <span className="pointer-events-none absolute inset-[1px] rounded-[21px] border border-white/25 max-[639px]:rounded-[20px]" />
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
