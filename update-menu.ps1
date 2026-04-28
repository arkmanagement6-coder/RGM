$servicesMenu = @'
<ul class="dropdown-menu">
                            <li><a href="services.html#web-dev">Website Design & Development</a></li>
                            <li><a href="services.html#ecommerce">E-commerce Store Design & Dev</a></li>
                            <li><a href="services.html#google-ads">Google Ads</a></li>
                            <li><a href="services.html#meta-ads">Meta Ads</a></li>
                            <li><a href="services.html#seo">SEO</a></li>
                            <li><a href="services.html#smm">Social Media Management</a></li>
                            <li><a href="services.html#whatsapp">WhatsApp Marketing</a></li>
                            <li><a href="services.html#crm">CRM Integration</a></li>
                        </ul>
'@

$aboutMenu = @'
<ul class="dropdown-menu">
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="team.html">Our Team</a></li>
                            <li><a href="portfolio.html">Portfolio</a></li>
                            <li><a href="blogs.html">Blogs</a></li>
                        </ul>
'@

$files = Get-ChildItem -Path . -Filter *.html | Where-Object { $_.Name -ne 'ecomwebsite.html' }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # Services Regex
    $content = [regex]::Replace($content, '(<a href="services\.html" class="nav-btn[^>]*>Services <i class="fa-solid fa-chevron-down"></i></a>\s*)<ul class="dropdown-menu">[\s\S]*?</ul>', "`$1$servicesMenu")

    # About Regex
    $content = [regex]::Replace($content, '(<a href="about\.html" class="nav-btn[^>]*>About <i class="fa-solid fa-chevron-down"></i></a>\s*)<ul class="dropdown-menu">[\s\S]*?</ul>', "`$1$aboutMenu")

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
    Write-Host "Updated menus in $($file.Name)"
}
