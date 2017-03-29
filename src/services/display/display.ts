import { Injectable } from '@angular/core';

@Injectable()

export class DisplayService{
    private displayContent:string="";
    private operators:string[];

    constructor(){
        this.operators=["+","-","*","/","^","√"];
    }

    addParenthesis(){
        let lastChar = this.displayContent.charAt(this.displayContent.length-1);
        let addable = '';
        if (this.isOperator(lastChar) || lastChar == '(') {
            addable = '(';
        } else if (this.isNumber(lastChar) || lastChar == ')'){
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

    isOperator(char:string) {
        return this.operators.indexOf(char) > -1;
    }

    isNumber(char:string) {
        return !isNaN(parseInt(char));
    }

    isParenthesis(char) {
        let parentheses = ["(", ")"];
        return parentheses.indexOf(char) > -1;
    }

    negateLastNumber() {
        for (let i = this.displayContent.length - 1; i >= 0; i++) {
            if (this.isNumber(this.displayContent.charAt(i)) ) {
                
            }
        }
    }
}