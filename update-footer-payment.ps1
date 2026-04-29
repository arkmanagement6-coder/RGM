$payButtonHTML = @"
                    <button onclick="openGlobalPaymentModal()" class="btn btn-primary" style="margin-top: 20px; background: #22c55e; border: none; padding: 10px 25px; border-radius: 50px; cursor: pointer; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-credit-card"></i> Pay Now
                    </button>
"@

$paymentScript = '<script src="js/payment.js"></script>'

$files = Get-ChildItem -Path . -Filter *.html

foreach ($file in $files) {
    # Read as UTF8
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $original = $content

    # Add script if not present
    if ($content -notlike "*js/payment.js*") {
        $content = $content -replace '</body>', "$paymentScript`n</body>"
    }

    # Add button to footer brand column if not present
    if ($content -notlike "*openGlobalPaymentModal()*") {
        # Targeted replacement for the footer brand column
        $targetStr = '</div>' + "`n" + '                </div>' + "`n" + '                <div class="footer-col">'
        $replacementStr = '</div>' + "`n" + $payButtonHTML + "`n" + '                </div>' + "`n" + '                <div class="footer-col">'
        
        if ($content.Contains('footer-social')) {
             # We use regex to find the end of the brand-col div
             $content = $content -replace '(?s)(<div class="footer-social">.*?</div>)\s*</div>\s*<div class="footer-col">', "`$1`n$payButtonHTML`n                </div>`n                <div class=`"footer-col`">"
        }
    }

    if ($original -ne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Added Pay Now button to $($file.Name)"
    }
}
