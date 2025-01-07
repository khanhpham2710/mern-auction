import { Button } from "@/components/ui/button";
import { postCommissionProof } from "@/store/slices/commissionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea"; 
import { Label } from "@/components/ui/label"; 

const SubmitCommission = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePaymentProof = (data) => {
    const formData = new FormData();
    formData.append("proof", data.proof[0]);
    formData.append("amount", data.amount);
    formData.append("comment", data.comment);
    dispatch(postCommissionProof(formData));
  };

  return (
    <>
      <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
        <form
          className="flex flex-col gap-5 w-full"
          onSubmit={handleSubmit(handlePaymentProof)}
        >
          <h3 className="text-primary text-xl text-center font-bold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
            Upload Payment Proof
          </h3>

          <div className="flex flex-col gap-2">
            <Label htmlFor="amount" className="text-[16px] text-stone-500">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              {...register("amount", { required: "Amount is required" })}
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
            />
            {errors.amount && (
              <span className="text-red-500 text-sm">{errors.amount.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="proof" className="text-[16px] text-stone-500">
              Payment Proof (Screenshot)
            </Label>
            <Input
              id="proof"
              type="file"
              {...register("proof", { required: "Payment proof is required" })}
              className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
            />
            {errors.proof && (
              <span className="text-red-500 text-sm">{errors.proof.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="comment" className="text-[16px] text-stone-500">
              Comment
            </Label>
            <Textarea
              id="comment"
              rows={7}
              className="text-[16px] py-2 bg-transparent border-[1px] rounded-md px-1 border-stone-500 focus:outline-none"
            />
          </div>

          <Button
            className="bg-primary mx-auto font-semibold hover:bg-primary-800 text-lg transition-all duration-300 py-2 px-4 rounded-md text-white my-4"
            type="submit"
          >
            {loading ? "Uploading..." : "Upload Payment Proof"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default SubmitCommission;
