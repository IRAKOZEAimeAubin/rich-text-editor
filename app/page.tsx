'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import Tiptap from '@/components/Tiptap'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'

export default function Home() {
  const formSchema = z.object({
    title: z
      .string()
      .min(5, {message: 'Title is too short!'})
      .max(100, {message: 'Title is too long!'}),
    price: z.number(),
    description: z
      .string()
      .min(5, {message: 'Description is too short!'})
      .max(255, {message: 'Description is too long!'}),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      price: 0.0,
      description: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something
    console.log(values)
  }

  return (
    <main className='p-24'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='title'
            render={({field}) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Main title for your product...'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({field}) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Tiptap description={field.name} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className='my-4' type='submit'>
            Submit
          </Button>
        </form>
      </Form>
    </main>
  )
}
