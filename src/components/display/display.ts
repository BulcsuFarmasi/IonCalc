/**
 * Created by Dell on 2017. 03. 08..
 */
import { Component } from '@angular/core';

import { DisplayService } from '../../services/display/display'

@Component({
    selector:'display',
    templateUrl:'display.html'
})

export class DisplayComponent{
    constructor(private displayService:DisplayService){};
}