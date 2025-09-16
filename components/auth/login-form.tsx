"use client"
import React from "react"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import useSignIn from "./useSignIn"
import { BUTTON_MESSAGES } from "@/config/constants"

function LoginForm() {
  const { onSubmit, form, loading } = useSignIn()
  return (
    <div className="grid gap-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full max-w-sm items-center gap-1.5"
        >
          <FormField
            disabled={loading}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font">ელ.ფოსტა</FormLabel>
                <FormControl>
                  <Input placeholder="ელ.ფოსტა" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <FormField
                disabled={loading}
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font">პაროლი</FormLabel>
                    <FormControl>
                      <Input placeholder="პაროლი" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* <div className="flex justify-between">
    <div className="flex items-center space-x-2">
      <Checkbox
        id="remember"
        className="border-muted-foreground"
      />
      <label
        htmlFor="remember"
        className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Remember me
      </label>
    </div>
    <a href="#" className="text-sm font-medium text-primary">
      Forgot password
    </a>
  </div> */}

          <Button
            disabled={loading}
            aria-label="Login"
            type="submit"
            className="mt-2 max-w-sm"
          >
            {loading ? BUTTON_MESSAGES.loading : BUTTON_MESSAGES.login}
          </Button>
          {/* <Button variant="outline" className="w-full">
    <img
      src="https://shadcnblocks.com/images/block/logos/google-icon.svg"
      className="mr-2 size-4"
      alt="Google"
    />
    Login with Google
  </Button> */}
        </form>
      </Form>
    </div>
  )
}

export default LoginForm
