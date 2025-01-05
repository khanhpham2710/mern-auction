import { Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { fetchUser, updateUserProfile } from "@/store/slices/userSlice";

function EditProfile({ user }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState(user.profileImage?.url);
  const [profileImagePreview, setProfileImagePreview] = useState(profileImage);
  const [newImage, setNewImage] = useState(false);
  const imageRef = useRef();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.userName,
      email: user.email,
      phone: user.phone || "",
      address: user.address || "",
      profilePhoto: user.profileImage?.url || "",
    },
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
      setNewImage(true);
    };
  };

  const onSubmit = async (data) => {
    // setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", user.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("profileImage", profileImage);
    formData.append("newImage", newImage);

    await dispatch(updateUserProfile(formData));
    dispatch(fetchUser());

    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="mt-2 bg-primary hover:bg-primary-800 text-white"
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Username</Label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Username is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Username"
                  className="col-span-3"
                  isInvalid={errors.name}
                />
              )}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Phone</Label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Phone"
                  className="col-span-3"
                  isInvalid={errors.phone}
                />
              )}
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Address</Label>
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Address"
                  className="col-span-3"
                  isInvalid={errors.address}
                />
              )}
            />
            {errors.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label>Profile Image</Label>
            <div className="flex items-center gap-3">
              <img
                src={
                  profileImagePreview ? profileImagePreview : "/imageHolder.jpg"
                }
                alt="profileImagePreview"
                className="w-14 h-14 rounded-full hover:opacity-75 hover:cursor-pointer"
                onClick={() => imageRef.current.click()}
              />
              <Input
                type="file"
                onChange={imageHandler}
                className={profileImage ? "hidden" : "min-w-56"}
                ref={imageRef}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary hover:bg-primary-800 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfile;
