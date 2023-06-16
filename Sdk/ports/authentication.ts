export class LoginResponse {
  public token: string = "";
  public edges: {
    wss:string
  } | undefined;
}

export class RegisterWithEmailParams {
  public constructor(init?: Partial<RegisterWithEmailParams>) {
    Object.assign(this, init);
  }
  public name: string = "";
  public email: string = "";
  public password: string = "";
}

export class LoginWithEmailParams {
  public constructor(init?: Partial<LoginWithEmailParams>) {
    Object.assign(this, init);
  }
  public email: string = "";
  public password: string = "";
}

export class LoginWithGoogleParams {
  public access_token: string = "";
}

export class LoginAsGuestParams {
  public device_id: string = "";
}

export class LoginWithTokenParams {
  public token: string = "";
}

export class IsOtaReadyParams {}

export class SendOtaTokenParams {
  public phone_number: string = "";
}

export class VerifyOtaTokenParams {
  public phone_number: string = "";
  public name: string = "";
  public token: string = "";
}

export interface IAuth {
  RegisterWithEmail<T extends RegisterWithEmailParams>(input: T): Promise<LoginResponse>;
  LoginWithEmail<T extends LoginWithEmailParams>(input: T): Promise<LoginResponse>;
  LoginWithGoogle<T extends LoginWithGoogleParams>(input: T): Promise<LoginResponse>;
  LoginAsGuest<T extends LoginAsGuestParams>(input: T): Promise<LoginResponse>;
  LoginWithToken<T extends LoginWithTokenParams>(input: T): Promise<void>;
  IsOtaReady<T extends IsOtaReadyParams>(input: T): Promise<boolean>;
  SendOtaToken<T extends SendOtaTokenParams>(input: T): Promise<boolean>;
  VerifyOtaToken<T extends VerifyOtaTokenParams>(input: T): Promise<LoginResponse>;
  IsLoggedIn():boolean
}
