import { AffectationSolution, SimpleTab } from './interface';

export class AffectationTab {
    private simpleTab: SimpleTab;
    // PUBLIC Property
    public cells: AffectationCell[];
    public cols: number[];
    public rows: number[];
    public colHeader: string[] = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
    ];
    public rowHeader: string[] = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];
    constructor(simpleTab: SimpleTab) {
        this.simpleTab = simpleTab;
        this.cells = [];
        this.cols = [];
        this.rows = [];
        this.init();
    }

    doComplement(complement: number) {
        this.cells.forEach((cell) => {
            cell.value = complement - cell.value;
        });
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
        clone.cells = this.cells.map((cell) => cell.getClone());
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
        return som;
    }

    public isSolution() {
        let makedRow: boolean[] = this.rows.map((_) => false);
        let makedCol: boolean[] = this.cols.map((_) => false);
        this.rows.forEach((row) => {
            this.cols.forEach((col) => {
                const cell = this.getCell(row, col);
                if (cell.marked) {
                    makedRow[row] = true;
                    makedCol[col] = true;
                }
            });
        });
        return !(makedRow.some((e) => !e) || makedCol.some((e) => !e));
    }

    public getSolution(originalTab: AffectationTab): AffectationSolution[] {
        const solutionCells: AffectationSolution[] = [];
        this.rows.forEach((row) => {
            this.cols.forEach((col) => {
                const cell = this.getCell(row, col);
                if (cell.marked) {
                    solutionCells.push({
                        rowIndex: row,
                        colIndex: col,
                        value: originalTab.getCell(row, col).value,
                    });
                }
            });
        });
        return solutionCells;
    }

    //

    getCellWithoutMarkedZero(): AffectationCell | null {
        let cell: AffectationCell | null = null;
        this.rows.forEach((row) => {
            let rowCell: AffectationCell[] = [];
            this.cols.forEach((col) => {
                rowCell.push(this.getCell(row, col));
            });
            if (rowCell.some((rc) => rc.value == 0)) {
                rowCell.forEach((rc) => {
                    if (rc.value == 0 && rc.barred && !rc.colMarked && !rc.rowMarked) {
                        if (!rowCell.filter((rc2) => rc2.id != rc.id).some((rc2) => rc2.value == 0 && rc2.marked)) {
                            cell = rc;
                        } else if (
                            rowCell
                                .filter((rc2) => rc2.id != rc.id)
                                .filter((rc2) => rc2.value == 0 && rc2.marked)
                                .every((rc2) => rc2.colMarked)
                        ) {
                            cell = rc;
                        }
                    }
                });
                if (!cell) {
                    rowCell.forEach((rc) => {
                        if (rc.value == 0 && rc.marked && rc.colMarked && !rc.rowMarked) {
                            cell = rc;
                        }
                    });
                }
            }
        });
        return cell;
    }

    markedRowAndCol(rowIndex: number, colIndex: number) {
        this.rows.forEach((row) => {
            this.cols.forEach((col) => {
                const cell = this.getCell(row, col);
                if (row == rowIndex) {
                    cell.rowMarked = true;
                }
                if (col == colIndex) {
                    cell.colMarked = true;
                }
            });
        });
    }

    getMinCellValue(): number {
        return Math.min(
            ...this.cells
                .filter((rc) => rc.rowMarked && !rc.colMarked)
                .filter((rc) => rc.value != 0)
                .map((rc) => rc.value)
        );
    }

    moveZero(min: number) {
        this.cells.forEach((rc) => {
            if (rc.colMarked && !rc.rowMarked) {
                rc.value += min;
            } else if (rc.rowMarked && !rc.colMarked) {
                rc.value -= min;
            }
        });
    }

    removeMark() {
        this.cells.forEach((rc) => {
            rc.barred = false;
            rc.marked = false;
            rc.colMarked = false;
            rc.rowMarked = false;
        });
    }
}

export class AffectationCell {
    public id: string;
    public rowIndex: number;
    public colIndex: number;
    public value: number;
    public marked: boolean;
    public barred: boolean;
    public rowMarked: boolean;
    public colMarked: boolean;
    constructor(rowIndex: number, colIndex: number) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.id = `r${rowIndex}-c${colIndex}`;
        this.marked = false;
        this.barred = false;
        this.rowMarked = false;
        this.colMarked = false;
        this.value = 0;
    }

    getClone() {
        const clone = new AffectationCell(this.rowIndex, this.colIndex);
        clone.setProperty({
            marked: this.marked,
            barred: this.barred,
            rowMarked: this.rowMarked,
            colMarked: this.colMarked,
            value: this.value,
        });
        return clone;
    }

    setProperty(props: { marked: boolean; barred: boolean; rowMarked: boolean; colMarked: boolean; value: number }) {
        this.marked = props.marked;
        this.barred = props.barred;
        this.rowMarked = props.rowMarked;
        this.colMarked = props.colMarked;
        this.value = props.value;
    }
}
