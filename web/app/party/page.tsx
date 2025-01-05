"use client"

import {useEffect, useState} from "react";
import DynamicPixels from "../../../lib/DynamicPixels";
import {Party, PartyMember} from "../../../lib/dto/party";
import {UserScore} from "../../../lib/dto/leaderboard";

export default function PartyPage() {

    const [parties, setParties] = useState<Party[]>([]);
    const [selectedParty, setSelectedParty] = useState<Party>();
    const [selectedMembers, setSelectedMembers] = useState<PartyMember[]>([]);

    useEffect(() => {
        GetRows();
    }, []);

    const GetRows = async ()=>{
        let list = await DynamicPixels.Services.Party.GetParties({
            skip: 0,
            limit: 100,
        });

        setParties(list);
    }

    const ShowParty = async (partyID: number) => {
        let party = await DynamicPixels.Services.Party.GetPartyById({
           partyId: partyID
        });

        let members = await DynamicPixels.Services.Party.GetPartyMembers({
            limit: 25, partyId: partyID, skip: 0
        });

        setSelectedParty(party);
        setSelectedMembers(members);
    }

    return (
        <main>
            <div
                className="container align-items-center flex-column mb-3" style={{marginTop:"3em"}}>
                <div className="row mb-5">
                    <div className="col-sm-12 text-center mb-3">
                        <h1>Party</h1>
                    </div>
                    <div className="col-sm-12 col-lg-6 mb-3">
                        {selectedParty?.id ?
                            <>
                            <h4>{selectedParty?.name}</h4>
                            <h6>{selectedParty?.desc}</h6>
                            <hr/>

                            <table>
                                <tbody>
                                <tr>
                                    <td>Is Private</td>
                                    <td>
                                        {
                                            selectedParty?.is_private ?
                                                <span className="badge text-bg-primary">Yes</span>
                                                :
                                                <span className="badge text-bg-primary">No</span>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Max Member Count</td>
                                    <td>
                                        {
                                            selectedParty?.max_member_count
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Teams</td>
                                    <td>{
                                        selectedParty?.teams.split(",").map(team => <span
                                            className="badge text-bg-info">{team}</span>)
                                    }</td>
                                </tr>
                                <tr>
                                    <td>Channels</td>
                                    <td>{
                                        selectedParty?.channels.split(",").map(channel => <span
                                            className="badge text-bg-info">{channel}</span>)
                                    }</td>
                                </tr>
                                </tbody>
                            </table>

                            <button type="button" className="btn btn-primary">Request Join</button>
                            <button type="button" className="btn btn-danger">Leave</button>

                            <h4>Members</h4>

                            <table>
                                <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Name</td>
                                    <td>Team</td>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedMembers.map(member => <tr>
                                    <td>{member.id}</td>
                                    <td>{member.name}</td>
                                    <td>{member.teams}</td>
                                </tr>)}
                                </tbody>
                            </table>
                        </>
                            :
                        <h6 className="text-center">Select a party</h6>}
                    </div>
                    <div className="col-sm-12 col-lg-6 mb-3">
                        {parties.length > 0 && <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Desc</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {parties.map(row => <tr>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.desc}</td>
                                <td>
                                    <button type="button" className="btn btn-success"
                                            onClick={() => ShowParty(row.id)}>Show
                                    </button>
                                </td>
                            </tr>)}
                            </tbody>
                        </table>}
                    </div>

                </div>
            </div>
        </main>
    );
}