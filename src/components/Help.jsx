import React from "react";
import Header from "./Header";
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

const Help = () => {
  return (
    <div>
        <Header welcomeMode={true}/>
        <form id="help-page" className="create-plant">
            <h2>How to Use</h2>
            <p>This web app helps you keep track of watering and fertilizing your houseplants! You will be generated your own personal link after submitting a name/username, which you can re-visit
                at any time to access your database. The site is also mobile-friendly :)
            </p>

            <h2>Your Username</h2>
            <img className="help-img" alt="username" src="https://scontent-lax3-2.xx.fbcdn.net/v/t1.15752-9/240904258_240968484599178_168892069723026118_n.png?_nc_cat=100&ccb=1-5&_nc_sid=ae9488&_nc_ohc=jIr8bJOtL8QAX_rSHJn&_nc_ht=scontent-lax3-2.xx&oh=f959ee808e6eabd3a963ec3079c0601f&oe=6159DB3C"/>
            <p>You can access your personal plant database by entering your name/username on the home page. Alternatively, you can
                append "/username" to the URL. For example, you can view my plants by heading to "https://lemon-plantcare.herokuapp.com/ryan". This
                will hopefully making bookmarking your personal link easier!</p>
            <p>As a result, note that anyone can access my plants using that link. Usernames are NOT unique by ip address, so be careful using a common name or username. Usernames are also NOT case-sensitive.</p>
            <p>Please refrain from editing plant databases that aren't yours! This website will only be shared with my family and friends, so hopefully this shouldn't really be a problem :)</p>
            <p>(I will hopefully add passwords in the future to help solve all of this though!)</p>

            <h2>Adding a Plant</h2>
            <p>
                <img className="help-img" alt="adding" src="https://scontent-lax3-2.xx.fbcdn.net/v/t1.15752-9/240385820_2132262993600444_1338834420261850684_n.png?_nc_cat=103&ccb=1-5&_nc_sid=ae9488&_nc_ohc=VQnxpKsh7lwAX_yioCf&_nc_ht=scontent-lax3-2.xx&oh=4bb17a9d00901bcb87cdc2d764e68ccf&oe=6157C7A7"/>
                You can add a plant at any time by clicking the "Add Plant" button on the right side of your page. It will then ask you for various fields:
            </p>

                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-3">
                            <strong>Name</strong>
                        </div>
                        <div className="col-6">
                            Your plant's name!
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-3">
                            <strong>Last Watered On</strong>
                        </div>
                        <div className="col-6">
                            Input the day you last watered this plant using the calendar interface
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-3">
                            <strong>Watering Frequency</strong>
                        </div>
                        <div className="col-6">
                            How often you (should) water your plant, in days. Typically it's 7-14, but varies from plant to plant - do your research!
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-3">
                            <strong>Last Fertilized On</strong>
                        </div>
                        <div className="col-6">
                            Input the day you last fertilized this plant. 
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-3">
                            <strong>Image URL</strong>
                        </div>
                        <div className="col-6">
                            <p>Copy and paste an image of your plant (currently URL links only)! You can use google images or upload a photo yourself to a photo sharing website, and using the link they provide you.</p>
                            <p>A little trick I use is sending a photo to myself in Facebook messenger, and using that photo's link after it uploads. I'll hopefully add an uploading feature to this website soon though.</p>
                        </div>
                    </div>
                </div>
            <p>
                After filling out all fields, click the <AddCircleIcon/> add icon to confirm and add your plant! You may also cancel at any time to close the interface.
            </p>

            <h2>Viewing your Plants</h2>
            <img className="help-img" alt="viewing" src="https://scontent-lax3-2.xx.fbcdn.net/v/t1.15752-9/240394749_586341515708623_320653514617813320_n.png?_nc_cat=101&ccb=1-5&_nc_sid=ae9488&_nc_ohc=WEyVkpmFX0MAX9lCDhh&_nc_ht=scontent-lax3-2.xx&oh=a71cd37912acea605798130d60879cd5&oe=61585722"/>
            <p>After adding your plants, you will see them all rendered on your username page, displaying the data you entered.</p>
            <p>The website will determine the next date you should water each of your plants, and sort them in order of who needs watering first. Plants who need to be watered
                will have a <span className="example-highlight">highlighted background</span>.
            </p>

            <h2>Editing/Watering your Plants</h2>
            <img className="help-img" alt="editing" src="https://scontent-lax3-1.xx.fbcdn.net/v/t1.15752-9/240444772_1991015924431725_6825209004022939751_n.png?_nc_cat=104&ccb=1-5&_nc_sid=ae9488&_nc_ohc=n5hHS51o2IwAX-iubl1&_nc_ht=scontent-lax3-1.xx&oh=6aa0e6ccf11a7507d7b4bc2168b0a28d&oe=615591CE"/>
            <p>To edit any of your plants (if you just watered them, for example), you can update their data fields by clicking on the <EditIcon/> edit icon in the 
            bottom right corner of each plant.</p>
            <p>An interface will pop up, very similar to the interface when adding a plant. Update the fields as necessary, then click the <SaveIcon/> save icon.
            You can also click cancel to undo any changes.</p>

            <h2>Deleting a Plant</h2>
            <p>In the editing interface of a plant, you can click on the <DeleteIcon/> delete icon to remove it from your page.</p> 
            <img className="help-img" alt="deleting" src="https://scontent-lax3-2.xx.fbcdn.net/v/t1.15752-9/240396057_460083094975979_8010989265160620541_n.png?_nc_cat=101&ccb=1-5&_nc_sid=ae9488&_nc_ohc=WAuU5gfTOHEAX-r0Zoq&_nc_ht=scontent-lax3-2.xx&oh=fb3a64c88048d68f1a1a814eb7448710&oe=6155791E"/>
            <p>If you made a mistake or changed your mind, a <strong>one-time </strong>
             "undo delete" button will show up on the right of your page, under the add plant button. Clicking this will bring back the most recently deleted plant.</p>

            <h2>Contact Me!</h2>
            <p>Please contact me for any bugs, feedback, questions, or suggestions you may have! I made this website entirely based on what I prioritize when taking care of my plants,
                so it's super biased. Would love to hear from y'all and make this website more accessible!
            </p>
            <p>Thank you, and hope you enjoy our website :) - Ryan and Meelo</p>
            <img className="help-img" alt="ryan-and-meelo" src="../Plant.gif"/>

        </form>
    </div>
  );
}

export default Help;
