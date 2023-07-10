import { createElement } from 'lwc';
import DatatableContainer from 'c/datatableContainer';

describe('c-datatable-container', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Check is subcomponents is alive', () => {
        const element = createElement('c-datatable-container', {
            is: DatatableContainer
        });

        document.body.appendChild(element);
        const uploadblock = element.shadowRoot.querySelector('c-file-uploader');
        expect(uploadblock).not.toBe(null);
        const tabledblock = element.shadowRoot.querySelector('c-datatable-view');
        expect(tabledblock).not.toBe(null);
    });
});