import type { Metadata } from "next";
import "@/app/globals.css";
import { type Lang, getDir, t } from "@/i18n/utils";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }, { lang: "fr" }, { lang: "it" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const validLangs = ["en", "ar", "fr", "it"];
  const lang = (validLangs.includes(rawLang) ? rawLang : "en") as Lang;

  const title = t(lang, "meta.title");
  const description = t(lang, "meta.description");
  const ogTitle = t(lang, "meta.ogTitle");
  const ogDescription = t(lang, "meta.ogDescription");

  return {
    metadataBase: new URL("https://getswiftbill.app"),
    title,
    description,
    icons: {
      icon: "/images/app-icon.png",
      apple: "/images/app-icon.png",
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: "website",
      locale: lang === "ar" ? "ar_SA" : lang === "fr" ? "fr_FR" : lang === "it" ? "it_IT" : "en_US",
      siteName: "SwiftBill",
      images: [
        {
          url: "/images/app-icon.png",
          width: 512,
          height: 512,
          alt: "SwiftBill",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ["/images/app-icon.png"],
    },
    alternates: {
      canonical: `/${lang}`,
      languages: {
        en: "/en",
        ar: "/ar",
        fr: "/fr",
        it: "/it",
        "en-AE": "/en/uae",
        "ar-AE": "/ar/uae",
        "en-SA": "/en/saudi",
        "ar-SA": "/ar/saudi",
        "fr-FR": "/fr/france",
        "it-IT": "/it/italy",
        "x-default": "/en",
      },
    },
    other: {
      "apple-itunes-app": "app-id=6760855924",
    },
  };
}

/* ------------------------------------------------------------------ */
/*  JSON-LD Structured Data                                            */
/* ------------------------------------------------------------------ */

function StructuredData({ lang }: { lang: Lang }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SwiftBill",
    url: "https://getswiftbill.app",
    logo: "https://getswiftbill.app/images/app-icon.png",
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@getswiftbill.app",
      contactType: "customer support",
    },
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SwiftBill",
    operatingSystem: "iOS",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free plan available. Pro from $5.99/month.",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "50",
    },
    description:
      "Professional invoicing app for freelancers. Create invoices, estimates, contracts, receipts with 15 PDF templates, AI generation, and ZATCA/UAE FTA formatting.",
  };

  const faqItems =
    lang === "ar"
      ? [
          {
            "@type": "Question",
            name: "\u0647\u0644 SwiftBill \u0645\u062C\u0627\u0646\u064A \u062D\u0642\u0627\u064B\u061F",
            acceptedAnswer: {
              "@type": "Answer",
              text: "\u0646\u0639\u0645! \u0627\u0644\u062E\u0637\u0629 \u0627\u0644\u0645\u062C\u0627\u0646\u064A\u0629 \u062A\u062A\u0636\u0645\u0646 \u0641\u0627\u062A\u0648\u0631\u0629 \u0648\u0627\u062D\u062F\u0629 \u0648\u0625\u064A\u0635\u0627\u0644 \u0648\u0627\u062D\u062F \u0634\u0647\u0631\u064A\u0627\u064B \u0645\u0639 \u0642\u0627\u0644\u0628 \u0643\u0644\u0627\u0633\u064A\u0643\u064A. \u064A\u0645\u0643\u0646\u0643 \u0625\u0646\u0634\u0627\u0621 \u0648\u062A\u062E\u0635\u064A\u0635 \u0648\u0645\u0634\u0627\u0631\u0643\u0629 \u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 \u0645\u062C\u0627\u0646\u0627\u064B.",
            },
          },
          {
            "@type": "Question",
            name: "\u0645\u0627 \u0623\u0646\u0648\u0627\u0639 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0627\u0644\u062A\u064A \u064A\u0645\u0643\u0646\u0646\u064A \u0625\u0646\u0634\u0627\u0624\u0647\u0627\u061F",
            acceptedAnswer: {
              "@type": "Answer",
              text: "\u0627\u0644\u0641\u0648\u0627\u062A\u064A\u0631 \u0648\u0627\u0644\u062A\u0642\u062F\u064A\u0631\u0627\u062A \u0648\u0627\u0644\u0639\u0642\u0648\u062F \u0648\u0627\u0644\u0625\u064A\u0635\u0627\u0644\u0627\u062A \u0648\u0625\u0634\u0639\u0627\u0631\u0627\u062A \u0627\u0644\u0627\u0626\u062A\u0645\u0627\u0646. \u0643\u0644 \u0646\u0648\u0639 \u064A\u062F\u0639\u0645 \u0627\u0644\u062A\u062E\u0635\u064A\u0635 \u0627\u0644\u0643\u0627\u0645\u0644.",
            },
          },
          {
            "@type": "Question",
            name: "\u0645\u0627 \u0627\u0644\u062F\u0648\u0644 \u0627\u0644\u0645\u062F\u0639\u0648\u0645\u0629 \u0644\u0644\u0627\u0645\u062A\u062B\u0627\u0644 \u0627\u0644\u0636\u0631\u064A\u0628\u064A\u061F",
            acceptedAnswer: {
              "@type": "Answer",
              text: "\u064A\u062F\u0639\u0645 SwiftBill \u0631\u0645\u0648\u0632 QR \u0644\u0647\u064A\u0626\u0629 \u0627\u0644\u0632\u0643\u0627\u0629 \u0648\u0627\u0644\u0636\u0631\u064A\u0628\u0629 \u0648\u0627\u0644\u062C\u0645\u0627\u0631\u0643 \u0627\u0644\u0645\u0631\u062D\u0644\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0644\u0644\u0633\u0639\u0648\u062F\u064A\u0629 \u0648\u062A\u0646\u0633\u064A\u0642 \u0645\u062A\u0648\u0627\u0641\u0642 \u0645\u0639 \u0627\u0644\u0647\u064A\u0626\u0629 \u0627\u0644\u0627\u062A\u062D\u0627\u062F\u064A\u0629 \u0644\u0644\u0636\u0631\u0627\u0626\u0628 \u0641\u064A \u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062A.",
            },
          },
          {
            "@type": "Question",
            name: "\u0647\u0644 \u064A\u0645\u0643\u0646\u0646\u064A \u062A\u062A\u0628\u0639 \u0627\u0644\u0645\u0635\u0627\u0631\u064A\u0641 \u0648\u0627\u0644\u0623\u0631\u0628\u0627\u062D\u061F",
            acceptedAnswer: {
              "@type": "Answer",
              text: "\u0646\u0639\u0645! \u0627\u0644\u062A\u0642\u0637 \u0627\u0644\u0625\u064A\u0635\u0627\u0644\u0627\u062A \u0628\u062A\u0642\u0646\u064A\u0629 OCR \u0627\u0644\u0630\u0643\u064A\u0629\u060C \u0648\u0635\u0646\u0641 \u0627\u0644\u0645\u0635\u0627\u0631\u064A\u0641\u060C \u0648\u0627\u0639\u0631\u0636 \u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0623\u0631\u0628\u0627\u062D \u0627\u0644\u0645\u0641\u0635\u0644\u0629.",
            },
          },
          {
            "@type": "Question",
            name: "\u0643\u064A\u0641 \u064A\u0639\u0645\u0644 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u0645\u0633\u062A\u0646\u062F\u0627\u062A \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A\u061F",
            acceptedAnswer: {
              "@type": "Answer",
              text: "\u0635\u0641 \u0645\u0627 \u062A\u062D\u062A\u0627\u062C\u0647 \u0628\u0646\u0635 \u0639\u0627\u062F\u064A \u2014 \u064A\u0646\u0634\u0626 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0645\u0633\u062A\u0646\u062F\u0627\u064B \u0643\u0627\u0645\u0644\u0627\u064B \u0648\u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0627\u064B \u0641\u064A \u062B\u0648\u0627\u0646\u064D.",
            },
          },
        ]
      : [
          {
            "@type": "Question",
            name: "Is SwiftBill really free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! The free plan includes 1 invoice and 1 receipt per month with the Classic template. You can create, customize, and share professional documents at no cost. Upgrade to Pro for unlimited documents, all 15 templates, AI generation, expense tracking, and more.",
            },
          },
          {
            "@type": "Question",
            name: "What document types can I create?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Invoices, estimates, contracts, receipts, and credit notes. Each document type supports full customization including line items, tax calculations, discounts, custom branding with your logo, and professional PDF export in letter format.",
            },
          },
          {
            "@type": "Question",
            name: "Which tax formats are supported?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "SwiftBill generates invoices following published ZATCA Phase 1 QR code specifications for Saudi Arabia and UAE FTA formatting guidelines. However, SwiftBill is not officially approved or certified by ZATCA or FTA \u2014 requirements may change and invoices may need verification. Always consult your tax advisor. Multi-currency support covers 22 currencies with VAT and custom tax rate calculations.",
            },
          },
          {
            "@type": "Question",
            name: "Can I track expenses and profits?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! Capture receipts with AI-powered OCR, categorize expenses across custom categories, and view detailed profit reports with SwiftUI Charts. Export data as CSV or PDF for your accountant. Available on the Pro plan.",
            },
          },
          {
            "@type": "Question",
            name: "How does AI document generation work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Describe what you need in plain text \u2014 SwiftBill\u2019s AI creates a complete, professional document with appropriate line items, tax calculations, and formatting. Powered by Gemini 2.5 Flash, it handles invoices, estimates, contracts, and more in seconds.",
            },
          },
        ];

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqPageSchema),
        }}
      />
    </>
  );
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const validLangs = ["en", "ar", "fr", "it"];
  const lang = (validLangs.includes(rawLang) ? rawLang : "en") as Lang;
  const dir = getDir(lang);

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <StructuredData lang={lang} />
      </head>
      <body className="bg-[#efeef3] text-[#151515] antialiased">
        <Header lang={lang} />
        <main className="min-h-screen">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
