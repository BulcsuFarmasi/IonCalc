import { Injectable } from '@angular/core';

@Injectable()

export class DisplayService{
    private displayContent:string='';
    private operators:string[];

    constructor(){
        this.operators=['+','-','*','/','^','√'];
    }

    addParenthesis(){
        let lastChar = this.displayContent.charAt(this.displayContent.length-1);
        let addable = '';
        if (this.isOperator(lastChar) || lastChar === '(') {
            addable = '(';
        } else if (this.isNumber(lastChar) || lastChar === ')'){
            addable = ')';
        }
        this.displayContent += addable;
    }

    addDisplayContent(item) {
        this.displayContent += item
    }

    getDisplayContent(){
        return this.displayContent
    }

    clearDisplayContent(){
        this.displayContent='';
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
                break;
            case '+/-':
                this.negateLastNumber();break;
            case '()':
                this.addParenthesis();break;
            default:
                this.addDisplayContent(char);break;
        }
    }

    insertChar(index:number,char:string){
        let charArray=this.displayContent.split('');
        charArray.splice(index, 0, char);
        this.displayContent=charArray.join('');
    }

    isOperator(char:string) {
        return this.operators.indexOf(char) > -1;
    }

    isNumber(char:string) {
        return !isNaN(parseInt(char));
    }

    isParenthesis(char) {
        let parentheses = ['(', ')'];
        return parentheses.indexOf(char) > -1;
    }

    negateLastNumber() {
        var lastChar = this.displayContent.length - 1;
        if (this.isNumber(this.displayContent.charAt(lastChar))){
            var i = lastChar;
            while (i > 0 && !this.isOperator(this.displayContent.charAt(i)) &&
            !this.isOperator(this.displayContent.charAt(i - 1))) {
                i--;
            }
            if (this.displayContent.charAt(i - 1) === '-' && this.isOperator(this.displayContent.charAt(i - 2))){
                this.deleteChar(i - 1);
            } else {
                this.insertChar(i, '-');
            }
        }

    }
}