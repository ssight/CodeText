document.addEventListener('DOMContentLoaded', () => {
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

var styles = {
    "font-family": "",
    "background": "",
    "color": "",
    "border-radius": "",
    "padding": ""
}

var cssGen = "";

function createStyle() {
    if (checkFont()) {
        styles = {
            "font-family": `${document.getElementById('fontLocation').value}!important`,
            "background": `${document.getElementById("backgroundColor").value}!important`,
            "color": `${document.getElementById("foregroundColor").value}!important`,
            "border-radius": `${document.getElementById("borderRadius").value}px!important`,
            "font-size": `${document.getElementById("fontSize").value}px!important`
        }

        cssGen = "code,pre,.blob-code,.blob-code>*{";
        Object.entries(styles).forEach(i => {
            cssGen += `${i[0]}:${i[1]};`;
        }); cssGen += "}pre{padding:" + document.getElementById("padding").value + "px!important}" +
            `code{padding:${document.getElementById("padding2").value}px}pre>code{padding:0}`;

        cssGen = cssGen.replace(/pxpx/g, "px");

        return true
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
        document.getElementById("preview").innerHTML = "Success! 😀 Hope you like it. Click to preview again";
        document.getElementsByClassName("create")[0].style.display = "block";
        document.getElementsByClassName("create")[1].style.display = "block";
    }
}

var createExtension = {
    firefox: function () {
        if (createStyle()) {
            fetch("./ext/manifest.json").then(i => i.text().then(manifest => {
                alert(manifest)
            }))
        }
    }
}