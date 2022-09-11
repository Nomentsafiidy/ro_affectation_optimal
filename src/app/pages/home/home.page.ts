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

    public affectationTabResult: AffectationTab[] = [];

    constructor() {}

    /*========================================*
                    LIFE CYCLE
    *=========================================*/

    async ngOnInit(): Promise<void> {}

    createTab() {
        this.affectationTab = new AffectationTab(this.simpleTab);
    }

    resolveAffectation(affectationTab: AffectationTab) {
        // TODO
        this.affectationTab = affectationTab;
        this.affectationTabResult = [];
        this.step1(affectationTab);
    }

    step1(affectationTab: AffectationTab) {
        const clone1 = affectationTab.getClone();
        clone1.subtractCols();
        this.affectationTabResult.push(clone1);
        const clone2 = clone1.getClone();
        clone2.subtractLines();
        this.affectationTabResult.push(clone2);
        console.log('clone1 :>> ', clone1);
        console.log('clone2 :>> ', clone2);
    }
}
