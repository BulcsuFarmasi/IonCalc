/**
 * Created by Dell on 2017. 03. 08..
 */
import { Component } from '@angular/core';

import { DisplayService } from '../../services/display/display'

@Component({
    selector:'page-calculator',
    templateUrl:'calculator.html',
    providers:[DisplayService]
})

export class CalculatorPage{}