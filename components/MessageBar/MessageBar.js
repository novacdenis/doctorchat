import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { IconBtn } from "../Button";
import Form from "../Form";
import Input from "../Inputs";
import AuthRoleWrapper from "@/containers/AuthRoleWrapper";
import cs from "@/utils/classNames";
import ClipIcon from "@/icons/clip.svg";
import LevelIcon from "@/icons/level-up.svg";
import { MESSAGE_TYPES, userRoles } from "@/context/constants";
import { notification } from "@/store/slices/notificationsSlice";
import api from "@/services/axios/api";
import { updateConversation } from "@/store/slices/conversationListSlice";
import { chatContentAddMessage } from "@/store/slices/chatContentSlice";

export default function MessageBar(props) {
  const { defaultValue, disabled, chatId } = props;
  const user = useSelector((store) => store.user.data);
  const [isFormEnabled, setIsFormEnabled] = useState(defaultValue && defaultValue.length > 3);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useForm();

  const onFormChange = useCallback(({ name, value }) => {
    if (name === "content") {
      if (value && value.length > 3) setIsFormEnabled(true);
      else setIsFormEnabled(false);
    }
  }, []);

  const onFormSubmit = useCallback(
    async (values) => {
      try {
        setLoading(true);

        const payload = { ...values, chat_id: chatId, type: MESSAGE_TYPES.standard };
        const response = await api.conversation.addMessage(payload);
        const updatedChatItem = {
          id: +response.data.chat_id,
          description: response.data.description,
          status: response.data.status,
          updated: response.data.updated,
        };
        const updatedChatContent = {
          updated: response.data.updated,
          content: response.data.description,
          id: +response.data.id,
          side: "out",
          type: "standard",
        };

        dispatch(updateConversation(updatedChatItem));
        dispatch(chatContentAddMessage(updatedChatContent));
        form.reset();
      } catch (error) {
        dispatch(notification({ type: "error", title: "Eroare", descrp: "A apărut o eroare" }));
      } finally {
        setLoading(false);
      }
    },
    [chatId, dispatch, form]
  );

  return (
    <div className={cs("message-bar-wrapper", disabled && "disabled")}>
      <Form
        methods={form}
        className="w-100"
        initialValues={{ content: defaultValue }}
        onValuesChange={onFormChange}
        onFinish={onFormSubmit}
      >
        <div
          className={cs(
            "message-bar-input",
            userRoles.get("doctor") === user?.role && "with-attach"
          )}
        >
          <AuthRoleWrapper roles={[userRoles.get("doctor")]}>
            <IconBtn className="message-bar-attach" size="sm" icon={<ClipIcon />} />
          </AuthRoleWrapper>
          <Form.Item name="content" className="mb-0">
            <Input placeholder="Mesajul..." disabled={disabled} autoComplete="off" />
          </Form.Item>
        </div>
      </Form>
      <IconBtn
        className="message-bar-send"
        loading={loading}
        disabled={!isFormEnabled}
        icon={<LevelIcon />}
        onClick={form.handleSubmit(onFormSubmit)}
      />
    </div>
  );
}

MessageBar.propTypes = {
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  chatId: PropTypes.string,
};

MessageBar.defaultValue = {
  defaultValue: "",
};