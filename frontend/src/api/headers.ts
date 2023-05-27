import { USER_TOKEN } from "../constants/keys";

export const getFormDataHeader = () => {
    return {
        "Content-Type": "multipart/form-data",
        ...getAuthHeader(),
    };
};


export const getAuthHeader = () => {
    return {
        Authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
    };
};