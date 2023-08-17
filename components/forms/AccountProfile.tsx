'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { UserValidation } from '@/lib/validations/user'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ChangeEvent } from 'react'

export default function AccountProfile({
  user,
  btnTitle,
}: {
  user: {
    id: string
    objectId: string
    username: string
    name: string
    bio: string
    image: string
  }
  btnTitle: string
}) {
  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      bio: '',
      name: '',
      username: '',
      profile_photo: '',
    },
  })

  function handleImageChange(e: ChangeEvent<HTMLInputElement>, fieldChange: (field: string)=>void) {
    e.preventDefault()


  }

  function onSubmit(values: z.infer<typeof UserValidation>) {
    console.log({ values })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <FormField
          name="profile_photo"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="flex items-center gap-4">
                <FormLabel className="account-form_image-label">
                  {field.value ? (
                    <Image
                      src={field.value}
                      alt="profile photo"
                      width={96}
                      height={96}
                      priority
                      className="rounded-full object-contain"
                    />
                  ) : (
                    <Image
                      src="/assets/profile.svg"
                      alt="profile photo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  )}
                </FormLabel>

                <FormControl className="flex-1 text-base-semibold text-gray-200">
                  <Input
                    type="file"
                    accept="image/*"
                    placeholder="Add profile photo"
                    className="account-form_image-input"
                    onChange={(e)=>{ handleImageChange(e, field.onChange)}}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )
          }}
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="flex w-full flex-col gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                  Name
                </FormLabel>

                <FormControl>
                  <Input
                    type="text"
                    className="account-form_input no-focus"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )
          }}
        />

        <Button type="submit" className="bg-primary-500">
          {btnTitle}
        </Button>
      </form>
    </Form>
  )
}
