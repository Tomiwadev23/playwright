const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');





// async function scrapeNews() {
//     const browser = await chromium.launch({ headless: false })
//     const page = await browser.newPage();

//     console.log('Navigating to goal News');
//     await page.goto('https://www.goal.com/en-ng', { waitUntil: 'domcontentloaded' });

//     await page.waitForTimeout(1500);

//     const headlines = await page.$$eval('a', links => {
//         return links
//             .map(link => {
//                 // Find heading text inside the link if available, otherwise fallback to anchor text
//                 const heading = link.querySelector('h1, h2, h3, h4');
//                 const titleText = heading ? heading.innerText : link.innerText;

//                 return {
//                     headline: titleText.trim().replace(/\s+/g, ' '),
//                     url: link.href,
//                 };
//             })
//             .filter(item =>
//                 item.headline.length > 20 &&
//                 !item.headline.toLowerCase().includes('sign in') &&
//                 !item.headline.toLowerCase().includes('privacy policy') &&
//                 (item.url.includes('goal.com') && !item.url.includes('#'))
//             );
//     });

//     const unique = Array.from(new Map(headlines.map(h => [h.url, h])).values());

//     await browser.close();
//     return unique;

// }

async function scrapeNews() {
    const browser = await chromium.launch({ headless: false })
    const page = await browser.newPage();

    console.log('Navigating to goal News');
    // await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.goto('https://www.jovellecollection.com.ng/',{waitUntil:'domcontentloaded'});
    await page.waitForSelector('text=₦', { timeout: 10000 });  // SEE exactly what Playwright sees

    const headlines = await page.$$eval('button', buttons => {
        return buttons
            .map(button => {
                const paragraphs = button.querySelectorAll('p');
                const img = button.querySelector('img');

                if (paragraphs.length < 2) return null



                return {
                    name: paragraphs[0].innerText.trim(),
                    price: paragraphs[1].innerText.trim(),
                    image: img?.src,
                    alt: img?.alt,

                };
            })
            .filter(item =>
                item !== null && item.price.includes('₦')

            );
    });


    await browser.close();
    return headlines;

}

function saveResults(headlines) {
    const outputPath = path.join(__dirname, 'news-archive.json');
    let archive = [];
    if (fs.existsSync(outputPath)) {
        archive = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    }

    archive.push({
        scrapedAt: new Date().toISOString(),
        count: headlines.length,
        headlines,
    });


    fs.writeFileSync(outputPath, JSON.stringify(archive, null, 2));
    console.log(`Saved ${headlines.length} headlines. Archive now has ${archive.length} runs.`);

}

(async () => {
    try {
        const headlines = await scrapeNews();
        saveResults(headlines);
    } catch (error) {
        console.error('Scraper failed:', error.message);
        process.exit(1); // non-zero exit code — important for Task Scheduler to detect failure
    }
})();