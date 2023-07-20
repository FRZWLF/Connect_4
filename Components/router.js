module.exports = class Router {

    constructor () {
        this.viewMap = new Map();
        // bind, da Methode als Callback aus der Klasse extrahiert wird
        window.addEventListener('hashchange', this.refresh.bind(this));
        window.addEventListener('load', this.refresh.bind(this));
    }

    addView(viewname, component) {
        this.viewMap.set(viewname, component);
    }

    gotoView(viewname) {
        document.location.hash = '#' + viewname;
    }

    refresh() {
        const component = document.location.hash.slice(1);
        const contententrypoint = document.getElementById('appcontent');

        if (this.viewMap.has(component)) {
            contententrypoint.innerHTML = this.viewMap.get(component).getHTML();
        };
    };

};
