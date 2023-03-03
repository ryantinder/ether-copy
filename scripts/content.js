import { ethers } from 'ethers';
const iframe = document.getElementById("readcontractiframe");
const proxy_iframe = document.getElementById("readproxycontractiframe");
// `document.querySelector` may return null if the selector doesn't match anything.



// //register event listener for copy events on document
// document.oncopy = (event) => {
//     console.log('copy event', event);

// }
function commafy(num_str) {
    var str = num_str.split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    return str.join('.');
}
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
                            if (ethers.isAddress(anchor.innerText)) {
                                navigator.clipboard.writeText(ethers.getAddress(anchor.innerText))
                            } else if (anchor.innerText.includes(",")) {
                                navigator.clipboard.writeText(anchor.innerText.replace(/,/g, ''))
                            } else {
                                navigator.clipboard.writeText(anchor.innerText)
                            }
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
const addUintFormatting = (iframe) => {
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
                    if (anchor &&
                        anchor.innerText.length > 0 &&
                        !anchor.innerText.includes('0x') &&
                        ethers.getBigInt(anchor.innerText)) {
                        // add uint formatting
                        const e18 = document.createElement("i");

                        e18.style.cursor = "pointer";
                        e18.style.fontWeight = "bold";
                        e18.style.fontStyle = "normal"
                        e18.style.color = "#adb5bd";
                        e18.style.marginLeft = "2px";
                        e18.style.marginRight = "1px";
                        e18.onmouseover = () => {
                            e18.style.color = "#0784C3";
                        }
                        e18.onmouseout = () => {
                            e18.style.color = "#adb5bd";
                        }
                        e18.innerText = "E18"
                        e18.onclick = () => {
                            // was E18, convert to unformatted
                            let innerText = anchor.innerText
                            if (innerText.includes(".") && innerText.split(".")[1].length > 6) {
                                var str = innerText.split('.');
                                for (let i = 0; i < 18 - str[1].length; i++) {
                                    str[1] += '0';
                                }
                                str[0] = str[0].replace(/,/g, '');
                                anchor.innerText = str.join('');
                            } else {
                                // wrong formatting previously, convert to E18
                                // was E6, convert to unformatted
                                if (innerText.includes(".")) {
                                    let _str = innerText.split('.');
                                    for (let i = 0; i < 6 - _str[1].length; i++) {
                                        _str[1] += '0';
                                    }
                                    _str[0] = _str[0].replace(/,/g, '');
                                    innerText = _str.join('');
                                }
                                // was unformatted, convert to E18
                                anchor.innerText = commafy(ethers.formatUnits(innerText, 18))
                            }
                        }
                        // add uint formatting
                        const e6 = document.createElement("i");

                        e6.style.cursor = "pointer";
                        e6.style.fontWeight = "bold";
                        e6.style.fontStyle = "normal"
                        e6.style.color = "#adb5bd";
                        e6.style.marginLeft = "1px";
                        e6.style.marginRight = "3px";
                        e6.onmouseover = () => {
                            e6.style.color = "#0784C3";
                        }
                        e6.onmouseout = () => {
                            e6.style.color = "#adb5bd";
                        }
                        e6.innerText = "E6"
                        e6.onclick = () => {
                            // was E6, convert to unformatted
                            let innerText = anchor.innerText
                            if (innerText.includes(".") && innerText.split(".")[1].length < 7) {
                                var str = innerText.split('.');
                                for (let i = 0; i < 6 - str[1].length; i++) {
                                    str[1] += '0';
                                }
                                str[0] = str[0].replace(/,/g, '');
                                anchor.innerText = str.join('');
                            } else {
                                // wrong formatting previously, convert to E6
                                // was E18, convert to unformatted
                                if (innerText.includes(".")) {
                                    let _str = innerText.split('.');
                                    for (let i = 0; i < 18 - _str[1].length; i++) {
                                        _str[1] += '0';
                                    }
                                    _str[0] = _str[0].replace(/,/g, '');
                                    innerText = _str.join('');
                                }
                                // was unformatted, convert to E6
                                anchor.innerText = commafy(ethers.formatUnits(innerText, 6))
                            }
                        }

                        anchor.insertAdjacentElement("afterend", e6)
                        anchor.insertAdjacentElement("afterend", e18)
                    }
                } catch (e) {
                    console.error(e)
                }
            }
        })
    }
}
addAddressCopies(iframe);
addUintFormatting(iframe);
addAddressCopies(proxy_iframe);
addUintFormatting(proxy_iframe);