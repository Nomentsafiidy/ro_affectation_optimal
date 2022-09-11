import { Component, OnInit } from '@angular/core';
import { AffectationTab } from 'src/app/models/AffectionTab';
import { SimpleTab } from 'src/app/models/interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    public simpleTab: SimpleTab = {
        row: 0,
        col: 0,
    };

    public affectationTab!: AffectationTab;
    constructor() {}

    /*========================================*
                    LIFE CYCLE
    *=========================================*/

    async ngOnInit(): Promise<void> {}

    createTab() {
        this.affectationTab = new AffectationTab(this.simpleTab);
    }
}
