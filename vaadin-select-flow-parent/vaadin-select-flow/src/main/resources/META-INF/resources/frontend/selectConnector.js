(function () {
    const tryCatchWrapper = function (callback) {
        return window.Vaadin.Flow.tryCatchWrapper(callback, 'Vaadin Select', 'vaadin-select-flow');
    };

    window.Vaadin.Flow.selectConnector = {
        initLazy: select => tryCatchWrapper(function (select) {
            const _findListBoxElement = tryCatchWrapper(function () {
                for (let i = 0; i < select.childElementCount; i++) {
                    const child = select.children[i];
                    if ("VAADIN-LIST-BOX" === child.tagName.toUpperCase()) {
                        return child;
                    }
                }
            });

            // do not init this connector twice for the given select
            if (select.$connector) {
                return;
            }

            select.$connector = {};

            select.renderer = tryCatchWrapper(function (root) {
                const listBox = _findListBoxElement();
                listBox.setAttribute("theme",select.getAttribute("theme"));
                if (listBox) {
                    if (root.firstChild) {
                        root.removeChild(root.firstChild);
                    }
                    root.appendChild(listBox);
                }
            });
        })(select)
    };
})();
