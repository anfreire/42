import { GameSelection } from "..";
import { mySocket } from "../../../common/Socket";
import { UserProps } from "../../User";

export class GameUtils {
  static async createSoloGame(
    socket: mySocket,
    user: any,
    selection: GameSelection
  ) {
    const event = "game/create/solo";
    const body = {
      ...selection,
      studentId: user.studentId,
      on: "QUEUE",
    };
    const res = (await socket.subscribeOnce(event, body)) as any;
    return res.error ? null : res.data;
  }

  static joinQueue(
    socket: mySocket,
    user: UserProps,
    selection: GameSelection
  ) {
    const event = "game/queue";
    const body = {
      type: "DUO",
      mode: selection.mode,
      studentId: user.studentId,
      on: "QUEUE",
    };
    socket.send(event, body);
  }

  static leaveQueue(socket: mySocket, user: UserProps) {
    const event = "game/queue/leave";
    const body = {
      studentId: user.studentId,
    };
    socket.send(event, body);
  }

  static async getGames(socket: mySocket) {
    const event = "game/list";
    const body = {};
    return ((await socket.subscribeOnce(event, body)) as any).data;
  }
}
