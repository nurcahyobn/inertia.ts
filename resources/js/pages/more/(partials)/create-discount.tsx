import { IconPlus } from "justd-icons"
import { Form } from "react-aria-components"
import { Button, DatePicker, Modal, NumberField, Select, TextField, Textarea } from "ui"

export function CreateDiscount() {
  return (
    <Modal>
      <Button>
        <IconPlus /> New
      </Button>
      <Modal.Content>
        {({ close }) => (
          <>
            <Modal.Header title="New Discount" />
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                close()
              }}
            >
              <Modal.Body className="flex flex-col gap-y-4 pb-1">
                <TextField name="code" label="Code" isRequired />
                <Textarea name="description" label="Description" isRequired />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Select name="discount_type" label="Discount Type" isRequired>
                    <Select.Trigger />
                    <Select.List>
                      <Select.Option>Percentage</Select.Option>
                      <Select.Option>Fixed Amount</Select.Option>
                      <Select.Option>Free Shipping</Select.Option>
                    </Select.List>
                  </Select>
                  <TextField name="amount" label="Amount" isRequired />
                  <DatePicker label="Start Date" isRequired />
                  <DatePicker label="Expiry Date" isRequired />
                  <NumberField name="usage_limit" label="Usage Limit" isRequired />
                  <Select name="status" label="Status" isRequired>
                    <Select.Trigger />
                    <Select.List>
                      <Select.Option>Active</Select.Option>
                      <Select.Option>Inactive</Select.Option>
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
