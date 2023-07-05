export const searchHandler = (input, navigate) => {
    const search = input.trim()
    if (search) {
      navigate(`/feed?searchQuery=${search}`) // navigate is a async function...
    } else {
      navigate('/')
    }
}