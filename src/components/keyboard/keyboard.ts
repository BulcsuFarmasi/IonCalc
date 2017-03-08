/**
 * Created by Dell on 2017. 03. 08..
 */
import { Component } from '@angular/core'

@Component({
    selector:'keyboard',
    templateUrl:'keyboard.html'
})

export class KeyboardComponent{
    private keys:string[];
    constructor(){
        this.keys=['x<sup>y</sup>','()','√','/',
                   '7','8','9','*',
                    '4','5','6','-',
                    '1','2','3','+',
                    '.','0','+/-','='];
    }
}
