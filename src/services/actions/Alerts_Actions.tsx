import {Alert} from "../reducers/Alerts_Reducer";


export type AlertsActionsTypes =
| ReturnType<typeof showAlert>
| ReturnType<typeof deleteAlert>;

export const showAlert = (alert: Alert) =>
    ({
      type: "SHOW_ALERT",
      alert,
    } as const);

export const deleteAlert = (alert: Alert) =>
    ({
      type: "DELETE_ALERT",
        alert,
    } as const);


