import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux"; 
import { resetPassword } from "@/store/slices/userSlice";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";

function ResetPassword() {
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.user);
  const { token } = useParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const handleResetPassword = async (data) => {
    if (data.password === data.confirmPassword) {
      const response = await dispatch(resetPassword({
        token,
        password: data.password, 
        confirmPassword: data.confirmPassword
      }));
      if (response.data.success){
        navigate("/auth/login")
      }
    }
  };

  return (
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Reset Password</CardTitle>
          <CardDescription className="text-center pt-2">Enter your new password below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="password">New Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="New Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirm New Password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <CardFooter className="flex justify-end p-0">
              <Button
                type="submit"
                disabled={loading}
                className="w-full text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
  );
}

export default ResetPassword;
