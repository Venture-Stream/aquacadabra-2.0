const axios = require('axios').default;

class Pagination extends HTMLElement {
    constructor() {
        super();
        this.addEventListener('click', this.loadMore, false);
    }

    loadMore() {
        let collectionGrid = document.getElementById('product-grid');
        let searchURL;
        let page = this.dataset.page * 1;
        let limit = this.dataset.limit * 1;
        let url = new URL(window.location.href)

        if(window.location.search != '') {
            searchURL = `${window.location.pathname}${window.location.search}&page=${page}`;
        } else {
            searchURL = `${window.location.pathname}?page=${page}`;
        }

        this.querySelector('span').classList.add('hidden');
        this.querySelector('.loading__spinner').classList.remove('hidden');

        axios.get(searchURL).then(response => {
            const parser = new DOMParser();
            const html = parser.parseFromString(response.data, "text/html");
            const data = html.getElementById('product-grid');

            collectionGrid.insertAdjacentHTML('beforeend', data.innerHTML);

            this.querySelector('span').classList.remove('hidden');
            this.querySelector('.loading__spinner').classList.add('hidden');

            if(!(url.searchParams.has('page'))){
                url.searchParams.append('page', page)
            } else {
                url.searchParams.set('page', page)
            }
            history.pushState({}, '', url.href)
        });



        this.dataset.page = page + 1;
        if(page >= limit) {
            this.classList.add('hidden');
        }

    }
}

customElements.define('load-more', Pagination);