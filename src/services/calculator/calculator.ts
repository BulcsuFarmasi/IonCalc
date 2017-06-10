import { Injectable } from '@angular/core'
import { Token } from "../tokenizer/token";
import { ParentthesisNotFound } from './parenthesis-not-found'

@Injectable()
export class CalculatorService {


    add (operand1:number, operand2:number) {
        return operand1 + operand2;
    }

    calculateResult (tokens:Token[]) {
        try {
            let parenthesisLocations=this.findParentheses(tokens);
            let tokensInside = tokens.slice(parenthesisLocations[0] + 1, parenthesisLocations[1]);

            let partToken = new Token();
            partToken.type = 'number';
            partToken.value = this.calculateResult(tokensInside);

            let partLength = this.subtract(parenthesisLocations[1], parenthesisLocations[0]);
            tokens.splice(parenthesisLocations[0], partLength, partToken);
        } catch (exception) {
            if (exception.type == 'noClosing') {
                tokens.splice(exception.position, 1);
            }
        }

        tokens = this.findSquareRoots(tokens);
        tokens = this.findPowers(tokens);
        tokens = this.findMultiplies(tokens);
        tokens = this.findAdds(tokens);

        let result = tokens[0].value;
        return result;
    }

    divide (operand1:number, operand2:number) {
        return operand1 / operand2
    }

    findAdds(tokens) {
        var position = 0;
        do {
            position = tokens.findIndex((token) => {
                console.log(token);
                if (token.type == 'operator' && (token.value == '+' || token.value == '-')){
                    return true
                }
            })

            if (position > -1) {

                if (tokens[position].value == '+') {
                    let result = this.add(parseFloat(tokens[position - 1].value),
                        parseFloat(tokens[position + 1].value));
                    tokens[position + 1].value = result;
                    tokens.splice(position - 1, 2);
                } else {
                    let result = this.subtract(parseFloat(tokens[position - 1].value),
                        parseFloat(tokens[position + 1].value));
                    tokens[position + 1].value = result;
                    tokens.splice(position - 1, 2);
                }
            }
        } while (position > -1);

        return tokens;
    }

    findMultiplies (tokens) {
        var position = 0;
        do {
            position = tokens.findIndex((token) => {
                if (token.type == 'operator' && (token.value == '*' || token.value == '/')){
                    return true
                }
            })

            if (position > -1) {
                if (tokens[position].value == '*') {
                    let result = this.multiply(parseFloat(tokens[position - 1].value),
                        parseFloat(tokens[position + 1].value));
                    tokens[position + 1].value = result;
                    tokens.splice(position - 1, 2);
                } else {
                    let result = this.divide(parseFloat(tokens[position - 1].value),
                        parseFloat(tokens[position + 1].value));
                    tokens[position + 1].value = result;
                    tokens.splice(position - 1, 2);
                }
            }
        } while (position > -1);

        return tokens;
    }

    findPowers (tokens) {
        var position = 0;
        do {
            position = tokens.findIndex((token) => {
                if (token.type == 'operator' && token.value == '^') {
                    return true
                }
            })

            if (position > -1) {
                let result = this.power(parseFloat(tokens[position - 1].value),
                    parseFloat(tokens[position + 1].value));
                tokens[position + 1].value = result;
                tokens.splice(position - 1, 2);
            }
        } while (position > -1);

            return tokens;
    }

    findSquareRoots (tokens) {
        var position = 0;
        do {

            position = tokens.findIndex((token) => {
                if (token.type == 'operator' && token.value == '√'){
                    return true
                }
            })

            if (position > -1) {
                let result = this.squareRoot(parseFloat(tokens[position + 1].value));
                tokens[position + 1].value = result;
                tokens.splice(position, 1);
            }
        } while (position > -1);

        return tokens;
    }

    findParentheses (tokens:Token[]) {
        let opening = tokens.findIndex(token => {
            if (token.type == 'parenthesis' && token.value == '(') {
                return true;
            }
        })

        if (opening == -1){
            let exception = new ParentthesisNotFound();
            exception.type = 'noOpening';
            throw exception;
        }

        tokens=tokens.reverse();
        let closing = tokens.findIndex(token => {
            if (token.type == 'parenthesis' && token.value == '(') {
                return true;
            }
        })

        if (closing == -1) {
            let exception = new ParentthesisNotFound();
            exception.type = 'noClosing';
            exception.position = opening;
            throw exception;
        }

        return [opening, closing]
    }


    multiply (operand1:number, operand2:number) {
        return operand1 * operand2
    }

    power (operand1:number, operand2:number) {
        return operand1 ** operand2;
    }

    subtract (operand1:number, operand2:number) {
        return operand1 - operand2
    }

    squareRoot (operand:number) {
        return Math.sqrt(operand);
    }
}
