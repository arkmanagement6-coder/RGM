const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;

const newServicesMenu = `<ul class="dropdown-menu">
                            <li><a href="services.html#web-dev">Website Design & Development</a></li>
                            <li><a href="services.html#ecommerce">E-commerce Store Design & Dev</a></li>
                            <li><a href="services.html#google-ads">Google Ads</a></li>
                            <li><a href="services.html#meta-ads">Meta Ads</a></li>
                            <li><a href="services.html#seo">SEO</a></li>
                            <li><a href="services.html#smm">Social Media Management</a></li>
                            <li><a href="services.html#whatsapp">WhatsApp Marketing</a></li>
                            <li><a href="services.html#crm">CRM Integration</a></li>
                        </ul>`;

const newAboutMenu = `<ul class="dropdown-menu">
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="team.html">Our Team</a></li>
                            <li><a href="portfolio.html">Portfolio</a></li>
                            <li><a href="blogs.html">Blogs</a></li>
                        </ul>`;

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    files.forEach((file) => {
        if (path.extname(file) === '.html' && file !== 'ecomwebsite.html') {
            let filePath = path.join(directoryPath, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // Replace Services Menu
            let servicesRegex = /(<a href="services\.html" class="nav-btn[^>]*>Services <i class="fa-solid fa-chevron-down"><\/i><\/a>\s*)<ul class="dropdown-menu">[\s\S]*?<\/ul>/;
            content = content.replace(servicesRegex, '$1' + newServicesMenu);

            // Replace About Menu
            let aboutRegex = /(<a href="about\.html" class="nav-btn[^>]*>About <i class="fa-solid fa-chevron-down"><\/i><\/a>\s*)<ul class="dropdown-menu">[\s\S]*?<\/ul>/;
            content = content.replace(aboutRegex, '$1' + newAboutMenu);

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated menus in ${file}`);
        }
    });
});
