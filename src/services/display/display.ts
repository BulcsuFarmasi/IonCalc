import { Injectable } from '@angular/core';

import { CharService } from '../char/char'
import { CalculatorService } from '../calculator/calculator'
import { TokenizerService } from '../tokenizer/tokenizer';
import { Token } from '../tokenizer/token';

@Injectable()
export class DisplayService{
    private displayContent:string='';

    constructor(private _tokenizerService:TokenizerService, private _charService:CharService,
                private _calculatorService:CalculatorService){}

    addParenthesis(){
        let lastChar = this.displayContent.charAt(this.displayContent.length - 1);
        let addable = '';
        if (this._charService.isOperator(lastChar) || lastChar === '(') {
            addable = '(';
        } else if (this._charService.isNumber(lastChar) || lastChar === ')'){
            addable = ')';
        }
        this.displayContent += addable;
    }

    addDisplayContent(item) {
        if (this._charService.isOperator(item)) {
            if (this.filterOperator(item)){
                this.displayContent += item;
            }
        } else {
            this.displayContent += item;
        }
    }

    getDisplayContent(){
        return this.displayContent
    }

    calculateResult () {
        let chars:string[] = this.displayContent.split('');
        let tokens:Token[] = this._tokenizerService.getTokens(chars);
        this.displayContent = this._calculatorService.calculateResult(tokens).toString();
    }

    clearDisplayContent() {
        this.displayContent = '';
    }

    deleteChar(index:number){
        let charArray = this.displayContent.split('');
        charArray.splice(index, 1);
        this.displayContent = charArray.join('');
    }

    filterNewChar(char){
        switch(char) {
            case 'C':
                this.clearDisplayContent();break;
            case '=':
                this.calculateResult();break;
            case '+/-':
                this.negateLastNumber();break;
            case '()':
                this.addParenthesis();break;
            default:
                this.addDisplayContent(char);break;
        }
    }

    filterOperator (operator):boolean {
        let lastCharNumber:number = this.displayContent.length - 1;
        let lastChar:string = this.displayContent.charAt(lastCharNumber);
        let notRoot:boolean = operator !== '√';
        let root:boolean = operator === '√';

        var applicable:boolean = true;

        // root can't stand after number
        if (!this._charService.isOperator(lastChar) && root && lastCharNumber >= 0) {
            applicable = false;
        // operator except root can't be first
        } else if (notRoot && lastCharNumber < 0){
            applicable = false;
        // operator which isn't root can't stand after root
        } else if (lastChar === '√' && notRoot) {
            applicable = false;
        // operator can't stand after operator both aren't roots, deleting the first
        } else if (this._charService.isOperator(lastChar) && notRoot) {
            this.deleteChar(lastCharNumber);
        }
        return applicable;
    }

    insertChar(index:number,char:string){
        let charArray=this.displayContent.split('');
        charArray.splice(index, 0, char);
        this.displayContent=charArray.join('');
    }

    negateLastNumber() {
        var lastChar = this.displayContent.length - 1;
        if (this._charService.isNumber(this.displayContent.charAt(lastChar))){
            var i = lastChar;
            while (i > 0 && !this._charService.isOperator(this.displayContent.charAt(i)) &&
            !this._charService.isOperator(this.displayContent.charAt(i - 1))) {
                i--;
            }
            if (this.displayContent.charAt(i - 1) === '-' && this._charService.isOperator(this.displayContent.charAt(i - 2))){
                this.deleteChar(i - 1);
            } else {
                this.insertChar(i, '-');
            }
        }
    }
}