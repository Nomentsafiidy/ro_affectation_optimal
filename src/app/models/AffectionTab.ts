import { SimpleTab } from './interface';

export class AffectationTab {
    private simpleTab: SimpleTab;
    private cells: AffectationCell[];
    // PUBLIC Property
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

    public getCell(rowIndex: number, colIndex: number): AffectationCell {
        return this.cells.find((cel) => cel.rowIndex === rowIndex && cel.colIndex === colIndex) as AffectationCell;
    }

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
}

export class AffectationCell {
    public id: string;
    public rowIndex: number;
    public colIndex: number;
    public value: number;
    constructor(rowIndex: number, colIndex: number) {
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
        this.id = `r${rowIndex}-c${colIndex}`;
        this.value = 0;
    }
}
