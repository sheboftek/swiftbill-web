import { type Lang, t } from "@/i18n/utils";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = (rawLang === "ar" ? "ar" : "en") as Lang;

  return (
    <section style={{ paddingBlockStart: 140, paddingBlockEnd: 80 }}>
      <div className="mx-auto max-w-[800px] px-5">
        <h3 className="font-heading text-[#151515]">
          {t(lang, "privacy.title")}
        </h3>
        <p className="mt-4 text-[16px] text-[#808099]">
          {t(lang, "privacy.lastUpdated")}
        </p>

        <div className="mt-12 flex flex-col gap-10 text-[18px] leading-[160%] text-[#151515]">
          {/* ─── 1. Introduction ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">1. Introduction</h6>
            <p className="mt-4 text-[#6a6a84]">
              SwiftBill (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
              operated by Sheboftek, a sole proprietorship. We are committed to
              protecting your privacy and handling your personal data responsibly
              and transparently. This Privacy Policy explains how we collect,
              use, store, share, and protect your information when you use the
              SwiftBill mobile application (available on the{" "}
              <a
                href="https://apps.apple.com/app/id6760855924"
                className="text-[#3053EC] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple App Store
              </a>
              ) and our website at{" "}
              <a
                href="https://getswiftbill.app"
                className="text-[#3053EC] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                getswiftbill.app
              </a>{" "}
              (collectively, the &quot;Service&quot;).
            </p>
            <p className="mt-3 text-[#6a6a84]">
              SwiftBill is an invoicing and financial document management
              application designed for freelancers and small businesses
              operating in Saudi Arabia, the United Arab Emirates, and globally.
              By using the Service, you acknowledge that you have read and
              understood this Privacy Policy and agree to our collection, use,
              and disclosure of your information as described herein.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              If you do not agree with this Privacy Policy, please do not use
              the Service.
            </p>
          </div>

          {/* ─── 2. Information We Collect ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              2. Information We Collect
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              We collect different categories of information depending on how
              you interact with the Service. We adhere to the principle of data
              minimization and only collect information necessary to provide and
              improve the Service.
            </p>

            <p className="mt-5 text-[#6a6a84]">
              <strong className="text-[#151515]">
                2.1 Account Information
              </strong>
              <br />
              When you create an account, we collect your email address and
              display name. If you use Apple Sign-In, we receive a unique
              identifier and, if you choose to share it, your name and email
              address. We also store authentication tokens for session
              management. We do not store or have access to your Apple ID
              password.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                2.2 Business Profile Information
              </strong>
              <br />
              To generate professional documents, you may provide: business
              name, business address, phone number, email address, website URL,
              logo image, tax registration numbers (e.g., VAT number, commercial
              registration number), and bank or payment details for inclusion on
              invoices.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                2.3 Client Information
              </strong>
              <br />
              You may store your clients&apos; contact details within the app,
              including: client name, company name, email address, phone number,
              billing address, shipping address, and tax identification numbers.
              You are responsible for ensuring you have the right to store and
              process your clients&apos; information.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                2.4 Financial and Document Data
              </strong>
              <br />
              The Service processes financial and document data that you create,
              including: invoices, estimates, contracts, receipts, credit notes,
              and expense records. This data includes line item descriptions,
              quantities, unit prices, tax rates, discount amounts, currency
              codes, payment terms, due dates, and document status information.
              You retain full ownership of all documents and financial data you
              create.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                2.5 Expense Data
              </strong>
              <br />
              If you use expense tracking, we process: expense categories,
              amounts, dates, merchant names, receipt images, approval status,
              and reimbursement records.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                2.6 Analytics Data
              </strong>
              <br />
              We collect privacy-focused analytics via Mixpanel to understand
              how the Service is used and to improve its features. Analytics
              events track feature usage patterns (e.g., documents created,
              templates used, features accessed) without collecting personally
              identifiable information (PII). We do not send your name, email,
              phone number, or any business or client data to our analytics
              provider.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                2.7 AI Interaction Data
              </strong>
              <br />
              When you use AI-powered features (text-to-document generation,
              receipt OCR scanning, contract Q&amp;A wizard, or smart autofill),
              relevant portions of your input data are sent to Google Gemini for
              processing. This may include document text, line item details,
              business context, and receipt images. See Section 8 (AI Features
              and Data Processing) for full details.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                2.8 Device and Technical Data
              </strong>
              <br />
              We may collect: device model, operating system version, app
              version, language preference, and general crash or error logs to
              diagnose technical issues. This data does not include personal
              identifiers.
            </p>
          </div>

          {/* ─── 3. How We Use Your Information ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              3. How We Use Your Information
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              We use the information we collect for the following purposes, with
              the corresponding legal basis under the EU General Data Protection
              Regulation (GDPR):
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Service Delivery and Contract Performance (Article 6(1)(b)
                GDPR)
              </strong>
              <br />
              To create, manage, and export invoices, estimates, contracts,
              receipts, credit notes, and expense records; to generate
              professional PDF documents using your chosen template; to sync
              your data across devices via cloud storage; to process
              subscription payments through Apple StoreKit; and to authenticate
              your identity and manage your account.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Legitimate Interests (Article 6(1)(f) GDPR)
              </strong>
              <br />
              To analyze aggregated, non-identifying usage patterns via Mixpanel
              to improve app features and user experience; to detect and prevent
              fraud, abuse, and security incidents; to send optional
              notification reminders for upcoming invoice due dates and payment
              follow-ups; and to provide customer support and respond to
              inquiries.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Consent (Article 6(1)(a) GDPR)
              </strong>
              <br />
              To process your data through AI-powered features (Google Gemini)
              when you explicitly choose to use them; and to send promotional
              communications, if you opt in.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Legal Obligation (Article 6(1)(c) GDPR)
              </strong>
              <br />
              To comply with applicable laws, regulations, legal processes, or
              enforceable governmental requests; to maintain records as required
              by financial regulations; and to respond to data subject access
              requests and other regulatory requirements.
            </p>
          </div>

          {/* ─── 4. How We Share Your Information ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              4. How We Share Your Information
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                We do NOT sell your personal information.
              </strong>{" "}
              We have never sold personal information and have no plans to do
              so. We share your data only with the following third-party service
              providers, strictly to operate the Service:
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Supabase (Authentication and Cloud Sync)
              </strong>
              <br />
              We use Supabase for user authentication (email sign-up and Apple
              Sign-In) and optional cloud data synchronization. Your account
              credentials, authentication tokens, and synced document data are
              stored on Supabase&apos;s hosted servers. Supabase employs
              industry-standard encryption for data in transit and at rest.
              <br />
              <a
                href="https://supabase.com/privacy"
                className="text-[#3053EC] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Supabase Privacy Policy
              </a>
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Mixpanel (Analytics)
              </strong>
              <br />
              We use Mixpanel, a US-based analytics platform, for
              privacy-focused event tracking. We send only aggregated feature
              usage events (e.g., &quot;document_created,&quot;
              &quot;template_selected&quot;). No personally identifiable
              information, names, email addresses, financial data, or document
              content is sent to Mixpanel.
              <br />
              <a
                href="https://mixpanel.com/legal/privacy-policy/"
                className="text-[#3053EC] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mixpanel Privacy Policy
              </a>
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Google Gemini 2.5 Flash (AI Document Generation)
              </strong>
              <br />
              When you use AI features, relevant data is sent to Google&apos;s
              Gemini API for processing. This may include document text, line
              item descriptions, business context, and receipt images you
              provide. Google processes this data to generate or enhance your
              documents. We use Gemini via a server-side proxy to minimize
              direct exposure of your data. See Section 8 for full AI
              processing details.
              <br />
              <a
                href="https://policies.google.com/privacy"
                className="text-[#3053EC] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Apple (Payments and Authentication)
              </strong>
              <br />
              Subscription payments are processed exclusively through Apple
              StoreKit 2 and the Apple App Store. We do not collect, process,
              or store your credit card number, bank account details, or other
              payment instrument information. Apple handles all payment
              processing in accordance with their privacy policy. Apple
              Sign-In provides us only with the information you authorize.
              <br />
              <a
                href="https://www.apple.com/legal/privacy/"
                className="text-[#3053EC] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apple Privacy Policy
              </a>
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Legal and Safety Disclosures
              </strong>
              <br />
              We may disclose your information if required to do so by law, in
              response to valid legal process (such as a court order or
              subpoena), to protect the rights, property, or safety of
              Sheboftek, our users, or the public, or to enforce our Terms of
              Service.
            </p>
          </div>

          {/* ─── 5. International Data Transfers ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              5. International Data Transfers
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              SwiftBill is operated by Sheboftek. Your data may be transferred
              to and processed in countries outside your country of residence,
              including the United States, where our third-party service
              providers (Mixpanel, Supabase, Google) operate infrastructure.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              For transfers of personal data from the European Economic Area
              (EEA), United Kingdom, or Switzerland to countries that have not
              received an adequacy decision from the European Commission, we
              rely on Standard Contractual Clauses (SCCs) adopted by the
              European Commission, as well as any supplementary measures
              necessary to ensure an adequate level of data protection.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              For users in Saudi Arabia and the UAE, data may be transferred
              outside the Kingdom of Saudi Arabia or the UAE in accordance with
              the requirements of the Saudi Arabia Personal Data Protection Law
              (PDPL) and the UAE Federal Decree-Law No. 45 of 2021 on the
              Protection of Personal Data (UAE PDPL), respectively. We ensure
              that any cross-border transfer is subject to appropriate
              safeguards and contractual protections.
            </p>
          </div>

          {/* ─── 6. Data Retention ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              6. Data Retention
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              We retain your data only for as long as necessary to fulfill the
              purposes described in this Privacy Policy, or as required by
              applicable law. Specific retention periods are as follows:
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">Account Data:</strong> Retained
              for the duration of your account. Deleted within 30 days of
              account deletion request.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Documents (Invoices, Estimates, Contracts, Receipts, Credit
                Notes):
              </strong>{" "}
              Retained for the duration of your account. Local copies on your
              device are under your control. Cloud-synced copies are deleted
              within 30 days of account deletion.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              <strong className="text-[#151515]">Expense Records:</strong>{" "}
              Retained for the duration of your account and deleted within 30
              days of account deletion.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              <strong className="text-[#151515]">Client Information:</strong>{" "}
              Retained for the duration of your account. Deleted when you
              remove the client record or delete your account.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              <strong className="text-[#151515]">Analytics Data:</strong>{" "}
              Aggregated, non-identifying analytics events are retained by
              Mixpanel in accordance with their data retention policy (typically
              up to 5 years). These events cannot be linked to individual users.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              <strong className="text-[#151515]">AI Interaction Data:</strong>{" "}
              Data sent to Google Gemini for AI processing is not stored by us
              after the response is returned. Google may retain data in
              accordance with their own data retention policies.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Server Logs and Security Data:
              </strong>{" "}
              Authentication logs and rate-limiting records are retained for up
              to 90 days for security and abuse prevention purposes.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              <strong className="text-[#151515]">Backup Copies:</strong> Backup
              copies of deleted data may persist in our encrypted backups for up
              to 30 additional days before being permanently purged.
            </p>
          </div>

          {/* ─── 7. Your Rights ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              7. Your Rights
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              Depending on your jurisdiction, you have specific legal rights
              regarding your personal data. We are committed to honoring all
              applicable rights and responding within the legally required
              timeframes.
            </p>

            {/* GDPR Rights */}
            <p className="mt-5 text-[#6a6a84]">
              <strong className="text-[#151515]">
                7.1 European Economic Area, United Kingdom, and Switzerland
                (GDPR)
              </strong>
              <br />
              If you are located in the EEA, UK, or Switzerland, you have the
              following rights under the General Data Protection Regulation.
              We will respond to your request within 30 days.
            </p>
            <ul className="mt-3 list-disc ps-6 text-[#6a6a84]">
              <li>
                <strong className="text-[#151515]">Right of Access</strong>{" "}
                (Article 15) — Request a copy of all personal data we hold
                about you, including the purposes of processing and categories
                of data.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Rectification
                </strong>{" "}
                (Article 16) — Request correction of inaccurate or incomplete
                personal data. You can also update most data directly in the
                app.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Erasure (&quot;Right to Be Forgotten&quot;)
                </strong>{" "}
                (Article 17) — Request deletion of your personal data. See
                Section 7.5 for the deletion process.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Restriction of Processing
                </strong>{" "}
                (Article 18) — Request that we limit the processing of your
                data in certain circumstances.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Data Portability
                </strong>{" "}
                (Article 20) — Receive your personal data in a structured,
                commonly used, and machine-readable format (JSON or CSV).
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">Right to Object</strong>{" "}
                (Article 21) — Object to processing based on legitimate
                interests, including analytics and profiling.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Withdraw Consent
                </strong>{" "}
                (Article 7(3)) — Withdraw consent at any time for processing
                activities based on consent (such as AI features), without
                affecting the lawfulness of prior processing.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Lodge a Complaint
                </strong>{" "}
                — You have the right to lodge a complaint with your local data
                protection supervisory authority.
              </li>
            </ul>

            {/* CCPA Rights */}
            <p className="mt-5 text-[#6a6a84]">
              <strong className="text-[#151515]">
                7.2 California, United States (CCPA/CPRA)
              </strong>
              <br />
              If you are a California resident, you have the following rights
              under the California Consumer Privacy Act and the California
              Privacy Rights Act. We will respond to your request within 45
              days (with a possible 45-day extension if necessary).
            </p>
            <ul className="mt-3 list-disc ps-6 text-[#6a6a84]">
              <li>
                <strong className="text-[#151515]">Right to Know</strong> —
                Request information about the categories and specific pieces of
                personal information we have collected, the sources from which
                we collected it, our business purposes for collecting it, and
                the categories of third parties with whom we share it.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">Right to Delete</strong> —
                Request deletion of the personal information we have collected
                from you, subject to certain exceptions.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">Right to Opt-Out</strong> —
                You have the right to opt out of the &quot;sale&quot; or
                &quot;sharing&quot; of your personal information. As stated
                above, we do not sell or share your personal information for
                cross-context behavioral advertising.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Non-Discrimination
                </strong>{" "}
                — We will not discriminate against you for exercising any of
                your CCPA rights. You will not receive different pricing,
                quality of service, or access levels.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Correct
                </strong>{" "}
                — Request correction of inaccurate personal information.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Limit Use of Sensitive Personal Information
                </strong>{" "}
                — Direct us to limit the use and disclosure of your sensitive
                personal information to what is necessary to perform the
                Service.
              </li>
            </ul>

            {/* Saudi Arabia PDPL Rights */}
            <p className="mt-5 text-[#6a6a84]">
              <strong className="text-[#151515]">
                7.3 Saudi Arabia (Personal Data Protection Law — PDPL)
              </strong>
              <br />
              If you are a resident of the Kingdom of Saudi Arabia, you have
              the following rights under the Saudi Personal Data Protection Law
              (Royal Decree M/19, dated 9/2/1443H):
            </p>
            <ul className="mt-3 list-disc ps-6 text-[#6a6a84]">
              <li>
                <strong className="text-[#151515]">
                  Right to Be Informed
                </strong>{" "}
                — Know the legal basis and purpose for collecting your personal
                data.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">Right of Access</strong> —
                Access your personal data that we hold and obtain a copy in a
                clear and readable format.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Rectification
                </strong>{" "}
                — Request correction, completion, or updating of inaccurate or
                incomplete personal data.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Destruction
                </strong>{" "}
                — Request destruction of your personal data when it is no
                longer necessary for the purpose for which it was collected.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Withdraw Consent
                </strong>{" "}
                — Withdraw your consent to the processing of your data at any
                time.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Lodge a Complaint
                </strong>{" "}
                — File a complaint with the Saudi Data and Artificial
                Intelligence Authority (SDAIA) if you believe your data rights
                have been violated.
              </li>
            </ul>

            {/* UAE PDPL Rights */}
            <p className="mt-5 text-[#6a6a84]">
              <strong className="text-[#151515]">
                7.4 United Arab Emirates (Federal Decree-Law No. 45 of 2021 —
                UAE PDPL)
              </strong>
              <br />
              If you are a resident of the United Arab Emirates, you have the
              following rights under the UAE Personal Data Protection Law:
            </p>
            <ul className="mt-3 list-disc ps-6 text-[#6a6a84]">
              <li>
                <strong className="text-[#151515]">Right of Access</strong> —
                Request access to your personal data that we process, including
                the purposes and nature of processing.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Rectification
                </strong>{" "}
                — Correct, amend, or erase inaccurate or incomplete data.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Restrict Processing
                </strong>{" "}
                — Request that we stop or restrict the processing of your
                personal data.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Data Portability
                </strong>{" "}
                — Receive your personal data in a commonly used
                machine-readable format.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">Right to Object</strong> —
                Object to processing that may cause damage to you.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Right to Lodge a Complaint
                </strong>{" "}
                — File a complaint with the UAE Data Office if you believe your
                data rights have been violated.
              </li>
            </ul>

            {/* Data Deletion Process */}
            <p className="mt-5 text-[#6a6a84]">
              <strong className="text-[#151515]">
                7.5 How to Request Data Deletion
              </strong>
              <br />
              You can request deletion of your personal data through either of
              the following methods:
            </p>
            <ul className="mt-3 list-disc ps-6 text-[#6a6a84]">
              <li>
                <strong className="text-[#151515]">In-App:</strong> Navigate
                to Settings &gt; Account &gt; Delete Account. This
                immediately removes your account and all associated data from
                our servers.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">Email:</strong> Send a
                deletion request to{" "}
                <a
                  href="mailto:support@getswiftbill.app"
                  className="text-[#3053EC] underline"
                >
                  support@getswiftbill.app
                </a>{" "}
                with the subject line &quot;Data Deletion Request.&quot; We
                will verify your identity and process the request within 30
                days.
              </li>
            </ul>
            <p className="mt-3 text-[#6a6a84]">
              Upon deletion, all account data, documents, client records,
              expense records, business profiles, and synced data are
              permanently removed from our servers. Backup copies may take up
              to an additional 30 days to be fully purged. Data stored locally
              on your device is under your control and can be removed by
              uninstalling the app.
            </p>
          </div>

          {/* ─── 8. AI Features and Data Processing ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              8. AI Features and Data Processing
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              SwiftBill offers optional AI-powered features using Google
              Gemini 2.5 Flash. These features are entirely opt-in &mdash; AI
              processing only occurs when you explicitly initiate an AI action.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">AI Features Include:</strong>
            </p>
            <ul className="mt-2 list-disc ps-6 text-[#6a6a84]">
              <li>
                Text-to-document generation (natural language to invoice,
                estimate, or contract)
              </li>
              <li className="mt-1">
                Receipt OCR scanning (extracting data from receipt images)
              </li>
              <li className="mt-1">
                Contract Q&amp;A wizard (interactive guided contract creation)
              </li>
              <li className="mt-1">
                Smart autofill (AI-suggested document fields based on context)
              </li>
            </ul>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Data Sent to Google Gemini:
              </strong>
              <br />
              When you use an AI feature, we send the minimum necessary data to
              Google Gemini via a server-side proxy (Supabase Edge Function).
              This may include text you type, document context, line item
              details, and receipt images. We do not send your full account
              data, authentication tokens, or unrelated documents.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Consent and Control:
              </strong>
              <br />
              AI features require your explicit action to activate. You can use
              SwiftBill fully without ever using AI features. If you choose to
              use AI features, you consent to the processing of the relevant
              data by Google Gemini for that specific request.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Accuracy Disclaimer:
              </strong>
              <br />
              AI-generated content may contain errors, inaccuracies, or
              omissions. You are solely responsible for reviewing, verifying,
              and approving all AI-generated documents before sending them to
              clients or using them for any business or legal purpose. SwiftBill
              and Sheboftek accept no liability for errors in AI-generated
              content.
            </p>

            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                EU AI Act Transparency (Regulation (EU) 2024/1689):
              </strong>
              <br />
              In accordance with the EU AI Act, we disclose that SwiftBill uses
              a general-purpose AI model (Google Gemini 2.5 Flash) to assist
              with document generation. AI-generated or AI-assisted content
              within the app is labeled as such. The AI system is used as a
              productivity tool and does not make autonomous decisions with
              legal or financial consequences. All outputs require your review
              and explicit approval.
            </p>
          </div>

          {/* ─── 9. Tax Compliance Data ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              9. Tax Compliance Data
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              SwiftBill provides tools to assist with generating invoices and
              documents that include VAT calculations, QR codes (as required by
              ZATCA in Saudi Arabia), and tax identification numbers. We process
              tax-related data (VAT numbers, tax rates, compliance fields)
              solely to populate your documents as you direct.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              <strong className="text-[#151515]">Important Disclaimer:</strong>{" "}
              SwiftBill is NOT a certified tax compliance provider. We are not
              accredited, endorsed, or certified by the Zakat, Tax and Customs
              Authority (ZATCA), the UAE Federal Tax Authority (FTA), or any
              other governmental tax authority. SwiftBill does not provide tax,
              legal, or accounting advice. The tax calculations, QR codes, and
              compliance fields provided by the app are tools to assist you, but
              you are solely responsible for ensuring that your documents meet
              the legal and tax requirements of your jurisdiction. Always
              consult a qualified tax professional or accountant for compliance
              matters.
            </p>
          </div>

          {/* ─── 10. Document Export ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              10. Document Export and Sharing
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              SwiftBill allows you to export documents as PDF files and share
              them via email, messaging apps, AirDrop, or shareable links. Once
              a document leaves the SwiftBill app (whether exported as a PDF,
              shared via a link, or sent through a third-party messaging
              service), it is outside of our control.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              We are not responsible for the security, privacy, or distribution
              of documents after they have been exported or shared. You are
              responsible for ensuring that documents containing sensitive
              business or client information are shared securely and only with
              intended recipients.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              Shared invoice links are generated with unique, non-guessable
              tokens. You may revoke a shared link at any time by disabling
              sharing for that document in the app.
            </p>
          </div>

          {/* ─── 11. Children's Privacy ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              11. Children&apos;s Privacy
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              SwiftBill is a business and financial document management tool
              intended for use by adults. The Service is not directed at
              children under the age of 16. We do not knowingly collect
              personal information from children under 16. If you are a parent
              or guardian and become aware that your child has provided us with
              personal data, please contact us at{" "}
              <a
                href="mailto:support@getswiftbill.app"
                className="text-[#3053EC] underline"
              >
                support@getswiftbill.app
              </a>{" "}
              and we will take steps to delete such information within 30 days.
            </p>
          </div>

          {/* ─── 12. Security Measures ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              12. Security Measures
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              We implement appropriate technical and organizational measures to
              protect your personal data against unauthorized access,
              alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="mt-3 list-disc ps-6 text-[#6a6a84]">
              <li>
                <strong className="text-[#151515]">
                  Encryption in Transit:
                </strong>{" "}
                All data transmitted between the app, our servers, and
                third-party services is encrypted using TLS (Transport Layer
                Security).
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Encryption at Rest:
                </strong>{" "}
                Data stored on our servers (Supabase) is encrypted at rest
                using industry-standard AES-256 encryption.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Authentication Security:
                </strong>{" "}
                Login rate limiting with exponential backoff after failed
                attempts, password reset cooldowns (60-second minimum between
                requests), minimum 8-character password requirement, and secure
                nonce generation for Apple Sign-In.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  API Security:
                </strong>{" "}
                Rate limiting on all API endpoints, JWT-based authentication
                with token refresh, and server-side proxy for AI requests.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Access Controls:
                </strong>{" "}
                Row-level security (RLS) on all database tables ensures users
                can only access their own data.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">
                  Secure Sharing:
                </strong>{" "}
                Shared document links use unique, non-guessable tokens with
                proper URL encoding.
              </li>
            </ul>
            <p className="mt-3 text-[#6a6a84]">
              While we strive to protect your personal data, no method of
              electronic transmission or storage is 100% secure. We cannot
              guarantee absolute security, but we continuously review and
              update our security practices.
            </p>
          </div>

          {/* ─── 13. Do Not Track ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              13. Do Not Track Signals
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              In compliance with the California Online Privacy Protection Act
              (CalOPPA), we disclose our response to Do Not Track (DNT) browser
              signals. SwiftBill does not track users across third-party
              websites or services. Our analytics (Mixpanel) do not use cookies
              for cross-site tracking within the mobile application. We honor
              Do Not Track signals and do not engage in behavioral tracking
              across websites.
            </p>
          </div>

          {/* ─── 14. Do Not Sell ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              14. Do Not Sell or Share My Personal Information
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                We do NOT sell your personal information.
              </strong>{" "}
              We do not sell, rent, lease, or trade your personal information
              to any third party for monetary or other valuable consideration.
              We do not share your personal information for cross-context
              behavioral advertising purposes. This applies to all users
              regardless of jurisdiction, including California residents under
              the CCPA/CPRA, EU residents under the GDPR, and residents of
              Saudi Arabia and the UAE.
            </p>
          </div>

          {/* ─── 15. Cookie Policy ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              15. Cookie Policy
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Website (getswiftbill.app):
              </strong>
              <br />
              Our website may use essential cookies necessary for the
              functioning of the site (e.g., language preference). We do not
              use advertising cookies or third-party tracking cookies on our
              website. Any analytics on the website are privacy-focused and do
              not use cookies to identify or track individual visitors.
            </p>
            <p className="mt-3 text-[#6a6a84]">
              <strong className="text-[#151515]">
                Mobile Application:
              </strong>
              <br />
              The SwiftBill iOS application does not use cookies. Data
              persistence within the app uses SwiftData (on-device) and
              Supabase (cloud sync) rather than browser-based cookies.
            </p>
          </div>

          {/* ─── 16. Subscription Terms ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              16. Subscription Information
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              SwiftBill offers auto-renewable subscription plans managed through
              the Apple App Store:
            </p>
            <ul className="mt-3 list-disc ps-6 text-[#6a6a84]">
              <li>
                <strong className="text-[#151515]">Monthly Plan:</strong>{" "}
                $5.99/month with a 3-day free trial.
              </li>
              <li className="mt-2">
                <strong className="text-[#151515]">Yearly Plan:</strong>{" "}
                $39.99/year with a 7-day free trial.
              </li>
            </ul>
            <p className="mt-3 text-[#6a6a84]">
              Payment will be charged to your Apple ID account at confirmation
              of purchase. The subscription automatically renews unless you turn
              off auto-renewal at least 24 hours before the end of the current
              period. Your account will be charged for renewal within 24 hours
              prior to the end of the current period at the same price. You can
              manage and cancel your subscriptions by going to your App Store
              account settings after purchase. Any unused portion of a free
              trial period, if offered, will be forfeited when you purchase a
              subscription.
            </p>
          </div>

          {/* ─── 17. User Content Ownership ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              17. User Content Ownership
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              You retain full ownership of all documents, data, and content you
              create using SwiftBill, including invoices, estimates, contracts,
              receipts, credit notes, expense records, business profiles, and
              client records. We do not claim any intellectual property rights
              over your content. We access and process your content solely to
              provide the Service as described in this Privacy Policy.
            </p>
          </div>

          {/* ─── 18. Changes to This Policy ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              18. Changes to This Privacy Policy
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              We may update this Privacy Policy from time to time to reflect
              changes in our practices, technology, legal requirements, or other
              factors. When we make material changes, we will:
            </p>
            <ul className="mt-3 list-disc ps-6 text-[#6a6a84]">
              <li>
                Update the &quot;Last Updated&quot; date at the top of this
                page.
              </li>
              <li className="mt-2">
                Notify you via in-app notification or email for significant
                changes.
              </li>
              <li className="mt-2">
                Provide a summary of changes where practical.
              </li>
            </ul>
            <p className="mt-3 text-[#6a6a84]">
              Your continued use of the Service after the updated Privacy Policy
              becomes effective constitutes your acceptance of the changes. We
              encourage you to review this Privacy Policy periodically.
            </p>
          </div>

          {/* ─── 19. Contact Us ─── */}
          <div>
            <h6 className="font-heading text-[#151515]">
              19. Contact Us
            </h6>
            <p className="mt-4 text-[#6a6a84]">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy, your personal data, or our data practices, please
              contact us:
            </p>
            <p className="mt-3 text-[#6a6a84]">
              <strong className="text-[#151515]">Sheboftek</strong>
              <br />
              Email:{" "}
              <a
                href="mailto:support@getswiftbill.app"
                className="text-[#3053EC] underline"
              >
                support@getswiftbill.app
              </a>
              <br />
              Website:{" "}
              <a
                href="https://getswiftbill.app"
                className="text-[#3053EC] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://getswiftbill.app
              </a>
            </p>
            <p className="mt-3 text-[#6a6a84]">
              For GDPR-related inquiries or to exercise your data protection
              rights, please include &quot;Data Protection Request&quot; in the
              subject line of your email. We will respond to all data
              protection requests within 30 days (or 45 days for CCPA requests)
              of receiving your verified request.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
