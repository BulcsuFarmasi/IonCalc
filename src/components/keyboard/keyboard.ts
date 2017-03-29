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
    private keys:{value:string,label:string}[];
    constructor(private displayService:DisplayService){
        this.keys=[{value:'^',label:'x<sup>y</sup>'},{value:'()',label:'()'},{value:'√',label:'√'},{value:'/',label:'/'},
                   {value:'7',label:'7'},{value:'8',label:'8'},{value:'9',label:'9'},{value:'*',label:'*'},
                   {value:'4',label:'4'},{value:'5',label:'5'},{value:'6',label:'6'},{value:'-',label:'-'},
                   {value:'1',label:'1'},{value:'2',label:'2'},{value:'3',label:'3'},{value:'+',label:'+'},
                   {value:'.',label:'.'},{value:'0',label:'0'},{value:'+/-',label:'+/-'},{value:'=',label:'='}
                   ]
    }
    keyTouched(key){
        this.displayService.filterNewChar(key);
    }
}
