"use client"
import { Paginate } from "@/components/paginate"
import brands from "@/data/brands.json"
import categories from "@/data/categories.json"
import products from "@/data/products.json"
import { get } from "@/utils/eloquent"
import { formatMoney } from "@/utils/helpers"
import {
  IconDotsHorizontal,
  IconDuplicate,
  IconFilter,
  IconHighlight,
  IconLayoutColumnHalf,
  IconPlus,
  IconTrash,
  IconWindowVisit,
  IconX,
} from "justd-icons"
import { useState } from "react"
import type { Selection } from "react-aria-components"
import { Form } from "react-aria-components"
import {
  Button,
  Description,
  Heading,
  Menu,
  Modal,
  SearchField,
  Separator,
  Table,
  TextField,
  Textarea,
} from "ui"

export function  ListProducts() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

  const isSelected = Array.from(selectedKeys).length > 0
  return (
    <>
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <Heading>Products</Heading>

        <div className="flex items-center justify-end gap-x-2">
          {isSelected ? (
            <>
              <Description>
                {selectedKeys === "all" ? "10" : [...selectedKeys].length} selected
              </Description>
              <Separator className="mx-2 h-6" orientation="vertical" />
              <Modal>
                <Button intent="danger">
                  <IconX />
                  Delete
                </Button>
                <Modal.Content>
                  {({ close }) => (
                    <>
                      <Modal.Header
                        title="Delete Selected Products?"
                        description="Are you sure you want to delete the selected items? This action cannot be undone."
                      />

                      <Modal.Footer>
                        <Modal.Close>Cancel</Modal.Close>
                        <Button
                          onPress={() => {
                            setSelectedKeys(new Set())
                            close()
                          }}
                          intent="danger"
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </>
                  )}
                </Modal.Content>
              </Modal>
            </>
          ) : (
            <div className="flex w-full flex-col justify-end gap-2 sm:flex-row sm:items-center">
              <SearchField className="sm:max-w-[13rem]" placeholder="Search..." />
              <div className="grid grid-cols-3 gap-2">
                <Menu>
                  <Button intent="outline">
                    <IconFilter />
                    Filter
                  </Button>
                  <Menu.Content placement="bottom end">
                    <Menu.Section selectionMode="multiple" title="Categories" items={categories}>
                      {(item) => (
                        <Menu.Item id={item.slug}>
                          <Menu.Label>{item.title}</Menu.Label>
                        </Menu.Item>
                      )}
                    </Menu.Section>
                    <Menu.Section selectionMode="multiple" title="Brands" items={brands}>
                      {(item) => (
                        <Menu.Item id={item.slug}>
                          <Menu.Label>{item.title}</Menu.Label>
                        </Menu.Item>
                      )}
                    </Menu.Section>
                  </Menu.Content>
                </Menu>
                <Menu>
                  <Button intent="outline">
                    <IconLayoutColumnHalf />
                    Column
                  </Button>
                  <Menu.Content selectionMode="multiple" placement="bottom end">
                    <Menu.Item>
                      <Menu.Label>Name</Menu.Label>
                    </Menu.Item>
                    <Menu.Item>
                      <Menu.Label>Stock</Menu.Label>
                    </Menu.Item>
                    <Menu.Item>
                      <Menu.Label>Sku</Menu.Label>
                    </Menu.Item>
                    <Menu.Item>
                      <Menu.Label>Category</Menu.Label>
                    </Menu.Item>
                    <Menu.Item>
                      <Menu.Label>Brand</Menu.Label>
                    </Menu.Item>
                    <Menu.Item>
                      <Menu.Label>Price</Menu.Label>
                    </Menu.Item>
                  </Menu.Content>
                </Menu>
                <Modal>
                  <Button className="whitespace-nowrap">
                    <IconPlus /> Add New
                  </Button>
                  <Modal.Content size="2xl">
                    <Modal.Header
                      title="Add New Customer"
                      description="Add a new customer to your store"
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
              </div>
            </div>
          )}
        </div>
      </div>
      <Table
        className="border-y"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        aria-label="Products"
      >
        <Table.Header>
          <Table.Column className="w-0">#</Table.Column>
          <Table.Column isRowHeader>Name</Table.Column>
          <Table.Column>Stock</Table.Column>
          <Table.Column>Sku</Table.Column>
          <Table.Column>Category</Table.Column>
          <Table.Column>Brand</Table.Column>
          <Table.Column className="flex justify-end">Price</Table.Column>
          <Table.Column />
        </Table.Header>
        <Table.Body items={products.slice(0, 10)}>
          {(item) => (
            <Table.Row>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.stock}</Table.Cell>
              <Table.Cell>{item.sku}</Table.Cell>
              <Table.Cell>{get(categories, item.category_id)?.title}</Table.Cell>
              <Table.Cell>{get(brands, item.brand_id)?.title}</Table.Cell>
              <Table.Cell className="text-right">{formatMoney(item.price)}</Table.Cell>

              <Table.Cell className="text-right">
                <Menu>
                  <Button
                    size="sq-sm"
                    intent="plain"
                    className="h-6 data-hovered:bg-fg/10 data-pressed:bg-fg/10"
                  >
                    <IconDotsHorizontal />
                  </Button>
                  <Menu.Content className="sm:min-w-44" placement="left top">
                    <Menu.Item href="#">
                      <IconHighlight /> <Menu.Label>Edit</Menu.Label>
                    </Menu.Item>
                    <Menu.Item href="#">
                      <IconWindowVisit /> <Menu.Label>View</Menu.Label>
                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item href="#">
                      <IconDuplicate /> <Menu.Label>Duplicate</Menu.Label>
                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item href="#" isDanger>
                      <IconTrash /> <Menu.Label>Delete</Menu.Label>
                    </Menu.Item>
                  </Menu.Content>
                </Menu>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <Paginate />
    </>
  )
}
