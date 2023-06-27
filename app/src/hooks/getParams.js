import { useParams } from "react-router-dom";

export default function useQuery() {
    const { uid, token } = useParams();
    return { uid, token };
}
