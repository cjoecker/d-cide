import axios from "axios";

export function getValueSafe(fn) {
    try {
        return fn();
    } catch (e) {
        return null;
    }
}
