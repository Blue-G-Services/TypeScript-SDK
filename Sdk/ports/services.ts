import {Users} from "../adapters/services/users";
import {Devices} from "../adapters/services/devices";
import {Leaderboards} from "../adapters/services/Leaderboards";
import {Achievements} from "../adapters/services/achievements";
import {Chats} from "../adapters/services/chats";
import {Friendship} from "../adapters/services/friendships";
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

export class Services {
  public Users: IUsers = new Users();
  public Devices: IDevices = new Devices();
  public Leaderboards: ILeaderboards = new Leaderboards();
  public Achievements: IAchievements = new Achievements();
  public Chats: IChats = new Chats();
  public Friendship: IFriendship = new Friendship();
}

export interface IUsers {
  FindUsers<T extends FindUsersParams>(input: T): Promise<object[]>
  GetCurrentUser(): Promise<object>
  GetUserById<T extends GetUserByIdParams>(input: T): Promise<object>
  EditCurrentUser<T extends EditCurrentUserParams>(input: T): Promise<object>
}

export interface IDevices {
  GetMyDevices(): Promise<object[]>
  RevokeDevice<T extends RevokeDeviceParams>(input: T): Promise<object>
}

export interface ILeaderboards {
  GetLeaderboards(): Promise<object[]>

  GetScores<T extends GetScoresParams>(input: T): Promise<object[]>

  GetFriendsScores<T extends GetMyFriendsScoresParams>(input: T): Promise<object[]>

  GetMyScore<T extends GetMyScoreParams>(input: T): Promise<object>

  SubmitScore<T extends SubmitScoreParams>(input: T): Promise<object>
}

export interface IAchievements {
  GetAchievements(): Promise<object[]>
  GetUserAchievements(): Promise<object[]>
  UnlockAchievements<T extends UnlockAchievementParams>(input: T): Promise<void>
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
  GetMyFriends<T extends GetMyFriendsParams>(input: T): Promise<object[]>

  GetMyFriendshipRequests<T extends GetMyFriendshipRequestParams>(input: T): Promise<object[]>

  RequestFriendship<T extends RequestFriendshipParams>(input: T): Promise<object>

  AcceptRequest<T extends AcceptRequestParams>(input: T): Promise<object>

  RejectRequest<T extends RejectRequestParams>(input: T): Promise<object>

  RejectAllRequests(): void

  DeleteFriend<T extends RequestFriendshipParams>(input: T): Promise<boolean>
}
