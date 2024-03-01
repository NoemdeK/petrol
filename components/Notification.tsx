"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Switch } from "./ui/switch";
import { toast } from "./ui/use-toast";
import useLoading from "@/lib/useLoading";
import { PlainTransportDekApi } from "@/utils/axios";
import { useSession } from "next-auth/react";
import { Label } from "./ui/label";
import { useState } from "react";
import { is } from "date-fns/locale";

const notificationsFormSchema = z.object({
  emails: z.boolean().optional(),
});

const userNotifsSchema = z.object({
  dailyOption: z.string(),
  weeklyOption: z.string(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;
type UserNotifFormValues = z.infer<typeof userNotifsSchema>;

// This can come from your database or API.

export function NotificationsForm({ data }: any) {
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emails: data?.notificationType === "email",
    },
  });

  const freqForm = useForm<UserNotifFormValues>({
    resolver: zodResolver(userNotifsSchema),
    defaultValues: {
      weeklyOption: "",
      dailyOption: "",
    },
  });

  const [isWeeklyChecked, setWeeklyChecked] = useState<boolean>(true);
  const [isDailyChecked, setDailyChecked] = useState<boolean>(false);

  const [notificationOption, setNotificationOption] = useState<string>("");

  const handleWeeklyChange = (isChecked: any) => {
    setWeeklyChecked(isChecked);
    if (isChecked) {
      setDailyChecked(false); // Uncheck and disable daily if weekly is checked
      setNotificationOption("weekly");
    }
  };

  const handleDailyChange = (isChecked: any) => {
    setDailyChecked(isChecked);
    if (isChecked) {
      setWeeklyChecked(false); // Uncheck and disable weekly if daily is checked
      setNotificationOption("daily");
    }
  };

  const session = useSession();

  const loading = useLoading();

  // function onSubmit(data: NotificationsFormValues) {
  //   toast({
  //     title: "Notifications Updated",
  //     description: "You have successfully updated notifications"
  //   })
  // }

  const onSubmit = async (values: NotificationsFormValues) => {
    loading.onOpen();
    const headers = {
      Authorization: `Bearer ${session.data?.user.accessToken}`, // Replace YOUR_ACCESS_TOKEN with the actual token
      // Other headers if needed
    };

    await PlainTransportDekApi.patch(
      `/data-entry/settings?flag=notifications`,
      { notificationType: values.emails === true ? "email" : "push" },
      { headers }
    )
      .then(() => {
        toast({
          title: "Notifications Updated",
          description: "You have successfully updated notifications",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          variant: "destructive",
          description: `Error occured`,
        });
      })
      .finally(() => {
        loading.onClose();
      });
  };

  const onSubmitNotifOption = async (values: UserNotifFormValues) => {
    loading.onOpen();
    console.log(values, notificationOption);
    const headers = {
      Authorization: `Bearer ${session.data?.user.accessToken}`, // Replace YOUR_ACCESS_TOKEN with the actual token
      // Other headers if needed
    };
    await PlainTransportDekApi.patch(
      `/user/settings?flag=notifications`,
      {
        notificationOption: notificationOption,
      },
      { headers }
    )
      .then((res) => {
        console.log(res);
        toast({
          title: "Notifications Option Updated",
          description: "You have successfully updated notifications option",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          variant: "destructive",
          description: `Error occured`,
        });
      })
      .finally(() => {
        loading.onClose();
      })
      .finally(() => {
        loading.onClose();
      });
  };
  return (
    <>
      {session?.data?.user.role === "rwx_user" ? (
        <Form {...freqForm}>
          <form
            onSubmit={freqForm.handleSubmit(onSubmitNotifOption)}
            className="space-y-4 py-2"
          >
            <div className="space-y-0.5 flex justify-between items-center p-4 rounded-lg border">
              <Label className="text-base">Weekly Notifications</Label>
              <Switch
                checked={isWeeklyChecked}
                onCheckedChange={handleWeeklyChange}
                disabled={isDailyChecked}
                name="weeklyOption"
                value="weekly"
              />
            </div>
            <div className="space-y-0.5 flex justify-between items-center p-4 rounded-lg border">
              <Label className="text-base">Daily Notifications</Label>
              <Switch
                checked={isDailyChecked}
                onCheckedChange={(isChecked) => handleDailyChange(isChecked)}
                disabled={isWeeklyChecked}
                name="dailyOption"
                value="daily"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-2"
          >
            <div>
              <div className="space-y-4">
                <div className="space-y-0.5 flex justify-between items-center p-4 rounded-lg border">
                  <Label className="text-base">Push Notifications</Label>
                  <Switch checked={true} disabled={true} />
                </div>

                <FormField
                  control={form.control}
                  name="emails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border px-4 py-2">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Email Notifications
                        </FormLabel>
                        <FormDescription className="text-xs">
                          Receive emails about new products, features, and more.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </>
  );
}
