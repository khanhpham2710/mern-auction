import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { register } from "@/store/slices/userSlice";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { useNavigate } from "react-router-dom";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.user);

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const handleRegister = async (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append('verificationMethod', data.verificationMethod)

    const response = await dispatch(register(formData));
    if (response.status == 200){
      navigate(`/auth/otp-verification/${data.email}/${data.phone}`);
    }
  };

  return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl uppercase">Signup to be an auctioneer</CardTitle>
          <CardDescription className="text-center">
            Create a new account and click signup when you&apos;re done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="userName">Username</Label>
              <Input
                type="text"
                id="userName"
                {...registerForm("userName", {
                  required: "Username is required",
                })}
                placeholder="Eg. khanh"
              />
              {errors.userName && (
                <span className="text-red-500 text-sm">
                  {errors.userName.message}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                {...registerForm("email", { required: "Email is required" })}
                placeholder="Eg. example@gmail.com"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                type="number"
                id="phone"
                {...registerForm("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                    message: "Invalid phone number format",
                  },
                })}
                placeholder="Eg. 12345678"
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                {...registerForm("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
                placeholder="Eg. password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <Label>Select Verification Method</Label>
              <RadioGroup
                defaultValue="email"
                {...registerForm("verificationMethod")}
                className="flex py-2 justify-around"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="r1" />
                  <Label htmlFor="r1">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="r2" />
                  <Label htmlFor="r2">Phone</Label>
                </div>
              </RadioGroup>
            </div>

            <CardFooter className="flex justify-end p-0">
              <Button
                type="submit"
                disabled={loading}
                className="text-white dark:text-black w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
  );
}

export default Register;
