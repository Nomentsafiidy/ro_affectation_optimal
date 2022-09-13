import { Component, OnInit } from '@angular/core';
import { AffectationTab } from 'src/app/models/AffectionTab';
import { AffectationSolution, AFFECTATION_TYPE, SimpleTab } from 'src/app/models/interface';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    typeAffectations = [' Affectation Minimal', 'Affectation Maximal'];

    public affectationTab!: AffectationTab;

    public affectationTabResult: AffectationTab[] = [];
    public solutionFound: boolean = false;
    //
    public AFFECTATION_TYPE: typeof AFFECTATION_TYPE = AFFECTATION_TYPE;
    public simpleTab: SimpleTab = {
        rowAndCol: 0,
        row: 0,
        col: 0,
        type: AFFECTATION_TYPE.MIN,
        complement: 0,
    };
    public affectionSolution: AffectationSolution[] = [];
    solutionValue = 0;

    constructor() {}

    /*========================================*
                    LIFE CYCLE
    *=========================================*/

    async ngOnInit(): Promise<void> {}

    createTab() {
        this.affectationTab = new AffectationTab(this.simpleTab);
        this.affectationTabResult = [];
    }

    colAndRowChange() {
        this.simpleTab.col = this.simpleTab.rowAndCol;
        this.simpleTab.row = this.simpleTab.rowAndCol;
    }

    onMaxChange(max: number) {
        if (this.simpleTab.type == AFFECTATION_TYPE.MAX) {
            this.simpleTab.complement = Math.max(this.simpleTab.complement, max);
        }
    }

    resolveAffectation(affectationTab: AffectationTab) {
        let tmpTab = affectationTab;

        this.affectationTab = affectationTab;
        this.affectationTabResult = [];

        if (this.simpleTab.type == AFFECTATION_TYPE.MAX) {
            tmpTab = affectationTab.getClone();
            tmpTab.doComplement(this.simpleTab.complement);
            this.affectationTabResult.push(tmpTab);
        }

        const setp1Result = this.step1(tmpTab);
        let setp2Result = this.step2(setp1Result);
        while (!setp2Result.isSolution()) {
            const setp3Result = this.step3(setp2Result);
            const setp4Result = this.step4(setp3Result);
            setp2Result = this.step2(setp4Result);
        }
        if (setp2Result.isSolution()) {
            this.solutionFound = true;
            this.affectionSolution = setp2Result.getSolution(this.affectationTab);
            this.solutionValue = this.affectionSolution
                .map((as) => as.value)
                .reduce((newVal, oldVal) => oldVal + newVal, 0);
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
        console.log('step 3');
        const clone1 = affectationTab.getClone();
        let cell = clone1.getCellWithoutMarkedZero();
        while (cell) {
            clone1.markedRowAndCol(cell.rowIndex, cell.colIndex);
            this.affectationTabResult.push(clone1.getClone());
            cell = clone1.getCellWithoutMarkedZero();
        }
        this.affectationTabResult.push(clone1);
        return clone1;
    }

    step4(affectationTab: AffectationTab) {
        console.log('step 4');
        const clone1 = affectationTab.getClone();
        const min = clone1.getMinCellValue();
        clone1.moveZero(min);
        this.affectationTabResult.push(clone1);
        //
        const clone2 = clone1.getClone();
        clone2.removeMark();
        this.affectationTabResult.push(clone2);
        return clone2;
    }
}
