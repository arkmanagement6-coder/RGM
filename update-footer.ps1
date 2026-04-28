$files = Get-ChildItem -Filter *.html

$oldFooter = @"
                    <ul class="footer-links">
                        <li><a href="privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="terms-conditions.html">Terms & Conditions</a></li>
                        <li><a href="refund-policy.html">Refund Policy</a></li>
                        <li><a href="shipping-policy.html">Shipping Policy</a></li>
                    </ul>
"@

$newFooter = @"
                    <ul class="footer-links">
                        <li><a href="privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="terms-conditions.html">Terms & Conditions</a></li>
                        <li><a href="refund-policy.html">Refund Policy</a></li>
                        <li><a href="shipping-policy.html">Shipping Policy</a></li>
                        <li><a href="cookie-policy.html">Cookie Policy</a></li>
                        <li><a href="disclaimer.html">Disclaimer</a></li>
                    </ul>
"@

foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    if ($content -match '<h4>Legal Policies</h4>\s*<ul class="footer-links">[\s\S]*?</ul>') {
        $content = $content -replace '<h4>Legal Policies</h4>\s*<ul class="footer-links">[\s\S]*?</ul>', "<h4>Legal Policies</h4>`r`n$newFooter"
        [System.IO.File]::WriteAllText($f.FullName, $content)
        Write-Host "Updated footer in $($f.Name)"
    }
}
