import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LeftSide } from "@/modules/common";
import AuthWrapper from "@/containers/AuthWrapper";
import Portal from "@/containers/Portal";
import AuthRoleWrapper from "@/containers/AuthRoleWrapper";
import { userRoles } from "@/context/constants";
import { getBootstrapData } from "@/store/actions";
import { DocStartConversation } from "@/modules/doctor";

const ClientStartConversation = dynamic(() =>
  import("@/modules/client").then((response) => response.ClientStartConversation)
);
const ClientMessageForm = dynamic(() =>
  import("@/modules/client").then((response) => response.ClientMessageForm)
);
const ClientMeetForm = dynamic(() =>
  import("@/modules/client").then((response) => response.ClientMeetForm)
);
const ClientInvestigationForm = dynamic(() =>
  import("@/modules/client").then((response) => response.ClientInvestigationForm)
);

export default function MainLayout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => dispatch(getBootstrapData()), [dispatch]);

  return (
    <AuthWrapper>
      <AuthRoleWrapper roles={[userRoles.get("client")]}>
        <Portal portalName="modalRoot">
          <ClientStartConversation />
          <ClientMessageForm />
          <ClientMeetForm />
          <ClientInvestigationForm />
        </Portal>
      </AuthRoleWrapper>
      <AuthRoleWrapper roles={[userRoles.get("doctor")]}>
        <Portal portalName="modalRoot">
          <DocStartConversation />
        </Portal>
      </AuthRoleWrapper>
      <div id="chat-columns">
        <LeftSide />
        {children}
      </div>
    </AuthWrapper>
  );
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};
