import { IconPlus } from "justd-icons"
import { Form } from "react-aria-components"
import { Button, Modal, Select, TextField, Textarea } from "ui"

export function CreateShippingMethod() {
  return (
    <Modal>
      <Button>
        <IconPlus /> New
      </Button>
      <Modal.Content>
        {({ close }) => (
          <>
            <Modal.Header title="New Shipping Method" />
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                close()
              }}
            >
              <Modal.Body className="flex flex-col gap-y-4 pb-1">
                <TextField name="name" label="Name" isRequired />
                <Textarea name="description" label="Description" isRequired />
                <TextField name="cost" label="Cost" isRequired />
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField
                    name="estimated_delivery_time"
                    label="Estimated Delivery Time"
                    isRequired
                  />
                  <Select name="countries_available" label="Countries Available" isRequired>
                    <Select.Trigger />
                    <Select.List>
                      <Select.Option>US</Select.Option>
                      <Select.Option>CA</Select.Option>
                      <Select.Option>GB</Select.Option>
                      <Select.Option>AU</Select.Option>
                      <Select.Option>DE</Select.Option>
                      <Select.Option>IN</Select.Option>
                    </Select.List>
                  </Select>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Modal.Close>Close</Modal.Close>
                <Button type="submit">Save</Button>
              </Modal.Footer>
            </Form>
          </>
        )}
      </Modal.Content>
    </Modal>
  )
}
