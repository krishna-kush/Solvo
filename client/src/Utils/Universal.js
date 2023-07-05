export const useQuery = (useLocation) => {
    return new URLSearchParams(useLocation().search);
}