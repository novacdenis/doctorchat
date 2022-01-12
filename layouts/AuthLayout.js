import PropTypes from "prop-types";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function AuthLayout({ children }) {
  const user = useSelector((store) => store.user);
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (user.isAuthorized || localStorage.getItem("dc_token")) {
      router.push({
        pathname: "/",
      });
    }
  }, [router, user.isAuthorized]);

  return (
    <main className="auth-layout">
      <div className="auth-content">
        <div className="auth-sections">
          <div className="auth-background" />
          <div className="auth-main-content">
            <div className="auth-inner">
              {children}
              <div className="auth-bottom">
                <a href="#" target="_blank">
                  {t("terms_conditions")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
};
