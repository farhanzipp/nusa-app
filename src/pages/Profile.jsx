
import { Button } from "@mui/material";
import SignInSide from "./SignInSide";
export default function Profile() {
    const token = localStorage.getItem('accessToken');
    const userData = JSON.parse(localStorage.getItem('user'));
  
    if(!token) {
        return <SignInSide />
    }

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        window.location.href = "/";
    };
  return (
    <div>
        <h1>Welcome {userData.username}</h1>
        <Button 
            variant="outlined"
            onClick={handleLogout}
        >
            Logout
        </Button>
    </div>
  )
} 
