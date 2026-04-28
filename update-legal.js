const fs = require('fs');
const path = require('path');

const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

const pages = {
    'privacy-policy.html': {
        title: 'Privacy Policy',
        content: `
            <h1>Privacy Policy</h1>
            <h2>📌 Introduction</h2>
            <p>Revanta Growth Media respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or use our services.</p>
            <p>By accessing our website, you agree to the terms of this Privacy Policy.</p>
            <h2>📊 Information We Collect</h2>
            <p>We may collect the following information:</p>
            <ul>
                <li>Full Name</li>
                <li>Mobile Number</li>
                <li>Email Address</li>
                <li>Business Details (if provided)</li>
                <li>Website usage data (cookies, IP address, browser type)</li>
            </ul>
            <h2>🎯 How We Use Your Information</h2>
            <p>We use your information for:</p>
            <ul>
                <li>Running digital marketing and advertising campaigns</li>
                <li>Contacting you regarding our services</li>
                <li>Sending promotional offers and updates</li>
                <li>Improving our website and services</li>
                <li>Customer support and communication</li>
            </ul>
            <h2>📢 Advertising & Marketing Use</h2>
            <p>By submitting your details on our website, you agree that:</p>
            <ul>
                <li>Your name, mobile number, and email may be used for advertising and marketing purposes</li>
                <li>You may receive promotional messages via WhatsApp, SMS, Email, or Calls</li>
            </ul>
            <p>You can opt-out anytime by contacting us.</p>
            <h2>🔒 Data Security</h2>
            <p>We implement appropriate security measures to protect your personal data from unauthorized access, misuse, or disclosure.</p>
            <h2>🍪 Cookies Policy</h2>
            <p>Our website uses cookies to:</p>
            <ul>
                <li>Enhance user experience</li>
                <li>Analyze traffic and behavior</li>
                <li>Improve website performance</li>
            </ul>
            <h2>🔗 Third-Party Sharing</h2>
            <p>We do not sell your personal information. However, we may share your data with:</p>
            <ul>
                <li>Advertising platforms (Google, Meta)</li>
                <li>CRM tools</li>
                <li>Payment gateways</li>
            </ul>
            <p>Only for business and service purposes.</p>
            <h2>⚖️ Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
                <li>Request access to your data</li>
                <li>Request correction or deletion</li>
                <li>Opt-out of marketing communications</li>
            </ul>
            <h2>📧 Contact Us</h2>
            <p>For privacy-related concerns, contact:<br>📧 info@revantagrowthmedia.com</p>
        `
    },
    'refund-policy.html': {
        title: 'Refund Policy',
        content: `
            <h1>💰 Refund Policy</h1>
            <h2>📌 Overview</h2>
            <p>At Revanta Growth Media, we strive to deliver high-quality services. However, we understand that situations may arise where you need to cancel your order.</p>
            <h2>🔁 Refund Eligibility</h2>
            <ul>
                <li>Customers can request a refund within 7 days of payment</li>
                <li>Refund requests must be submitted via email</li>
                <li>Valid reason for cancellation must be provided</li>
            </ul>
            <h2>⏳ Refund Timeline</h2>
            <ul>
                <li>If cancellation is made within 7 days → Eligible for refund</li>
                <li>After 7 days → ❌ No refund will be provided</li>
            </ul>
            <h2>🚫 Non-Refundable Cases</h2>
            <ul>
                <li>Work already completed or delivered</li>
                <li>Ongoing campaigns or services already started</li>
                <li>Delay caused by client (content, approvals, etc.)</li>
            </ul>
            <h2>💳 Refund Process</h2>
            <ul>
                <li>Approved refunds will be processed within 5–10 business days</li>
                <li>Refund will be credited via original payment method</li>
            </ul>
            <h2>📧 Contact for Refund</h2>
            <p>Email: info@revantagrowthmedia.com</p>
        `
    },
    'terms-conditions.html': {
        title: 'Terms & Conditions',
        content: `
            <h1>📜 Terms & Conditions</h1>
            <h2>📌 Introduction</h2>
            <p>By accessing and using the website of Revanta Growth Media, you agree to comply with the following terms and conditions.</p>
            <h2>🛠 Services</h2>
            <p>We provide services including:</p>
            <ul>
                <li>Website Development</li>
                <li>Digital Marketing (Google Ads, Meta Ads)</li>
                <li>SEO Services</li>
                <li>Social Media Management</li>
                <li>WhatsApp Marketing & CRM Integration</li>
            </ul>
            <h2>📋 User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
                <li>Provide accurate information</li>
                <li>Not misuse our services</li>
                <li>Not engage in illegal activities</li>
            </ul>
            <h2>💼 Payments</h2>
            <ul>
                <li>All services require advance payment unless agreed otherwise</li>
                <li>Pricing may vary depending on project requirements</li>
            </ul>
            <h2>⚠️ Service Limitations</h2>
            <ul>
                <li>We do not guarantee specific results (e.g., rankings, sales)</li>
                <li>Results may vary depending on market conditions and competition</li>
            </ul>
            <h2>🚫 Cancellation</h2>
            <ul>
                <li>Orders can be canceled within 7 days (as per refund policy)</li>
                <li>After 7 days, cancellation will not be eligible for refund</li>
            </ul>
            <h2>🔒 Intellectual Property</h2>
            <ul>
                <li>All content, designs, and materials created remain property of Revanta Growth Media until full payment is made</li>
                <li>Unauthorized use is prohibited</li>
            </ul>
            <h2>⚖️ Limitation of Liability</h2>
            <p>We are not liable for:</p>
            <ul>
                <li>Business losses</li>
                <li>Data loss due to third-party platforms</li>
                <li>Technical issues beyond our control</li>
            </ul>
            <h2>📝 Changes to Terms</h2>
            <p>We reserve the right to update these terms at any time.</p>
            <h2>📧 Contact</h2>
            <p>Email: info@revantagrowthmedia.com</p>
        `
    },
    'shipping-policy.html': {
        title: 'Shipping & Delivery Policy',
        content: `
            <h1>🚚 Shipping & Delivery Policy</h1>
            <p>(Applicable for digital services & products)</p>
            <h2>📌 Overview</h2>
            <p>Revanta Growth Media provides digital services, so there is no physical shipping involved.</p>
            <h2>💻 Service Delivery</h2>
            <ul>
                <li>Website development: 3–10 working days (depending on project)</li>
                <li>Digital marketing setup: 2–5 working days</li>
                <li>SEO services: Ongoing monthly basis</li>
                <li>CRM & WhatsApp integration: 2–7 days</li>
            </ul>
            <h2>⏱ Delivery Timeline</h2>
            <p>Delivery timelines may vary depending on:</p>
            <ul>
                <li>Project complexity</li>
                <li>Client requirements</li>
                <li>Content availability</li>
                <li>Approval delays</li>
            </ul>
            <h2>📦 Digital Delivery</h2>
            <p>All services and deliverables will be shared via:</p>
            <ul>
                <li>Email</li>
                <li>Google Drive</li>
                <li>Hosting server / dashboard access</li>
            </ul>
            <h2>⚠️ Delays</h2>
            <p>We are not responsible for delays caused by:</p>
            <ul>
                <li>Client delays in providing content</li>
                <li>Third-party tools/platforms</li>
                <li>Technical issues</li>
            </ul>
            <h2>📧 Contact</h2>
            <p>For delivery-related queries:<br>📧 info@revantagrowthmedia.com</p>
        `
    },
    'cookie-policy.html': {
        title: 'Cookie Policy',
        content: `
            <h1>COOKIE POLICY (Google Ads & Meta Ads Approval Ready)</h1>
            <h2>📌 Introduction</h2>
            <p>This Cookie Policy explains how Revanta Growth Media uses cookies and similar technologies to recognize visitors when they visit our website.</p>
            <p>By using our website, you agree to the use of cookies as described in this policy.</p>
            <h2>🍪 What Are Cookies?</h2>
            <p>Cookies are small data files stored on your device when you visit a website. They help improve your browsing experience and allow us to analyze website performance.</p>
            <h2>⚙️ Types of Cookies We Use</h2>
            <h3>1. Essential Cookies</h3>
            <ul>
                <li>Required for website functionality</li>
                <li>Enable navigation and access to secure areas</li>
            </ul>
            <h3>2. Performance Cookies</h3>
            <ul>
                <li>Help us understand how visitors interact with our website</li>
                <li>Track pages visited, time spent, and errors</li>
            </ul>
            <h3>3. Advertising Cookies</h3>
            <ul>
                <li>Used to show relevant ads</li>
                <li>Track user behavior for marketing campaigns</li>
                <li>Used by platforms like Google Ads and Meta Ads</li>
            </ul>
            <h3>4. Functional Cookies</h3>
            <ul>
                <li>Remember user preferences</li>
                <li>Improve user experience</li>
            </ul>
            <h2>📊 Third-Party Cookies</h2>
            <p>We may use third-party services such as:</p>
            <ul>
                <li>Google Analytics</li>
                <li>Google Ads</li>
                <li>Meta (Facebook & Instagram Ads)</li>
            </ul>
            <p>These platforms may use cookies to collect information about your interaction with our website.</p>
            <h2>🎯 How We Use Cookies</h2>
            <p>We use cookies to:</p>
            <ul>
                <li>Improve website performance</li>
                <li>Analyze traffic and behavior</li>
                <li>Run targeted advertising campaigns</li>
                <li>Optimize user experience</li>
            </ul>
            <h2>🔐 Your Consent</h2>
            <p>When you visit our website, you will see a cookie consent banner. By clicking “Accept”, you agree to our use of cookies.</p>
            <h2>⚙️ Managing Cookies</h2>
            <p>You can control or disable cookies through your browser settings. However, disabling cookies may affect website functionality.</p>
            <h2>📧 Contact</h2>
            <p>For any queries regarding this policy:<br>📧 info@revantagrowthmedia.com</p>
        `
    },
    'disclaimer.html': {
        title: 'Disclaimer',
        content: `
            <h1>⚠️ DISCLAIMER PAGE (LEGAL SAFETY)</h1>
            <h2>📌 General Disclaimer</h2>
            <p>The information provided by Revanta Growth Media on this website is for general informational and business purposes only.</p>
            <p>We make every effort to ensure accuracy but do not guarantee completeness, reliability, or accuracy of any information.</p>
            <h2>📊 Marketing Results Disclaimer</h2>
            <ul>
                <li>We do not guarantee specific results such as leads, sales, or rankings</li>
                <li>Results depend on multiple factors including industry, competition, and budget</li>
                <li>Past performance does not guarantee future results</li>
            </ul>
            <h2>💻 Service Disclaimer</h2>
            <ul>
                <li>Website and marketing services are delivered based on agreed scope</li>
                <li>Any additional work may require extra charges</li>
                <li>Timelines may vary depending on project complexity</li>
            </ul>
            <h2>📢 Advertisement Disclaimer</h2>
            <ul>
                <li>Ads performance may vary based on targeting, budget, and platform algorithms</li>
                <li>We are not responsible for policy changes by Google, Meta, or other platforms</li>
            </ul>
            <h2>🔗 External Links Disclaimer</h2>
            <p>Our website may contain links to third-party websites.<br>We are not responsible for their content, policies, or practices.</p>
            <h2>⚖️ Limitation of Liability</h2>
            <p>Revanta Growth Media shall not be held liable for:</p>
            <ul>
                <li>Any direct or indirect business losses</li>
                <li>Loss of data or revenue</li>
                <li>Technical or third-party issues</li>
            </ul>
            <h2>📧 Contact</h2>
            <p>For any concerns:<br>📧 info@revantagrowthmedia.com</p>
        `
    }
};

