import { asyncGetRoomHistory, asyncSetRoomHistory } from "./asyncStorage";

const updateRoomHistory = async (data: {
  code: string;
  optionListName: string;
}) => {
  const roomHistory = await asyncGetRoomHistory();
  const index = roomHistory.findIndex((history) => history.code === data.code);
  let newRoomHistory = [];
  if (index > -1) {
    newRoomHistory = [
      { code: data.code, optionListName: data.optionListName },
      ...roomHistory.slice(0, index),
      ...roomHistory.slice(index + 1, roomHistory.length),
    ].slice(0, 5);
  } else {
    newRoomHistory = [
      { code: data.code, optionListName: data.optionListName },
      ...roomHistory,
    ].slice(0, 5);
  }
  await asyncSetRoomHistory(newRoomHistory);
  return newRoomHistory;
};

export default updateRoomHistory;
