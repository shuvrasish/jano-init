import React from 'react'
import "./SwipeButtons.css"
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReplayIcon from '@material-ui/icons/Replay';
import CancelIcon from '@material-ui/icons/Cancel';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import IconButton from '@material-ui/core/IconButton';


function SwipeButtons() {
    return (
        <div className="swipeButtons">
                <IconButton className="swipeButtons_fav"  onClick={() => console.log("Replay")}>
                    <FavoriteIcon fontSize="large"/>
                </IconButton> 
                <IconButton className="swipeButtons_rep" onClick={() => console.log("Replay")}>
                    <ReplayIcon fontSize="large"/>
                </IconButton> 
                <IconButton className="swipeButtons_canc" onClick={() => console.log("Cancel")}>
                    <CancelIcon fontSize="large"/>
                </IconButton> 
                <IconButton className="swipeButtons_loc" onClick={() => console.log("Bookmark")}>
                    <LocalLibraryIcon fontSize="large"/>
                </IconButton> 
                <IconButton className="swipeButtons_what" onClick={() => console.log("Whatsapp")}> 
                    <WhatsAppIcon fontSize="large"/>
                </IconButton>        
                

                {/* <IconButton className="swipeButtons_what" onClick={this.handleClick}>
                    <WhatsAppIcon fontSize="large" />
                </IconButton>
                <IconButton className="swipeButtons_rep" onClick={() => console.log("Replay")}>
                    <ReplayIcon fontSize="large" />
                </IconButton>
                <IconButton className="swipeButtons_canc" onClick={() => this.swipe('left')}>
                    <CancelIcon fontSize="large" />
                </IconButton>
                <IconButton className="swipeButtons_fav" onClick={() => this.swipe('right')}>
                    <FavoriteIcon fontSize="large" />
                </IconButton>
                <IconButton className="swipeButtons_loc" onClick={() => console.log("Bookmark")}>
                    <LocalLibraryIcon fontSize="large" />
                </IconButton>  
            
            
             */}
            
            </div>
    )
}

export default SwipeButtons
