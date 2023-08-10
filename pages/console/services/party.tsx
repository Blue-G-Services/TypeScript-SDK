import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import DynamicPixels from "../../../Sdk/DynamicPixels";
import {CreatePartyParams} from "../../../Sdk/adapters/services/requests/party";
import {Party, PartyMember} from "../../../Sdk/dto/party";

function PartyPage() {
    const router = useRouter();

    const [list, setList] = useState<Party[]>([]);
    const [subscribed, setSubscribed] = useState<Party[]>([]);
    const [query, setQuery] = useState("");
    const [selectedParty, setSelectedParty] = useState<Party>(new Party());
    const [selectedPartyMember, setSelectedPartyMember] = useState<PartyMember[]>([]);

    useEffect(() => {
        (async ()=> {
            if (localStorage.getItem("token") == null)
                router.push("/");
            else if (DynamicPixels.token == "")
                await DynamicPixels.Auth.LoginWithToken({
                    token: localStorage.getItem("token") || ""
                })

            await getParties("");
            await getSubscribedParties("");
        })()
    }, [router]);

    async function getParties(query: string) {
        setQuery(query);

        let list = await DynamicPixels.Services.Party.GetParties({
            query: query,
            skip: 0,
            limit: 25
        });

        setList(list);
    }

    async function getSubscribedParties(query: string) {
        setQuery(query);

        let list = await DynamicPixels.Services.Party.GetSubscribedParties({
            query: query,
            skip: 0,
            limit: 25
        });

        setSubscribed(list);
    }

    async function JoinRequest(party: Party) {
        await DynamicPixels.Services.Party.JoinToParty({
            partyId: party.id,
            team: "",
            channels: []
        });
        await getSubscribedParties("");
    }

    async function LeaveParty(party: Party){
        await DynamicPixels.Services.Party.LeaveParty({
            partyId: party.id
        });
        await getSubscribedParties("");
    }

    async function CreateParty(){
        await DynamicPixels.Services.Party.CreateParty( new CreatePartyParams({
                name:"my new party",
        }))
    }

    async function SelectParty(partyId: number){
        let p = await DynamicPixels.Services.Party.GetPartyById({
            partyId
        });
        setSelectedParty(p);

        let members = await DynamicPixels.Services.Party.GetPartyMembers({
            partyId,
            skip:0, limit:25
        });
        setSelectedPartyMember(members);
    }

    return <>
        <main className="container" style={{marginTop:40}}>
            <div className="row mb-3">
                    <h1>DynamicPixels</h1>
                    <h3>Parties</h3>
                </div>

                <div className="row">
                    <div className="col-sm-12 col-lg-4">
                        <button className="btn btn-primary" onClick={CreateParty}>Create</button>
                        <div className="card mb-3">
                            <div className="card-body">
                                <input type="text" className="form-control" placeholder="Parties name" value={query} onChange={(e)=>getParties(e.currentTarget.value)}/>
                            </div>
                        </div>
                        <table className="table">
                            <tbody>
                            {list.map(party=><tr key={`party-${party.id}`}>
                                <td>{party.id}</td>
                                <td>{party.name}</td>
                                <td>{party.max_member_count}</td>
                                <td><button className="btn btn-primary" onClick={()=> JoinRequest(party)}>Join</button></td>
                            </tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-12 col-lg-4">
                        <table className="table">
                            <tbody>
                            {subscribed.map(party=><tr key={`subscribed-${party.id}`}>
                                <td>{party.id}</td>
                                <td><a href="#" onClick={() => SelectParty(party.id)}>{party.name}</a></td>
                                <td>{party.max_member_count}</td>
                                <td>
                                    <div className="btn-group" role="group" aria-label="Basic example">
                                        <button className="btn btn-primary" onClick={()=> LeaveParty(party)}>Leave</button>
                                        <button className="btn btn-primary" onClick={()=> SelectParty(party.id)}>Select</button>
                                    </div>
                                    </td>
                            </tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-sm-12 col-lg-4">
                        <div className="card">
                            <div className="card-body">
                                <h4>{selectedParty.name}</h4>
                                <p>{selectedParty.desc}</p>
                            </div>

                            <table className="table">
                                <tbody>
                                {selectedPartyMember.map(member => <tr key={`member-${member.id}`}>
                                    <td>{member.id}</td>
                                    <td>{member.name}</td>
                                    <td>{member.status ? "Accepted":"Waiting"}</td>
                                </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        </main>
    </>

}

export default PartyPage;