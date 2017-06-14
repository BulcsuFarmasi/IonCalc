import { Injectable } from '@angular/core';
import { CharService } from '../char/char';
import { Token } from './token';


@Injectable()
export class TokenizerService {
    private tokens:Token[] = [];
    constructor(private _charService:CharService){}

    addNumber (number:string) {
        let tokensLength = this.tokens.length;
        if (tokensLength > 0 && this.tokens[tokensLength - 1].type == 'number') {
            this.tokens[tokensLength - 1].value += number;
        } else {
            this.addToken('number', number);
            this.createNegative(tokensLength);
        }
    }

    addOperator (operator:string) {
        this.addToken('operator', operator);
    }

    addToken (type:string, value:string) {
        let token = new Token();
        token.type = type;
        token.value = value;
        this.tokens.push(token);
    }

    addParenthesis (parenthesis:string) {
        this.addToken('parenthesis', parenthesis);
    }

    createNegative(tokensLength:number) {
        if (tokensLength > 2 && this.tokens[tokensLength - 3].type == 'operator'
            && this.tokens[tokensLength - 2].type == 'operator'
            && this.tokens[tokensLength - 2].value == '-') {
            this.tokens[tokensLength -1 ].value = this.tokens[tokensLength - 2].value
                                                + this.tokens[tokensLength - 1].value;
            this.tokens.splice(tokensLength - 2, 1);
        }
    }

    getTokens (chars:string[]) {
        this.tokens = [];
        chars.map((char) => {
            if (this._charService.isOperator(char)) {
                this.addOperator(char);
            } else if (this._charService.isNumber(char)) {
                this.addNumber(char);
            } else if (this._charService.isParenthesis(char)) {
                this.addParenthesis(char);
            }
        })
        return this.tokens;
    }


}
