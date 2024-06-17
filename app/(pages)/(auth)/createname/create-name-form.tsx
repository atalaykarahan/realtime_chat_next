"use client";
import { signup } from "@/app/api/services/auth.Service";
import FormError from "@/components/form-error";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AnimationInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { UsernameSchemas } from "@/schemas/username";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CreateNameFormProps {
  token: string;
}

const CreateNameForm = ({ token }: CreateNameFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  //#region FORM SCHEMA SETTINGS
  const form = useForm<z.infer<typeof UsernameSchemas>>({
    resolver: zodResolver(UsernameSchemas),
    defaultValues: {
      username: "",
    },
  });
  //#endregion

  const onSubmit = (values: z.infer<typeof UsernameSchemas>) => {
    startTransition(() => {
      try {
        signup(token, values.username).then(
          (res: any) => {
            //kullanici basariliyla yaratildi demektir
            if (res.status == 201) {
              router.push("/chat");
            } else {
              setErrorMessage("Bilinmeyen bir hata oluştu");
            }
          },
          (error: any) => {
            if (error.response.data.statusCode == 409) {
              setErrorMessage("Bu kullanıcı adı zaten kullanılmakta.");
            } else {
              setErrorMessage("Bilinmeyen bir hata oluştu");
            }
            console.log(error);
          }
        );
      } catch (error) {
        console.log("Kullanıcı adı kısmında bir sorun oluştu ", error);
      }
    });
  };

  return (
    <Form {...form}>
      <form {...form} className="" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <LabelInputContainer className="mb-4">
                <FormLabel>
                  <Label htmlFor="username">Kullanıcı Adı</Label>
                </FormLabel>
                <FormMessage />
                <FormControl>
                  <AnimationInput
                    {...field}
                    id="username"
                    placeholder="Kullanıcı adı giriniz..."
                    type="text"
                    disabled={isPending}
                  />
                </FormControl>
              </LabelInputContainer>
            </FormItem>
          )}
        />
        <FormError className="mb-3" message={errorMessage} />

        <button
          className="bg-gradient-to-br relative group/btn bg-black w-full text-white rounded-md h-10 font-medium "
          type="submit"
        >
          Kayıt Ol &rarr;
        </button>
      </form>
    </Form>
  );
};

export default CreateNameForm;

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
