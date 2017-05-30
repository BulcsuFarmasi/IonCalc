describe('After clicking on the keyboard\'s buttons', () => {
    var display, n1, point, plus, root, parenthasis;
    beforeEach(() => {
        browser.get('.');
        display = element(by.css('display p'));
        n1 = element(by.id('n-1'));
        point = element(by.id('n-p'));
        plus = element(by.id('o-a'));
        minus = element(by.id('o-s'));
        root = element(by.id('o-r'));
        parenthasis = element(by.id('o-pa'));
    });

    describe('number',() => {
        it('should followed by number', () => {
            n1.click();
            point.click();
            n1.click();

            expect(display.getText()).toEqual('1.1');
        })

        it('should followwed by operator ', () => {
            n1.click()
            plus.click();
            n1.click();

            expect(display.getText()).toEqual('1+1');
        })

        it('shouldn\'t followed by root', () => {
            n1.click();
            root.click();

            expect(display.getText()).toEqual('1');
        })
    })

    describe('operator',() => {
        it('shouldn\'t followed by operator', () => {
            n1.click();
            plus.click();
            minus.click()

            expect(display.getText()).toEqual('1-');
        })

        it('should followed by root', () => {
            n1.click();
            plus.click()
            root.click();
            n1.click();

            expect(display.getText()).toEqual('1+√1');
        })
    })

    describe('root',() => {
        it('should followed by number', () => {
            root.click();
            n1.click();

            expect(display.getText()).toEqual('√1');
        })

        it('should followed by operator', () => {
            root.click();
            plus.click();

            expect(display.getText()).toEqual('√');
        })

        it('should followed by root', () => {
            root.click();
            root.click();
            n1.click();

            expect(display.getText()).toEqual('√√1');
        })

    })

    describe('left parenthasis', () => {
        it('should preceeded by operator', () => {
            n1.click();
            plus.click();
            parenthasis.click();

            expect(display.getText()).toEqual('1+(');
        })
        it('should preceeded by root', () => {
            root.click();
            parenthasis.click();

            expect(display.getText()).toEqual('√(');
        })
        it('should preceeded by left parenthasis', () => {
            n1.click()
            plus.click()
            parenthasis.click();
            parenthasis.click();

            expect(display.getText()).toEqual('1+((');
        })
    })
    describe('right parenthasis', () => {
        it('should preceeded by number', () => {
            n1.click()
            plus.click()
            parenthasis.click();
            n1.click()
            plus.click()
            n1.click();
            parenthasis.click();
            expect(display.getText()).toEqual('1+(1+1)');
        })


        it('should preceeded by right parenthasis', () => {
            it('should preceeded by number', () => {
                n1.click()
                plus.click()
                parenthasis.click();
                parenthasis.click();
                n1.click()
                plus.click()
                n1.click();
                parenthasis.click();
                parenthasis.click();

                expect(display.getText()).toEqual('1+(1+1)');
            })
        })
    })

});