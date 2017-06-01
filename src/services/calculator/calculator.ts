import { Injectable } from '@angular/core'
import { Token } from "../tokenizer/token";

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

        }





        return '';
    }

    divide (operand1:number, operand2:number) {
        return operand1 / operand2
    }

    findParentheses (tokens:Token[]) {

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
