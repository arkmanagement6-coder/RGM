$ErrorActionPreference = 'Stop'

$files = Get-ChildItem -Filter *.html

$newFooterLinks = @"
                    <ul class="footer-links">
                        <li><a href="privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="terms-conditions.html">Terms & Conditions</a></li>
                        <li><a href="refund-policy.html">Refund Policy</a></li>
                        <li><a href="shipping-policy.html">Shipping Policy</a></li>
                        <li><a href="cookie-policy.html">Cookie Policy</a></li>
                        <li><a href="disclaimer.html">Disclaimer</a></li>
                    </ul>
"@

# Update existing files' footers
foreach ($f in $files) {
    # Skip the ones we are about to completely overwrite
    if ($f.Name -match "^(privacy-policy|refund-policy|terms-conditions|shipping-policy|cookie-policy|disclaimer)\.html$") { continue }
    
    $content = [System.IO.File]::ReadAllText($f.FullName)
    $pattern = '<h4>Legal Policies</h4>\s*<ul class="footer-links">[\s\S]*?</ul>'
    if ($content -match $pattern) {
        $content = $content -replace $pattern, "<h4>Legal Policies</h4>`r`n$newFooterLinks"
        [System.IO.File]::WriteAllText($f.FullName, $content)
        Write-Host "Updated footer in $($f.Name)"
    }
}

# Now extract template from about.html
$aboutHtml = [System.IO.File]::ReadAllText("about.html")

$head = [regex]::Match($aboutHtml, '(?is)<head>.*?</head>').Value
$header = [regex]::Match($aboutHtml, '(?is)<header class="header scrolled">.*?</header>').Value
$footer = [regex]::Match($aboutHtml, '(?is)<footer class="footer">.*?</footer>').Value
$footer = $footer -replace '<h4>Legal Policies</h4>\s*<ul class="footer-links">[\s\S]*?</ul>', "<h4>Legal Policies</h4>`r`n$newFooterLinks"
$scripts = '<script src="js/script.js"></script>'

function Generate-Page($fileName, $title, $bodyContent) {
    $titleTag = "<title>$title | Revanta Growth Media</title>"
    $newHead = $head -replace '(?is)<title>.*?</title>', $titleTag
    
    $html = @"
<!DOCTYPE html>
<html lang="en">
$newHead
<body>
$header

    <section class="inner-hero">
        <div class="container">
            <h1>$title</h1>
        </div>
    </section>

    <section class="section">
        <div class="container" style="max-width: 800px; margin: 0 auto;">
            <div class="legal-content">
$bodyContent
            </div>
        </div>
    </section>

$footer
$scripts
</body>
</html>
"@
    [System.IO.File]::WriteAllText($fileName, $html)
    Write-Host "Created $fileName"
}

$privacy = @"
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
"@

$refund = @"
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
                <li>If cancellation is made within 7 days &rarr; Eligible for refund</li>
                <li>After 7 days &rarr; &#10060; No refund will be provided</li>
            </ul>
            <h2>🚫 Non-Refundable Cases</h2>
            <ul>
                <li>Work already completed or delivered</li>
                <li>Ongoing campaigns or services already started</li>
                <li>Delay caused by client (content, approvals, etc.)</li>
            </ul>
            <h2>💳 Refund Process</h2>
            <ul>
                <li>Approved refunds will be processed within 5&ndash;10 business days</li>
                <li>Refund will be credited via original payment method</li>
            </ul>
            <h2>📧 Contact for Refund</h2>
            <p>Email: info@revantagrowthmedia.com</p>
"@

$terms = @"
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
"@

$shipping = @"
            <p>(Applicable for digital services & products)</p>
            <h2>📌 Overview</h2>
            <p>Revanta Growth Media provides digital services, so there is no physical shipping involved.</p>
            <h2>💻 Service Delivery</h2>
            <ul>
                <li>Website development: 3&ndash;10 working days (depending on project)</li>
                <li>Digital marketing setup: 2&ndash;5 working days</li>
                <li>SEO services: Ongoing monthly basis</li>
                <li>CRM & WhatsApp integration: 2&ndash;7 days</li>
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
"@

$cookie = @"
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
"@

$disclaimer = @"
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
"@

Generate-Page "privacy-policy.html" "Privacy Policy" $privacy
Generate-Page "refund-policy.html" "Refund Policy" $refund
Generate-Page "terms-conditions.html" "Terms & Conditions" $terms
Generate-Page "shipping-policy.html" "Shipping & Delivery Policy" $shipping
Generate-Page "cookie-policy.html" "Cookie Policy (Google Ads & Meta Ads Approval Ready)" $cookie
Generate-Page "disclaimer.html" "Disclaimer (Legal Safety)" $disclaimer

Write-Host "All legal pages created and footers updated successfully."
