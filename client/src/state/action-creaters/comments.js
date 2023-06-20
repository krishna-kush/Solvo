import { getAll } from "../../API/comments"

export const comment = () => {
    let data = getAll()
    console.log(data);
}