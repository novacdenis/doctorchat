import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import BackTitle from "@/components/BackTitle";
import useTabsContext from "@/packages/Tabs/hooks/useTabsContext";
import { leftSideTabs } from "@/context/TabsKeys";
import List from "@/components/List";
import SidebarList from "@/components/SidebarList";
import Button from "@/components/Button";
import { investigationFormToggleVisibility } from "@/store/slices/investigationFormSlice";
import Alert from "@/components/Alert";
import InvestigationItem from "@/components/InvestigationItem";

export default function ClientInvestigationsList() {
  const { updateTabsConfig } = useTabsContext();
  const { user } = useSelector((store) => ({ user: store.user }));
  const dispatch = useDispatch();

  const openInvestigationForm = useCallback(
    () => dispatch(investigationFormToggleVisibility(true)),
    [dispatch]
  );

  const removeInvestigation = useCallback((id) => {
    console.log(id);
  }, []);

  const editInvestigation = useCallback((id) => {
    console.log(id);
  }, []);

  return (
    <Sidebar>
      <Sidebar.Header>
        <BackTitle
          title="Anchete"
          onBack={updateTabsConfig(leftSideTabs.conversationList, "prev")}
        />
      </Sidebar.Header>
      <Sidebar.Body>
        <div className="scrollable scrollable-y profile-content-wrapper px-2">
          {/* <Alert
            type="error"
            message="Prentu a avea acces la doctorii de pe platforma DoctorChat este nevoie să adăugați cel puțin o anchetă"
          /> */}
          <List
            loadingConfig={{ disabled: true }}
            errorConfig={{ disabled: true }}
            emptyConfig={{
              status: !user.data.investigations,
              className: "pt-4",
              content: "Aici va apărea lista de anchete",
              extra: (
                <Button className="mt-3" onClick={openInvestigationForm}>
                  Adaugă o anchetă
                </Button>
              ),
            }}
          >
            <SidebarList
              component={InvestigationItem}
              data={user.data.investigations}
              componentProps={{
                withActions: true,
                onRemove: removeInvestigation,
                onEdit: editInvestigation,
              }}
            />
          </List>
          {!!user.data.investigations.length && (
            <div className="d-flex justify-content-center mt-4">
              <Button onClick={openInvestigationForm}>Adaugă o anchetă</Button>
            </div>
          )}
        </div>
      </Sidebar.Body>
    </Sidebar>
  );
}