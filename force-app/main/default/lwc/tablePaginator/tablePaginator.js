import { LightningElement,track,api } from 'lwc';


export default class TablePaginator extends LightningElement {

    _paginationObject;
    totalItems;
    currentPage;
    totalPages;

    @track pages = [];

    @api
    get paginationObjectParent() {
        return this._paginationObject;
    }
    set paginationObjectParent(value) {
        let paginationObj = JSON.parse(JSON.stringify(value));
        this.processPagesList(paginationObj.totalItems, paginationObj.currentPage, paginationObj.pageSize, paginationObj.maxPages);
    }

    get backwardButtons() { 
        return this.currentPage > 1 ? 'enabled-button link-element': 'disabled-button link-element';
    }
    get forwardButtons() { 
        return this.currentPage < this.totalPages ? 'enabled-button link-element': 'disabled-button link-element';
    }
    get firstPagesEnable() {
        return this.pages && this.pages[0] && this.pages[0].number;
    }
    get lastPagesEnable() {
        return this.pages && this.pages[(this.pages.length-1)] && this.pages[(this.pages.length-1)].number;
    }
    get viewFirstPageThreeDots() {
        return this.firstPagesEnable && this.pages[0].number !== 1 ;
    }
    get viewLastPageThreeDots() {
        return this.lastPagesEnable && this.pages[(this.pages.length-1)].number !== this.totalPages && this.currentPage !== this.totalPages;
    }

    processPagesList(totalItems, currentPage, pageSize, maxPages ){
        this.totalPages = Math.ceil(totalItems / pageSize);
        this.currentPage = currentPage;
        this.totalItems = totalItems;
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > this.totalPages) {
            currentPage = this.totalPages;
        }
        let startPage, endPage;
        if (this.totalPages <= maxPages) {
            startPage = 1;
            endPage = this.totalPages;
        } else {
            let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                startPage = 1;
                endPage = maxPages;
            } else if (currentPage + maxPagesAfterCurrentPage >= this.totalPages) {
                startPage = this.totalPages - maxPages + 1;
                endPage = this.totalPages;
            } else {
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }
        let pagesList = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
        this.pages = [];
        let elemClass;
        pagesList.forEach(page => {
            elemClass = this.currentPage === page ? 'link-element active-element' : 'link-element';
            this.pages.push({number: page, class: elemClass});
        })
    }

    handleNavigateToFirstPage() {
        this.navigateToSelectedPage(1);
    }
    handleNavigateToPreviousPage() {
        this.navigateToSelectedPage(this.currentPage - 1);
    }
    handleNavigateToNextPage() {
        this.navigateToSelectedPage(this.currentPage + 1);
    }
    handleNavigateToLastPage() {
        this.navigateToSelectedPage(this.totalPages);
    }
    handleNavigateToSelectedPage(event){ 
        this.navigateToSelectedPage(parseInt(event.target.dataset.page, 10));
    }

    navigateToSelectedPage(page){
        const selectedPage = new CustomEvent('selectpage', {
            detail: page
        });
        this.dispatchEvent(selectedPage);
    }
}