"use strict";

var urlList = [];

window.onload = function() {
    const searchFrame = document.getElementById('uvf');

    const searchFrameSource = localStorage.getItem('__sigil$URL');
    urlList.push(searchFrameSource);

    const searchFrameCheck = setInterval(() => {
        const currentUrl = searchFrame.contentWindow.location.href;
        if (currentUrl !== urlList.slice(-1)[0]) {
            console.log("URL CHANGE:", currentUrl);
            urlList.push(currentUrl);
        }
    }, 250);

    searchFrame.src = searchFrameSource;
};