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
    public solutionFound: boolean = false;

    constructor() {}

    /*========================================*
                    LIFE CYCLE
    *=========================================*/

    async ngOnInit(): Promise<void> {}

    createTab() {
        this.affectationTab = new AffectationTab(this.simpleTab);
    }

    resolveAffectation(affectationTab: AffectationTab) {
        this.affectationTab = affectationTab;
        this.affectationTabResult = [];
        const setp1Result = this.step1(affectationTab);
        const setp2Result = this.step2(setp1Result);
        if (setp2Result.isSolution()) {
            this.solutionFound = true;
        } else {
            setTimeout(() => {
                this.step3(setp2Result);
            }, 1000);
        }
    }

    step1(affectationTab: AffectationTab): AffectationTab {
        console.log('step 1');
        const clone1 = affectationTab.getClone();
        clone1.subtractCols();
        this.affectationTabResult.push(clone1);
        const clone2 = clone1.getClone();
        clone2.subtractLines();
        this.affectationTabResult.push(clone2);
        return clone2;
    }

    step2(affectationTab: AffectationTab) {
        console.log('step 2');
        const clone1 = affectationTab.getClone();
        while (clone1.hasFreeZero()) {
            let row = clone1.getRowWithMinFreeZero();
            let col = clone1.getFirstColWithFreeZero(row);
            const cel = clone1.getCell(row, col);
            cel.marked = true;
            clone1.barredOtherZero(row, col);
        }
        this.affectationTabResult.push(clone1);
        return clone1;
    }

    step3(affectationTab: AffectationTab) {
        // TODO
        console.log('step 3');
        const clone1 = affectationTab.getClone();
        // while (clone1.canMarkedRowAndCell()) {
        let cell = clone1.getCellWithoutMarkedZero();

        while (cell) {
            console.log('cell :>> ', cell);
            clone1.markedRowAndCol(cell.rowIndex, cell.colIndex);
            cell = clone1.getCellWithoutMarkedZero();
        }

        // }
        this.affectationTabResult.push(clone1);
        // return clone1;
    }
}
