import { createElement } from 'lwc';
import FileUploader from 'c/fileUploader';

describe('c-file-uploader', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Check is upload control is appears', () => {
        const element = createElement('c-file-uploader', {
            is: FileUploader
        });
        document.body.appendChild(element);
        const uploadblock = element.shadowRoot.querySelector('lightning-file-upload');
        expect(uploadblock).not.toBe(null);
    });
});