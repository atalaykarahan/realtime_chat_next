"use client";
import FormError from "@/components/form-error";
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {Search} from "@/components/ui/search";
import {Disclosure} from "@headlessui/react";

import {AddFriendSchemas} from "@/schemas/addfriend";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {SendFriendRequest} from "@/app/api/services/friendship.Service";

const AddFriend = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const form = useForm<z.infer<typeof AddFriendSchemas>>({
        resolver: zodResolver(AddFriendSchemas),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof AddFriendSchemas>) => {
        console.warn("values", values);

        const res = await SendFriendRequest(values.email)
        if (res.status === 201) {
            console.log("arkadas eklendi");
        } else if (res.status === 200) {
            console.log("mail gonderildi");
        } else {
            console.error("arkadas eklenirken bir sorun olustu", res);
        }

    };

    return (
        <Disclosure as="nav" className="border-b border-[#5C6B81]">
            <div className="relative  px-5 flex h-20 items-center justify-between gap-5">
                <Form {...form}>
                    <form
                        {...form}
                        className="w-full flex gap-5"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Search
                                            {...field}
                                            id="email"
                                            placeholder="Kullanıcı Adı & E-Posta"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormError className="mb-3" message={errorMessage}/>

                        <Button
                            type="submit"
                            className="bg-[#4A32B0] border-none  hover:bg-[#4A32B0] hover:text-white text-white"
                            variant={"outline"}
                        >
                            Gönder
                        </Button>
                    </form>
                </Form>
            </div>
        </Disclosure>
    );
};

export default AddFriend;
