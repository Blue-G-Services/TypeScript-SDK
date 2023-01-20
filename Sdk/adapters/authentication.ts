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
import Meteor from "../BlueG";

export class Auth implements IAuth {
    async LoginAsGuest<T extends LoginAsGuestParams>(input: T): Promise<LoginResponse> {
        try {
            let {data} = await axios.post<LoginResponse>(
                `${Meteor._gameApiEndpoint}/api/auth/guest`,
                input,
                {});

            Meteor.token = data.token;
            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async LoginWithEmail<T extends LoginWithEmailParams>(input: T): Promise<LoginResponse> {
        try {
            let {data} = await axios.post(
                `${Meteor._gameApiEndpoint}/api/auth/email/login`,
                input,
                {});
            Meteor.token = data.token;
            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async LoginWithGoogle<T extends LoginWithGoogleParams>(input: T): Promise<LoginResponse> {
        try {
            let {data} = await axios.post(
                `${Meteor._gameApiEndpoint}/api/auth/oauth/google`,
                input,
                {});

            Meteor.token = data.token;
            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async LoginWithToken<T extends LoginWithTokenParams>(input: T): Promise<void> {
        Meteor.token = input.token;
    }

    async RegisterWithEmail<T extends RegisterWithEmailParams>(input: T): Promise<LoginResponse> {
        try {
            let {data} = await axios.post(
                `${Meteor._gameApiEndpoint}/api/auth/email/register`,
                input,
                {});

            Meteor.token = data.token;
            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async IsOtaReady<T extends IsOtaReadyParams>(input: T): Promise<boolean> {
        try {
            let {data} = await axios.get(
                `${Meteor._gameApiEndpoint}/api/auth/ota`,
                {}
            );
            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async SendOtaToken<T extends SendOtaTokenParams>(input: T): Promise<boolean> {
        try {
            let {data} = await axios.post(
                `${Meteor._gameApiEndpoint}/api/auth/ota`,
                input,
                {});
            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }

    async VerifyOtaToken<T extends VerifyOtaTokenParams>(input: T): Promise<LoginResponse> {
        try {
            let {data} = await axios.post(
                `${Meteor._gameApiEndpoint}/api/auth/ota/verify`,
                input,
                {});
            Meteor.token = data.token;
            return data;
        } catch (e :any) {
            throw new Error(e.response.data)
        }
    }
}
