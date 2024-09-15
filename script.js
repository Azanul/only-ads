// Ad data
const ads = [
    {
        id: 1, category: 'technology', size: '468x60', script: `
        atOptions = {
            'key' : '52b528f08afe5b89d519b9554c38ed16',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
        };
    `, invokeScript: `//www.topcreativeformat.com/52b528f08afe5b89d519b9554c38ed16/invoke.js`
    },
    {
        id: 2, category: 'fashion', size: '160x300', script: `
	atOptions = {
		'key' : '42d5b2c6aded72e35032258326f0035f',
		'format' : 'iframe',
		'height' : 300,
		'width' : 160,
		'params' : {}
	};
    `, invokeScript: `//www.topcreativeformat.com/42d5b2c6aded72e35032258326f0035f/invoke.js`
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

        const script = document.createElement('script');
        script.textContent = ad.script;
        adContentDiv.appendChild(script);

        const invokeScript = document.createElement('script');
        invokeScript.src = ad.invokeScript;
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