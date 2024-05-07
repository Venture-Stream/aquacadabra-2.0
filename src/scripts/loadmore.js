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
        let params = new URL(window.location.href).searchParams;

        console.log(params)

        if(window.location.search != '') {
            searchURL = `${window.location.pathname}${window.location.search}&page=${page}`;
        } else {
            searchURL = `${window.location.pathname}?page=${page}`;
        }

        console.log(searchURL);

        this.querySelector('span').classList.add('hidden');
        this.querySelector('.loading__spinner').classList.remove('hidden');

        axios.get(searchURL).then(response => {
            const parser = new DOMParser();
            const html = parser.parseFromString(response.data, "text/html");
            const data = html.getElementById('product-grid');

            collectionGrid.insertAdjacentHTML('beforeend', data.innerHTML);

            this.querySelector('span').classList.remove('hidden');
            this.querySelector('.loading__spinner').classList.add('hidden');

            const current_page = params.get('page')
            if(current_page == null) {
                params.set('page', page);
            } else {
                params.append('page', page);
            }


            console.log(params.get('page'));
        });



        this.dataset.page = page + 1;
        if(page >= limit) {
            this.classList.add('hidden');
        }

    }
}

customElements.define('load-more', Pagination);