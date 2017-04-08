/**
 * Created by Dell on 2017. 03. 08..
 */
import { Component, OnInit } from '@angular/core';

import { DisplayService } from '../../services/display/display';
import { KeyboardService } from '../../services/keyboard/keyboard';
import { Key } from '../../services/keyboard/key'

@Component({
    selector:'keyboard',
    templateUrl:'keyboard.html'
})

export class KeyboardComponent implements OnInit{
    private keys:Key[];
    constructor(private displayService:DisplayService, private keyboardService:KeyboardService){}

    ngOnInit () {
        this.keyboardService.getKeys()
            .subscribe(keys => {this.keys = keys});
    }

    keyTouched(key){
        this.displayService.filterNewChar(key);
    }
}
