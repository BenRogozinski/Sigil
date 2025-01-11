self.__uv$config = {
    prefix: '/app/login/',
    bare: "https://bare.benrogo.net",  // Set the bare URL after decoding
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/app/uv/uv.handler.js',
    bundle: '/app/uv/uv.bundle.js',
    config: '/app/uv/uv.config.js',
    sw: '/app/uv/uv.sw.js',
};
/*
async function loadConfig() {
    try {
        const db = await openDB();
        const bareUrl = await getServerFromDB(db);
        const bareDecoded = atob(bareUrl);  // Decode the URL

        // Now declare and initialize the config object with the fetched URL
        self.__uv$config = {
            prefix: '/app/login/',
            bare: bareDecoded,  // Set the bare URL after decoding
            encodeUrl: Ultraviolet.codec.xor.encode,
            decodeUrl: Ultraviolet.codec.xor.decode,
            handler: '/app/uv/uv.handler.js',
            bundle: '/app/uv/uv.bundle.js',
            config: '/app/uv/uv.config.js',
            sw: '/app/uv/uv.sw.js',
            id: '13j_KyiE_X0XyvYHY7_P1XYEbX8_73j_LUG2JYNO7xqE',
        };
    } catch (error) {
        console.error('Error loading bare URL from DB:', error);
    }
}

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('serverDB', 1);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains('servers')) {
                db.createObjectStore('servers', { keyPath: 'id', autoIncrement: false });
            }
        };

        request.onerror = (e) => {
            reject('Error opening database');
        };

        request.onsuccess = (e) => {
            resolve(e.target.result);
        };
    });
}

function getServerFromDB(db) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['servers'], 'readonly');
        const store = transaction.objectStore('servers');
        const request = store.get(1);  // Assuming the server is stored with id = 1

        request.onsuccess = () => {
            if (request.result) {
                resolve(request.result.url);
            } else {
                reject('No server found in DB');
            }
        };

        request.onerror = () => {
            reject('Error retrieving server from DB');
        };
    });
}

// Call the function to load the config only after retrieving the URL from DB
loadConfig();
*/