import { Injectable } from '@angular/core';

@Injectable()

export class DisplayService{
    private displayContent:string|number="";

    addDisplayContent(item){
        this.displayContent+=item
    }



    getDisplayContent(){
        return this.displayContent
    }

    clearDisplayContent(){
        this.displayContent='';
    }
}