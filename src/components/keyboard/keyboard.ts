/**
 * Created by Dell on 2017. 03. 08..
 */
import { Component } from '@angular/core';

import { DisplayService } from '../../services/display/display';

@Component({
    selector:'keyboard',
    templateUrl:'keyboard.html'
})

export class KeyboardComponent{
    private keys:string[];
    constructor(private displayService:DisplayService){
        this.keys=['x<sup>y</sup>','()','√','/',
                   '7','8','9','*',
                    '4','5','6','-',
                    '1','2','3','+',
                    '.','0','+/-','='];
    }
    keyClicked(key){
        if(key != "="){
            this.displayService.addDisplayContent(key);
        }else if(key == "Törlés"){
            this.displayService.clearDisplayContent();
        }
    }
}
