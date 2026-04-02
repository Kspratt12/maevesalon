"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

// ============================================================
// DEMO MODE: This chat works with pre-built responses.
// To enable AI mode, add your API key in the config below.
// ============================================================
const AI_CONFIG = {
  enabled: false, // Set to true when API key is added
  apiKey: "", // Add your Anthropic or OpenAI API key here
  provider: "anthropic" as "anthropic" | "openai",
  // The system prompt that tells the AI about Maeve Salon
  systemPrompt: `You are a friendly, knowledgeable assistant for Maeve Salon & Color Bar, a luxury hair salon in Apex, North Carolina.

KEY INFO:
- Address: 1121 Apex Peakway, Apex, NC 27502
- Phone: (919) 951-7866
- Email: info@maevesalon.com
- Hours: Mon-Thu 9AM-8PM, Fri 9AM-6PM, Sat 9AM-3PM, Closed Sunday
- Booking: https://www.phorest.com/salon/maevesalonandcolorbar/book/service-selection

SERVICES & PRICING:
- Women's Cut: from $60
- Men's Cut: from $45
- Re-Touch & Style: from $105
- Full Color & Style: from $155
- Partial Dimensional & Style: from $140
- Full Dimensional & Style: from $155
- Partial Balayage & Style: from $195
- Full Balayage & Style: from $245
- Full Babylights & Style: from $225
- Kerasilk Smoothing Treatment: from $350
- Extensions: Upon Consultation
- Blowout: from $35-$55
- Special Occasion Updo: from $100
- Waxing: Eyebrow $22, Lip $15, Full Face $40

NAIL SERVICES (Nails by Tess):
- Short and Sweet Mani: $15
- A Little Extra Love Mani: $25
- The Whole Package Mani: $35
- Gel Polish Add-On: $15
- Builder Gel Mani: $55
- Gel-X Full Set: $60
- Acrylic Full Set: $55

STYLISTS: Alexa Neal, Anna Denton, Bethany Cordial, Brittany Murphy, Brittany Siebelink, Carrie Sparks, Carson Reagan, Claire Hartman, Gracie Hutchens, Hannah Womble, Jess Marano, Jessica Speicher, Jordan Miles, Kirstin Allen, Lindsey Widger, Meghan Marple, Nails By Tess, Sucel Toc

BRANDS: Goldwell, Redken (color), Oribe, Kerastase, Shu Uemura

POLICIES:
- 24 hour cancellation policy (50% charge for late cancellations)
- No shows charged 50% of service
- Retail returns within 14 days for salon credit
- Service corrections free within 2 weeks

Keep responses concise, warm, and helpful. If someone wants to book, direct them to the online booking link or tell them to call. Always be professional and match the luxury salon vibe.`,
};

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Pre-built responses for demo mode
function getDemoResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("hour") || lower.includes("open") || lower.includes("close")) {
    return "Our hours are:\n- Monday - Thursday: 9:00AM - 8:00PM\n- Friday: 9:00AM - 6:00PM\n- Saturday: 9:00AM - 3:00PM\n- Sunday: Closed\n\nWould you like to book an appointment?";
  }

  if (lower.includes("book") || lower.includes("appointment") || lower.includes("schedule")) {
    return "I'd love to help you book! You can:\n\n1. Book online at our [booking page](/book-appointment)\n2. Call us at (919) 951-7866\n3. Email info@maevesalon.com\n\nWould you like to know about our services and pricing first?";
  }

  if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
    return "Here's an overview of our pricing:\n\n**Hair Services:**\n- Women's Cut: from $60\n- Re-Touch & Style: from $105\n- Full Color & Style: from $155\n- Full Balayage & Style: from $245\n- Smoothing Treatment: from $350\n\n**Nails by Tess:**\n- Manicures: from $15\n- Gel Services: from $55\n- Acrylic Full Set: from $55\n\nPrices vary by stylist and service complexity. Would you like details on a specific service?";
  }

  if (lower.includes("color") || lower.includes("highlight") || lower.includes("balayage") || lower.includes("blonde")) {
    return "We offer a full range of color services:\n\n- Re-Touch & Style: from $105\n- Full Color & Style: from $155\n- Partial Dimensional & Style: from $140\n- Full Dimensional & Style: from $155\n- Balayage & Style: from $245\n- Full Babylights & Style: from $225\n\nWe use Goldwell and Redken color for beautiful, long-lasting results. Want to book a color appointment?";
  }

  if (lower.includes("cut") || lower.includes("haircut")) {
    return "Our cuts and styling services:\n\n- **Women's Cut:** from $60\n- **Men's Cut:** from $45\n- **Blowout Style:** from $35-$55\n- **Special Occasion Updo:** from $100\n- **Bang Trim:** complimentary with select services\n\nWould you like to see which stylist is available?";
  }

  if (lower.includes("nail") || lower.includes("mani") || lower.includes("pedi") || lower.includes("tess") || lower.includes("acrylic") || lower.includes("gel")) {
    return "Nails by Tess offers:\n\n**Manicures:** $15-$35\n**Gel Services:** Builder Gel $55, Gel-X $60\n**Acrylics:** Full Set $55, Fill $40\n**Nail Art:** $5-$15+ per nail\n\nTess specializes in custom nail art and designs! Book with her through our booking page.";
  }

  if (lower.includes("bridal") || lower.includes("wedding") || lower.includes("bride")) {
    return "We'd love to be part of your special day! Here's our bridal process:\n\n1. **Contact us** with your date, ceremony time, location, and party size\n2. We'll **review** and send a quote\n3. Schedule a **trial** (2 hours, fee applies)\n4. **Sign contract** and pay deposit\n5. **You're booked!** Confirmation in 5-7 days\n\nCall (919) 951-7866 or email info@maevesalon.com to get started!";
  }

  if (lower.includes("stylist") || lower.includes("team") || lower.includes("who")) {
    return "Our talented team includes 18 stylists! A few highlights:\n\n- **Tiffany Weaver** - Owner & Artistic Director\n- **Brie Whalen** - Managing Partner\n- **Anna Denton** - Blonding specialist\n- **Nails by Tess** - Nail art expert\n\nPlus Alexa, Bethany, Brittany M., Brittany S., Carrie, Carson, Claire, Gracie, Hannah, Jess, Jessica, Jordan, Kirstin, Lindsey, Meghan, and Sucel.\n\nVisit our Meet the Team page to see everyone!";
  }

  if (lower.includes("cancel") || lower.includes("policy") || lower.includes("late") || lower.includes("no show")) {
    return "Our key policies:\n\n- **24-hour cancellation required** - less than 24 hours may result in a 50% charge\n- **No shows** - 15 min late without contact = 50% charge\n- **Late arrivals** - call us and we'll try to accommodate\n- **Returns** - retail products within 14 days for salon credit\n- **Service guarantee** - corrections free within 2 weeks\n\nQuestions? Call us at (919) 951-7866.";
  }

  if (lower.includes("location") || lower.includes("where") || lower.includes("address") || lower.includes("direction") || lower.includes("find")) {
    return "We're located at:\n\n**1121 Apex Peakway**\nApex, North Carolina 27502\n\nYou can reach us at (919) 951-7866 or info@maevesalon.com. Check our Contact page for a map and directions!";
  }

  if (lower.includes("product") || lower.includes("brand") || lower.includes("goldwell") || lower.includes("oribe") || lower.includes("kerastase")) {
    return "We proudly feature premium brands:\n\n- **Goldwell & Redken** - Professional hair color\n- **Oribe** - Luxury hair care\n- **Kerastase** - Premium treatments\n- **Shu Uemura** - Art of hair\n\nAsk your stylist about the best products for your hair type!";
  }

  if (lower.includes("gift") || lower.includes("card")) {
    return "Gift certificates are available! You can purchase them at the salon or through our online booking system. They're valid for one year and can be used for any service or product. Perfect for birthdays, holidays, or just because!";
  }

  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey") || lower.includes("good")) {
    return "Hello! Welcome to Maeve Salon & Color Bar! I'm here to help with anything you need - from service info and pricing to booking appointments. What can I help you with today?";
  }

  if (lower.includes("thank")) {
    return "You're welcome! If you have any other questions, feel free to ask. We look forward to seeing you at Maeve! You can book anytime at (919) 951-7866 or through our online booking.";
  }

  return "Great question! Here's how I can help:\n\n- **Services & Pricing** - hair, nails, bridal\n- **Book an Appointment** - online or by phone\n- **Meet Our Team** - 18 talented stylists\n- **Hours & Location** - when and where to find us\n- **Salon Policies** - cancellations, returns, etc.\n\nWhat would you like to know more about?";
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! Welcome to Maeve Salon & Color Bar. I can help you with services, pricing, booking, or anything else. What can I help you with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    if (AI_CONFIG.enabled && AI_CONFIG.apiKey) {
      // AI MODE - calls actual API
      try {
        const allMessages = [...messages, userMessage];
        let response: string;

        if (AI_CONFIG.provider === "anthropic") {
          const res = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": AI_CONFIG.apiKey,
              "anthropic-version": "2023-06-01",
              "anthropic-dangerous-direct-browser-access": "true",
            },
            body: JSON.stringify({
              model: "claude-sonnet-4-20250514",
              max_tokens: 500,
              system: AI_CONFIG.systemPrompt,
              messages: allMessages.map((m) => ({
                role: m.role,
                content: m.content,
              })),
            }),
          });
          const data = await res.json();
          response = data.content?.[0]?.text || "I'm sorry, I couldn't process that. Please call us at (919) 951-7866 for assistance.";
        } else {
          const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${AI_CONFIG.apiKey}`,
            },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              max_tokens: 500,
              messages: [
                { role: "system", content: AI_CONFIG.systemPrompt },
                ...allMessages.map((m) => ({ role: m.role, content: m.content })),
              ],
            }),
          });
          const data = await res.json();
          response = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that. Please call us at (919) 951-7866 for assistance.";
        }

        setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "I'm having trouble connecting right now. Please call us at (919) 951-7866 or book online at our booking page." },
        ]);
      }
    } else {
      // DEMO MODE - pre-built responses
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
      const response = getDemoResponse(input);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    }

    setIsTyping(false);
  };

  // Simple markdown-like rendering for bold text and links
  function renderContent(content: string) {
    const parts = content.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\)|\n)/g);
    return parts.map((part, i) => {
      if (part === "\n") return <br key={i} />;
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-medium text-charcoal">{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a key={i} href={linkMatch[2]} className="text-gold underline hover:text-gold-dark" target={linkMatch[2].startsWith("http") ? "_blank" : undefined}>
            {linkMatch[1]}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-gold-dark rotate-0" : "bg-gold hover:bg-gold-dark hover:scale-110"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X size={22} className="text-white" />
        ) : (
          <MessageCircle size={22} className="text-white" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-3 sm:right-6 z-30 w-[calc(100vw-1.5rem)] sm:w-96 max-h-[60vh] sm:max-h-[70vh] bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-gold px-5 py-4 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <Bot size={16} className="text-white" />
          </div>
          <div>
            <h3 className="text-white text-sm font-body font-medium">Maeve Assistant</h3>
            <p className="text-white/50 text-[10px] font-body font-light">
              {AI_CONFIG.enabled ? "AI Powered" : "Ask us anything"}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0" style={{ maxHeight: "calc(60vh - 130px)" }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot size={14} className="text-gold" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-2.5 text-sm font-body font-light leading-relaxed ${
                  msg.role === "user"
                    ? "bg-gold text-white rounded-2xl rounded-br-md"
                    : "bg-gray-100 text-charcoal rounded-2xl rounded-bl-md"
                }`}
              >
                {renderContent(msg.content)}
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center shrink-0 mt-0.5">
                  <User size={14} className="text-white" />
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                <Bot size={14} className="text-gold" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                <span className="w-2 h-2 rounded-full bg-warm-gray/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-warm-gray/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-warm-gray/40 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-100 px-4 py-3 shrink-0">
          <form
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about services, pricing, booking..."
              className="flex-1 px-3 py-2.5 text-sm font-body font-light text-charcoal bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-gold/30 placeholder:text-gray-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center hover:bg-gold-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={15} className="text-white" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
