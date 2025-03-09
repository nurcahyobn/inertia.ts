import customers from "@/data/customers.json"
import { IconPlus } from "justd-icons"
import { Form } from "react-aria-components"
import { Button, Modal, Select, TextField } from "ui"

export function CreateAffiliate() {
  return (
    <Modal>
      <Button>
        <IconPlus /> New
      </Button>
      <Modal.Content>
        {({ close }) => (
          <>
            <Modal.Header title="New Affiliate" />
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                close()
              }}
            >
              <Modal.Body className="flex flex-col gap-y-4">
                <Select
                  defaultSelectedKey="active"
                  name="customer_id"
                  label="Select a customer"
                  isRequired
                >
                  <Select.Trigger />
                  <Select.List items={customers}>
                    {(item) => (
                      <Select.Option id={item.id} textValue={item.name}>
                        <Select.OptionDetails label={item.name} description={item.email} />
                      </Select.Option>
                    )}
                  </Select.List>
                </Select>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField name="email" label="Email" />
                  <TextField name="commission_rate" label="Commission Rate" />
                </div>
                <Select defaultSelectedKey="active" name="status" label="Status" isRequired>
                  <Select.Trigger />
                  <Select.List>
                    <Select.Option>Active</Select.Option>
                    <Select.Option>Inactive</Select.Option>
                  </Select.List>
                </Select>

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField name="payout_method" label="Payout Method" />
                  <TextField name="payment_details" label="Payment Details" />
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
