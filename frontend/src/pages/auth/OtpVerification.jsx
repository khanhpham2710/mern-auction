import { useState } from "react";
import { useParams } from "react-router-dom";
import { resendOTP, verify } from "@/store/slices/userSlice";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OtpVerification = () => {
  const { email, phone } = useParams();
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (otp.some((digit) => digit === "")) setError(true);
    else {
      const data = {
        email,
        otp: enteredOtp,
        phone,
      };
      dispatch(verify(data));
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    const data = {
      email,
      phone,
    };
    dispatch(resendOTP(data));
  };

  return (
      <Card className="max-w-sm w-full p-6">
        <CardHeader>
          <CardTitle className="text-center">OTP Verification</CardTitle>
          <CardDescription className="text-center pt-2">
            Enter the 5-digit OTP sent to your registered email or phone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleOtpVerification}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex justify-center gap-2 mb-2">
              {otp.map((digit, index) => (
                <Input
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  key={index}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-2xl text-center font-extrabold text-black border-2 border-gray-300 rounded-md"
                />
              ))}
            </div>
            {error && (
              <div className="text-red-500 text-sm mb-1">
                <span>All OTP fields are required</span>
              </div>
            )}
            <Button
              type="submit"
              className="text-center text-white dark:text-black"
            >
              Verify OTP
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center p-0">
          <Button
            onClick={handleResendOTP}
            className="text-center text-white bg-gray-400 hover:bg-gray-500"
          >
            Resend OTP
          </Button>
        </CardFooter>
      </Card>
  );
};

export default OtpVerification;
