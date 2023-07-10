describe('c-datatable-view', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    describe('c-datatable-view', () => {
        it('Check is loaded string is valid JSON', () => {
            let mock = [{
                "Name": "Rose Gonzalez",
                "Title": "SVP, Procurement",
                "Email": "rose@edge.com",
                "LastName": "Gonzalez",
                "FirstName": "Rose",
                "id": "0036800000GLW5zAAH"
            }]
            let dataFromFile = btoa(JSON.stringify(mock));
            const isJSON = (str) => {
                try {
                    JSON.parse(str);
                } catch (e) {
                    return false;
                }
                return true;
            }
            expect(isJSON(atob(dataFromFile))).toBe(true);
        });
    });
});