document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("backgroundColor").addEventListener('input', getColor);
    document.getElementById("foregroundColor").addEventListener('input', getColor);
    document.getElementById("fontLocation").addEventListener('keydown', () => document.getElementById('fontCheck').innerHTML = 'Check if it\'s installed');
    document.getElementById("fontCheck").addEventListener('click', checkFont);
    document.getElementById("preview").addEventListener('click', preview);
    document.getElementById("create").addEventListener('click', createExtension);

    getColor();
})

function getColor() {
    document.getElementById("color-text").innerHTML = "Currently " + document.getElementById("backgroundColor").value;
    document.getElementById("color-text-foreground").innerHTML = "Currently " + document.getElementById("foregroundColor").value;
}

function checkFont() {
    if (document.getElementById('fontLocation').value.replace(/ /g, "") !== "") {
        if (new Detector().detect(document.getElementById('fontLocation').value)) {
            document.getElementById("fontCheck").innerHTML = "It's installed! 🎉";
            return true;
        } else {
            document.getElementById("fontCheck").innerHTML = "You don't seem to have that.";
            return false;
        }
    } else {
        document.getElementById("fontCheck").innerHTML = "Please enter a name first.";
        return false;
    }
}

var styles = [
    {
        "font-family": "",
        "background": "",
        "color": "",
        "border-radius": "",
        "font-size": ""
    },

    {
        "padding": ""
    },

    {
        "padding": ""
    },

    {
        "padding": '0!important'
    }

], selectors = ["code,pre,.blob-code,.blob-code>*", "pre", "code", "pre>code"]

var cssGen = "";

function createStyle() {
    if (checkFont()) {
        if (document.getElementById("invert").checked) {
            styles[0] = {
                "font-family": `'${document.getElementById('fontLocation').value}'!important`,
                "background": `${invertColor(document.getElementById("backgroundColor").value)}!important`,
                "color": `${invertColor(document.getElementById("foregroundColor").value)}`,
                "border-radius": `${document.getElementById("borderRadius").value}!important`,
                "font-size": `${document.getElementById("fontSize").value}!important`
            }
        } else {
            styles[0] = {
                "font-family": `'${document.getElementById('fontLocation').value}'!important`,
                "background": `${document.getElementById("backgroundColor").value}!important`,
                "color": `${document.getElementById("foregroundColor").value}`,
                "border-radius": `${document.getElementById("borderRadius").value}!important`,
                "font-size": `${document.getElementById("fontSize").value}!important`
            }
        }

        if (document.getElementById("invert").checked) {
            styles[1] = {
                "padding": `${document.getElementById("padding").value}!important`,
                "filter": "invert(1)"
            }
        } else {
            styles[1] = {
                "padding": `${document.getElementById("padding").value}!important`
            }
        }

        styles[2] = {
            "padding": `${document.getElementById("padding2").value}`
        }

        cssGen = "";
        for (var m = 0; m < styles.length; m++) {
            cssGen += selectors[m] + "{";
            Object.entries(styles[m]).forEach(i => {
                cssGen += `${i[0]}:${i[1]};`;
            })
            cssGen += "}"
        }

        return true;
    } else {
        document.getElementById("preview").innerHTML = "You might want to check that font.<br>If you're not sure, just type `monospace`.";
        return false;
    }
}

function preview() {
    if (createStyle()) {
        document.querySelectorAll('style').forEach(i => i.outerHTML = "");
        let s = document.createElement('style');
        s.innerHTML = cssGen;
        document.head.appendChild(s);
        runScript();
        document.getElementById("preview").innerHTML = "Success! 😀 Hope you like it. Click to preview again.";
        document.getElementById("create").style.display = "block";
    }
}

function createExtension() {
    chrome.storage.sync.set({
        'css': cssGen,
        'color': document.getElementById("foregroundColor").value,
        'backgroundColor': document.getElementById("backgroundColor").value
    }, () => {
        document.getElementById("create").innerHTML = `Hooray 🙌! Your settings have been saved.<br>
            You can close this window if you want.<br>
            Click here to save your settings again.`;
    });
}

function invertColor(Hex) {
    Hex = Hex.replace("#", "");
    var RGB = "";
    Hex.match(/../g).forEach(i => {
        RGB += 0xFF - Number(`0x${i}`) + ",";
    })
    RGB = RGB.split(",");
    RGB.splice(RGB.length - 1, 1);
    return `rgb(${RGB.join(",")})`;
}

function runScript() {
    document.querySelectorAll('code').forEach(i => {
        var nodes = [], w = i;
        nodes.push(i);
        while (i.parentNode) {
            nodes.unshift(i.parentNode.tagName);
            i = i.parentNode;
        }
        if (!nodes.includes("PRE")) {
            w.setAttribute("style", `background-color:${document.getElementById("backgroundColor").value}!important;color:${document.getElementById("foregroundColor").value}!important`);
        }
    })
}