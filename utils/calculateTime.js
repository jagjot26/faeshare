import moment from "moment";
import Moment from "react-moment";

const calculateTime = (createdAt) => {
  const today = moment(Date.now());
  const postDate = moment(createdAt);
  const diffInHours = today.diff(postDate, "hours");

  if (diffInHours < 24) {
    return (
      <>
        {/* hh:mm A -> hours:minutes AM/PM */}
        Today <Moment format="hh:mm A">{createdAt}</Moment>
      </>
    );
  } else if (diffInHours > 24 && diffInHours < 36) {
    return (
      <>
        Yesterday <Moment format="hh:mm A">{createdAt}</Moment>
      </>
    );
  } else if (diffInHours > 36) {
    return (
      <>
        {/* date/month/year along with time */}
        <Moment format="DD MMM YYYY, hh:mm A">{createdAt}</Moment>
      </>
    );
  }
};

export default calculateTime;
