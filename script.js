// Ad data
const ads = [
    {
        id: 1, network: 'adsterra', height: '60', width: '468',
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
        id: 2, network: 'adsterra', height: '300', width: '160',
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
        id: 3, network: 'onclicka', height: '300', width: '100',
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
        id: 4, network: 'onclicka', height: '600', width: '160',
        type: 'div',
        divAttributes: {
            'banner-id': '6031709',
        },
        invokeScript: 'https://js.onclckmn.com/static/onclicka.js',
        scriptAttributes: {
            admpid: '230365',
        }
    },
    // Apply on clicking a test button
    // {
    //     id: 5, network: 'adsterra', height: '300', width: '160',
    //     type: 'script',
    //     script: ``,
    //     invokeScript: `https://pl24382746.cpmrevenuegate.com/5e/79/2b/5e792bda8bfaf71280ee63c1d4710017.js`
    // },
];

function loadAd(ad, container) {
    return new Promise((resolve) => {
        const adDiv = document.createElement('div');
        adDiv.className = `ad ${ad.network} ${ad.width}`;
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
    const network = document.getElementById('network-filter').value;

    const minWidth = parseInt(document.getElementById('min-width-slider').value);
    const maxWidth = parseInt(document.getElementById('max-width-slider').value);
    filteredAds = ads.filter(ad => {
        const adWidth = parseInt(ad.width);
        return adWidth >= minWidth && adWidth <= maxWidth && (network === 'all' || ad.network === network);
    });
    loadAds(filteredAds);
}

function updateSliderText() {
    const minWidth = document.getElementById('min-width-slider').value;
    const maxWidth = document.getElementById('max-width-slider').value;
    document.getElementById('slider-range').innerText = `${minWidth}px - ${maxWidth}px`;
}

document.getElementById('min-width-slider').addEventListener('input', () => {
    updateSliderText();
    filterAds();
});

document.getElementById('max-width-slider').addEventListener('input', () => {
    updateSliderText();
    filterAds();
});

document.getElementById('network-filter').addEventListener('change', filterAds);

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadAds();
});