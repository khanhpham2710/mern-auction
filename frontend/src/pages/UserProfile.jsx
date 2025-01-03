import EditProfile from "@/components/EditProfile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {loading ? (
        <Loader2 />
      ) : (
        <>
          <div className="max-w-4xl mx-auto px-4 my-10">
            <h1 className="font-bold text-2xl text-center md:text-left">
              PROFILE
            </h1>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
                  <AvatarImage
                    src={user.profileImage?.url || "/imageHolder.jpg"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <EditProfile user={user} />
              </div>
              <div>
                <div className="mb-2">
                  <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                    Username:
                    <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                      {user.userName}
                    </span>
                  </h1>
                </div>
                <div className="mb-2">
                  <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                    Email:
                    <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                      {user.email}
                    </span>
                  </h1>
                </div>
                <div className="mb-2">
                  <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                    Phone:
                    <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                      {user.phone}
                    </span>
                  </h1>
                </div>
                <div className="mb-2">
                  <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                    Address:
                    <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                      {user.address}
                    </span>
                  </h1>
                </div>
                <div className="mb-2">
                  <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                    Joined On:
                    <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                      {user.createdAt?.substring(0, 10)}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
            <div className="mb-6 w-full">
              <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                    Bank name:
                    <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                      {user?.paymentMethods?.bankTransfer?.bankName}
                    </span>
                  </h1>
                </div>
                <div>
                  <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                    Bank account number:
                    <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                      {user?.paymentMethods?.bankTransfer?.bankAccountNumber}
                    </span>
                  </h1>
                </div>
                <div>
                  <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                    Bank account name:
                    <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                      {user?.paymentMethods?.bankTransfer?.bankAccountName}
                    </span>
                  </h1>
                </div>
                <div>
                  <h1 className="font-semibold text-gray-900 dark:text-gray-100">
                    Paypal email:
                    <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                      {user?.paymentMethods?.paypal?.paypalEmail}
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
