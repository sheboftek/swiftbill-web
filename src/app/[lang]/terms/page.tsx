import { type Lang, t } from "@/i18n/utils";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }, { lang: "fr" }, { lang: "it" }];
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const validLangs = ["en", "ar", "fr", "it"];
  const lang = (validLangs.includes(rawLang) ? rawLang : "en") as Lang;

  return (
    <section style={{ paddingBlockStart: 140, paddingBlockEnd: 80 }}>
      <div className="mx-auto max-w-[800px] px-5">
        <h3 className="font-heading text-[#151515]">
          {t(lang, "terms.title")}
        </h3>
        <p className="mt-4 text-[16px] text-[#808099]">
          Last updated: March 28, 2026
        </p>

        <div className="mt-12 flex flex-col gap-10 text-[18px] leading-[160%] text-[#151515]">
          {/* ----------------------------------------------------------------
              1. ACCEPTANCE OF TERMS
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              1. Acceptance of Terms
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              By downloading, installing, accessing, or using SwiftBill
              (&quot;the App,&quot; &quot;the Service&quot;), you
              (&quot;User,&quot; &quot;you,&quot; &quot;your&quot;) agree to be
              legally bound by these Terms of Service (&quot;Terms&quot;). These
              Terms constitute a binding legal agreement between you and
              Sheboftek (&quot;we,&quot; &quot;us,&quot; &quot;our,&quot;
              &quot;the Company&quot;), a sole proprietor developer operating
              SwiftBill.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              If you do not agree to all of these Terms, you must immediately
              stop using the App and delete it from your device. Your continued
              use of SwiftBill after any modification to these Terms constitutes
              your acceptance of the modified Terms.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              You represent and warrant that you are at least 16 years of age
              (or the age of digital consent in your jurisdiction, whichever is
              higher) and have the legal capacity to enter into these Terms. If
              you are using SwiftBill on behalf of a business entity, you
              represent that you have the authority to bind that entity to these
              Terms.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              2. DESCRIPTION OF SERVICE
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              2. Description of Service
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              SwiftBill is a mobile invoicing and business document management
              application designed for freelancers, sole proprietors, and small
              businesses. The Service provides the following features and
              capabilities:
            </p>
            <ul className="mt-4 list-disc ps-6 text-[#6a6a84]">
              <li className="mt-2">
                <strong>Invoices</strong> &mdash; Create, edit, and send
                professional invoices with customizable line items, taxes,
                discounts, and payment terms
              </li>
              <li className="mt-2">
                <strong>Estimates</strong> &mdash; Generate detailed estimates
                and quotes for clients with optional conversion to invoices
              </li>
              <li className="mt-2">
                <strong>Contracts</strong> &mdash; Draft and manage business
                contracts with AI-assisted generation and signature fields
              </li>
              <li className="mt-2">
                <strong>Receipts</strong> &mdash; Create payment receipts and
                scan paper receipts using device camera and AI OCR
              </li>
              <li className="mt-2">
                <strong>Credit Notes</strong> &mdash; Issue credit notes linked
                to existing invoices for returns, adjustments, or refunds
              </li>
              <li className="mt-2">
                <strong>Expense Tracking</strong> &mdash; Log, categorize, and
                manage business expenses with receipt attachment
              </li>
              <li className="mt-2">
                <strong>AI-Powered Document Generation</strong> &mdash;
                Text-to-document creation, receipt OCR scanning, contract Q&amp;A
                wizard, and smart autofill powered by artificial intelligence
              </li>
              <li className="mt-2">
                <strong>Professional PDF Templates</strong> &mdash; Up to 15
                professionally designed templates (Classic, Minimal, Modern,
                Bold, Elegant, Corporate, Freelancer, Commercial, Executive,
                Navy, Fresh, Refined, Contractor, Studio, Hourly)
              </li>
              <li className="mt-2">
                <strong>Multi-Currency Support</strong> &mdash; Support for 22+
                currencies with localized formatting
              </li>
              <li className="mt-2">
                <strong>Tax Compliance Tools</strong> &mdash; VAT calculations,
                ZATCA QR code generation, and UAE FTA compliance features
              </li>
              <li className="mt-2">
                <strong>Recurring Documents</strong> &mdash; Set up recurring
                invoices on daily, weekly, monthly, or custom schedules
              </li>
              <li className="mt-2">
                <strong>Reports and Analytics</strong> &mdash; Revenue summaries,
                expense reports, client analytics, and financial insights
              </li>
              <li className="mt-2">
                <strong>Cloud Sync</strong> &mdash; Secure cloud synchronization
                of documents and business data via encrypted connection
              </li>
              <li className="mt-2">
                <strong>Client Management</strong> &mdash; Store and manage
                client information, contact details, and document history
              </li>
              <li className="mt-2">
                <strong>Document Sharing</strong> &mdash; Share documents via
                email, SMS, WhatsApp, shareable links, and PDF export
              </li>
              <li className="mt-2">
                <strong>Digital Signatures</strong> &mdash; Per-document
                business and client signature support with date stamps
              </li>
              <li className="mt-2">
                <strong>Payment Links</strong> &mdash; Embed payment gateway
                links (Stripe, PayPal, or custom) with QR codes in documents
              </li>
              <li className="mt-2">
                <strong>CSV Export</strong> &mdash; Export financial data in CSV
                format for use with external accounting software
              </li>
            </ul>
            <p className="mt-4 text-[#6a6a84]">
              We reserve the right to modify, suspend, or discontinue any
              feature of the Service at any time, with or without notice. We
              will make reasonable efforts to notify users of significant
              changes that materially affect the Service.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              3. ACCOUNT REGISTRATION AND SECURITY
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              3. Account Registration and Security
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              To access certain features of SwiftBill, including cloud sync and
              AI-powered features, you may be required to create an account.
              You may register using your email address and password or through
              Apple Sign-In.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              When creating an account, you agree to:
            </p>
            <ul className="mt-4 list-disc ps-6 text-[#6a6a84]">
              <li className="mt-2">
                Provide accurate, current, and complete registration information
              </li>
              <li className="mt-2">
                Maintain and promptly update your account information to keep it
                accurate and current
              </li>
              <li className="mt-2">
                Create a password of at least 8 characters that is not easily
                guessable
              </li>
              <li className="mt-2">
                Maintain the confidentiality and security of your login
                credentials
              </li>
              <li className="mt-2">
                Immediately notify us at{" "}
                <a
                  href="mailto:support@getswiftbill.app"
                  className="text-[#3053EC] underline"
                >
                  support@getswiftbill.app
                </a>{" "}
                if you suspect unauthorized access to your account
              </li>
              <li className="mt-2">
                Not share your account credentials with any third party
              </li>
              <li className="mt-2">
                Not create multiple accounts for deceptive or abusive purposes
              </li>
            </ul>
            <p className="mt-4 text-[#6a6a84]">
              You are solely responsible for all activity that occurs under your
              account, whether or not authorized by you. We are not liable for
              any loss or damage resulting from unauthorized use of your account
              due to your failure to safeguard your credentials. We implement
              login rate limiting and password reset cooldowns to protect
              against brute-force attacks, but these measures do not eliminate
              your obligation to maintain account security.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              4. SUBSCRIPTION AND PAYMENT TERMS
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              4. Subscription and Payment Terms
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              SwiftBill offers a free tier and a paid Pro subscription. Pro
              subscriptions are available as auto-renewable subscriptions
              processed exclusively through the Apple App Store:
            </p>
            <ul className="mt-4 list-disc ps-6 text-[#6a6a84]">
              <li className="mt-2">
                <strong>Monthly Plan</strong> &mdash; $5.99 USD per month with a
                3-day free trial
              </li>
              <li className="mt-2">
                <strong>Yearly Plan</strong> &mdash; $39.99 USD per year with a
                7-day free trial
              </li>
            </ul>
            <p className="mt-4 text-[#6a6a84]">
              Prices are in United States Dollars and may vary by region based
              on Apple&apos;s local pricing tiers and applicable taxes. Current
              pricing is always displayed on the in-app purchase screen before
              you confirm.
            </p>
            <p className="mt-4 font-semibold text-[#151515]">
              Apple App Store Subscription Terms
            </p>
            <p className="mt-4 text-[#6a6a84]">
              Payment will be charged to your Apple ID account at confirmation
              of purchase. Subscription automatically renews unless
              auto-renewal is turned off at least 24 hours before the end of
              the current period. Your account will be charged for renewal
              within 24 hours prior to the end of the current period.
              Subscriptions may be managed and auto-renewal may be turned off
              by going to Account Settings in the App Store after purchase. Any
              unused portion of a free trial period will be forfeited when you
              purchase a subscription.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              All payments are processed by Apple. We do not collect, store, or
              have access to your payment card information. Refund requests
              must be directed to Apple through the App Store or at{" "}
              <a
                href="https://reportaproblem.apple.com"
                className="text-[#3053EC] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                reportaproblem.apple.com
              </a>
              . We cannot process refunds directly.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              We reserve the right to change subscription pricing at any time.
              If we increase prices, existing subscribers will be notified in
              advance through Apple&apos;s price increase consent mechanism. You
              will have the opportunity to accept or decline the new pricing
              before it takes effect.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              5. FREE AND PRO PLANS
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              5. Free and Pro Plans
            </h6>
            <p className="mt-4 font-semibold text-[#151515]">
              Free Tier
            </p>
            <p className="mt-2 text-[#6a6a84]">
              The free tier provides limited access to SwiftBill with the
              following restrictions:
            </p>
            <ul className="mt-4 list-disc ps-6 text-[#6a6a84]">
              <li className="mt-2">1 invoice per calendar month</li>
              <li className="mt-2">1 receipt per calendar month</li>
              <li className="mt-2">
                Classic template only (no access to other 14 templates)
              </li>
              <li className="mt-2">Basic reports only</li>
              <li className="mt-2">Cloud sync included</li>
              <li className="mt-2">
                No access to estimates, contracts, or credit notes
              </li>
              <li className="mt-2">
                No AI-powered features (document generation, OCR, smart
                autofill)
              </li>
              <li className="mt-2">No recurring document scheduling</li>
              <li className="mt-2">No expense tracking</li>
              <li className="mt-2">No CSV export</li>
              <li className="mt-2">No multi-currency support</li>
              <li className="mt-2">
                PDF watermark (&quot;Created with SwiftBill &mdash; Upgrade to
                remove&quot;) on all generated documents
              </li>
            </ul>
            <p className="mt-4 font-semibold text-[#151515]">
              Pro Tier
            </p>
            <p className="mt-2 text-[#6a6a84]">
              The Pro subscription unlocks the full SwiftBill experience:
            </p>
            <ul className="mt-4 list-disc ps-6 text-[#6a6a84]">
              <li className="mt-2">
                Unlimited invoices, estimates, contracts, receipts, and credit
                notes
              </li>
              <li className="mt-2">All 15 professional PDF templates</li>
              <li className="mt-2">
                AI-powered document generation, OCR scanning, contract wizard,
                and smart autofill
              </li>
              <li className="mt-2">Full expense tracking and management</li>
              <li className="mt-2">Recurring document scheduling</li>
              <li className="mt-2">Multi-currency support (22+ currencies)</li>
              <li className="mt-2">CSV data export</li>
              <li className="mt-2">Advanced reports and analytics</li>
              <li className="mt-2">Clean PDFs with no watermark</li>
            </ul>
            <p className="mt-4 text-[#6a6a84]">
              We reserve the right to modify the features included in each tier.
              If we reduce Pro features in a way that materially affects your
              use, you may cancel your subscription at any time through your
              Apple ID settings.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              6. USER CONTENT AND RESPONSIBILITIES
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              6. User Content and Responsibilities
            </h6>
            <p className="mt-4 font-semibold text-[#151515]">
              Ownership of Your Content
            </p>
            <p className="mt-2 text-[#6a6a84]">
              You retain full ownership of all documents, business data, client
              information, and content you create, upload, or generate using
              SwiftBill (&quot;User Content&quot;). We do not claim any
              intellectual property rights over your invoices, estimates,
              contracts, receipts, credit notes, expense records, client data,
              or any other business documents you create.
            </p>
            <p className="mt-4 font-semibold text-[#151515]">
              Limited License Grant
            </p>
            <p className="mt-2 text-[#6a6a84]">
              By using SwiftBill&apos;s cloud sync features, you grant us a
              limited, non-exclusive, non-transferable license to store,
              transmit, and process your User Content solely for the purpose of
              providing, maintaining, and improving the Service. This license
              exists only for the duration of your use of the cloud sync
              feature and terminates when you delete your account or your data.
              We will not use your User Content for any other purpose, including
              marketing, advertising, or training AI models.
            </p>
            <p className="mt-4 font-semibold text-[#151515]">
              Your Responsibilities
            </p>
            <p className="mt-2 text-[#6a6a84]">
              You are solely responsible for the accuracy, legality, and
              appropriateness of all User Content. This includes, without
              limitation:
            </p>
            <ul className="mt-4 list-disc ps-6 text-[#6a6a84]">
              <li className="mt-2">
                Ensuring all invoices, receipts, and financial documents
                accurately reflect actual transactions
              </li>
              <li className="mt-2">
                Verifying that all tax calculations, rates, and compliance
                information are correct for your jurisdiction
              </li>
              <li className="mt-2">
                Complying with all applicable laws, regulations, and industry
                standards governing your business documentation
              </li>
              <li className="mt-2">
                Obtaining any necessary consents before storing or processing
                client personal data through SwiftBill
              </li>
              <li className="mt-2">
                Maintaining your own backups of critical business documents
              </li>
            </ul>
            <p className="mt-4 font-semibold text-[#151515]">
              Prohibited Uses of User Content
            </p>
            <p className="mt-2 text-[#6a6a84]">
              You must not use SwiftBill to create, store, or distribute:
            </p>
            <ul className="mt-4 list-disc ps-6 text-[#6a6a84]">
              <li className="mt-2">
                Fraudulent, forged, or misleading invoices, receipts, or
                financial documents
              </li>
              <li className="mt-2">
                Documents intended to facilitate tax evasion, money laundering,
                or any other financial crime
              </li>
              <li className="mt-2">
                Content that is defamatory, obscene, threatening, or otherwise
                unlawful
              </li>
              <li className="mt-2">
                Documents that infringe upon the intellectual property rights of
                any third party
              </li>
              <li className="mt-2">
                Deceptive documents designed to mislead recipients about the
                nature, origin, or terms of a transaction
              </li>
            </ul>
          </div>

          {/* ----------------------------------------------------------------
              7. AI-GENERATED CONTENT DISCLAIMER
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              7. AI-Generated Content Disclaimer
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              SwiftBill incorporates artificial intelligence features including
              text-to-document generation, receipt OCR scanning, contract Q&amp;A
              wizard, and smart autofill (&quot;AI Features&quot;). By using AI
              Features, you acknowledge and agree to the following:
            </p>
            <ul className="mt-4 list-disc ps-6 text-[#6a6a84]">
              <li className="mt-2">
                <strong>Draft Content Only.</strong> All AI-generated content is
                provided as a preliminary draft and starting point. AI output
                must be thoroughly reviewed, verified, and edited by you before
                use in any business transaction, legal proceeding, or official
                record.
              </li>
              <li className="mt-2">
                <strong>No Guarantee of Accuracy.</strong> We do not guarantee
                the accuracy, completeness, correctness, or legal compliance of
                any AI-generated content. AI systems can produce errors,
                hallucinations, outdated information, or content that does not
                reflect your specific business requirements or jurisdiction.
              </li>
              <li className="mt-2">
                <strong>AI Content Labeling.</strong> Content generated or
                significantly assisted by AI is identified as AI-assisted within
                the application. You are responsible for disclosing the use of
                AI-generated content to third parties where required by law or
                professional standards.
              </li>
              <li className="mt-2">
                <strong>No Professional Advice.</strong> AI-generated contracts,
                invoices, and other documents do not constitute legal,
                financial, tax, or professional advice. AI-generated content
                should not be relied upon as a substitute for professional
                consultation.
              </li>
              <li className="mt-2">
                <strong>User Responsibility.</strong> You are solely and
                entirely responsible for the final content of all documents you
                create, send, or share using SwiftBill, regardless of whether
                AI was used in their creation. Any consequences arising from
                the use of AI-generated content are your responsibility.
              </li>
              <li className="mt-2">
                <strong>AI Availability.</strong> AI Features may be
                unavailable, degraded, or changed at any time due to
                third-party service dependencies, model updates, or operational
                decisions. We do not guarantee uninterrupted access to AI
                Features.
              </li>
            </ul>
          </div>

          {/* ----------------------------------------------------------------
              8. TAX COMPLIANCE TOOL DISCLAIMER
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              8. Tax Compliance Tool Disclaimer
            </h6>
            <p className="mt-4 font-bold text-[#151515]">
              IMPORTANT &mdash; PLEASE READ CAREFULLY:
            </p>
            <p className="mt-4 text-[#6a6a84]">
              SwiftBill provides certain tax-related tools and features,
              including but not limited to VAT calculations, ZATCA (Saudi
              Arabia&apos;s Zakat, Tax and Customs Authority) QR code
              generation, and UAE FTA (Federal Tax Authority) compliance
              formatting. By using these features, you expressly acknowledge
              and agree to the following:
            </p>
            <ul className="mt-4 list-disc ps-6 text-[#6a6a84]">
              <li className="mt-2">
                <strong>Not a Tax Advisor.</strong> Sheboftek and SwiftBill are
                NOT licensed tax advisors, certified public accountants,
                chartered accountants, tax consultants, or certified tax
                compliance providers in any jurisdiction. We do not hold any
                professional certifications, licenses, or registrations
                required to provide tax advice or tax compliance services.
              </li>
              <li className="mt-2">
                <strong>No Tax, Legal, or Financial Advice.</strong> Nothing in
                SwiftBill &mdash; including any calculations, QR codes,
                formatting, templates, reports, or AI-generated content &mdash;
                constitutes tax advice, legal advice, financial advice, or
                professional compliance guidance. No information provided
                through the Service should be interpreted as such.
              </li>
              <li className="mt-2">
                <strong>Tools, Not Certification.</strong> ZATCA compliance
                features, UAE FTA formatting, VAT calculation tools, and all
                other tax-related features are provided solely as convenience
                tools to assist you in preparing documents. They are not
                certified, validated, endorsed, or approved by ZATCA, the UAE
                FTA, or any other tax authority anywhere in the world.
              </li>
              <li className="mt-2">
                <strong>No Validation Guarantee.</strong> We do not guarantee
                that any invoice, receipt, or other document generated by
                SwiftBill will pass validation, audit, or inspection by any tax
                authority, regulatory body, or government agency. Compliance
                requirements vary by jurisdiction and change frequently.
              </li>
              <li className="mt-2">
                <strong>User Verification Required.</strong> You are solely and
                entirely responsible for verifying that all documents created
                using SwiftBill comply with the tax laws, regulations, and
                requirements applicable in your jurisdiction. This includes
                verifying tax identification numbers, tax rates, QR code
                content, invoice formatting requirements, and all other
                compliance elements.
              </li>
              <li className="mt-2">
                <strong>No Liability for Tax Consequences.</strong> Sheboftek
                and SwiftBill accept no liability whatsoever for any tax
                penalties, fines, interest charges, assessments, audits,
                sanctions, or any other adverse consequences arising from your
                use of or reliance on the tax compliance tools in SwiftBill.
                You use these features entirely at your own risk.
              </li>
              <li className="mt-2">
                <strong>Regulatory Changes.</strong> Tax laws and regulations
                are subject to frequent changes, reinterpretations, and
                updates by tax authorities. SwiftBill may not reflect the
                latest regulatory changes, amendments, or requirements at any
                given time. It is your obligation to stay informed of
                applicable tax law changes and to verify that your documents
                comply with current requirements.
              </li>
              <li className="mt-2">
                <strong>Professional Consultation Required.</strong> We
                strongly recommend that you consult with a qualified tax
                professional, licensed accountant, or legal advisor for all tax
                compliance matters. Do not rely on SwiftBill as your sole
                source of tax compliance.
              </li>
            </ul>
          </div>

          {/* ----------------------------------------------------------------
              9. INTELLECTUAL PROPERTY
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              9. Intellectual Property
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              <strong>Our Intellectual Property.</strong> SwiftBill, including
              its source code, object code, design, user interface, graphics,
              icons, logos, trademarks, service marks, trade names, PDF
              templates, animations, documentation, and all other elements of
              the application, is the exclusive property of Sheboftek and is
              protected by copyright, trademark, and other intellectual
              property laws. All rights not expressly granted to you in these
              Terms are reserved.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              <strong>Your Documents.</strong> As stated in Section 6, you
              retain full ownership of the documents and business data you
              create using SwiftBill. The content of your invoices, estimates,
              contracts, and other documents belongs to you.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              <strong>Template Intellectual Property.</strong> The 15 PDF
              templates provided in SwiftBill (Classic, Minimal, Modern, Bold,
              Elegant, Corporate, Freelancer, Commercial, Executive, Navy,
              Fresh, Refined, Contractor, Studio, Hourly) remain the
              intellectual property of Sheboftek. Your subscription grants you
              a non-exclusive, non-transferable, revocable license to use these
              templates for generating your business documents. You may not
              extract, reproduce, distribute, sell, or sublicense the template
              designs themselves, whether in whole or in part.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              <strong>Feedback.</strong> If you provide us with feedback,
              suggestions, or ideas regarding SwiftBill, you grant us an
              irrevocable, perpetual, worldwide, royalty-free license to use,
              modify, and incorporate such feedback into the Service without
              any obligation to you.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              10. PROHIBITED USES
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              10. Prohibited Uses
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              In addition to the content-related prohibitions in Section 6, you
              agree not to:
            </p>
            <ul className="mt-4 list-disc ps-6 text-[#6a6a84]">
              <li className="mt-2">
                Use SwiftBill to create fraudulent, forged, or fictitious
                invoices, receipts, or financial documents for any purpose
                including but not limited to tax fraud, insurance fraud, or
                expense reimbursement fraud
              </li>
              <li className="mt-2">
                Use the Service to facilitate money laundering, terrorist
                financing, sanctions evasion, or any other financial crime
              </li>
              <li className="mt-2">
                Reverse engineer, decompile, disassemble, or otherwise attempt
                to derive the source code or underlying algorithms of SwiftBill
              </li>
              <li className="mt-2">
                Use automated scripts, bots, scrapers, or other automated means
                to access, collect data from, or interact with SwiftBill
              </li>
              <li className="mt-2">
                Attempt to gain unauthorized access to SwiftBill&apos;s
                servers, databases, systems, or other users&apos; accounts
              </li>
              <li className="mt-2">
                Circumvent, disable, or interfere with any security features,
                access controls, or usage limitations of the Service, including
                subscription tier restrictions
              </li>
              <li className="mt-2">
                Reproduce, distribute, publicly display, or create derivative
                works based on SwiftBill or any of its components without our
                express written permission
              </li>
              <li className="mt-2">
                Use the Service to transmit viruses, malware, or other harmful
                code
              </li>
              <li className="mt-2">
                Sublicense, rent, lease, sell, or otherwise transfer your
                access to SwiftBill to any third party
              </li>
              <li className="mt-2">
                Use SwiftBill in any manner that violates applicable local,
                state, national, or international law or regulation
              </li>
              <li className="mt-2">
                Interfere with or disrupt the integrity or performance of the
                Service or the servers and networks used to make SwiftBill
                available
              </li>
            </ul>
            <p className="mt-4 text-[#6a6a84]">
              Violation of these prohibitions may result in immediate
              termination of your account and access to SwiftBill, and may
              expose you to civil and criminal liability.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              11. DISCLAIMER OF WARRANTIES
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              11. Disclaimer of Warranties
            </h6>
            <p className="mt-4 font-bold uppercase text-[#151515]">
              THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
              AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
              IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW,
              SHEBOFTEK EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS,
              IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO
              IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
              PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>
            <p className="mt-4 font-bold uppercase text-[#151515]">
              WITHOUT LIMITING THE FOREGOING, SHEBOFTEK DOES NOT WARRANT THAT:
              (A) THE SERVICE WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS; (B)
              THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR
              ERROR-FREE; (C) THE RESULTS OBTAINED FROM THE USE OF THE SERVICE
              WILL BE ACCURATE, RELIABLE, OR COMPLETE; (D) ANY DOCUMENTS
              GENERATED BY THE SERVICE WILL COMPLY WITH THE LAWS OR
              REGULATIONS OF ANY JURISDICTION; (E) THE QUALITY OF ANY
              PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIAL OBTAINED
              THROUGH THE SERVICE WILL MEET YOUR EXPECTATIONS; (F) ANY ERRORS
              IN THE SERVICE WILL BE CORRECTED; OR (G) THE AI-POWERED FEATURES
              WILL PRODUCE ACCURATE, COMPLETE, OR LEGALLY COMPLIANT OUTPUT.
            </p>
            <p className="mt-4 font-bold uppercase text-[#151515]">
              YOU EXPRESSLY UNDERSTAND AND AGREE THAT YOUR USE OF SWIFTBILL IS
              AT YOUR SOLE RISK. ANY MATERIAL DOWNLOADED, GENERATED, OR
              OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICE IS ACCESSED AT
              YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY RESPONSIBLE
              FOR ANY DAMAGE TO YOUR DEVICE OR LOSS OF DATA THAT RESULTS FROM
              THE USE OF ANY SUCH MATERIAL.
            </p>
            <p className="mt-4 font-bold uppercase text-[#151515]">
              NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY
              YOU FROM SHEBOFTEK OR THROUGH THE SERVICE SHALL CREATE ANY
              WARRANTY NOT EXPRESSLY STATED IN THESE TERMS.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              Some jurisdictions do not allow the exclusion of implied
              warranties, so the above exclusions may not apply to you. In such
              jurisdictions, our warranties are limited to the fullest extent
              permitted by applicable law.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              12. LIMITATION OF LIABILITY
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              12. Limitation of Liability
            </h6>
            <p className="mt-4 font-bold uppercase text-[#151515]">
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
              SHALL SHEBOFTEK, ITS OWNER, AFFILIATES, LICENSORS, SERVICE
              PROVIDERS, EMPLOYEES, AGENTS, OR CONTRACTORS BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR
              PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO: LOSS OF PROFITS,
              LOSS OF REVENUE, LOSS OF BUSINESS, LOSS OF DATA, LOSS OF
              GOODWILL, BUSINESS INTERRUPTION, COST OF PROCUREMENT OF
              SUBSTITUTE GOODS OR SERVICES, OR ANY OTHER INTANGIBLE LOSSES,
              ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO
              USE SWIFTBILL, WHETHER BASED ON WARRANTY, CONTRACT, TORT
              (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER LEGAL
              THEORY, EVEN IF SHEBOFTEK HAS BEEN ADVISED OF THE POSSIBILITY OF
              SUCH DAMAGES.
            </p>
            <p className="mt-4 font-bold uppercase text-[#151515]">
              WITHOUT LIMITING THE FOREGOING, SHEBOFTEK SHALL NOT BE LIABLE FOR
              ANY DAMAGES ARISING FROM: (A) TAX PENALTIES, FINES, INTEREST, OR
              ASSESSMENTS RESULTING FROM YOUR USE OF TAX COMPLIANCE TOOLS; (B)
              ERRORS OR INACCURACIES IN AI-GENERATED CONTENT; (C) UNAUTHORIZED
              ACCESS TO OR ALTERATION OF YOUR DATA; (D) LOSS OF BUSINESS
              OPPORTUNITIES OR CLIENT RELATIONSHIPS; (E) RELIANCE ON ANY
              INFORMATION OR CONTENT PROVIDED THROUGH THE SERVICE; OR (F) ANY
              THIRD-PARTY CONDUCT OR CONTENT.
            </p>
            <p className="mt-4 font-bold uppercase text-[#151515]">
              IN NO EVENT SHALL SHEBOFTEK&apos;S TOTAL AGGREGATE LIABILITY TO
              YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR
              YOUR USE OF SWIFTBILL EXCEED THE TOTAL AMOUNT YOU HAVE ACTUALLY
              PAID TO SHEBOFTEK FOR THE SERVICE DURING THE TWELVE (12) MONTHS
              IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR
              FIFTY UNITED STATES DOLLARS ($50.00 USD), WHICHEVER IS GREATER.
            </p>
            <p className="mt-4 font-bold uppercase text-[#151515]">
              THE LIMITATIONS SET FORTH IN THIS SECTION SHALL APPLY
              REGARDLESS OF WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT,
              TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS, AND EVEN
              IF SHEBOFTEK HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
              DAMAGES. THE FOREGOING LIMITATION OF LIABILITY SHALL APPLY TO THE
              FULLEST EXTENT PERMITTED BY LAW IN THE APPLICABLE JURISDICTION.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              Some jurisdictions do not allow the limitation or exclusion of
              liability for incidental or consequential damages, so the above
              limitations may not apply to you. In such jurisdictions, our
              liability is limited to the fullest extent permitted by
              applicable law.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              13. INDEMNIFICATION
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              13. Indemnification
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              You agree to indemnify, defend, and hold harmless Sheboftek, its
              owner, affiliates, licensors, service providers, and their
              respective officers, directors, employees, contractors, agents,
              licensors, suppliers, successors, and assigns from and against
              any and all claims, liabilities, damages, judgments, awards,
              losses, costs, expenses, or fees (including reasonable
              attorneys&apos; fees) arising out of or relating to:
            </p>
            <ul className="mt-4 list-disc ps-6 text-[#6a6a84]">
              <li className="mt-2">
                Your use of the Service or any activity under your account
              </li>
              <li className="mt-2">
                Your User Content, including any documents, invoices, or other
                materials you create, send, share, or distribute using
                SwiftBill
              </li>
              <li className="mt-2">
                Your violation of these Terms of Service
              </li>
              <li className="mt-2">
                Your violation of any applicable law, regulation, or
                third-party rights
              </li>
              <li className="mt-2">
                Your non-compliance with tax laws or regulations, including any
                penalties, fines, or assessments imposed by any tax authority
                as a result of documents created using SwiftBill
              </li>
              <li className="mt-2">
                Any claim that your User Content caused damage to a third party
              </li>
              <li className="mt-2">
                Your failure to maintain accurate financial records or comply
                with reporting obligations in your jurisdiction
              </li>
              <li className="mt-2">
                Your reliance on AI-generated content without proper review and
                verification
              </li>
            </ul>
            <p className="mt-4 text-[#6a6a84]">
              This indemnification obligation will survive the termination or
              expiration of these Terms and your use of SwiftBill.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              14. TERMINATION
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              14. Termination
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              <strong>Termination by Us.</strong> We may suspend or terminate
              your access to SwiftBill, in whole or in part, at any time, with
              or without cause, and with or without notice, if we reasonably
              believe that: (a) you have violated these Terms; (b) you are
              using the Service for fraudulent or illegal purposes; (c) your
              continued use poses a security risk to us or other users; or (d)
              we are required to do so by law, regulation, or legal process. We
              will make reasonable efforts to notify you of termination where
              practicable.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              <strong>Termination by You.</strong> You may stop using SwiftBill
              at any time. You may delete your account through the app settings
              or by contacting us at{" "}
              <a
                href="mailto:support@getswiftbill.app"
                className="text-[#3053EC] underline"
              >
                support@getswiftbill.app
              </a>
              . To stop subscription billing, you must cancel your subscription
              through your Apple ID settings at least 24 hours before the next
              renewal date. Deleting the app or your account does not
              automatically cancel your subscription.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              <strong>Effect of Termination.</strong> Upon termination of your
              account: (a) your right to use SwiftBill immediately ceases; (b)
              your cloud-synced data will be scheduled for deletion from our
              servers in accordance with our Privacy Policy, typically within 30
              days; (c) any data stored locally on your device will remain
              until you delete the app; (d) provisions of these Terms that by
              their nature should survive termination will continue to apply,
              including Sections 6, 7, 8, 9, 11, 12, 13, 15, and 16.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              <strong>Data Export.</strong> We recommend exporting your documents
              and data before account deletion. Once your data is deleted from
              our servers, it cannot be recovered.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              15. GOVERNING LAW
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              15. Governing Law
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              These Terms of Service and any disputes arising out of or
              relating to them or your use of SwiftBill shall be governed by
              and construed in accordance with the laws of the Arab Republic of
              Egypt, without regard to its conflict of law provisions. Any legal
              proceedings arising out of or in connection with these Terms shall
              be subject to the exclusive jurisdiction of the courts of Cairo,
              Egypt.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              If you are a consumer in the European Union, European Economic
              Area, or the United Kingdom, nothing in these Terms affects your
              rights under mandatory consumer protection laws of your country
              of residence.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              16. DISPUTE RESOLUTION
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              16. Dispute Resolution
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              <strong>Informal Resolution.</strong> Before initiating any formal
              legal proceedings, you agree to first attempt to resolve any
              dispute informally by contacting us at{" "}
              <a
                href="mailto:support@getswiftbill.app"
                className="text-[#3053EC] underline"
              >
                support@getswiftbill.app
              </a>
              . We will attempt to resolve the dispute through good-faith
              negotiation within 30 days of receiving your written notice of
              dispute.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              <strong>Formal Proceedings.</strong> If the dispute cannot be
              resolved informally within 30 days, either party may pursue the
              dispute through the courts specified in Section 15 (Governing
              Law). You agree that any claim or cause of action arising out of
              or related to your use of SwiftBill or these Terms must be filed
              within one (1) year after the cause of action accrues, or be
              permanently barred.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              <strong>Individual Basis.</strong> All disputes shall be resolved
              on an individual basis. You agree not to participate in any class
              action, collective action, or representative proceeding against
              Sheboftek, whether as a plaintiff, class member, or otherwise.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              17. SEVERABILITY
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              17. Severability
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              If any provision of these Terms is held to be invalid, illegal,
              or unenforceable by a court of competent jurisdiction, such
              provision shall be modified to the minimum extent necessary to
              make it valid and enforceable, or if modification is not
              possible, shall be severed from these Terms. The invalidity or
              unenforceability of any provision shall not affect the validity
              or enforceability of the remaining provisions, which shall
              continue in full force and effect.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              18. ENTIRE AGREEMENT
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              18. Entire Agreement
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              These Terms of Service, together with our{" "}
              <a href={`/${lang}/privacy`} className="text-[#3053EC] underline">
                Privacy Policy
              </a>
              , constitute the entire agreement between you and Sheboftek
              regarding your use of SwiftBill. These Terms supersede all prior
              or contemporaneous agreements, communications, proposals, and
              representations, whether electronic, oral, or written, between
              you and Sheboftek with respect to the Service. Any ambiguities in
              the interpretation of these Terms shall not be construed against
              the drafting party.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              19. CHANGES TO TERMS
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              19. Changes to Terms
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              We reserve the right to modify, amend, or replace these Terms of
              Service at any time at our sole discretion. When we make changes,
              we will update the &quot;Last updated&quot; date at the top of
              this page.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              For material changes that significantly affect your rights or
              obligations, we will provide notice through one or more of the
              following methods: (a) an in-app notification; (b) a prominent
              notice on our website; or (c) an email to the address associated
              with your account, if available.
            </p>
            <p className="mt-4 text-[#6a6a84]">
              Your continued use of SwiftBill after the effective date of any
              changes constitutes your acceptance of the revised Terms. If you
              do not agree to the modified Terms, you must stop using the
              Service and delete your account. It is your responsibility to
              review these Terms periodically for changes.
            </p>
          </div>

          {/* ----------------------------------------------------------------
              20. CONTACT INFORMATION
          ---------------------------------------------------------------- */}
          <div>
            <h6 className="font-heading text-[#151515]">
              20. Contact Information
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              If you have any questions, concerns, or complaints about these
              Terms of Service, or if you wish to report a violation, please
              contact us:
            </p>
            <ul className="mt-4 list-none ps-0 text-[#6a6a84]">
              <li className="mt-2">
                <strong>Company:</strong> Sheboftek
              </li>
              <li className="mt-2">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@getswiftbill.app"
                  className="text-[#3053EC] underline"
                >
                  support@getswiftbill.app
                </a>
              </li>
              <li className="mt-2">
                <strong>Website:</strong>{" "}
                <a
                  href="https://getswiftbill.app"
                  className="text-[#3053EC] underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://getswiftbill.app
                </a>
              </li>
              <li className="mt-2">
                <strong>App Store:</strong>{" "}
                <a
                  href="https://apps.apple.com/app/id6760855924"
                  className="text-[#3053EC] underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SwiftBill on the App Store
                </a>
              </li>
            </ul>
            <p className="mt-6 text-[#6a6a84]">
              We aim to respond to all inquiries within 5 business days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
