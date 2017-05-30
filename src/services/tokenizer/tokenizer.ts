import { Injectable } from '@angular/core';
import { CharService } from '../char/char';
import { Token } from './token';


@Injectable()
export class TokenizerService {
    private tokens:Token[] = [];
    constructor(private charService:CharService){}

    addNumber (number:string) {
        let tokensLength = this.tokens.length;
        if (tokensLength > 0 && this.tokens[tokensLength - 1].type == 'number') {
            this.tokens[tokensLength - 1].value += number;
        } else {
            let token = new Token();
            token.type = 'number';
            token.value = number;
            this.tokens.push(token);
        }
    }

    addOperator (operator:string) {
        let token = new Token();
        token.type = 'operator';
        token.value = operator;
        this.tokens.push(token);
    }

    addParenthesis (parenthesis:string) {
        let token = new Token();
        token.type = 'parenthesis';
        token.value = parenthesis;
        this.tokens.push(token);
    }

    getTokens (chars:string[]) {
        chars.map((char) => {
            if (this.charService.isOperator(char)) {
                this.addOperator(char);
            } else if (this.charService.isNumber(char)) {
                this.addNumber(char);
            } else if (this.charService.isParenthesis(char)) {
                this.addParenthesis(char);
            }
        })
        return this.tokens;
    }


}
