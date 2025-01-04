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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

function AuctioneerRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.user);
  const [bankName, setBankName] = useState();
  const [error, setError] = useState(false);

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [activeTab, setActiveTab] = useState("Step1");

  const handleRegister = async (data) => {
    const formData = {
      userName: data.userName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      verificationMethod: data.verificationMethod,
      role: "Auctioneer",
      bankName: bankName,
      bankAccountNumber: data.bankAccountNumber,
      bankAccountName: data.bankAccountName,
      paypalEmail: data.paypalEmail,
    };

    const response = await dispatch(register(formData));
    if (response.status === 200) {
      navigate(`/auth/otp-verification/${data.email}/${data.phone}`);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Step1">Step 1</TabsTrigger>
        <TabsTrigger value="Step2">Step 2</TabsTrigger>
      </TabsList>

      <TabsContent value="Step1">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl uppercase">
              Signup to be an auctioneer
            </CardTitle>
            <CardDescription className="text-center">
              Create a new account and click signup when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <form
              onSubmit={() => {
                handleSubmit(handleRegister);
                if (!bankName) {
                  setError(true);
                }
              }}
              className="space-y-2"
            >
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
                  type="text"
                  id="phone"
                  {...registerForm("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                      message: "Invalid phone number format",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-red-500 text-sm">
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="address">Address</Label>
                <Input
                  type="text"
                  id="address"
                  {...registerForm("address", {
                    required: "Address is required",
                  })}
                />
                {errors.address && (
                  <span className="text-red-500 text-sm">
                    {errors.address.message}
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
            </form>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Step 2 Form */}
      <TabsContent value="Step2">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl uppercase">
              Bank and Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleRegister)} className="space-y-2">
              <div>
                <Label className="text-[16px] text-stone-500">
                  Bank Details
                </Label>
                <select
                  id="bankName"
                  value={bankName}
                  onChange={(e) => {
                    setBankName(e.target.value);
                    setError(false);
                  }}
                  className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full"
                >
                  <option value="">Select Your Bank</option>
                  <option value="TechcomBank">TechcomBank</option>
                  <option value="VietcomBank">VietcomBank</option>
                  <option value="MBBank">MBBank</option>
                </select>
                {error && (
                  <span className="text-red-500 text-sm">
                    Bank Name is required
                  </span>
                )}
              </div>

              <div>
                <Label className="text-[16px] text-stone-500">
                  Bank Account Details
                </Label>
                <div className="flex flex-col sm:flex-row sm:gap-4 w-full my-2">
                  <Input
                    type="text"
                    {...registerForm("bankAccountNumber", {
                      required: "Bank account number is required",
                    })}
                    placeholder="Bank Account Number"
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1 my-1"
                  />
                  <Input
                    type="text"
                    {...registerForm("bankAccountName", {
                      required: "Bank account username is required",
                    })}
                    placeholder="Bank Account UserName"
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1 my-1"
                  />
                </div>
                {errors.bankAccountNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.bankAccountNumber.message}
                  </span>
                )}
                {errors.bankAccountName && (
                  <span className="text-red-500 text-sm">
                    {errors.bankAccountName.message}
                  </span>
                )}
              </div>

              <div>
                <Label className="text-[16px] text-stone-600 font-semibold">
                  Paypal Details
                </Label>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <Input
                    type="email"
                    {...registerForm("paypalEmail", {
                      required: "Paypal email is required",
                    })}
                    placeholder="Paypal Email"
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1"
                  />
                </div>
                {errors.paypalEmail && (
                  <span className="text-red-500 text-sm">
                    {errors.paypalEmail.message}
                  </span>
                )}
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
      </TabsContent>
    </Tabs>
  );
}

export default AuctioneerRegister;
