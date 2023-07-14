export class Chat{
    public id: number = 0;
    public name: string = "";
    public created_at: string = "";
}

export class Message{
    public id: number = 0;

    public sender_id: number = 0;
    public sender_name: string = "";
    public sender_image: string = "";
    public sender_username: string = "";
    public sender_label: string = "";
    public sender_tags: string = "";
    public sender_is_ban: boolean = false;
    public sender_is_guest: boolean = false;
    public sender_is_tester: boolean = false;

    public receiver: number = 0;
    public type: number = 0;
    public image: string = "";
    public text: string = "";
    public payload: string = "";
    public buttons: string = "[]";
    public like: number = 0;
    public version: number = 0;
    public is_me: number = 0;
}

export class Button{

}