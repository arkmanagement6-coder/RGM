$fbOld = '<a href="#"><i class="fa-brands fa-facebook-f"></i></a>'
$fbNew = '<a href="https://www.facebook.com/profile.php?id=61567641386250" target="_blank"><i class="fa-brands fa-facebook-f"></i></a>'

$igOld = '<a href="#"><i class="fa-brands fa-instagram"></i></a>'
$igNew = '<a href="https://www.instagram.com/revantagrowthmedia/" target="_blank"><i class="fa-brands fa-instagram"></i></a>'

$inOld = '<a href="#"><i class="fa-brands fa-linkedin-in"></i></a>'
$inNew = '<a href="https://www.instagram.com/revantagrowthmedia/" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>'

$files = Get-ChildItem -Path . -Filter *.html

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    $originalContent = $content

    $content = $content -replace [regex]::Escape($fbOld), $fbNew
    $content = $content -replace [regex]::Escape($igOld), $igNew
    $content = $content -replace [regex]::Escape($inOld), $inNew

    if ($originalContent -ne $content) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($file.Name)"
    }
}
