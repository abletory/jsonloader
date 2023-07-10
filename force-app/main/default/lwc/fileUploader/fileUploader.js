import { LightningElement, api, wire } from 'lwc';
import { RefreshEvent } from 'lightning/refresh';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
//import { createRecord } from 'lightning/uiRecordApi'; - explain of this commented code below
import VERSION_DATA_FIELD from '@salesforce/schema/ContentVersion.VersionData';

export default class FileUploader extends LightningElement {
    @api recordId;
    fileContent;
    contentVersionId = '';

    get acceptedFileFormats() {
        return ['.json'];
    }
    //Read loaded file from storage, parse and send it to table component
    @wire(getRecord, { recordId: "$contentVersionId", fields: [VERSION_DATA_FIELD] })
    wiredRecord({ data, error }) {
        if (error) {
            this.dispatchEvent(new ShowToastEvent({ title: 'Error', message: JSON.stringify(error), variant: 'error' }));
        } else if (data) {
            try {
                let encodedData = JSON.parse(atob(data.fields.VersionData.value));
                if (!Array.isArray(encodedData)) {
                    let arr = [];
                    arr.push(encodedData);
                    this.fileContent = arr;
                } else {
                    this.fileContent = encodedData;
                }
                if (this.fileContent) {
                    //this.createNewData(); explain of this commented code below
                    this.dispatchEvent(new ShowToastEvent({ title: 'Success', message: 'Data successfully loaded.', variant: 'success' }));
                    this.dispatchEvent(new CustomEvent('tabledatachange',{
                        detail: { tableData:  this.fileContent },
                        bubbles: false,
                        composed: false }));
                }
            }
            catch  {
                this.dispatchEvent(new ShowToastEvent({ title: 'Error', message: 'JSON parsing error. The file format may be incorrect.', variant: 'error' }));
            }
        }
     }
    // ----- Explaining ------
    // When we know custom object API Name ans it scheme
    // we have a possibility to save all loaded records to the system using createNewData method.
    // For example at my org i created NewData__c object with size, color, fruit fields and
    // succesfully checked records saving with testData4.json mock.
    // Also we need to import createRecord method from 'lightning/uiRecordApi' module.
    //
    // createNewData() {
    //     let fieldNames = Object.keys(this.fileContent[0]);
    //     Promise.all(
    //         this.fileContent.map(rec => {
    //             let fields = {};
    //             fieldNames.forEach(fieldName => {
    //                 let fieldValue = this.fileContent[0][fieldName];
    //                 fields[fieldName + '__c'] = fieldValue;
    //             });
    //             const objRecord = {
    //                 apiName: 'NewData__c',
    //                 fields
    //             };
    //             return createRecord(objRecord);
    //         })).then(results => {
    //         }).catch(error => {
    //             this.dispatchEvent(new ShowToastEvent({ title: 'Error', message: JSON.stringify(error), variant: 'error' }));
    //         });
    // }

    //Handle upload file finish
    handleFileUpload(event) {
        const file = event.detail.files[0];
        this.contentVersionId = file.contentVersionId;
        this.dispatchEvent(new RefreshEvent());
    }
}
