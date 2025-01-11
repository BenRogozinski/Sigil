"use strict";

const sheetId = "13j_KyiE_X0XyvYHY7_P1XYEbX8_73j_LUG2JYNO7xqE"
const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

async function fetchSheetData() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    const overlayText = document.createElement('p');
    overlayText.id = 'overlay-text';
    overlayText.classList.add("ellipsis");
    overlayText.textContent = 'Finding an unblocked server';

    overlay.appendChild(overlayText);

    document.body.appendChild(overlay);

    let foundWorkingUrl = false;

    try {
        const response = await fetch(sheetUrl);
        const text = await response.text();

        const json = JSON.parse(text.substring(47, text.length - 2));

        const rows = json.table.rows;
        const urlSet = rows.map(row => row.c.map(cell => (cell && cell.v) || ""))[0];

        for (const url of urlSet) {
            const decodedUrl = atob(url);
            if (url !== "") {
                try {
                    const fetchResponse = await fetch(decodedUrl);
                    const fetchResponseJson = await fetchResponse.json();
                    if (fetchResponse.ok && fetchResponseJson['versions'][0] === 'v1') {
                        console.log("WORKING URL FOUND");

                        // Store the server in indexedDB (overwrite previous entry)
                        const db = await openDB();
                        await storeServerInDB(db, url);
                        __uv$config.bare = atob(url);

                        document.body.removeChild(overlay);
                        foundWorkingUrl = true;
                        break;
                    }
                } catch { }
            }
        }

        if (!foundWorkingUrl) {
            overlayText.classList.remove("ellipsis");
            overlayText.textContent = 'No working servers found :(';
        }

    } catch (error) {
        console.error("ERROR GETTING DATA:", error);
        overlayText.classList.remove("ellipsis");
        overlayText.textContent = 'Error getting server URLs :(';
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

function storeServerInDB(db, url) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['servers'], 'readwrite');
        const store = transaction.objectStore('servers');
        const server = { id: 1, url }; // Use a fixed id to overwrite the entry

        const request = store.put(server); // Use put to overwrite the existing entry

        request.onsuccess = () => {
            console.log('Server URL stored in indexedDB');
            resolve();
        };

        request.onerror = () => {
            console.error('Error storing server in indexedDB');
            reject();
        };
    });
}

fetchSheetData();