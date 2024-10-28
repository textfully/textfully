import { BackToTop } from "@/components/back-to-top";
import { Footer } from "@/components/landing/footer";
import { NavBar } from "@/components/landing/nav-bar";

export default function PrivacyPage() {
  return (
    <>
      <NavBar shouldAnimate={false} />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-zinc-400 mb-8">Last updated October 27, 2024</p>

        <div className="prose prose-invert max-w-none">
          <section className="mb-12">
            <p className="text-zinc-300 leading-relaxed">
              This Privacy Policy for gtfol, LLC ("we," "us," or "our"),
              describes how and why we might access, collect, store, use, and/or
              share ("process") your personal information when you use our
              services ("Services"), including when you:
            </p>
            <ul className="list-disc pl-6 mt-4 mb-8 text-zinc-300 space-y-2">
              <li>
                Visit our website at{" "}
                <a
                  href="https://textfully.dev"
                  className="text-[#0A93F6] hover:brightness-110"
                >
                  textfully.dev
                </a>
                , or any website of ours that links to this Privacy Policy
              </li>
              <li>
                Use Textfully. Textfully is an open-source Twilio alternative
                that lets developers send texts easily.
              </li>
              <li>
                Engage with us in other related ways, including any sales,
                marketing, or events
              </li>
            </ul>
            <p className="text-zinc-300 leading-relaxed mt-4">
              Questions or concerns? Reading this Privacy Policy will help you
              understand your privacy rights and choices. We are responsible for
              making decisions about how your personal information is processed.
              If you do not agree with our policies and practices, please do not
              use our Services. If you still have any questions or concerns,
              please contact us at{" "}
              <a
                href="mailto:textfully@gtfol.inc"
                className="text-[#0A93F6] hover:brightness-110"
              >
                textfully@gtfol.inc
              </a>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Summary of Key Points</h2>
            <p className="text-zinc-300 mb-4">
              This summary provides key points from our Privacy Policy, but you
              can find out more details about any of these topics by clicking
              the link following each key point or by using our table of
              contents below to find the section you are looking for.
            </p>
            <div className="space-y-4 text-zinc-300">
              <p>
                <strong>What personal information do we process?</strong> When
                you visit, use, or navigate our Services, we may process
                personal information depending on how you interact with us and
                the Services, the choices you make, and the products and
                features you use.
              </p>
              <p>
                <strong>
                  Do we process any sensitive personal information?
                </strong>{" "}
                Some of the information may be considered "special" or
                "sensitive" in certain jurisdictions. We do not process
                sensitive personal information.
              </p>
              <p>
                <strong>
                  Do we collect any information from third parties?
                </strong>{" "}
                We do not collect any information from third parties.
              </p>
              <p>
                <strong>How do we process your information?</strong> We process
                your information to provide, improve, and administer our
                Services, communicate with you, for security and fraud
                prevention, and to comply with law.
              </p>
              <p>
                <strong>
                  In what situations and with which parties do we share personal
                  information?
                </strong>{" "}
                We may share information in specific situations and with
                specific categories of third parties.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
            <nav className="space-y-2 text-zinc-300">
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <a href="#section1" className="hover:text-white">
                    WHAT INFORMATION DO WE COLLECT?
                  </a>
                </li>
                <li>
                  <a href="#section2" className="hover:text-white">
                    HOW DO WE PROCESS YOUR INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#section3" className="hover:text-white">
                    WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL
                    INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#section4" className="hover:text-white">
                    WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#section5" className="hover:text-white">
                    DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                  </a>
                </li>
                <li>
                  <a href="#section6" className="hover:text-white">
                    DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?
                  </a>
                </li>
                <li>
                  <a href="#section7" className="hover:text-white">
                    HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                  </a>
                </li>
                <li>
                  <a href="#section8" className="hover:text-white">
                    IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
                  </a>
                </li>
                <li>
                  <a href="#section9" className="hover:text-white">
                    HOW LONG DO WE KEEP YOUR INFORMATION?
                  </a>
                </li>
                <li>
                  <a href="#section10" className="hover:text-white">
                    HOW DO WE KEEP YOUR INFORMATION SAFE?
                  </a>
                </li>
                <li>
                  <a href="#section11" className="hover:text-white">
                    WHAT ARE YOUR PRIVACY RIGHTS?
                  </a>
                </li>
                <li>
                  <a href="#section12" className="hover:text-white">
                    CONTROLS FOR DO-NOT-TRACK FEATURES
                  </a>
                </li>
                <li>
                  <a href="#section13" className="hover:text-white">
                    DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                  </a>
                </li>
                <li>
                  <a href="#section14" className="hover:text-white">
                    DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
                  </a>
                </li>
                <li>
                  <a href="#section15" className="hover:text-white">
                    DO WE MAKE UPDATES TO THIS PRIVACY POLICY?
                  </a>
                </li>
                <li>
                  <a href="#section16" className="hover:text-white">
                    HOW CAN YOU CONTACT US ABOUT THIS PRIVACY POLICY?
                  </a>
                </li>
                <li>
                  <a href="#section17" className="hover:text-white">
                    HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                    FROM YOU?
                  </a>
                </li>
              </ol>
            </nav>
          </section>

          <section id="section1" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              1. WHAT INFORMATION DO WE COLLECT?
            </h2>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Personal Information You Disclose to Us
              </h3>
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: We collect personal information that you provide to
                  us.
                </em>
              </p>

              <p className="text-zinc-300 mb-4">
                We collect personal information that you voluntarily provide to
                us when you register on the Services, express an interest in
                obtaining information about us or our products and Services,
                when you participate in activities on the Services, or otherwise
                when you contact us.
              </p>

              <div className="ml-6 mb-6">
                <h4 className="text-lg font-semibold mb-3">
                  Personal Information Provided by You
                </h4>
                <p className="text-zinc-300 mb-3">
                  The personal information that we collect depends on the
                  context of your interactions with us and the Services, the
                  choices you make, and the products and features you use. The
                  personal information we collect may include the following:
                </p>
                <ul className="list-disc pl-6 text-zinc-300 space-y-2">
                  <li>names</li>
                  <li>email addresses</li>
                  <li>passwords</li>
                  <li>debit/credit card numbers</li>
                  <li>billing addresses</li>
                  <li>mailing addresses</li>
                  <li>phone numbers</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">Payment Data</h4>
                <p className="text-zinc-300">
                  We may collect data necessary to process your payment if you
                  choose to make purchases, such as your payment instrument
                  number, and the security code associated with your payment
                  instrument. All payment data is handled and stored by Stripe
                  and RevenueCat. You may find their privacy privacy link(s)
                  here:{" "}
                  <a
                    href="https://stripe.com/privacy"
                    className="text-[#0A93F6] hover:brightness-110"
                  >
                    https://stripe.com/privacy
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.revenuecat.com/privacy"
                    className="text-[#0A93F6] hover:brightness-110"
                  >
                    https://www.revenuecat.com/privacy
                  </a>
                  .
                </p>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-3">
                  Social Media Login Data
                </h4>
                <p className="text-zinc-300">
                  We may provide you with the option to register with us using
                  your existing social media account details. If you choose to
                  register in this way, we will collect certain profile
                  information about you from the social media provider, as
                  described in the section called "HOW DO WE HANDLE YOUR SOCIAL
                  LOGINS?"
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                Information Automatically Collected
              </h3>
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: Some information — such as your Internet Protocol
                  (IP) address and/or browser and device characteristics — is
                  collected automatically when you visit our Services.
                </em>
              </p>

              <p className="text-zinc-300 mb-4">
                We automatically collect certain information when you visit,
                use, or navigate the Services. This information does not reveal
                your specific identity (like your name or contact information)
                but may include device and usage information, such as your IP
                address, browser and device characteristics, operating system,
                language preferences, referring URLs, device name, country,
                location, information about how and when you use our Services,
                and other technical information. This information is primarily
                needed to maintain the security and operation of our Services,
                and for our internal analytics and reporting purposes.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-6">
                Categories of Personal Information We Collect
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left mb-4 border-collapse border border-zinc-700">
                  <thead>
                    <tr className="bg-zinc-800">
                      <th className="px-4 py-2 border border-zinc-700">
                        Category
                      </th>
                      <th className="px-4 py-2 border border-zinc-700">
                        Examples
                      </th>
                      <th className="px-4 py-2 border border-zinc-700">
                        Collected
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-zinc-900">
                      <td className="px-4 py-2 border border-zinc-700">
                        A. Identifiers
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">
                        Contact details, such as real name, alias, postal
                        address, telephone or mobile contact number, unique
                        personal identifier, online identifier, Internet
                        Protocol address, email address, and account name
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">YES</td>
                    </tr>
                    <tr className="hover:bg-zinc-900">
                      <td className="px-4 py-2 border border-zinc-700">
                        B. Personal information as defined in the California
                        Customer Records statute
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">
                        Name, contact information, education, employment,
                        employment history, and financial information
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">YES</td>
                    </tr>
                    <tr className="hover:bg-zinc-900">
                      <td className="px-4 py-2 border border-zinc-700">
                        C. Protected classification characteristics under state
                        or federal law
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">
                        Gender and date of birth
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">NO</td>
                    </tr>
                    <tr className="hover:bg-zinc-900">
                      <td className="px-4 py-2 border border-zinc-700">
                        D. Commercial information
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">
                        Transaction information, purchase history, financial
                        details, and payment information
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">NO</td>
                    </tr>
                    <tr className="hover:bg-zinc-900">
                      <td className="px-4 py-2 border border-zinc-700">
                        E. Biometric information
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">
                        Fingerprints and voiceprints
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">NO</td>
                    </tr>
                    <tr className="hover:bg-zinc-900">
                      <td className="px-4 py-2 border border-zinc-700">
                        F. Internet or other similar network activity
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">
                        Browsing history, search history, online behavior,
                        interest data, and interactions with our and other
                        websites, applications, systems, and advertisements
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">NO</td>
                    </tr>
                    <tr className="hover:bg-zinc-900">
                      <td className="px-4 py-2 border border-zinc-700">
                        G. Geolocation data
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">
                        Device location
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">YES</td>
                    </tr>
                    <tr className="hover:bg-zinc-900">
                      <td className="px-4 py-2 border border-zinc-700">
                        H. Audio, electronic, visual, thermal, olfactory, or
                        similar information
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">
                        Images and audio, video or call recordings created in
                        connection with our business activities
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">NO</td>
                    </tr>
                    <tr className="hover:bg-zinc-900">
                      <td className="px-4 py-2 border border-zinc-700">
                        I. Professional or employment-related information
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">
                        Business contact details in order to provide you our
                        Services at a business level or job title, work history,
                        and professional qualifications if you apply for a job
                        with us
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">NO</td>
                    </tr>
                    <tr className="hover:bg-zinc-900">
                      <td className="px-4 py-2 border border-zinc-700">
                        J. Education Information
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">
                        Student records and directory information
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">NO</td>
                    </tr>
                    <tr className="hover:bg-zinc-900">
                      <td className="px-4 py-2 border border-zinc-700">
                        K. Inferences drawn from collected personal information
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">
                        Inferences drawn from any of the collected personal
                        information listed above to create a profile or summary
                        about, for example, an individual's preferences and
                        characteristics
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">YES</td>
                    </tr>
                    <tr className="hover:bg-zinc-900">
                      <td className="px-4 py-2 border border-zinc-700">
                        L. Sensitive personal Information
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">
                        Face data, selfies
                      </td>
                      <td className="px-4 py-2 border border-zinc-700">YES</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          <section id="section2" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              2. HOW DO WE PROCESS YOUR INFORMATION?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: We process your information to provide, improve, and
                  administer our Services, communicate with you, for security
                  and fraud prevention, and to comply with law. We may also
                  process your information for other purposes with your consent.
                </em>
              </p>

              <p className="text-zinc-300 mb-6">
                We process your personal information for a variety of reasons,
                depending on how you interact with our Services, including:
              </p>

              <ul className="space-y-4 text-zinc-300">
                <li className="pl-6 relative">
                  <span className="absolute left-0">•</span>
                  <strong>
                    To facilitate account creation and authentication and
                    otherwise manage user accounts.
                  </strong>{" "}
                  We may process your information so you can create and log in
                  to your account, as well as keep your account in working
                  order.
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0">•</span>
                  <strong>
                    To deliver and facilitate delivery of services to the user.
                  </strong>{" "}
                  We may process your information to provide you with the
                  requested service.
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0">•</span>
                  <strong>
                    To respond to user inquiries/offer support to users.
                  </strong>{" "}
                  We may process your information to respond to your inquiries
                  and solve any potential issues you might have with the
                  requested service.
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0">•</span>
                  <strong>To send administrative information to you.</strong> We
                  may process your information to send you details about our
                  products and services, changes to our terms and policies, and
                  other similar information.
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0">•</span>
                  <strong>To fulfill and manage your orders.</strong> We may
                  process your information to fulfill and manage your orders,
                  payments, returns, and exchanges made through the Services.
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0">•</span>
                  <strong>To request feedback.</strong> We may process your
                  information when necessary to request feedback and to contact
                  you about your use of our Services.
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0">•</span>
                  <strong>
                    To send you marketing and promotional communications.
                  </strong>{" "}
                  We may process the personal information you send to us for our
                  marketing purposes, if this is in accordance with your
                  marketing preferences. You can opt out of our marketing emails
                  at any time.
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0">•</span>
                  <strong>To protect our Services.</strong> We may process your
                  information as part of our efforts to keep our Services safe
                  and secure, including fraud monitoring and prevention.
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0">•</span>
                  <strong>To identify usage trends.</strong> We may process
                  information about how you use our Services to better
                  understand how they are being used so we can improve them.
                </li>
                <li className="pl-6 relative">
                  <span className="absolute left-0">•</span>
                  <strong>
                    To save or protect an individual's vital interest.
                  </strong>{" "}
                  We may process your information when necessary to save or
                  protect an individual's vital interest, such as to prevent
                  harm.
                </li>
              </ul>
            </div>
          </section>

          <section id="section3" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL
              INFORMATION?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: We only process your personal information when we
                  believe it is necessary and we have a valid legal reason
                  (i.e., legal basis) to do so under applicable law, like with
                  your consent, to comply with laws, to provide you with
                  services to enter into or fulfill our contractual obligations,
                  to protect your rights, or to fulfill our legitimate business
                  interests.
                </em>
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  If you are located in the EU or UK, this section applies to
                  you.
                </h3>
                <p className="text-zinc-300 mb-4">
                  The General Data Protection Regulation (GDPR) and UK GDPR
                  require us to explain the valid legal bases we rely on in
                  order to process your personal information. As such, we may
                  rely on the following legal bases to process your personal
                  information:
                </p>

                <ul className="space-y-4 text-zinc-300">
                  <li className="pl-6 relative">
                    <span className="absolute left-0">•</span>
                    <strong>Consent.</strong> We may process your information if
                    you have given us permission (i.e., consent) to use your
                    personal information for a specific purpose. You can
                    withdraw your consent at any time.
                  </li>
                  <li className="pl-6 relative">
                    <span className="absolute left-0">•</span>
                    <strong>Performance of a Contract.</strong> We may process
                    your personal information when we believe it is necessary to
                    fulfill our contractual obligations to you, including
                    providing our Services or at your request prior to entering
                    into a contract with you.
                  </li>
                  <li className="pl-6 relative">
                    <span className="absolute left-0">•</span>
                    <strong>Legitimate Interests.</strong> We may process your
                    information when we believe it is reasonably necessary to
                    achieve our legitimate business interests and those
                    interests do not outweigh your interests and fundamental
                    rights and freedoms.
                  </li>
                  <li className="pl-6 relative">
                    <span className="absolute left-0">•</span>
                    <strong>Legal Obligations.</strong> We may process your
                    information where we believe it is necessary for compliance
                    with our legal obligations, such as to cooperate with a law
                    enforcement body or regulatory agency, exercise or defend
                    our legal rights, or disclose your information as evidence
                    in litigation in which we are involved.
                  </li>
                  <li className="pl-6 relative">
                    <span className="absolute left-0">•</span>
                    <strong>Vital Interests.</strong> We may process your
                    information where we believe it is necessary to protect your
                    vital interests or the vital interests of a third party,
                    such as situations involving potential threats to the safety
                    of any person.
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  If you are located in Canada, this section applies to you.
                </h3>
                <p className="text-zinc-300 mb-4">
                  We may process your information if you have given us specific
                  permission (i.e., express consent) to use your personal
                  information for a specific purpose, or in situations where
                  your permission can be inferred (i.e., implied consent). You
                  can withdraw your consent at any time.
                </p>
              </div>
            </div>
          </section>
          <section id="section4" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: We may share information in specific situations and
                  with specific categories of third parties.
                </em>
              </p>

              <p className="text-zinc-300 mb-6">
                We have contracts in place with our third parties, which are
                designed to help safeguard your personal information. This means
                that they cannot do anything with your personal information
                unless we have instructed them to do it. They will also not
                share your personal information with any organization apart from
                us. They also commit to protect the data they hold on our behalf
                and to retain it for the period we instruct.
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  Categories of Third Parties
                </h3>
                <p className="text-zinc-300 mb-4">
                  The categories of third parties we may share personal
                  information with are as follows:
                </p>
                <ul className="list-disc pl-8 text-zinc-300 space-y-2">
                  <li>Cloud Computing Services</li>
                  <li>Data Storage Service Providers</li>
                  <li>Payment Processors</li>
                  <li>User Account Registration & Authentication Services</li>
                  <li>Data Analytics Services</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  Specific Sharing Situations
                </h3>
                <p className="text-zinc-300 mb-4">
                  We also may need to share your personal information in the
                  following situations:
                </p>
                <ul className="space-y-4 text-zinc-300">
                  <li className="pl-6 relative">
                    <span className="absolute left-0">•</span>
                    <strong>Business Transfers.</strong> We may share or
                    transfer your information in connection with, or during
                    negotiations of, any merger, sale of company assets,
                    financing, or acquisition of all or a portion of our
                    business to another company.
                  </li>
                  <li className="pl-6 relative">
                    <span className="absolute left-0">•</span>
                    <strong>Affiliates.</strong> We may share your information
                    with our affiliates, in which case we will require those
                    affiliates to honor this Privacy Policy. Affiliates include
                    our parent company and any subsidiaries, joint venture
                    partners, or other companies that we control or that are
                    under common control with us.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section id="section5" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: We may use cookies and other tracking technologies
                  to collect and store your information.
                </em>
              </p>

              <p className="text-zinc-300 mb-6">
                We may use cookies and similar tracking technologies (like web
                beacons and pixels) to gather information when you interact with
                our Services. Some online tracking technologies help us maintain
                the security of our Services and your account, prevent crashes,
                fix bugs, save your preferences, and assist with basic site
                functions.
              </p>

              <p className="text-zinc-300 mb-6">
                We also permit third parties and service providers to use online
                tracking technologies on our Services for analytics and
                advertising, including to help manage and display
                advertisements, to tailor advertisements to your interests, or
                to send abandoned shopping cart reminders (depending on your
                communication preferences).
              </p>

              <div className="mb-8">
                <p className="text-zinc-300 mb-4">
                  We collect and share your personal information through:
                </p>
                <ul className="list-disc pl-8 text-zinc-300 space-y-2">
                  <li>Targeting cookies/Marketing cookies</li>
                  <li>Beacons/Pixels/Tags</li>
                </ul>
              </div>

              <div className="bg-zinc-800 p-6 rounded-lg mb-8">
                <p className="text-zinc-300">
                  If these online tracking technologies are deemed to be a
                  "sale"/"sharing" under applicable US state laws, you can opt
                  out as described in the section "DO UNITED STATES RESIDENTS
                  HAVE SPECIFIC PRIVACY RIGHTS?"
                </p>
              </div>

              <p className="text-zinc-300">
                Specific information about how we use such technologies and how
                you can refuse certain cookies is set out in our Cookie Policy:{" "}
                <a
                  href="https://textfully.dev/cookies"
                  className="text-[#0A93F6] hover:brightness-110"
                >
                  https://textfully.dev/cookies
                </a>
                .
              </p>
            </div>
          </section>

          <section id="section6" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              6. DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: We offer products, features, or tools powered by
                  artificial intelligence, machine learning, or similar
                  technologies.
                </em>
              </p>

              <p className="text-zinc-300 mb-6">
                As part of our Services, we offer products, features, or tools
                powered by artificial intelligence, machine learning, or similar
                technologies (collectively, "AI Products"). These tools are
                designed to enhance your experience and provide you with
                innovative solutions. The terms in this Privacy Policy govern
                your use of the AI Products within our Services.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Use of AI Technologies
                  </h3>
                  <p className="text-zinc-300">
                    We provide the AI Products through third-party service
                    providers ("AI Service Providers"), including OpenAI and
                    Anthropic. As outlined in this Privacy Policy, your input,
                    output, and personal information will be shared with and
                    processed by these AI Service Providers to enable your use
                    of our AI Products for purposes outlined in "WHAT LEGAL
                    BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?"
                    You must not use the AI Products in any way that violates
                    the terms or policies of any AI Service Provider.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Our AI Products
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    Our AI Products are designed for the following functions:
                  </p>
                  <ul className="list-disc pl-8 text-zinc-300 space-y-2">
                    <li>AI applications</li>
                    <li>AI bots</li>
                    <li>Image analysis</li>
                    <li>Natural language processing</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    How We Process Your Data Using AI
                  </h3>
                  <p className="text-zinc-300">
                    All personal information processed using our AI Products is
                    handled in line with our Privacy Policy and our agreement
                    with third parties. This ensures high security and
                    safeguards your personal information throughout the process,
                    giving you peace of mind about your data's safety.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">How to Opt Out</h3>
                  <p className="text-zinc-300 mb-4">
                    We believe in giving you the power to decide how your data
                    is used. To opt out, you can:
                  </p>
                  <ul className="list-disc pl-8 text-zinc-300">
                    <li>Contact us using the contact information provided</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section id="section7" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              7. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: If you choose to register or log in to our Services
                  using a social media account, we may have access to certain
                  information about you.
                </em>
              </p>

              <p className="text-zinc-300 mb-6">
                Our Services offer you the ability to register and log in using
                your third-party social media account details (like your
                Facebook or X logins). Where you choose to do this, we will
                receive certain profile information about you from your social
                media provider. The profile information we receive may vary
                depending on the social media provider concerned, but will often
                include your name, email address, friends list, and profile
                picture, as well as other information you choose to make public
                on such a social media platform.
              </p>

              <p className="text-zinc-300">
                We will use the information we receive only for the purposes
                that are described in this Privacy Policy or that are otherwise
                made clear to you on the relevant Services. Please note that we
                do not control, and are not responsible for, other uses of your
                personal information by your third-party social media provider.
                We recommend that you review their privacy policy to understand
                how they collect, use, and share your personal information, and
                how you can set your privacy preferences on their sites and
                apps.
              </p>
            </div>
          </section>

          <section id="section8" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              8. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: We may transfer, store, and process your information
                  in countries other than your own.
                </em>
              </p>

              <p className="text-zinc-300 mb-6">
                Our servers are located in the United States. If you are
                accessing our Services from outside the United States, please be
                aware that your information may be transferred to, stored by,
                and processed by us in our facilities and in the facilities of
                the third parties with whom we may share your personal
                information (see "WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL
                INFORMATION?" above), in the United States and other countries.
              </p>

              <p className="text-zinc-300 mb-6">
                If you are a resident in the European Economic Area (EEA),
                United Kingdom (UK), or Switzerland, then these countries may
                not necessarily have data protection laws or other similar laws
                as comprehensive as those in your country. However, we will take
                all necessary measures to protect your personal information in
                accordance with this Privacy Policy and applicable law.
              </p>

              <div className="bg-zinc-800 p-6 rounded-lg mb-8">
                <h3 className="text-xl font-semibold mb-4">
                  European Commission's Standard Contractual Clauses
                </h3>
                <p className="text-zinc-300">
                  We have implemented measures to protect your personal
                  information, including by using the European Commission's
                  Standard Contractual Clauses for transfers of personal
                  information between our group companies and between us and our
                  third-party providers. These clauses require all recipients to
                  protect all personal information that they process originating
                  from the EEA or UK in accordance with European data protection
                  laws and regulations. Our Standard Contractual Clauses can be
                  provided upon request. We have implemented similar appropriate
                  safeguards with our third-party service providers and partners
                  and further details can be provided upon request.
                </p>
              </div>
            </div>
          </section>

          <section id="section9" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              9. HOW LONG DO WE KEEP YOUR INFORMATION?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: We keep your information for as long as necessary to
                  fulfill the purposes outlined in this Privacy Policy unless
                  otherwise required by law.
                </em>
              </p>

              <p className="text-zinc-300 mb-6">
                We will only keep your personal information for as long as it is
                necessary for the purposes set out in this Privacy Policy,
                unless a longer retention period is required or permitted by law
                (such as tax, accounting, or other legal requirements). No
                purpose in this privacy policy will require us keeping your
                personal information for longer than twelve (12) months past the
                termination of the user's account.
              </p>

              <div className="bg-zinc-800 p-6 rounded-lg">
                <p className="text-zinc-300">
                  When we have no ongoing legitimate business need to process
                  your personal information, we will either delete or anonymize
                  such information, or, if this is not possible (for example,
                  because your personal information has been stored in backup
                  archives), then we will securely store your personal
                  information and isolate it from any further processing until
                  deletion is possible.
                </p>
              </div>
            </div>
          </section>
          <section id="section10" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              10. HOW DO WE KEEP YOUR INFORMATION SAFE?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: We aim to protect your personal information through
                  a system of organizational and technical security measures.
                </em>
              </p>

              <div className="bg-zinc-800 p-6 rounded-lg">
                <p className="text-zinc-300">
                  We have implemented appropriate and reasonable technical and
                  organizational security measures designed to protect the
                  security of any personal information we process. However,
                  despite our safeguards and efforts to secure your information,
                  no electronic transmission over the Internet or information
                  storage technology can be guaranteed to be 100% secure, so we
                  cannot promise or guarantee that hackers, cybercriminals, or
                  unauthorized third parties will not be able to defeat our
                  security and improperly collect, access, steal, or modify your
                  information.
                </p>
              </div>
            </div>
          </section>

          <section id="section11" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              11. WHAT ARE YOUR PRIVACY RIGHTS?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: Depending on your state of residence in the US or in
                  some regions, such as the European Economic Area (EEA), United
                  Kingdom (UK), Switzerland, and Canada, you have rights that
                  allow you greater access to and control over your personal
                  information. You may review, change, or terminate your account
                  at any time, depending on your country, province, or state of
                  residence.
                </em>
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Your Rights in the EEA, UK, Switzerland, and Canada
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    In some regions, you have certain rights under applicable
                    data protection laws. These may include the right:
                  </p>
                  <ul className="list-disc pl-8 text-zinc-300 space-y-2">
                    <li>
                      To request access and obtain a copy of your personal
                      information
                    </li>
                    <li>To request rectification or erasure</li>
                    <li>
                      To restrict the processing of your personal information
                    </li>
                    <li>To data portability (if applicable)</li>
                    <li>Not to be subject to automated decision-making</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Withdrawing Your Consent
                  </h3>
                  <p className="text-zinc-300">
                    If we are relying on your consent to process your personal
                    information, which may be express and/or implied consent
                    depending on the applicable law, you have the right to
                    withdraw your consent at any time. You can withdraw your
                    consent at any time by contacting us using the contact
                    details provided in the section "HOW CAN YOU CONTACT US
                    ABOUT THIS PRIVACY POLICY?" below.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Opting Out of Marketing
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    You can unsubscribe from our marketing and promotional
                    communications at any time by:
                  </p>
                  <ul className="list-disc pl-8 text-zinc-300 space-y-2">
                    <li>
                      Clicking on the unsubscribe link in the emails that we
                      send
                    </li>
                    <li>Contacting us using the contact details provided</li>
                  </ul>
                  <p className="text-zinc-300 mt-4">
                    You will then be removed from the marketing lists. However,
                    we may still communicate with you — for example, to send you
                    service-related messages that are necessary for the
                    administration and use of your account, to respond to
                    service requests, or for other non-marketing purposes.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Account Information
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    If you would at any time like to review or change the
                    information in your account or terminate your account, you
                    can contact us using the contact information provided.
                  </p>
                  <p className="text-zinc-300">
                    Upon your request to terminate your account, we will
                    deactivate or delete your account and information from our
                    active databases. However, we may retain some information in
                    our files to prevent fraud, troubleshoot problems, assist
                    with any investigations, enforce our legal terms and/or
                    comply with applicable legal requirements.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="section12" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              12. CONTROLS FOR DO-NOT-TRACK FEATURES
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-6">
                Most web browsers and some mobile operating systems and mobile
                applications include a Do-Not-Track ("DNT") feature or setting
                you can activate to signal your privacy preference not to have
                data about your online browsing activities monitored and
                collected. At this stage, no uniform technology standard for
                recognizing and implementing DNT signals has been finalized.
              </p>

              <div className="bg-zinc-800 p-6 rounded-lg">
                <p className="text-zinc-300">
                  California law requires us to let you know how we respond to
                  web browser DNT signals. Because there currently is not an
                  industry or legal standard for recognizing or honoring DNT
                  signals, we do not respond to them at this time.
                </p>
              </div>
            </div>
          </section>
          <section id="section13" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              13. DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: If you are a resident of California, Colorado,
                  Connecticut, Delaware, Florida, Indiana, Iowa, Kentucky,
                  Minnesota, Montana, Nebraska, New Hampshire, New Jersey,
                  Oregon, Tennessee, Texas, Utah, or Virginia, you may have the
                  right to request access to and receive details about the
                  personal information we maintain about you and how we have
                  processed it, correct inaccuracies, get a copy of, or delete
                  your personal information. You may also have the right to
                  withdraw your consent to our processing of your personal
                  information. These rights may be limited in some circumstances
                  by applicable law.
                </em>
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Your Rights Under US State Laws
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    You have rights under certain US state data protection laws.
                    However, these rights are not absolute, and in certain
                    cases, we may decline your request as permitted by law.
                    These rights include:
                  </p>
                  <ul className="list-disc pl-8 text-zinc-300 space-y-2">
                    <li>
                      Right to know whether or not we are processing your
                      personal data
                    </li>
                    <li>Right to access your personal data</li>
                    <li>Right to correct inaccuracies in your personal data</li>
                    <li>Right to request the deletion of your personal data</li>
                    <li>
                      Right to obtain a copy of the personal data you previously
                      shared with us
                    </li>
                    <li>
                      Right to non-discrimination for exercising your rights
                    </li>
                    <li>
                      Right to opt out of the processing of your personal data
                      if it is used for targeted advertising, the sale of
                      personal data, or profiling in furtherance of decisions
                      that produce legal or similarly significant effects
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    State-Specific Rights
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    Depending upon the state where you live, you may also have
                    the following rights:
                  </p>
                  <ul className="list-disc pl-8 text-zinc-300 space-y-2">
                    <li>
                      Right to access the categories of personal data being
                      processed (as permitted by applicable law, including
                      Minnesota's privacy law)
                    </li>
                    <li>
                      Right to obtain a list of the categories of third parties
                      to which we have disclosed personal data (as permitted by
                      applicable law, including California's and Delaware's
                      privacy law)
                    </li>
                    <li>
                      Right to obtain a list of specific third parties to which
                      we have disclosed personal data (as permitted by
                      applicable law, including Minnesota's and Oregon's privacy
                      law)
                    </li>
                    <li>
                      Right to review, understand, question, and correct how
                      personal data has been profiled (as permitted by
                      applicable law, including Minnesota's privacy law)
                    </li>
                    <li>
                      Right to limit use and disclosure of sensitive personal
                      data (as permitted by applicable law, including
                      California's privacy law)
                    </li>
                    <li>
                      Right to opt out of the collection of sensitive data and
                      personal data collected through the operation of a voice
                      or facial recognition feature (as permitted by applicable
                      law, including Florida's privacy law)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    How to Exercise Your Rights
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    To exercise these rights, you can:
                  </p>
                  <ul className="list-disc pl-8 text-zinc-300 space-y-2">
                    <li>
                      Visit{" "}
                      <a
                        href="https://gtfol.inc/contact"
                        className="text-[#0A93F6] hover:brightness-110"
                      >
                        https://gtfol.inc/contact
                      </a>
                    </li>
                    <li>
                      Email us at{" "}
                      <a
                        href="mailto:textfully@gtfol.inc"
                        className="text-[#0A93F6] hover:brightness-110"
                      >
                        textfully@gtfol.inc
                      </a>
                    </li>
                    <li>
                      Refer to the contact details at the bottom of this
                      document
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Request Verification
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    Upon receiving your request, we will need to verify your
                    identity to determine you are the same person about whom we
                    have the information in our system. We will only use
                    personal information provided in your request to verify your
                    identity or authority to make the request.
                  </p>
                  <p className="text-zinc-300">
                    If you submit the request through an authorized agent, we
                    may need to collect additional information to verify your
                    identity before processing your request and the agent will
                    need to provide a written and signed permission from you to
                    submit such request on your behalf.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Appeals</h3>
                  <div className="bg-zinc-800 p-6 rounded-lg">
                    <p className="text-zinc-300">
                      Under certain US state data protection laws, if we decline
                      to take action regarding your request, you may appeal our
                      decision by emailing us at{" "}
                      <a
                        href="mailto:textfully@gtfol.inc"
                        className="text-[#0A93F6] hover:brightness-110"
                      >
                        textfully@gtfol.inc
                      </a>
                      . We will inform you in writing of any action taken or not
                      taken in response to the appeal, including a written
                      explanation of the reasons for the decisions. If your
                      appeal is denied, you may submit a complaint to your state
                      attorney general.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    California "Shine The Light" Law
                  </h3>
                  <p className="text-zinc-300">
                    California Civil Code Section 1798.83, also known as the
                    "Shine The Light" law, permits our users who are California
                    residents to request and obtain from us, once a year and
                    free of charge, information about categories of personal
                    information (if any) we disclosed to third parties for
                    direct marketing purposes and the names and addresses of all
                    third parties with which we shared personal information in
                    the immediately preceding calendar year. If you are a
                    California resident and would like to make such a request,
                    please submit your request in writing to us using the
                    contact details provided in the section "HOW CAN YOU CONTACT
                    US ABOUT THIS PRIVACY POLICY?"
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="section14" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              14. DO OTHER REGIONS HAVE SPECIFIC PRIVACY RIGHTS?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: You may have additional rights based on the country
                  you reside in.
                </em>
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Australia and New Zealand
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    We collect and process your personal information under the
                    obligations and conditions set by Australia's Privacy Act
                    1988 and New Zealand's Privacy Act 2020 (Privacy Act).
                  </p>
                  <p className="text-zinc-300 mb-4">
                    This Privacy Policy satisfies the notice requirements
                    defined in both Privacy Acts, in particular: what personal
                    information we collect from you, from which sources, for
                    which purposes, and other recipients of your personal
                    information.
                  </p>
                  <div className="bg-zinc-800 p-6 rounded-lg">
                    <p className="text-zinc-300">
                      If you believe we are unlawfully processing your personal
                      information, you have the right to submit a complaint
                      about a breach of the Australian Privacy Principles to the
                      Office of the Australian Information Commissioner and a
                      breach of New Zealand's Privacy Principles to the Office
                      of New Zealand Privacy Commissioner.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Republic of South Africa
                  </h3>
                  <p className="text-zinc-300 mb-4">
                    At any time, you have the right to request access to or
                    correction of your personal information. You can make such a
                    request by contacting us using the contact details provided
                    in the section "HOW CAN YOU REVIEW, UPDATE, OR DELETE THE
                    DATA WE COLLECT FROM YOU?"
                  </p>
                  <div className="bg-zinc-800 p-6 rounded-lg">
                    <p className="text-zinc-300">
                      If you are unsatisfied with the manner in which we address
                      any complaint with regard to our processing of personal
                      information, you can contact the office of the regulator:
                    </p>
                    <p className="text-zinc-300 mt-4">
                      The Information Regulator (South Africa)
                      <br />
                      General enquiries: enquiries@inforegulator.org.za
                      <br />
                      Complaints: PAIAComplaints@inforegulator.org.za &
                      POPIAComplaints@inforegulator.org.za
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section id="section15" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              15. DO WE MAKE UPDATES TO THIS PRIVACY POLICY?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-4">
                <em>
                  In Short: Yes, we will update this privacy policy as necessary
                  to stay compliant with relevant laws.
                </em>
              </p>

              <div className="bg-zinc-800 p-6 rounded-lg">
                <p className="text-zinc-300">
                  We may update this Privacy Policy from time to time. The
                  updated version will be indicated by an updated "Revised" date
                  at the top of this Privacy Policy. If we make material changes
                  to this Privacy Policy, we may notify you either by
                  prominently posting a notice of such changes or by directly
                  sending you a notification. We encourage you to review this
                  Privacy Policy frequently to be informed of how we are
                  protecting your information.
                </p>
              </div>
            </div>
          </section>

          <section id="section16" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              16. HOW CAN YOU CONTACT US ABOUT THIS PRIVACY POLICY?
            </h2>

            <div className="mb-8">
              <p className="text-zinc-300 mb-6">
                If you have questions or comments about this privacy policy, you
                may contact us at:
              </p>

              <address className="text-zinc-300 not-italic">
                <p className="mb-1">gtfol, LLC</p>
                <p className="mb-1">1950 Washington St. Apt. 3A</p>
                <p className="mb-1">Boston, MA 02118</p>
                <p className="mb-1">United States</p>
                <p>
                  <a
                    href="mailto:textfully@gtfol.inc"
                    className="text-[#0A93F6] hover:brightness-110"
                  >
                    textfully@gtfol.inc
                  </a>
                </p>
              </address>
            </div>
          </section>

          <section id="section17" className="mb-16">
            <h2 className="text-2xl font-bold mb-6">
              17. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
              YOU?
            </h2>

            <div className="mb-8">
              <div className="bg-zinc-800 p-6 rounded-lg">
                <p className="text-zinc-300 mb-4">
                  Based on the applicable laws of your country or state of
                  residence in the US, you may have the right to request access
                  to the personal information we collect from you, details about
                  how we have processed it, correct inaccuracies, or delete your
                  personal information.
                </p>

                <p className="text-zinc-300">
                  To request to review, update, or delete your personal
                  information, please visit:{" "}
                  <a
                    href="https://gtfol.inc/contact"
                    className="text-[#0A93F6] hover:brightness-110"
                  >
                    https://gtfol.inc/contact
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <BackToTop />
      <Footer />
    </>
  );
}
