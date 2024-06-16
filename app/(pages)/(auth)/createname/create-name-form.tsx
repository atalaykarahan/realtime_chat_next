"use client";
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
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateNameForm = () => {
  const form = useForm<z.infer<typeof UsernameSchemas>>({
    resolver: zodResolver(UsernameSchemas),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof UsernameSchemas>) => {
    console.log("Form submitted");
    console.log(values);
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
                  />
                </FormControl>
              </LabelInputContainer>
            </FormItem>
          )}
        />
        {/* <FormError message={errorMessage} /> */}

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