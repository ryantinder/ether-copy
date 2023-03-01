const iframe = document.getElementById("readcontractiframe");
const proxy_iframe = document.getElementById("readproxycontractiframe");

// `document.querySelector` may return null if the selector doesn't match anything.
const addAddressCopies = (iframe) => {
    if (iframe) {
        iframe.addEventListener("load", () => {
            const children = iframe.contentWindow.document.body.getElementsByClassName('readContractFunction');
            // each child accordian
            for (const child of children) {
                // read straight address
                try {
                    const parent = child
                        .getElementsByClassName("card-body")[0]
                        .querySelector("form")
                        .getElementsByClassName("form-group")[0]

                    const anchor = parent.querySelector("a")
                    if (anchor && anchor.innerText.length > 0) {
                        parent.style.display = "flex"
                        parent.style.alignItems = "center"
                        parent.style.gap = "6px"
                        const i = document.createElement("i");
                        i.style.cursor = "pointer";
                        i.className = "far fa-copy fa-fw link-secondary";
                        i.onclick = () => {
                            navigator.clipboard.writeText(anchor.innerText)
                        }
                        anchor.insertAdjacentElement("beforebegin", i)
                    }
                } catch (e) {
                    console.log(e)
                }

            }
        })
    }
}
addAddressCopies(iframe);
addAddressCopies(proxy_iframe);