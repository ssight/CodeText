chrome.storage.sync.get(function (styles) {
    let s = document.createElement('style');
    s.innerHTML = styles.css;
    document.head.appendChild(s);

    document.querySelectorAll('code').forEach(i => {
        var nodes = [], w = i;
        nodes.push(i);
        while (i.parentNode) {
            nodes.unshift(i.parentNode.tagName);
            i = i.parentNode;
        }
        if (!nodes.includes("PRE")) {
            w.setAttribute("style", `background-color:${styles.backgroundColor}!important;color:${styles.color}!important`);
        }
    })
})