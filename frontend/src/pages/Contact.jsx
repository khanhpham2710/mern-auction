import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  
  const onSubmit = () => {
    setLoading(true);

    setTimeout(()=>{
        toast.success("Thank You! Your message has been sent successfully.");
    },2000)

    setLoading(false)
  };

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start">
      <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md">
        <form
          className="flex flex-col gap-5 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3
            className={`text-[#D6482B] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl`}
          >
            Contact Us
          </h3>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-stone-500">Your Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
            />
            {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-stone-500">Your Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-stone-500">Your Phone</label>
            <input
              type="number"
              {...register('phone', { required: true })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
            />
            {errors.phone && <span className="text-red-500 text-sm">Phone is required</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-stone-500">Subject</label>
            <input
              type="text"
              {...register('subject', { required: true })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
            />
            {errors.subject && <span className="text-red-500 text-sm">Subject is required</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[16px] text-stone-500">Message</label>
            <textarea
              rows={7}
              {...register('message', { required: true })}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D6482B]"
            />
            {errors.message && <span className="text-red-500 text-sm">Message is required</span>}
          </div>

          <button
            className="bg-[#d6482b] mx-auto font-semibold hover:bg-[#b8381e] text-xl transition-all duration-300 py-2 px-4 rounded-md text-white my-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending Message..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
