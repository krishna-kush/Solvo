import { followApi, unFollowApi } from '../../API/follow'


export const follow = async (whoId, followingID, whomId, whomSource) => {
    const data = await followApi(whoId, followingID, whomId, whomSource);

    if (data.status===200) {
        return (dispatch) => {
            dispatch({
                type: 'ADD_FOLLOWING',
                source: 'follow',
                payload: whomId,
            })
        }
    } else {return data.status}
}
export const unFollow = async (whoId, followingID, whomId, whomSource) => {
    const data = await unFollowApi(whoId, followingID, whomId, whomSource);
    
    if (data.status===200) {
        return (dispatch) => {
            dispatch({
                type: 'REMOVE_FOLLOWING',
                source: 'follow',
                payload: whomId,
            })
        }
    } else {return data.status}
}