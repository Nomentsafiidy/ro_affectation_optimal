import { SimpleTab } from './interface';

export class AffectationTab {
    private simpleTab: SimpleTab;
    // PUBLIC Property
    public cells: AffectationCell[];
    public cols: number[];
    public rows: number[];
    public colHeader: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    public rowHeader: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    constructor(simpleTab: SimpleTab) {
        this.simpleTab = simpleTab;
        this.cells = [];
        this.cols = [];
        this.rows = [];
        this.init();
    }

    private init() {
        // Creation ligne et colonne
        this.rows = Array.from({ length: this.simpleTab.row }, (_, i) => i);
        this.cols = Array.from({ length: this.simpleTab.col }, (_, i) => i);
        // Creation cellule;
        this.rows.forEach((row) => {
            this.cols.forEach((col) => {
                this.cells.push(new AffectationCell(row, col));
            });
        });
    }

    /**
     *
     * @param rowIndex
     * @param colIndex
     * @returns
     */
    public getCell(rowIndex: number, colIndex: number): AffectationCell {
        return this.cells.find((cel) => cel.rowIndex === rowIndex && cel.colIndex === colIndex) as AffectationCell;
    }

    public getClone(): AffectationTab {
        const clone = new AffectationTab(this.simpleTab);
        this.cells.forEach((cel, index) => {
            clone.cells[index].value = cel.value;
        });
        return clone;
    }

    // ALGO

    /**
     * soustraire la collone par la plus petite valeur
     */
    public subtractCols() {
        this.cols.forEach((col) => {
            const min = Math.min(...this.rows.map((row) => this.getCell(row, col).value));
            this.rows.forEach((row) => {
                const cel = this.getCell(row, col);
                cel.value = cel.value - min;
            });
        });
    }

    /**
     * soustraire la ligne par la plus petite valeur
     */
    public subtractLines() {
        this.rows.forEach((row) => {
            const min = Math.min(...this.cols.map((col) => this.getCell(row, col).value));
            this.cols.forEach((col) => {
                const cel = this.getCell(row, col);
                cel.value = cel.value - min;
            });
        });
    }

    public getRowWithMinFreeZero(): number {
        let min = 10000;
        let rowIndex: number = NaN;
        this.rows.forEach((row) => {
            let zeroNumber = 0;
            this.cols.forEach((col) => {
                const cel = this.getCell(row, col);
                if (cel.value == 0 && !cel.marked && !cel.barred) {
                    zeroNumber++;
                }
            });
            if (zeroNumber != 0 && zeroNumber < min) {
                min = zeroNumber;
                rowIndex = row;
            }
        });
        return rowIndex;
    }

    public getFirstColWithFreeZero(rowIndex: number): number {
        let colIndex: number = NaN;
        for (const col of this.cols) {
            const cel = this.getCell(this.rows[rowIndex], col);
            if (cel.value === 0 && !cel.barred && !cel.marked) {
                colIndex = col;
                break;
            }
        }
        return colIndex;
    }

    public barredOtherZero(row: number, col: number) {
        this.cols.forEach((tmpCol) => {
            const cell = this.getCell(row, tmpCol);
            if (!cell.marked && cell.value == 0) {
                cell.barred = true;
            }
        });
        this.rows.forEach((tmpRow) => {
            const cell = this.getCell(tmpRow, col);
            if (!cell.marked && cell.value == 0) {
                cell.barred = true;
            }
        });
    }

    public hasFreeZero() {
        let som = this.cells.some((cell) => cell.value == 0 && !cell.barred && !cell.marked);
        console.log('this.cells', this.cells);
        console.log('this.cells som', som);

        return som;
    }
}

export class AffectationCell {
    public id: string;
    public rowIndex: number;
    public colIndex: number;
    public value: number;
    public marked: boolean;
    public barred: boolean;
    constructor(rowIndex: number, colIndex: number) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.marked = false;
        this.barred = false;
        this.id = `r${rowIndex}-c${colIndex}`;
        this.value = 0;
    }
}
