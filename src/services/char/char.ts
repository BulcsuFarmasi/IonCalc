import { Injectable } from '@angular/core';

@Injectable()
export class CharService {

    private operators:string[]

    constructor() {
        this.operators = ['+', '-', '*', '/', '^', '√'];
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
}