$payButtonHTML = @"
                    <button onclick="openGlobalPaymentModal()" class="btn btn-primary" style="margin-top: 20px; background: #22c55e; border: none; padding: 10px 25px; border-radius: 50px; cursor: pointer; font-weight: 600; display: inline-flex; align-items: center; gap: 8px;">
                        <i class="fa-solid fa-credit-card"></i> Pay Now
                    </button>
"@

$paymentScript = '<script src="js/payment.js"></script>'

$files = Get-ChildItem -Path . -Filter *.html

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    $original = $content

    # 1. Ensure the payment script is included
    if ($content -notlike "*js/payment.js*") {
        $content = $content -replace '</body>', "$paymentScript`n</body>"
    }

    # 2. Inject the button into the brand-col footer column
    if ($content -notlike "*openGlobalPaymentModal()*") {
        # We find the end of the first footer column (brand-col) and insert before its closing tag or before the next column starts
        if ($content -match 'brand-col') {
             # Regex to find the first brand-col and the start of the next footer-col
             $content = $content -replace '(?s)(<div class="footer-col brand-col">.*?)(\s*</div>\s*<div class="footer-col">)', "`$1`n$payButtonHTML`n                `$2"
        }
    }

    if ($original -ne $content) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Injected Pay Now button into $($file.Name)"
    }
}
