import { Fragment } from "react";
import { Bounce, Flip, Slide, toast, Zoom } from "react-toastify";

interface IToastAutoClose {
  typeState: number;
  title?: string;
  time?: string;
  message: string;
}

type IToastr = Pick<IToastAutoClose, "title" | "time" | "message">;

const PrimaryToast = ({ title, message }: IToastr) => (
  <Fragment>
    <Fragment>
      <div className=" m-1">
        <div>
          <div className="">
            <h6 className=" font-semibold font-sans">{title}</h6>
          </div>
        </div>
        <div className="toastify-body">
          <span className=" text-xs font-semibold font-sans">{message}</span>
        </div>
      </div>
    </Fragment>
  </Fragment>
);

const SuccessToast = ({ title, message }: IToastr) => (
  <Fragment>
    <Fragment>
      <div className=" m-1">
        <div>
          <div className="">
            <h6 className=" font-semibold font-sans text-green-500">{title}</h6>
          </div>
        </div>
        <div className="toastify-body">
          <span className=" text-xs font-semibold font-sans">{message}😊</span>
        </div>
      </div>
    </Fragment>
  </Fragment>
);

const ErrorToast = ({ title, message }: IToastr) => (
  <Fragment>
    <Fragment>
      <div className=" m-1">
        <div>
          <div className="">
            <h6 className=" font-semibold font-sans text-red-500">Error</h6>
          </div>
        </div>
        <div className="toastify-body">
          <span className=" text-xs font-semibold font-sans">{message} 😥</span>
        </div>
      </div>
    </Fragment>
  </Fragment>
);

const WarningToast = ({ title, message }: IToastr) => (
  <Fragment>
    <Fragment>
      <div className=" m-1">
        <div>
          <div className="">
            <h6 className=" font-semibold font-sans text-amber-500">{title}</h6>
          </div>
        </div>
        <div className="toastify-body">
          <span className=" text-xs font-semibold font-sans">{message}</span>
        </div>
      </div>
    </Fragment>
  </Fragment>
);

export const InfoToast = ({ title, message }: IToastr) => (
  <div className="">
    <h6 className=" font-semibold font-sans text-sky-500">Info</h6>
    <div className="">
      <span className=" text-xs font-semibold font-sans text-gray-200">
        {message}
      </span>
    </div>
  </div>
);

const ToastAutoClose = ({ typeState, message, title }: IToastAutoClose) => {
  const notifyDefault = () =>
    toast(<PrimaryToast title={title} message={message} />, {
      hideProgressBar: true,
    });
  const notifySuccess = () =>
    toast.success(<SuccessToast title={title} message={message} />, {
      transition: Bounce,
      hideProgressBar: true,
    });
  const notifyError = () =>
    toast.error(<ErrorToast title={title} message={message} />, {
      transition: Zoom,
      hideProgressBar: true,
    });
  const notifyWarning = () =>
    toast.warning(<WarningToast title={title} message={message} />, {
      transition: Flip,
      hideProgressBar: true,
    });
  const notifyInfo = () =>
    toast.info(<InfoToast title={title} message={message} />, {
      position: toast.POSITION.BOTTOM_LEFT,
      transition: Slide,
      hideProgressBar: true,
    });

  switch (typeState) {
    case 0: {
      notifySuccess();
      break;
    }
    case 1: {
      notifyError();
      break;
    }
    case 2: {
      notifyWarning();
      break;
    }
    case 3: {
      notifyInfo();
      break;
    }
    default: {
      notifyDefault();
      break;
    }
  }
};

export default ToastAutoClose;