const newFooterLinks = \`                    <ul class="footer-links">
                        <li><a href="privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="terms-conditions.html">Terms & Conditions</a></li>
                        <li><a href="refund-policy.html">Refund Policy</a></li>
                        <li><a href="shipping-policy.html">Shipping Policy</a></li>
                        <li><a href="cookie-policy.html">Cookie Policy</a></li>
                        <li><a href="disclaimer.html">Disclaimer</a></li>
                    </ul>\`;

let baseHtml = '';
try {
    baseHtml = fs.readFileSync('index.html', 'utf8');
} catch (e) {
    console.error("Could not read index.html");
    process.exit(1);
}

// Extract head, header, footer from baseHtml
const headMatch = baseHtml.match(/<head>[\\s\\S]*?<\\/head>/);
const headerMatch = baseHtml.match(/<header class="header">[\\s\\S]*?<\\/header>/) || baseHtml.match(/<header class="header scrolled">[\\s\\S]*?<\\/header>/);
const footerMatch = baseHtml.match(/<footer class="footer">[\\s\\S]*?<\\/footer>/);
const scriptMatch = baseHtml.match(/<script src="js\\/script.js"><\\/script>/);

if (!headMatch || !headerMatch || !footerMatch) {
    console.error("Missing standard layout in index.html");
    process.exit(1);
}

let templateHead = headMatch[0];
let templateHeader = headerMatch[0].replace('class="header"', 'class="header scrolled"'); // force scrolled for inner pages
let templateFooter = footerMatch[0];

// Update the footer template to have the new legal policies
const footerPoliciesRegex = /<h4>Legal Policies<\\/h4>\\s*<ul class="footer-links">[\\s\\S]*?<\\/ul>/;
templateFooter = templateFooter.replace(footerPoliciesRegex, \`<h4>Legal Policies</h4>\\n\` + newFooterLinks);

// Now update the footer in all existing files
for (const file of htmlFiles) {
    if (Object.keys(pages).includes(file)) continue; // skip creating files for now, we'll overwrite them fully
    
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(footerPoliciesRegex, \`<h4>Legal Policies</h4>\\n\` + newFooterLinks);
    fs.writeFileSync(file, content);
    console.log(\`Updated footer in \${file}\`);
}

// Generate the 6 legal pages
const template = (title, content) => \`<!DOCTYPE html>
<html lang="en">
\${templateHead.replace(/<title>.*<\\/title>/, \`<title>\${title} | Revanta Growth Media</title>\`)}
<body>
    \${templateHeader}

    <section class="inner-hero" style="padding: 150px 0 60px; background: var(--primary-blue); color: white; text-align: center;">
        <div class="container">
            <h1>\${title}</h1>
        </div>
    </section>

    <section class="section">
        <div class="container" style="max-width: 800px; line-height: 1.8;">
            <div class="legal-content">
\${content}
            </div>
        </div>
    </section>

    \${templateFooter}
    \${scriptMatch ? scriptMatch[0] : '<script src="js/script.js"></script>'}
</body>
</html>\`;

for (const [filename, pageData] of Object.entries(pages)) {
    fs.writeFileSync(filename, template(pageData.title, pageData.content));
    console.log(\`Created \${filename}\`);
}

// Ensure the legal-content styling is in styles.css
let cssContent = fs.readFileSync('css/styles.css', 'utf8');
if (!cssContent.includes('.legal-content')) {
    cssContent += \`
/* --- Legal Pages --- */
.legal-content h1 { font-size: 2.2rem; color: var(--primary-blue); margin-bottom: 30px; border-bottom: 2px solid var(--bg-gray); padding-bottom: 10px; }
.legal-content h2 { font-size: 1.5rem; color: var(--text-dark); margin-top: 40px; margin-bottom: 15px; }
.legal-content h3 { font-size: 1.2rem; color: var(--primary-blue); margin-top: 25px; margin-bottom: 10px; }
.legal-content p { font-size: 1.05rem; margin-bottom: 15px; color: #555; }
.legal-content ul { margin-bottom: 20px; padding-left: 20px; }
.legal-content ul li { font-size: 1.05rem; margin-bottom: 8px; color: #555; }
\`;
    fs.writeFileSync('css/styles.css', cssContent);
    console.log("Added legal-content CSS");
}

console.log("Done!");
