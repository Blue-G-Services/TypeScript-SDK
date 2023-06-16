export class Achievement{
    public id: number = 0
    public name: string = "";
    public desc: string = "";
    public image: string = "";
    public start_at: string = "";
    public end_at: string = "";
    public steps: Step[] = [];
}

export class Step {
    public id: number = 0;
    public name: string = "";
    public point: number = 0;
    public payload: string = "";
    public unlocked: boolean = false;
}

export class Unlock {
    public player: number = 0;
    public achievement: number = 0;
    public step: number = 0;
}