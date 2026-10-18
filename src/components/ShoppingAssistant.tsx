import { useEffect, useRef, useState, type FormEvent } from "react";
import { Bot, ChevronDown, MessageCircle, Send, Sparkles, X, Star, ArrowUpRight, ShoppingBag, Zap } from "lucide-react";

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
      content: "Hey there! 👋 I’m your shopping sidekick. Tell me what you’re looking for and I’ll help you find a great match.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping]);

  const sendMessage = (value: string) => {
    const text = value.trim();
    if (!text || isTyping) return;

    setMessages((current) => [...current, { id: Date.now(), role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

    // UI-only placeholder. Replace this with the backend shopping-assistant endpoint in the next step.
    window.setTimeout(() => {
      const normalized = text.toLowerCase();
      const response = normalized.includes("iphone") || normalized.includes("rated") || normalized.includes("cheap")
        ? "I’ve got a couple of popular picks to get you started. Once I’m connected to the store catalogue, I’ll compare live prices and ratings for your exact request."
        : "Got it! I can help compare phones by price, rating, and features. Next, I’ll connect this chat to your live product catalogue so recommendations use real store data.";

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: response,
          products: normalized.includes("phone") || normalized.includes("iphone") || normalized.includes("cheap") || normalized.includes("rated")
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
    <div className="shopping-assistant-root">
      {isOpen && (
        <section
          className="sa-panel"
          role="dialog"
          aria-modal="false"
          aria-label="Shopping assistant chat"
        >
          <header className="sa-header">
            <div className="sa-brand-mark" aria-hidden="true">
              <Sparkles size={21} strokeWidth={2.2} />
              <span className="sa-brand-dot" />
            </div>
            <div className="sa-header-copy">
              <div className="sa-title-row">
                <h2>ShopMate AI</h2>
                <span className="sa-beta">BETA</span>
              </div>
              <p><span className="sa-online-dot" /> Here to find your next favourite</p>
            </div>
            <button className="sa-icon-button" onClick={() => setIsOpen(false)} aria-label="Minimize chat">
              <ChevronDown size={21} />
            </button>
            <button className="sa-icon-button sa-close-button" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X size={19} />
            </button>
          </header>

          <div className="sa-trust-strip">
            <span><Bot size={14} /> Personal shopping assistant</span>
            <span className="sa-trust-divider" />
            <span>Product picks, made easy</span>
          </div>

          <div className="sa-feed" ref={feedRef} aria-live="polite">
            <div className="sa-date-divider"><span>YOUR SHOPPING SESSION</span></div>
            {messages.map((message) => (
              <div className={`sa-message-row ${message.role === "user" ? "sa-user-row" : ""}`} key={message.id}>
                {message.role === "assistant" && (
                  <div className="sa-avatar" aria-hidden="true"><Sparkles size={15} /></div>
                )}
                <div className="sa-message-content">
                  <div className={`sa-bubble ${message.role === "user" ? "sa-user-bubble" : "sa-assistant-bubble"}`}>
                    {message.content}
                  </div>
                  {message.products && (
                    <div className="sa-product-list">
                      <p className="sa-product-list-label">A FEW PICKS FOR YOU</p>
                      {message.products.map((product) => (
                        <a className="sa-product-card" href={`/products/${product.id}`} key={product.id}>
                          <div className="sa-product-image-wrap">
                            <img src={product.image} alt={product.title} loading="lazy" />
                          </div>
                          <div className="sa-product-info">
                            {product.badge && <span className="sa-product-badge">{product.badge}</span>}
                            <span className="sa-product-title">{product.title}</span>
                            <span className="sa-product-rating"><Star size={13} fill="currentColor" /> {product.rating} <span>· Customer rating</span></span>
                            <strong className="sa-product-price">{product.price}</strong>
                          </div>
                          <ArrowUpRight className="sa-product-arrow" size={17} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {messages.length === 1 && (
              <div className="sa-suggestions">
                <p>TRY ASKING</p>
                {suggestions.map(({ icon: Icon, label }) => (
                  <button key={label} className="sa-suggestion" onClick={() => sendMessage(label)}>
                    <Icon size={15} />
                    <span>{label}</span>
                    <ArrowUpRight size={14} className="sa-suggestion-arrow" />
                  </button>
                ))}
              </div>
            )}
            {isTyping && (
              <div className="sa-message-row">
                <div className="sa-avatar" aria-hidden="true"><Sparkles size={15} /></div>
                <div className="sa-typing" aria-label="Assistant is typing"><i /><i /><i /></div>
              </div>
            )}
          </div>

          <div className="sa-composer-wrap">
            <form className="sa-composer" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask me to find something..."
                aria-label="Message shopping assistant"
                maxLength={1000}
              />
              <button className="sa-send-button" type="submit" disabled={!input.trim() || isTyping} aria-label="Send message">
                <Send size={17} />
              </button>
            </form>
            <p className="sa-disclaimer"><Sparkles size={11} /> Smart suggestions, simpler shopping</p>
          </div>
        </section>
      )}

      {!isOpen && (
        <div className="sa-launcher-wrap">
          <div className="sa-launcher-tooltip">Need a hand choosing?</div>
          <button className="sa-launcher" onClick={() => setIsOpen(true)} aria-label="Open shopping assistant">
            <span className="sa-launcher-glow" />
            <MessageCircle className="sa-launcher-chat-icon" size={26} strokeWidth={2.2} />
            <Sparkles className="sa-launcher-sparkle" size={14} />
            <span className="sa-launcher-status" />
          </button>
        </div>
      )}
    </div>
  );
}
