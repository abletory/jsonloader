import { LightningElement } from 'lwc';

export default class DatatableContainer extends LightningElement {
    
    tableData;
    //Handle change datatable event
    handleTableData(event) {
        this.tableData = event.detail.tableData;
    }
}