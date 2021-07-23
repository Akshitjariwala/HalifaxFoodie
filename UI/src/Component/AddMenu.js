import React , {useState, Link, useEffect} from 'react'
import { saveMenuItem } from '../service';
import { useHistory } from "react-router-dom";
import Login from './Login'
import { useLocation } from "react-router-dom";



const AddMenu = () => {
    const history = useHistory();
    const location = useLocation();

    const[itemNameError,setuserItemNameError] = useState("");
    const[itemDescriptionError,setitemDescriptionError] = useState("");
    const[itemRecipeError,setitemRecipeError] = useState("");
    const[itemPriceError,setitemPriceError] = useState("");

    const[menuDish, setmenuDish] = useState({
        itemName:"",
        itemDescription:"",
        itemRecipe:"",
        itemPrice:"",
        restaurantName:location.resEmail
    });

    const initialState = () => {
        setuserItemNameError("")
        setitemDescriptionError("")
        setitemRecipeError("")
        setitemPriceError("")
        menuDish.itemName = ""
        menuDish.itemDescription = ""
        menuDish.itemRecipe = ""
        menuDish.restaurantName = ""
    }

    const inputEventMenuRegistration = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name,value)
        setmenuDish({...menuDish, [name] : value})
    }

    function validate(menuDish){

        let isValid  = true;
        if(menuDish.itemName === ""){
            setuserItemNameError("Please Enter Menu Item Name")
            isValid = false;
        }

        if(menuDish.itemDescription == ""){
            setitemDescriptionError("Please Enter Menu Item Description");
            isValid = false;
        }

        if(menuDish.itemRecipe == ""){
            setitemRecipeError("Please Enter Menu Item Recipe")
            isValid = false;
        }

        if(menuDish.itemPrice == ""){
            setitemPriceError("Please Enter Menu Item Price")
            isValid = false;
        }
        return isValid;
    }

    const handleRegister = async (event) => {
        event.preventDefault()
        if(validate(menuDish)) {
            console.log(menuDish);
            let res = await saveMenuItem(menuDish)
            console.log(res.status);
            if(res.status == 200){
               window.alert("Menu Item Successfully Added.")
               history.push("/RestaurantHome");
            } else {
                window.alert("Menu Item Registration Failed.")
            }
        }
    }

    const styles = {
        color: "white"
    };

    const dropDownStyle = {width:"945px"};
        return (
            <div class="container">
            <form class="form-horizontal" onSubmit={handleRegister}>
                <div class="form-group">
                <label class="control-label col-sm-2" for="itemName">Menu Item Name :</label>
                <div class="col-sm-10">
                <input type="type" 
                    class="form-control" 
                    id="itemName" 
                    placeholder="Enter Item Name" 
                    name="itemName"
                    onChange={inputEventMenuRegistration}
                    value={menuDish.itemName} />
                </div>
                <div style={{fontSize:12,color:'red',"margin-left":'210px'}}>{itemNameError}</div>
                </div>
                <div class="form-group">
                <label class="control-label col-sm-2" for="itemDescription">Description :</label>
                <div class="col-sm-10">
                 <input type="type" 
                    class="form-control" 
                    id="itemDescription" 
                    placeholder="Enter Item Description" 
                    name="itemDescription"
                    onChange={inputEventMenuRegistration}
                    value={menuDish.itemDescription} />
                </div>
                <div style={{fontSize:12,color:'red',"margin-left":'210px'}}>{itemDescriptionError}</div>
                </div>
             <div class="form-group">
               <label class="control-label col-sm-2" for="itemRecipe">Enter Recipe :</label>
               <div class="col-sm-10">
                 <input type="type" 
                    class="form-control" 
                    id="itemRecipe" 
                    placeholder="Enter Recipe"
                    name="itemRecipe"
                    onChange={inputEventMenuRegistration}
                    value={menuDish.itemRecipe}
                    />
               </div>
               <div style={{fontSize:12,color:'red',"margin-left":'210px'}}>{itemRecipeError}</div>
             </div>
    
             <div class="form-group">
               <label class="control-label col-sm-2" for="itemPrice">Enter Price (CA$) :</label>
               <div class="col-sm-10">
                 <input type="type" 
                    class="form-control" 
                    id="itemPrice" 
                    placeholder="Enter Item Price"
                    name="itemPrice"
                    onChange={inputEventMenuRegistration}
                    value={menuDish.itemPrice}
                    />
               </div>
               <div style={{fontSize:12,color:'red',"margin-left":'210px'}}>{itemPriceError}</div>
             </div>
                    <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                         <button type="submit" class="btn btn-default">Register</button>
                    </div>
                    </div>
                </form>
            </div>
          );
    }

export default AddMenu;