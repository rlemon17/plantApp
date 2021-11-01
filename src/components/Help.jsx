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
            <p>This web app helps you keep track of watering and fertilizing your houseplants! You will be generated your own personal link after registering an account: https://lemon-plantcare.herokuapp.com/(username). You can re-visit
                this link at any time to access your database. This site is also mobile-friendly :)
            </p>

            <h2>Your Account</h2>
            <img className="help-img" alt="username" src="https://raw.githubusercontent.com/rlemon17/plantApp/main/public/photos/url.png"/>
            <p>You can access your personal plant database by registering an account and logging in on the home page. You can also
                append "/username" to the home URL to access your page. For example, my database is accessed by going to "https://lemon-plantcare.herokuapp.com/ryan".</p>
            <p>Usernames are NOT case-sensitive (but your passwords are!), and registering an account will fail if the username is already taken. Your accounts are stored in my
                server, but I have encrypted your passwords so I cannot see them.
            </p>
            <p>You will stay logged in unless you restart your browser or click the logout button.</p>

            <h2>Adding a Plant</h2>
            <p>
                <img className="help-img" alt="adding" src="https://raw.githubusercontent.com/rlemon17/plantApp/main/public/photos/add.png"/>
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
            <img className="help-img" alt="viewing" src="https://raw.githubusercontent.com/rlemon17/plantApp/main/public/photos/plantHome.png"/>
            <p>After adding your plants, you will see them all rendered on your username page, or by clicking on "Plants" in the navbar.</p>
            <p>The website will determine the next date you should water each of your plants, and sort them in order of who needs watering first. Plants who need to be watered
                will have a <span className="example-highlight">highlighted background</span>.
            </p>

            <h2>Editing/Watering your Plants</h2>
            <img className="help-img" alt="editing" src="https://raw.githubusercontent.com/rlemon17/plantApp/main/public/photos/plantEdit.png"/>
            <p>To edit any of your plants (if you just watered them, for example), you can update their data fields by clicking on the <EditIcon/> edit icon in the 
            bottom right corner of each plant.</p>
            <p>An interface will pop up, very similar to the interface when adding a plant. Update the fields as necessary, then click the <SaveIcon/> save icon.
            You can also click cancel to undo any changes.</p>

            <h2>Deleting a Plant</h2>
            <p>In the editing interface of a plant, you can click on the <DeleteIcon/> delete icon to remove it from your page.</p> 
            <img className="help-img" alt="deleting" src="https://raw.githubusercontent.com/rlemon17/plantApp/main/public/photos/add.png"/>
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
