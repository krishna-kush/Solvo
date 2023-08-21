import { followApi, unFollowApi } from '../../API/follow'


export const follow = async (who, whom) => {
    const data = await followApi(who, whom);

    if (data.status===200) {
        return (dispatch) => {
            dispatch({
                type: 'ADD_FOLLOWING',
                source: 'follow',
                payload: whom,
            })
        }
    } else {return data.status}
}
export const unFollow = async (who, whom) => {
    const data = await unFollowApi(who, whom);
    
    if (data.status===200) {
        return (dispatch) => {
            dispatch({
                type: 'REMOVE_FOLLOWING',
                source: 'follow',
                payload: whom,
            })
        }
    } else {return data.status}
}