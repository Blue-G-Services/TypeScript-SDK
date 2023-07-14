import {
    IAuth,
    IsOtaReadyParams,
    LoginAsGuestParams,
    LoginResponse,
    LoginWithEmailParams,
    LoginWithGoogleParams,
    LoginWithTokenParams,
    RegisterWithEmailParams,
    SendOtaTokenParams,
    VerifyOtaTokenParams
} from "../ports/authentication";
import axios from "axios";
import DynamicPixels from "../DynamicPixels";

export class Auth implements IAuth {
    Logout(): void {
        throw new Error("Method not implemented.");
    }

    IsLoggedIn():boolean{
        return DynamicPixels.token != "";
    }

    async LoginAsGuest<T extends LoginAsGuestParams>(input: T): Promise<LoginResponse> {
        try {
            let {data} = await axios.post<LoginResponse>(
                `${DynamicPixels._gameApiEndpoint}/api/auth/guest`,
                input,
                {});

            DynamicPixels.Configure(data.token, data.connection);
            return data;
        } catch (e :any) {
            throw new Error(e.response?.data)
        }
    }

    async LoginWithEmail<T extends LoginWithEmailParams>(input: T): Promise<LoginResponse> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/auth/email/login`,
                input,
                {});

            DynamicPixels.Configure(data.token, data.connection);
            return data;
        } catch (e :any) {
            throw new Error(e.response?.data)
        }
    }

    async LoginWithGoogle<T extends LoginWithGoogleParams>(input: T): Promise<LoginResponse> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/auth/oauth/google`,
                input,
                {});

            DynamicPixels.Configure(data.token, data.connection);
            return data;
        } catch (e :any) {
            throw new Error(e.response?.data)
        }
    }

    async LoginWithToken<T extends LoginWithTokenParams>(input: T): Promise<LoginResponse> {
        try {
            let {data} = await axios.post<LoginResponse>(
                `${DynamicPixels._gameApiEndpoint}/api/auth/login`,
                input,
                {});

            DynamicPixels.Configure(data.token, data.connection);
            return data;
        } catch (e :any) {
            throw new Error(e.response?.data)
        }
    }

    async RegisterWithEmail<T extends RegisterWithEmailParams>(input: T): Promise<LoginResponse> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/auth/email/register`,
                input,
                {});

            DynamicPixels.Configure(data.token, data.connection);
            return data;
        } catch (e :any) {
            throw new Error(e.response?.data)
        }
    }

    async IsOtaReady<T extends IsOtaReadyParams>(input: T): Promise<boolean> {
        try {
            let {data} = await axios.get(
                `${DynamicPixels._gameApiEndpoint}/api/auth/ota`,
                {}
            );
            return data;
        } catch (e :any) {
            throw new Error(e.response?.data)
        }
    }

    async SendOtaToken<T extends SendOtaTokenParams>(input: T): Promise<boolean> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/auth/ota`,
                input,
                {});
            return data;
        } catch (e :any) {
            throw new Error(e.response?.data)
        }
    }

    async VerifyOtaToken<T extends VerifyOtaTokenParams>(input: T): Promise<LoginResponse> {
        try {
            let {data} = await axios.post(
                `${DynamicPixels._gameApiEndpoint}/api/auth/ota/verify`,
                input,
                {});

            DynamicPixels.Configure(data.token, data.connection);
            return data;
        } catch (e :any) {
            throw new Error(e.response?.data)
        }
    }
}
