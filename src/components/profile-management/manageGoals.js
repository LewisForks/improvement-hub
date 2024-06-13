import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const ManageGoals = () => {
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    if (!user) {
        navigate("/signin");
        return null;
    }
    
    return (
        <div>Hello there</div>
    );
};