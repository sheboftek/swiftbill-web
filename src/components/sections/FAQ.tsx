"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Lang } from "@/i18n/utils";

/* ------------------------------------------------------------------ */
/*  Onramper easing                                                    */
/* ------------------------------------------------------------------ */

const onramperEase = [0.86, 0, 0.07, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                           */
/* ------------------------------------------------------------------ */

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: Record<string, FAQItem[]> = {
  en: [
    {
      question: "Is SwiftBill really free?",
      answer:
        "Yes! The free plan includes 1 invoice and 1 receipt per month with the Classic template. You can create, customize, and share professional documents at no cost. Upgrade to Pro for unlimited documents, all 15 templates, AI generation, expense tracking, and more.",
    },
    {
      question: "What document types can I create?",
      answer:
        "Invoices, estimates, contracts, receipts, and credit notes. Each document type supports full customization including line items, tax calculations, discounts, custom branding with your logo, and professional PDF export in letter format.",
    },
    {
      question: "Which tax formats are supported?",
      answer:
        "SwiftBill generates invoices following published ZATCA Phase 1 QR code specifications for Saudi Arabia and UAE FTA formatting guidelines. However, SwiftBill is not officially approved or certified by ZATCA or FTA — requirements may change and invoices may need verification. Always consult your tax advisor. Multi-currency support covers 22 currencies with VAT and custom tax rate calculations.",
    },
    {
      question: "Can I track expenses and profits?",
      answer:
        "Yes! Capture receipts with AI-powered OCR, categorize expenses across custom categories, and view detailed profit reports with SwiftUI Charts. Export data as CSV or PDF for your accountant. Available on the Pro plan.",
    },
    {
      question: "How does AI document generation work?",
      answer:
        "Describe what you need in plain text \u2014 SwiftBill\u2019s AI creates a complete, professional document with appropriate line items, tax calculations, and formatting. Powered by Gemini 2.5 Flash, it handles invoices, estimates, contracts, and more in seconds.",
    },
  ],
  ar: [
    {
      question: "\u0647\u0644 SwiftBill \u0645\u062C\u0627\u0646\u064A \u062D\u0642\u0627\u064B\u061F",
      answer:
        "\u0646\u0639\u0645! \u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629 \u062A\u062A\u0636\u0645\u0646 \u0641\u0627\u062A\u0648\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0648\u0625\u064A\u0635\u0627\u0644 \u0648\u0627\u062D\u062F \u0634\u0647\u0631\u064A\u0627\u064B \u0645\u0639 \u0642\u0627\u0644\u0628 \u0643\u0644\u0627\u0633\u064A\u0643\u064A. \u064A\u0645\u0643\u0646\u0643 \u0625\u0646\u0634\u0627\u0621 \u0648\u062A\u062E\u0635\u064A\u0635 \u0648\u0645\u0634\u0627\u0631\u0643\u0629 \u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 \u0645\u062C\u0627\u0646\u0627\u064B.",
    },
    {
      question: "\u0645\u0627 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u062A\u064A \u064A\u0645\u0643\u0646\u0646\u064A \u0625\u0646\u0634\u0627\u0624\u0647\u0627\u061F",
      answer:
        "\u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631 \u0648\u0627\u0644\u062A\u0642\u062F\u064A\u0631\u0627\u062A \u0648\u0627\u0644\u0639\u0642\u0648\u062F \u0648\u0627\u0644\u0625\u064A\u0635\u0627\u0644\u0627\u062A \u0648\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0626\u062A\u0645\u0627\u0646. \u0643\u0644 \u0646\u0648\u0639 \u064A\u062F\u0639\u0645 \u0627\u0644\u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u0643\u0627\u0645\u0644.",
    },
    {
      question: "\u0645\u0627 \u0627\u0644\u062F\u0648\u0644 \u0627\u0644\u0645\u062F\u0639\u0648\u0645\u0629 \u0644\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0627\u0644\u0636\u0631\u064A\u0628\u064A\u061F",
      answer:
        "\u064A\u062F\u0639\u0645 SwiftBill \u0631\u0645\u0648\u0632 QR \u0644\u0647\u064A\u0626\u0629 \u0627\u0644\u0632\u0643\u0627\u0629 \u0648\u0627\u0644\u0636\u0631\u064A\u0628\u0629 \u0648\u0627\u0644\u062C\u0645\u0627\u0631\u0643 \u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0644\u0644\u0633\u0639\u0648\u062F\u064A\u0629 \u0648\u062A\u0646\u0633\u064A\u0642 \u0645\u062A\u0648\u0627\u0641\u0642 \u0645\u0639 \u0627\u0644\u0647\u064A\u0626\u0629 \u0627\u0644\u0627\u062A\u062D\u0627\u062F\u064A\u0629 \u0644\u0644\u0636\u0631\u0627\u0626\u0628 \u0641\u064A \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A.",
    },
    {
      question: "\u0647\u0644 \u064A\u0645\u0643\u0646\u0646\u064A \u062A\u062A\u0628\u0639 \u0627\u0644\u0645\u0635\u0627\u0631\u064A\u0641 \u0648\u0627\u0644\u0623\u0631\u0628\u0627\u062D\u061F",
      answer:
        "\u0646\u0639\u0645! \u0627\u0644\u062A\u0642\u0637 \u0627\u0644\u0625\u064A\u0635\u0627\u0644\u0627\u062A \u0628\u062A\u0642\u0646\u064A\u0629 OCR \u0627\u0644\u0630\u0643\u064A\u0629\u060C \u0648\u0635\u0646\u0641 \u0627\u0644\u0645\u0635\u0627\u0631\u064A\u0641\u060C \u0648\u0627\u0639\u0631\u0636 \u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0623\u0631\u0628\u0627\u062D \u0627\u0644\u0645\u0641\u0635\u0644\u0629.",
    },
    {
      question: "\u0643\u064A\u0641 \u064A\u0639\u0645\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A\u061F",
      answer:
        "\u0635\u0641 \u0645\u0627 \u062A\u062D\u062A\u0627\u062C\u0647 \u0628\u0646\u0635 \u0639\u0627\u062F\u064A \u2014 \u064A\u0646\u0634\u0626 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0645\u0633\u062A\u0646\u062F\u0627\u064B \u0643\u0627\u0645\u0644\u0627\u064B \u0648\u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0627\u064B \u0641\u064A \u062B\u0648\u0627\u0646\u064D.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Single FAQ item                                                    */
/* ------------------------------------------------------------------ */

function FAQItemBlock({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-[8px] bg-white">
      {/* Question row */}
      <button
        onClick={onToggle}
        className="flex w-full cursor-pointer items-start justify-between text-start"
        style={{ padding: "30px 40px" }}
        aria-expanded={isOpen}
      >
        <span className="pe-6 font-heading text-[24px] leading-[120%] text-[#111]">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease: onramperEase }}
          className="mt-1 flex shrink-0 items-center justify-center text-[#151515]"
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: onramperEase }}
            className="overflow-hidden"
          >
            <div
              className="text-[#6a6a84]"
              style={{
                paddingInline: 40,
                paddingBlockEnd: 30,
                fontSize: 24,
                lineHeight: "133%",
                letterSpacing: "-0.24px",
                marginBlockStart: 0,
                marginBlockEnd: 0,
              }}
            >
              <div style={{ marginBlockStart: 30, marginBlockEnd: 30 }}>
                {item.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ section                                                        */
/* ------------------------------------------------------------------ */

export default function FAQ({ lang }: { lang: Lang }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = faqData[lang] ?? faqData.en;

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" style={{ paddingBlockStart: 120, paddingBlockEnd: 120, background: "#efeef3" }}>
      <div className="mx-auto max-w-[1340px] px-5">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: onramperEase }}
          className="faq-heading-wrap mb-[80px] max-w-[720px]"
        >
          <h3
            className="faq-heading font-heading text-[#151515]"
            style={{
              fontSize: 70,
              fontWeight: 500,
              letterSpacing: "-0.7px",
              lineHeight: "90%",
            }}
          >
            Frequently asked questions.
          </h3>
        </motion.div>

        {/* Questions list */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: onramperEase }}
          className="flex flex-col"
          style={{ gap: 16 }}
        >
          {items.map((item, index) => (
            <FAQItemBlock
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>
      </div>

      {/* Mobile responsive overrides */}
      <style>{`
        @media (max-width: 991px) {
          .faq-heading {
            font-size: 50px !important;
            letter-spacing: -1px !important;
            text-align: center !important;
          }
          .faq-heading-wrap {
            margin-bottom: 40px !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
