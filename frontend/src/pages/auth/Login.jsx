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
import { fetchUser, login } from "@/store/slices/userSlice";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    await dispatch(login(formData));
    dispatch(fetchUser());
  };

  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login with your email and password.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
              })}
              placeholder="password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <CardFooter className="flex justify-end p-0 pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="text-white dark:text-black w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Login"
              )}
            </Button>
          </CardFooter>
        </form>
        <div className="w-full flex justify-center">
          <p
            className="text-center italic underline underline-offset-4 hover:text-gray-500"
            onClick={() => navigate("/auth/password/forgot", { replace: true })}
          >
            Forgot Password
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default Login;
