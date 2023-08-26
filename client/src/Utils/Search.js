export const searchHandler = (input, navigate) => {
    const search = input.trim()
    if (search) {
      navigate(`/feed?searchQuery=${search}`) // navigate is a async function...
    } else {
      navigate('/')
    }
}
    
export const searchPost = ({list, key, value, new_value=null, what=null, inc=null, source}) => {

    return list.map((item) => {

        if (item[key] === value) {
            switch (source) {
                case 'upComment': {
                    const new_childComments = [...item.childComments, new_value]
                    return { ...item, childComments: new_childComments };
                }
                case 'showComments':
                    return { ...item, childComments: new_value }
                case 'increment': 
                    return { ...item, [what]: { ...item[what], count: item[what].count + inc } };
                case 'deleteComment':
                    return null;
            }

        } else if (item.childComments && Array.isArray(item.childComments) && item.childComments.length) {
            switch (source) {
                case 'upComment': {
                    return { ...item, childComments: searchPost({ list: item.childComments, key, value, new_value, source })};
                }
                case 'showComments': {
                    return { ...item, childComments: searchPost({ list: item.childComments, key, value, new_value, source })};
                }
                case 'increment': 
                    return {
                        ...item,
                        childComments: searchPost({ list: item.childComments, key, value, what, inc, source }),
                    };
                case 'deleteComment':{
                    return { ...item, childComments: searchPost({ list: item.childComments, key, value, new_value, source })}
                }
            }

        } else {
            return item;
        }

    }).filter(item => item !== null);
}