import { LightningElement, api, track } from 'lwc';

export default class DatatableView extends LightningElement {

    _tableData;
    columnsData = [];
    data = [];
    idName = 'Id';

    @track showData = [];
    @track paginationObject = {
        totalItems : 1,
        currentPage : 1,
        pageSize : 10,
        maxPages : 5
    }

    @api
    get tableData() {
        return this._tableData;
    }

    set tableData(value) {
        if (value) {
            this.columnsData = [...this.processColumns(value)];
            this.data = [...value];
            this.paginationObject = {...this.paginationObject, totalItems: value.length, currentPage: 1}
            this.moveToSelectedPage(this.paginationObject.currentPage, this.paginationObject.pageSize);
        }
    }

    get tableDataLoaded() {
        return this.data.length;
    } 
    //Prepare columns for datatable view
    processColumns(data) {
        let columnNames = Object.keys(data[0]);
        let columns = [];
            for (let columnName of columnNames) {
                if (columnName.toLowerCase() === 'id') {
                    this.idName = columnName;
                }
                let columnType;
                if (columnName.toLowerCase().includes('phone') || columnName.toLowerCase().includes('fax')) {
                    columnType = 'phone';
                }
                if (columnName.toLowerCase().includes('date')) {
                    columnType = 'date';
                }
                let formattedLabel = columnName.replace('_', ' ');
                formattedLabel = formattedLabel[0].toUpperCase() + formattedLabel.slice(1);
                columns.push({
                    'label': formattedLabel,
                    'fieldName': columnName,
                    'type': columnType
                 });
            }
            if (columns.length > 8) {
                columns.forEach(elem => {
                    elem.initialWidth = 150;
                })
            }
        return columns;
    }
    //Handle page number from paginator
    handleSelectedPage(event) {
        this.paginationObject = {...this.paginationObject, currentPage: event.detail}
        this.moveToSelectedPage(this.paginationObject.currentPage, this.paginationObject.pageSize)
    }
    //Load selected table page
    moveToSelectedPage(selectedPage, limit) {
        this.showData = [...this.data.slice((selectedPage * limit) - limit, selectedPage * limit)];
    }
}