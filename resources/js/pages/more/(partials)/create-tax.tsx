import { IconPlus } from "justd-icons"
import { Form } from "react-aria-components"
import { Button, Modal, Select, TextField, Textarea } from "ui"

export function CreateTax() {
  return (
    <Modal>
      <Button>
        <IconPlus /> New
      </Button>
      <Modal.Content>
        {({ close }) => (
          <>
            <Modal.Header title="New Tax" />
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                close()
              }}
            >
              <Modal.Body className="flex flex-col gap-y-4 pb-1">
                <TextField name="name" isRequired label="Name" />
                <Textarea name="description" isRequired label="Description" />
                <TextField name="rate" isRequired label="Rate" />
                <TextField name="region" isRequired label="Region" />
                <Select name="type" isRequired label="Type">
                  <Select.Trigger />
                  <Select.List>
                    <Select.Option>sales_tax</Select.Option>
                    <Select.Option>value_added_tax</Select.Option>
                    <Select.Option>goods_and_services_tax</Select.Option>
                    <Select.Option>exempt</Select.Option>
                  </Select.List>
                </Select>
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
