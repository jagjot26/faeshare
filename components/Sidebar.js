import React from "react";
import {
  HomeIcon,
  UsersIcon,
  BellIcon,
  ChatIcon,
  CogIcon,
} from "@heroicons/react/solid";
import GroupIcon from "@material-ui/icons/Group";
import SidebarRow from "./SidebarRow";

function Sidebar({ user }) {
  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px] ">
      <SidebarRow
        src={user.profilePicUrl}
        title={user.name}
        route={`/${user.username}`}
      />
      <SidebarRow Icon={UsersIcon} title="Following" route={"/following"} />
      <SidebarRow
        Icon={BellIcon}
        title="Notifications"
        route={"/notifications"}
      />
      <SidebarRow Icon={ChatIcon} title="Messages" route={"/messages"} />
    </div>
  );
}

export default Sidebar;
