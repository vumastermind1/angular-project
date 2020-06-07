export class TimePeriod {
    id: number;
    key: string;
    text: string;
    hasDivider: boolean;

    constructor(id: number, key: string, text: string, hasDivider?: boolean) {
        this.id = id;
        this.key = key;
        this.text = text;
        this.hasDivider = hasDivider || false;
    }
}
