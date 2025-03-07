import GuestLayout from "@/layouts/guest-layout"
import { Head, useForm } from "@inertiajs/react"
import { IconPlus } from "justd-icons"
import type React from "react"
import { useEffect } from "react"
import { Button, Form, Link,  TextField, Textarea, Modal } from "ui"

export default function Form_Organizations() {
   const { data, setData, post, processing, errors, reset } = useForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      region: '',
      country: '',
      postal_code: ''
   })

   useEffect(() => {
      return () => {
         reset("email", "phone")
      }
   }, [])

   const submit = (e: { preventDefault: () => void }) => {
      e.preventDefault()

      post("/register")
   }
   return (
      <>
         <Modal >
          <Button className="whitespace-nowrap">
            <IconPlus /> Add New
          </Button>
          <Modal.Content size="2xl">
            <Modal.Header
              title="Add New Organizations"
              description="Add a new organizations to your store"
            />
            <Form>
              <Modal.Body className="grid gap-4 pb-1">
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField isRequired label="Name" name="name" />
                  <TextField isRequired label="Email" name="email" />
                </div>
                <TextField isRequired label="Phone" name="phone" />
                <Textarea isRequired label="Address" name="address" />
              </Modal.Body>
              <Modal.Footer>
                <Modal.Close>Cancel</Modal.Close>
                <Button>Save</Button>
              </Modal.Footer>
            </Form>
          </Modal.Content>
        </Modal>
      </>
   )
}
