import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Register from "./Register"
import Login from "./Login"


function RegisterAndSignIn() {
  return (
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <Register />
        <Login />
      </Tabs>
  )
}

export default RegisterAndSignIn
