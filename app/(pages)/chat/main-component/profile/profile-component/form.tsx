import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UsernameSchemas } from "@/schemas/username";
import { updateUsernameByMail } from "@/app/api/services/user.Service";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { setUser } from "@/app/redux/slices/userSlice";
import { AppDispatch } from "@/app/redux/store";
import { useDispatch } from "react-redux";

const ProfileForm = ({ user }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { update } = useSession();

  const form = useForm<z.infer<typeof UsernameSchemas>>({
    resolver: zodResolver(UsernameSchemas),
    defaultValues: {
      username: user.name ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof UsernameSchemas>) {
    const res = await updateUsernameByMail(data.username);

    if (res.status !== 200) {
      toast("BLOKLANAN KİŞİLERİ GETİRİRKEN BİLİNMEYEN BİR HATA MEYDANA GELDİ");
      console.error(res);
    }

    await update();

    console.log("updateduiser", user);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Please enter username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder={user.email} disabled />
          </FormControl>
          <FormDescription>
            This email belongs to your Google account and cannot be changed.
          </FormDescription>
          <FormMessage />
        </FormItem>

        <FormItem>
          <FormLabel>Role</FormLabel>
          <FormControl>
            <Input className="capitalize " placeholder={user.role} disabled />
          </FormControl>
          <FormDescription>
            If your role is standard, you can send a maximum of 500MB. If your
            role is high, you can send up to 2GB.
          </FormDescription>
          <FormMessage />
        </FormItem>
        <Button type="submit" variant={"outline"}>
          Update Profile
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
