import {Users} from "../adapters/services/users";
import {Devices} from "../adapters/services/devices";
import {Leaderboards} from "../adapters/services/Leaderboards";
import {Achievements} from "../adapters/services/achievements";
import {Chats} from "../adapters/services/chats";
import {Friendships} from "../adapters/services/friendships";
import {UnlockAchievementParams} from "../adapters/services/requests/achievements";
import {
  AcceptRequestParams,
  GetMyFriendshipRequestParams,
  GetMyFriendsParams, RejectRequestParams,
  RequestFriendshipParams
} from "../adapters/services/requests/friendship";
import {
  DeleteAllMessageParams,
  DeleteMessageParams, DeleteMessagesOfUserParams,
  EditMessageParams,
  GetConversationMembersParams,
  GetConversationMessagesParams,
  GetSubscribedConversationsParams,
  SendParams,
  SubscribeParams,
  UnsubscribeParams
} from "../adapters/services/requests/chat";
import {EditCurrentUserParams, FindUsersParams, GetUserByIdParams} from "../adapters/services/requests/user";
import {RevokeDeviceParams} from "../adapters/services/requests/device";
import {
  GetMyFriendsScoresParams,
  GetMyScoreParams,
  GetScoresParams,
  SubmitScoreParams
} from "../adapters/services/requests/leaderboard";
import {User} from "../dto/user";
import {Leaderboard, PartyScore, Score, UserScore} from "../dto/leaderboard";
import { Friendship } from "../dto/friendship";
import {Achievement, Unlock} from "../dto/achievement";
import { Device } from "../dto/device";
import { Parties } from "../adapters/services/parties";
import {Party, PartyMember} from "../dto/Party";
import {
  AcceptJoiningParams,
  CreatePartyParams, EditPartyParams,
  GetPartiesParams, GetPartyByIdParams, GetPartyMembersParams, GetPartyWaitingMembersParams,
  GetSubscribedPartiesParams,
  JoinToPartyParams,
  LeavePartyParams, RejectJoiningParams, SetMemberVariablesParams
} from "../adapters/services/requests/party";

export class Services {
  public Users: IUsers = new Users();
  public Devices: IDevices = new Devices();
  public Leaderboards: ILeaderboards = new Leaderboards();
  public Achievements: IAchievements = new Achievements();
  public Chats: IChats = new Chats();
  public Party: IParty = new Parties();
  public Friendship: IFriendship = new Friendships();
}

export interface IUsers {
  FindUsers<T extends FindUsersParams>(input: T): Promise<User[]>
  GetCurrentUser(): Promise<User>
  GetUserById<T extends GetUserByIdParams>(input: T): Promise<User>
  EditCurrentUser<T extends EditCurrentUserParams>(input: T): Promise<User>
}

export interface IDevices {
  GetMyDevices(): Promise<Device[]>
  RevokeDevice<T extends RevokeDeviceParams>(input: T): Promise<void>
}

export interface ILeaderboards {
  GetLeaderboards(): Promise<Leaderboard[]>

  GetUsersScores<T extends GetScoresParams>(input: T): Promise<UserScore[]>
  GetPartiesScores<T extends GetScoresParams>(input: T): Promise<PartyScore[]>

  GetFriendsScores<T extends GetMyFriendsScoresParams>(input: T): Promise<UserScore[]>

  GetMyScore<T extends GetMyScoreParams>(input: T): Promise<UserScore>

  SubmitScore<T extends SubmitScoreParams>(input: T): Promise<Score>
}

export interface IAchievements {
  GetAchievements(): Promise<Achievement[]>
  UnlockAchievements<T extends UnlockAchievementParams>(input: T): Promise<void>
}

export interface IParty{
  GetParties<T extends GetPartiesParams>(input: T): Promise<Party[]>
  CreateParty<T extends CreatePartyParams>(input: T): Promise<Party>
  GetSubscribedParties<T extends GetSubscribedPartiesParams>(input: T): Promise<Party[]>
  JoinToParty<T extends JoinToPartyParams>(input: T): Promise<PartyMember>
  LeaveParty<T extends LeavePartyParams>(input: T): Promise<void>
  GetPartyById<T extends GetPartyByIdParams>(input: T): Promise<Party>
  GetPartyMembers<T extends GetPartyMembersParams>(input: T): Promise<PartyMember[]>
  SetMemberVariables<T extends SetMemberVariablesParams>(input: T): Promise<PartyMember>
  GetPartyWaitingMembers<T extends GetPartyWaitingMembersParams>(input: T): Promise<Party[]>
  EditParty<T extends EditPartyParams>(input: T): Promise<Party>
  AcceptJoining<T extends AcceptJoiningParams>(input: T): Promise<PartyMember>
  RejectJoining<T extends RejectJoiningParams>(input: T): Promise<PartyMember>
}

export interface IChats {
  Send<T extends SendParams>(): Promise<object>

  Subscribe<T extends SubscribeParams>(): void

  Unsubscribe<T extends UnsubscribeParams>(): void

  GetSubscribedConversations<T extends GetSubscribedConversationsParams>(): Promise<object[]>

  GetConversationMessages<T extends GetConversationMessagesParams>(): Promise<object[]>

  GetConversationMembers<T extends GetConversationMembersParams>(): Promise<object[]>

  EditMessage<T extends EditMessageParams>(): Promise<object>

  DeleteMessage<T extends DeleteMessageParams>(): Promise<object>

  DeleteAllMessage<T extends DeleteAllMessageParams>(): void

  DeleteMessagesOfUser<T extends DeleteMessagesOfUserParams>(): void
}

export interface IFriendship {
  GetMyFriends<T extends GetMyFriendsParams>(input: T): Promise<Friendship[]>

  GetMyFriendshipRequests<T extends GetMyFriendshipRequestParams>(input: T): Promise<object[]>

  RequestFriendship<T extends RequestFriendshipParams>(input: T): Promise<object>

  AcceptRequest<T extends AcceptRequestParams>(input: T): Promise<object>

  RejectRequest<T extends RejectRequestParams>(input: T): Promise<object>

  RejectAllRequests(): void

  DeleteFriend<T extends RequestFriendshipParams>(input: T): Promise<boolean>
}
