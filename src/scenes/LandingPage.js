import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  postSession,
  postUser,
  logout,
  get_unregisteredUser,
} from "../services/actions/Sessions_Action";
import { getDecisions } from "../services/actions/Decisions_Action";

class LandingPage extends Component {
  componentDidMount() {
    if (!this.props.security.validToken) {
      this.props.get_unregisteredUser();
    } else {
      if (this.props.security.user.registeredUser) {
        this.props.history.push("/decisions");
      } else {
        this.props.getDecisions();
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //change of user
    if (prevProps.security.user !== this.props.security.user) {
      this.props.getDecisions();
    }

    if (prevProps.decision.decisions !== this.props.decision.decisions) {
      const decisionsNumber = this.props.decision.decisions.length;
      if (decisionsNumber > 0) {
        this.props.history.push(
          "/decisions/" + this.props.decision.decisions[decisionsNumber - 1].id
        );
      }
    }
  }

  render() {
    return null;
  }
}

LandingPage.propTypes = {
  security: PropTypes.object.isRequired,
  decision: PropTypes.object.isRequired,
  getDecisions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  security: state.security,
  decision: state.decision,
});

export default connect(mapStateToProps, {
  get_unregisteredUser,
  getDecisions,
})(LandingPage);
