const sheetUrl = `https://docs.google.com/spreadsheets/d/${__uv$config.id}/gviz/tq?tqx=out:json`;

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
            if (url !== "") {
                try {
                    const fetchResponse = await fetch(url);
                    const fetchResponseJson = await fetchResponse.json();
                    if (fetchResponse.ok && fetchResponseJson['versions'][0] === 'v1') {
                        console.log("WORKING URL FOUND");
                        self.__uv$config.bare = url;
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

fetchSheetData();