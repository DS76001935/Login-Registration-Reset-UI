import React, { useEffect, useRef, useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../services/auth.service";
import CheckButton from "react-validation/build/button";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">This field is required!</div>
    );
  }
};

function ResetComponent() {
  const [verificationFlag, setVerificationFlag] = useState(false);
  const [password, setPassword] = useState(null);
  const [token, setToken] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const form = useRef();
  const checkBtn = useRef();

  useEffect(() => {
    let token = localStorage.getItem("token");
    setToken(token);
    if (token && token !== "") {
      AuthService.goToResetPage(token).then((res) => {
        if (res.data === "Verified") {
          setVerificationFlag(true);
          setTimeout(() => {
            setMessage("Your Account has been verified successfully");
          }, 2000);
          setSuccessful(true);
          setLoading(false);
        }
      });
    } else {
      setVerificationFlag(false);
      setSuccessful(false);
      setLoading(false);
    }
  }, []);
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      if (password === confirmPassword) {
        AuthService.resetPassword(password, token).then((res) => {
          if (res.status === 201 || res.status === 200) {
            setMessage(res.data);
            setLoading(false);
            setSuccessful(true);
          }
        });
      } else {
        setMessage("Sorry, password and comfirm password are not identical!");
        setLoading(false);
        setSuccessful(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <div>
          <Form onSubmit={handleResetPassword} ref={form}>
            {verificationFlag && (
              <div>
                <h3 className="text-center">Reset Password</h3>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                  />
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="confirmpassword"
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <button
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
          {!verificationFlag && <h1>Not Verified</h1>}
        </div>
      </div>
    </div>
  );
}

export default ResetComponent;
