"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Lang } from "@/i18n/utils";
import type { Country } from "@/i18n/countries";

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
        "SwiftBill generates invoices following published ZATCA Phase 1 QR code specifications for Saudi Arabia and UAE FTA formatting guidelines. However, SwiftBill is not officially approved or certified by ZATCA or FTA \u2014 requirements may change and invoices may need verification. Always consult your tax advisor. Multi-currency support covers 22 currencies with VAT and custom tax rate calculations.",
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
/*  Country-specific FAQ items                                         */
/* ------------------------------------------------------------------ */

const countryFaqData: Record<string, Record<string, FAQItem[]>> = {
  sa: {
    en: [
      {
        question: "What is ZATCA Phase 1 e-invoicing?",
        answer:
          "ZATCA Phase 1 (Generation Phase) requires businesses in Saudi Arabia to generate and store electronic invoices and credit/debit notes in a structured digital format. SwiftBill generates invoices following the published Phase 1 specifications including QR codes with TLV encoding, Arabic formats, and tax registration fields. Note: SwiftBill is not officially certified by ZATCA \u2014 always verify requirements with your tax advisor.",
      },
      {
        question: "Does SwiftBill generate ZATCA QR codes?",
        answer:
          "Yes! SwiftBill generates QR codes following the published ZATCA TLV (Tag-Length-Value) encoding specification. The QR code includes seller name, VAT registration number, invoice date/time, total amount, and VAT amount \u2014 as specified in ZATCA\u2019s published requirements. The QR code is automatically embedded in your invoice PDF.",
      },
    ],
    ar: [
      {
        question: "\u0645\u0627 \u0647\u064A \u0627\u0644\u0641\u0648\u062A\u0631\u0629 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0644\u0632\u0627\u062A\u0643\u0627 \u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649\u061F",
        answer:
          "\u062A\u062A\u0637\u0644\u0628 \u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0645\u0646 \u0632\u0627\u062A\u0643\u0627 (\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u0625\u0635\u062F\u0627\u0631) \u0645\u0646 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0641\u064A \u0627\u0644\u0633\u0639\u0648\u062F\u064A\u0629 \u0625\u0635\u062F\u0627\u0631 \u0648\u062D\u0641\u0638 \u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A\u0629 \u0628\u062A\u0646\u0633\u064A\u0642 \u0631\u0642\u0645\u064A \u0645\u0646\u0638\u0645. \u064A\u0646\u0634\u0626 \u0633\u0648\u064A\u0641\u062A \u0628\u064A\u0644 \u0641\u0648\u0627\u062A\u064A\u0631 \u0648\u0641\u0642 \u0645\u0648\u0627\u0635\u0641\u0627\u062A \u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0629 \u0628\u0645\u0627 \u0641\u064A \u0630\u0644\u0643 \u0631\u0645\u0648\u0632 QR \u0648\u0627\u0644\u062A\u0646\u0633\u064A\u0642\u0627\u062A \u0627\u0644\u0639\u0631\u0628\u064A\u0629. \u0645\u0644\u0627\u062D\u0638\u0629: \u0633\u0648\u064A\u0641\u062A \u0628\u064A\u0644 \u063A\u064A\u0631 \u0645\u0639\u062A\u0645\u062F \u0631\u0633\u0645\u064A\u0627\u064B \u0645\u0646 \u0632\u0627\u062A\u0643\u0627 \u2014 \u062A\u062D\u0642\u0642 \u062F\u0627\u0626\u0645\u0627\u064B \u0645\u0639 \u0645\u0633\u062A\u0634\u0627\u0631\u0643 \u0627\u0644\u0636\u0631\u064A\u0628\u064A.",
      },
      {
        question: "\u0647\u0644 \u064A\u0646\u0634\u0626 \u0633\u0648\u064A\u0641\u062A \u0628\u064A\u0644 \u0631\u0645\u0648\u0632 QR \u0644\u0632\u0627\u062A\u0643\u0627\u061F",
        answer:
          "\u0646\u0639\u0645! \u064A\u0646\u0634\u0626 \u0633\u0648\u064A\u0641\u062A \u0628\u064A\u0644 \u0631\u0645\u0648\u0632 QR \u0648\u0641\u0642 \u0645\u0648\u0627\u0635\u0641\u0627\u062A \u062A\u0631\u0645\u064A\u0632 TLV \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0629 \u0645\u0646 \u0632\u0627\u062A\u0643\u0627. \u064A\u062A\u0636\u0645\u0646 \u0631\u0645\u0632 QR \u0627\u0633\u0645 \u0627\u0644\u0628\u0627\u0626\u0639 \u0648\u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0636\u0631\u064A\u0628\u064A \u0648\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 \u0648\u0627\u0644\u0645\u0628\u0644\u063A \u0627\u0644\u0625\u062C\u0645\u0627\u0644\u064A \u0648\u0645\u0628\u0644\u063A \u0627\u0644\u0636\u0631\u064A\u0628\u0629. \u064A\u064F\u0636\u0645\u0651\u0646 \u0631\u0645\u0632 QR \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0641\u064A \u0645\u0644\u0641 PDF \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629.",
      },
    ],
  },
  ae: {
    en: [
      {
        question: "What are UAE FTA invoice requirements?",
        answer:
          "The UAE Federal Tax Authority (FTA) requires VAT-registered businesses to issue tax invoices that include specific information: TRN (Tax Registration Number), VAT breakdown, invoice date, supplier and recipient details, and the VAT amount. SwiftBill formats invoices following these published FTA guidelines with bilingual English/Arabic support. Note: SwiftBill is not officially certified by FTA \u2014 always verify with your tax advisor.",
      },
      {
        question: "Does SwiftBill support TRN display?",
        answer:
          "Yes! SwiftBill displays the Tax Registration Number (TRN) on invoices as required by UAE FTA guidelines. You can set your TRN in your business profile, and it will automatically appear on all invoices along with the VAT breakdown, making your invoices compliant with published FTA formatting requirements.",
      },
    ],
    ar: [
      {
        question: "\u0645\u0627 \u0647\u064A \u0645\u062A\u0637\u0644\u0628\u0627\u062A \u0641\u0648\u0627\u062A\u064A\u0631 \u0627\u0644\u0647\u064A\u0626\u0629 \u0627\u0644\u0627\u062A\u062D\u0627\u062F\u064A\u0629 \u0644\u0644\u0636\u0631\u0627\u0626\u0628 \u0641\u064A \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A\u061F",
        answer:
          "\u062A\u062A\u0637\u0644\u0628 \u0627\u0644\u0647\u064A\u0626\u0629 \u0627\u0644\u0627\u062A\u062D\u0627\u062F\u064A\u0629 \u0644\u0644\u0636\u0631\u0627\u0626\u0628 \u0645\u0646 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u0645\u0633\u062C\u0644\u0629 \u0641\u064A \u0636\u0631\u064A\u0628\u0629 \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 \u0625\u0635\u062F\u0627\u0631 \u0641\u0648\u0627\u062A\u064A\u0631 \u0636\u0631\u064A\u0628\u064A\u0629 \u062A\u062A\u0636\u0645\u0646 \u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0636\u0631\u064A\u0628\u064A \u0648\u062A\u0641\u0635\u064A\u0644 \u0636\u0631\u064A\u0628\u0629 \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629 \u0648\u062A\u0627\u0631\u064A\u062E \u0627\u0644\u0641\u0627\u062A\u0648\u0631\u0629 \u0648\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0645\u0648\u0631\u062F \u0648\u0627\u0644\u0645\u0633\u062A\u0644\u0645. \u064A\u0646\u0633\u0642 \u0633\u0648\u064A\u0641\u062A \u0628\u064A\u0644 \u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631 \u0648\u0641\u0642 \u0625\u0631\u0634\u0627\u062F\u0627\u062A \u0627\u0644\u0647\u064A\u0626\u0629 \u0627\u0644\u0645\u0646\u0634\u0648\u0631\u0629 \u0645\u0639 \u062F\u0639\u0645 \u062B\u0646\u0627\u0626\u064A \u0627\u0644\u0644\u063A\u0629. \u0645\u0644\u0627\u062D\u0638\u0629: \u0633\u0648\u064A\u0641\u062A \u0628\u064A\u0644 \u063A\u064A\u0631 \u0645\u0639\u062A\u0645\u062F \u0631\u0633\u0645\u064A\u0627\u064B \u0645\u0646 \u0627\u0644\u0647\u064A\u0626\u0629.",
      },
      {
        question: "\u0647\u0644 \u064A\u062F\u0639\u0645 \u0633\u0648\u064A\u0641\u062A \u0628\u064A\u0644 \u0639\u0631\u0636 \u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0636\u0631\u064A\u0628\u064A\u061F",
        answer:
          "\u0646\u0639\u0645! \u064A\u0639\u0631\u0636 \u0633\u0648\u064A\u0641\u062A \u0628\u064A\u0644 \u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0636\u0631\u064A\u0628\u064A (TRN) \u0639\u0644\u0649 \u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631 \u0643\u0645\u0627 \u062A\u062A\u0637\u0644\u0628 \u0625\u0631\u0634\u0627\u062F\u0627\u062A \u0627\u0644\u0647\u064A\u0626\u0629 \u0627\u0644\u0627\u062A\u062D\u0627\u062F\u064A\u0629 \u0644\u0644\u0636\u0631\u0627\u0626\u0628. \u064A\u0645\u0643\u0646\u0643 \u0636\u0628\u0637 \u0631\u0642\u0645 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u0636\u0631\u064A\u0628\u064A \u0641\u064A \u0645\u0644\u0641\u0643 \u0627\u0644\u062A\u062C\u0627\u0631\u064A \u0648\u0633\u064A\u0638\u0647\u0631 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B \u0639\u0644\u0649 \u062C\u0645\u064A\u0639 \u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631 \u0645\u0639 \u062A\u0641\u0635\u064A\u0644 \u0636\u0631\u064A\u0628\u0629 \u0627\u0644\u0642\u064A\u0645\u0629 \u0627\u0644\u0645\u0636\u0627\u0641\u0629.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Get FAQ items with country-specific questions prepended            */
/* ------------------------------------------------------------------ */

function getFaqItems(lang: string, country?: Country): FAQItem[] {
  const baseItems = faqData[lang] ?? faqData.en;
  if (!country) return baseItems;

  const countryItems = countryFaqData[country]?.[lang] ?? countryFaqData[country]?.en ?? [];
  return [...countryItems, ...baseItems];
}

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

export default function FAQ({ lang, country }: { lang: Lang; country?: Country }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = getFaqItems(lang, country);

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
