import PropTypes from "prop-types";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IconBtn } from "../Button";
import Tooltip from "../Tooltip";
import Confirm from "../Confirm";
import EditIcon from "@/icons/edit.svg";
import TrashIcon from "@/icons/trash.svg";
import cs from "@/utils/classNames";

export default function InvestigationItem(props) {
  const { name, age, weight, height, withActions, onEdit, onRemove, removeDisabled } = props;
  const { t } = useTranslation();

  const onEditHandler = useCallback(() => {
    onEdit(props.id);
  }, [onEdit, props.id]);

  const onRemoveHandler = useCallback(
    (id) => () => {
      onRemove(id);
    },
    [onRemove]
  );

  return (
    <div className={cs("investigation-item position-relative", !withActions && "no-actions")}>
      <div className="investigation-item-caption">
        <h4 className="title">{name}</h4>
        {withActions && (
          <div className="investigation-actions">
            <Tooltip title={t("edit")} placement="leftCenter">
              <IconBtn icon={<EditIcon />} size="sm" onClick={onEditHandler} />
            </Tooltip>
            {!removeDisabled && (
              <Confirm
                onConfirm={onRemoveHandler(props.id)}
                content={t("remove_investigation_confirmation")}
                isAsync
              >
                <Tooltip title={t('remove')} placement="leftCenter">
                  <IconBtn icon={<TrashIcon />} className="remove-action" size="sm" />
                </Tooltip>
              </Confirm>
            )}
          </div>
        )}
      </div>
      <div className="investigation-item-descrp">
        <div className="descrp-item">
          <span className="value">{age}</span>
          <span className="label">{t("age")}</span>
        </div>
        <div className="descrp-item">
          <span className="value">{weight}</span>
          <span className="label">{t("weight")}</span>
        </div>
        <div className="descrp-item">
          <span className="value">{height}</span>
          <span className="label">{t("height")}</span>
        </div>
      </div>
    </div>
  );
}

InvestigationItem.propTypes = {
  age: PropTypes.number,
  weight: PropTypes.number,
  height: PropTypes.number,
  name: PropTypes.string,
  withActions: PropTypes.bool,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  id: PropTypes.number,
  removeDisabled: PropTypes.bool,
};

InvestigationItem.defaultProps = {
  onEdit: () => null,
  onRemove: () => null,
};
