"use client";

import { signup } from "@/app/api/services/auth.Service";
import CustomCard from "@/components/custom-card";
import { Label } from "@/components/ui/label";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { AnimationInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoIosLogOut } from "react-icons/io";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UsernameSchemas } from "@/schemas/username";
import { Form, FormField } from "@/components/ui/form";
import FormError from "@/components/form-error";

const CreateName = () => {
  const nickInputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onClick = async () => {
    console.log(token);

    if (nickInputRef.current && nickInputRef.current.value && token) {
      const username = nickInputRef.current.value;

      const res = await signup(token, username);

      console.log(res);
    }

    console.log("tuşa basıldı");
  };

  const form = useForm<z.infer<typeof UsernameSchemas>>({
    resolver: zodResolver(UsernameSchemas),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UsernameSchemas>) => {
    console.log("Form submitted");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <BackgroundBeams />

      <CustomCard className="max-w-md  w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8   relative">
        <h2 className="font-bold text-xl text-white">
          Realtime Chat Projesine Hoş Geldiniz
        </h2>
        <p className="text-white text-sm max-w-sm mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
          dolorum.
        </p>

        <div className="rounded-lg w-full bg-transparent my-8 text-center">
          <p className="text-gray-400 w-full flex items-center pb-4">
            <FcGoogle className="mr-2" />
            Google tarafından şu şekilde oturum açıldı:
          </p>
          <div className="flex items-center justify-between ">
            <div className="flex space-x-4 items-center">
              <Image
                src={"https://i.hizliresim.com/r0g8cdd.png"}
                alt={"Google Username"}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-bold text-lg flex text-white">example</p>
                <p className="text-gray-400">example@gmail.com</p>
              </div>
            </div>

            <button className="text-gray-500  hover:text-gray-700  duration-300">
              <IoIosLogOut className="h-[1.7rem] w-auto" />
            </button>
          </div>
        </div>

        <Form {...form}>
          <form {...form} className="" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="username">Kullanıcı Adı</Label>
                  <AnimationInput
                    {...field}
                    id="username"
                    placeholder="Kullanıcı adı giriniz..."
                    type="text"
                  />
                </LabelInputContainer>
              )}
            />
            <FormError message={errorMessage} />

            <button
              className="bg-gradient-to-br relative group/btn bg-black w-full text-white rounded-md h-10 font-medium "
              type="submit"
            >
              Kayıt Ol &rarr;
            </button>
          </form>
        </Form>
      </CustomCard>
    </div>
  );
};

export default CreateName;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
