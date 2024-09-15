// Ad data
const ads = [
    {
        id: 1, category: 'technology', size: '468x60',
        type: 'script',
        script: `
        atOptions = {
            'key' : '52b528f08afe5b89d519b9554c38ed16',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
        };
    `,
        invokeScript: `//www.topcreativeformat.com/52b528f08afe5b89d519b9554c38ed16/invoke.js`
    },
    {
        id: 2, category: 'fashion', size: '160x300',
        type: 'script',
        script: `
	atOptions = {
		'key' : '42d5b2c6aded72e35032258326f0035f',
		'format' : 'iframe',
		'height' : 300,
		'width' : 160,
		'params' : {}
	};
    `,
        invokeScript: `https://www.topcreativeformat.com/42d5b2c6aded72e35032258326f0035f/invoke.js`
    },
    {
        id: 3, category: 'fashion', size: '300x100',
        type: 'div',
        divAttributes: {
            'banner-id': '6031694',
        },
        invokeScript: 'https://js.onclckmn.com/static/onclicka.js',
        scriptAttributes: {
            admpid: '230365',
        }
    },
    {
        id: 4, category: 'food', size: '160x600',
        type: 'div',
        divAttributes: {
            'banner-id': '6031709',
        },
        invokeScript: 'https://js.onclckmn.com/static/onclicka.js',
        scriptAttributes: {
            admpid: '230365',
        }
    },
];

function loadAd(ad, container) {
    return new Promise((resolve) => {
        const adDiv = document.createElement('div');
        adDiv.className = `ad ${ad.category} ${ad.size}`;
        adDiv.innerHTML = `<h3>Ad ${ad.id}</h3>`;

        const adContentDiv = document.createElement('div');
        adContentDiv.id = `ad-content-${ad.id}`;
        adDiv.appendChild(adContentDiv);

        container.appendChild(adDiv);

        if (ad.type === 'script') {
            const script = document.createElement('script');
            script.textContent = ad.script;
            adContentDiv.appendChild(script);
        } else if (ad.type === 'div') {
            const bannerDiv = document.createElement('div');

            // Add any custom data attributes to the banner div
            if (ad.divAttributes) {
                Object.entries(ad.divAttributes).forEach(([key, value]) => {
                    bannerDiv.setAttribute(`data-${key}`, value);
                });
            }

            adContentDiv.appendChild(bannerDiv);
        }

        const invokeScript = document.createElement('script');
        invokeScript.async = true;
        invokeScript.src = ad.invokeScript;

        // Add any custom data attributes to the invoke script
        if (ad.scriptAttributes) {
            Object.entries(ad.scriptAttributes).forEach(([key, value]) => {
                invokeScript.setAttribute(`data-${key}`, value);
            });
        }

        invokeScript.onload = () => resolve();
        adContentDiv.appendChild(invokeScript);
    });
}

async function loadAds(filteredAds = ads) {
    const container = document.getElementById('ad-container');
    container.innerHTML = '';
    for (const ad of filteredAds) {
        await loadAd(ad, container);
    }
}

function filterAds() {
    const category = document.getElementById('category-filter').value;
    const size = document.getElementById('size-filter').value;
    const filteredAds = ads.filter(ad =>
        (category === 'all' || ad.category === category) &&
        (size === 'all' || ad.size === size)
    );
    loadAds(filteredAds);
}

document.getElementById('category-filter').addEventListener('change', filterAds);
document.getElementById('size-filter').addEventListener('change', filterAds);

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadAds();
});