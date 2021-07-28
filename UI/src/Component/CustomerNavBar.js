import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { logoutUser } from '../service';

const CustomerNavBar = () => {
    const location = useLocation();
    const history = useHistory();

    const logOutEvent = async (event) => {
        let response = await logoutUser()
        console.log(response.status);
        if (response.status == 200) {
            history.push("/login");
        } else {
            window.alert("Sign Out Failed!!")
        }
    }
    return (
        <div className="homenav">
            <Link to='/customerHome'>Home</Link>
            <Link to='/chatHome'>Chat</Link>
            <Link to='/restaurantList'>Restaurants</Link>
            <Link to='/orders'>Orders</Link>
			<a href = 'http://wordcloud-env.eba-mrxri8ve.us-east-1.elasticbeanstalk.com/'>Feedback</a>  
            <Link  onClick={logOutEvent}>Logout</Link>
        </div>
    );
}

export default CustomerNavBar;