import PropTypes from "prop-types";
import date from "@/utils/date";
import CamIcon from "@/icons/webcam.svg";
import ExternalIcon from "@/icons/external-link.svg";

export default function MessageMeet(props) {
  const { url, time } = props;

  return (
    <div className="message-meet">
      <div className="meet-inner d-flex">
        <div className="meet-icon">
          <CamIcon />
        </div>
        <div className="meet-caption ps-3">
          <h4 className="title">Online Meet</h4>
          <span className="meet-date">{date(time).full}</span>
        </div>
      </div>
      <div className="meet-url">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <ExternalIcon />
        </a>
      </div>
    </div>
  );
}

MessageMeet.propTypes = {
  url: PropTypes.string,
  time: PropTypes.string,
};