export interface SimpleTab {
    rowAndCol: number;
    col: number;
    row: number;
    type: AFFECTATION_TYPE;
    complement: number;
}

export enum AFFECTATION_TYPE {
    MIN = 'MIN',
    MAX = 'MAX',
}

export type AffectationSolution = {
    rowIndex: number;
    colIndex: number;
    value: number;
};
