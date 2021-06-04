import React from "react";
import database from "./firebase";
import "./Cards.css";
import "./SwipeButtons.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CancelIcon from "@material-ui/icons/Cancel";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import IconButton from "@material-ui/core/IconButton";
import FeedbackIcon from "@material-ui/icons/Feedback";
import LanguageIcon from "@material-ui/icons/Language";
import firebase from "firebase/app";
import "firebase/analytics";
import { Swipeable, direction } from "react-deck-swiper";
import { Helmet } from "react-helmet";
import ShareIcon from "@material-ui/icons/Share";
import MetaTags from "react-meta-tags";

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.withoutlogin = database.collection("CardsWithoutLogin");
    this.withlogin = database
      .collection("CardsWithLogin")
      .orderBy("sid", "asc");
    this.users = database.collection("Users");
    this.unsubscribe = null;
    this.state = {
      cards: [],
      liked: [],
      disliked: [],
      totalshare: 0,
      totalfeedback: 0,
      totallikes: 0,
      totaldislikes: 0,
    };
  }

  componentDidMount() {
    this.unsubscribe = this.withoutlogin.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const cards = [];

    querySnapshot.forEach((doc) => {
      const {
        categories,
        heading,
        id,
        image_links,
        main_category,
        ns,
        pageid,
        reference,
        sid,
        subheading,
        summary,
        webpage_url,
      } = doc.data();
      if (
        !(this.state.liked.includes(id) || this.state.disliked.includes(id))
      ) {
        cards.push({
          key: doc.id,
          doc, // DocumentSnapshot
          categories,
          heading,
          id,
          image_links,
          main_category,
          ns,
          pageid,
          reference,
          sid,
          subheading,
          summary,
          webpage_url,
        });
      }
    });
    //console.log("Cards on screen: "+cards.length)
    this.setState({
      cards: [...this.state.cards, ...cards.slice(0, 5)],
    });
    console.log("Cards on screen: " + this.state.cards.length);
    //this.cardsanalytics()
  };

  swiped = (swipeDirection) => {
    var arry = this.state.cards;
    var cardid = arry[arry.length - 1].id;

    console.log(cardid + " swiped " + swipeDirection);

    arry.pop();
    this.setState({ cards: arry });
  };

  render() {
    return (
      <div className="App">
        {this.state.cards.map((cards) => (
          <div key={cards.id} id={cards.id}>
            <MetaTags>
              <title>{cards.heading}</title>
              <meta name="description" content={cards.subheading} />
            </MetaTags>
            <Swipeable
              onSwipe={this.swiped}
              renderButtons={({ left, right }) => (
                <div className="btn">
                  <div className="swipeButtons">
                    <IconButton
                      className="swipeButtons_rep"
                      href="https://docs.google.com/forms/u/2/d/e/1FAIpQLSdzFp8LdIP4cOHMs6mMSXXALHm1n-DXo1HHxQPBM8SYX96n7Q/viewform?embedded=true"
                      onClick={this.feedback}
                    >
                      <FeedbackIcon fontSize="large" />
                    </IconButton>

                    <IconButton className="swipeButtons_canc" onClick={left}>
                      <CancelIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      className="swipeButtons_web"
                      onClick={this.handleWeb}
                    >
                      <LanguageIcon fontSize="large" />
                    </IconButton>
                    <IconButton className="swipeButtons_fav" onClick={right}>
                      <FavoriteIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      className="swipeButtons_what"
                      onClick={this.handleShare}
                      data-action="share/whatsapp/share"
                    >
                      <ShareIcon fontSize="large" />
                    </IconButton>
                  </div>
                </div>
              )}
            >
              <div className="card">
                <div className="buttonFalse">
                  <img src={cards.image_links[0]} alt={cards.heading} />
                </div>
                <div className="post-content">
                  <div className="category">
                    <mark className="highlight">
                      {" "}
                      {"  #" + cards.main_category + "  "}{" "}
                    </mark>
                  </div>
                  <h1 className="title">{cards.heading}</h1>
                  <div className="sub_title">
                    <p>{cards.subheading}</p>
                  </div>

                  <hr className="solid"></hr>

                  <p className="descriptionn">
                    {cards.summary.replace(/@n/gi, "\n\n•")}
                    <br />
                    <br />
                    <b>{cards.reference}</b>
                  </p>
                </div>
              </div>
            </Swipeable>
          </div>
        ))}
      </div>
    );
  }
}

export default Cards;
