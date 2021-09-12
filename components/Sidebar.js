import React from "react";
import {
  HomeIcon,
  UsersIcon,
  BellIcon,
  ChatIcon,
  CogIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import GroupIcon from "@material-ui/icons/Group";
import SidebarRow from "./HelperComponents/SidebarRow";

function Sidebar({ user, topDist, maxWidth }) {
  return (
    <div
      className={
        maxWidth
          ? `p-2 max-w-[400px] xl:min-w-[230px]  sticky xl:ml-6`
          : `p-2 max-w-[600px] xl:min-w-[300px] sticky xl:ml-6`
      }
      style={{
        alignSelf: "flex-start",
        top: topDist ? `${topDist}` : "4.5rem",
        fontFamily: "Inter",
      }}
    >
      <SidebarRow
        src={user.profilePicUrl}
        title={user.name}
        route={`/${user.username}`}
      />
      <SidebarRow
        Icon={UsersIcon}
        title="Following"
        route={`/user/${user._id}/following`}
      />
      <SidebarRow
        Icon={UserGroupIcon}
        title="Followers"
        route={`/user/${user._id}/followers`}
      />
      <SidebarRow
        Icon={BellIcon}
        title="Notifications"
        route={"/notifications"}
      />
      <SidebarRow Icon={ChatIcon} title="Messenger" route={"/chats"} />
    </div>
  );
}

export default Sidebar;
