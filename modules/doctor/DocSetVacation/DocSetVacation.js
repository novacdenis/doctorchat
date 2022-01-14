import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Popup from "@/components/Popup";
import MenuItem from "@/components/Menu/MenuItem";
import PalmIcon from "@/icons/palm.svg";
import Portal from "@/containers/Portal";
import Form from "@/components/Form";
import DatePicker from "@/packages/DatePicker";
import Button from "@/components/Button";
import Confirm from "@/components/Confirm";
import { notification } from "@/store/slices/notificationsSlice";
import api from "@/services/axios/api";
import { updateUserProperty } from "@/store/slices/userSlice";

export default function DocSetVacation() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((store) => store.user.data);
  const form = useForm({ defaultValues: { range: null } });
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const openSetVacationForm = () => setIsOpen(true);

  const clearVacation = useCallback(async () => {
    try {
      await api.user.resetVacation();
      dispatch(updateUserProperty({ prop: "vacation", value: null }));
      dispatch(
        notification({ type: "success", title: "success", descrp: "data_updated_with_success" })
      );
      form.reset();
      return Promise.resolve();
    } catch (error) {
      dispatch(notification({ type: "error", title: "error", descrp: "default_error_message" }));
      return Promise.reject();
    }
  }, [dispatch, form]);

  const onSubmitHandler = useCallback(
    async (values) => {
      try {
        setLoading(true);
        await api.user.setVacation(values);
        dispatch(updateUserProperty({ prop: "vacation", value: values.range }));
        dispatch(
          notification({ type: "success", title: "success", descrp: "data_updated_with_success" })
        );
        setIsOpen(false);
      } catch (error) {
        dispatch(notification({ type: "error", title: "error", descrp: "default_error_message" }));
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return (
    <>
      <MenuItem icon={<PalmIcon />} onClick={openSetVacationForm}>
        {t("vacation")}
      </MenuItem>
      <Portal portalName="modalRoot">
        <Popup id="vacation-form" visible={isOpen} onVisibleChange={setIsOpen}>
          <Popup.Header title={t("set_vacation")} />
          <Popup.Content>
            <Form methods={form} onFinish={onSubmitHandler}>
              <Form.Item label={t("interval")} name="range">
                <DatePicker type="range" />
              </Form.Item>
              <div className="d-flex justify-content-between">
                <Confirm
                  content={t("cancel_vacation_confirmation")}
                  onConfirm={clearVacation}
                  disabled={!user.vacation}
                  isAsync
                >
                  <Button type="outline" disabled={!user.vacation}>{t("cancel")}</Button>
                </Confirm>
                <Button htmlType="submit" loading={loading}>
                  {t("apply")}
                </Button>
              </div>
            </Form>
          </Popup.Content>
        </Popup>
      </Portal>
    </>
  );
}