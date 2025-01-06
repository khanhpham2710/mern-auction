import { createAuction } from "@/store/slices/auctionSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateAuction = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const handleCreateAuction = (data) => {
    if (!loading) {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("condition", data.condition);
      formData.append("startingBid", data.startingBid);
      formData.append("startTime", data.startTime);
      formData.append("endTime", data.endTime);
      dispatch(createAuction(formData));
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <article className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
      <h1 className="text-primary text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
        Create Auction
      </h1>
      <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
        <form
          className="flex flex-col gap-5 w-full"
          onSubmit={handleSubmit(handleCreateAuction)}
        >
          <p className="font-semibold text-xl md:text-2xl">Auction Detail</p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <Label htmlFor="title" className="text-[16px] text-stone-600">
                Title
              </Label>
              <Input
                id="title"
                {...register("title", { required: "Title is required" })}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-1">
              <Label htmlFor="category" className="text-[16px] text-stone-600">
                Category
              </Label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              >
                <option value="">Select Category</option>
                {auctionCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-red-500 text-sm">
                  {errors.category.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <Label htmlFor="condition" className="text-[16px] text-stone-600">
                Condition
              </Label>
              <select
                id="condition"
                {...register("condition", {
                  required: "Condition is required",
                })}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
              {errors.condition && (
                <span className="text-red-500 text-sm">
                  {errors.condition.message}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-1">
              <Label
                htmlFor="startingBid"
                className="text-[16px] text-stone-600"
              >
                Starting Bid
              </Label>
              <Input
                id="startingBid"
                type="number"
                {...register("startingBid", {
                  required: "Starting bid is required",
                })}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
              {errors.startingBid && (
                <span className="text-red-500 text-sm">
                  {errors.startingBid.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <Label
                htmlFor="description"
                className="text-[16px] text-stone-600"
              >
                Description
              </Label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className="text-[16px] py-2 bg-transparent border-2 border-stone-500 focus:outline-none px-2 rounded-md"
                rows={10}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-1">
              <Label htmlFor="startTime" className="text-[16px] text-stone-600">
                Auction Starting Time
              </Label>
              <Controller
                control={control}
                name="startTime"
                rules={{ required: "Start time is required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full"
                  />
                )}
              />
              {errors.startTime && (
                <span className="text-red-500 text-sm">
                  {errors.startTime.message}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-1">
              <Label htmlFor="endTime" className="text-[16px] text-stone-600">
                Auction End Time
              </Label>
              <Controller
                control={control}
                name="endTime"
                rules={{ required: "End time is required" }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none w-full"
                  />
                )}
              />
              {errors.endTime && (
                <span className="text-red-500 text-sm">
                  {errors.endTime.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label
              htmlFor="image"
              className="font-semibold text-xl md:text-2xl"
            >
              Auction Item Image
            </Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Auction"
                      className="w-44 h-auto"
                    />
                  ) : (
                    <>
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={imageHandler}
                  accept="image/*"
                />
              </label>
            </div>
            {errors.image && (
              <span className="text-red-500 text-sm">
                {errors.image.message}
              </span>
            )}
          </div>

          <Button className="bg-primary font-semibold hover:bg-primary-800 text-xl transition-all duration-300 py-2 px-4 rounded-md text-white w-[280px] mx-auto lg:w-[640px] my-4">
            {loading ? "Creating Auction..." : "Create Auction"}
          </Button>
        </form>
      </div>
    </article>
  );
};

export default CreateAuction;
