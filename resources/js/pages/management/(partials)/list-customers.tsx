"use client"

import { Paginate } from "@/components/paginate"
import customers from "@/data/customers.json"
import { dateFormat } from "@/utils/helpers"
import { IconBlock, IconChevronLgDown, IconPlus, IconTrash } from "justd-icons"
import { useState } from "react"
import { Form, type Selection } from "react-aria-components"
import {
  Avatar,
  Badge,
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

export function ListCustomers() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

  const isSelected = Array.from(selectedKeys).length > 0
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Heading>Customers</Heading>

        <div className="flex flex-col gap-4 sm:flex-row">
          {isSelected && (
            <div className="flex items-center justify-end">
              <Description>
                {selectedKeys === "all" ? "10" : [...selectedKeys].length} selected
              </Description>
              <Separator className="mx-2 h-6" orientation="vertical" />
              <Menu>
                <Button intent="outline">
                  Actions... <IconChevronLgDown />
                </Button>
                <Menu.Content placement="bottom end">
                  <Menu.Item>
                    <IconBlock /> <Menu.Label>Suspend</Menu.Label>
                  </Menu.Item>
                  <Menu.Item>
                    <Menu.Label>Restore</Menu.Label>
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item isDanger>
                    <IconTrash /> <Menu.Label>Delete</Menu.Label>
                  </Menu.Item>
                </Menu.Content>
              </Menu>
            </div>
          )}
          <div className="flex items-center gap-x-2">
            <SearchField placeholder="Search..." />
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
      </div>
      <Table
        className="border-y"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        aria-label="Customers"
      >
        <Table.Header>
          <Table.Column className="w-0">#</Table.Column>
          <Table.Column isRowHeader>Customer</Table.Column>
          <Table.Column>Phone</Table.Column>
          <Table.Column>Address</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Joined</Table.Column>
        </Table.Header>
        <Table.Body items={customers}>
          {(customer) => (
            <Table.Row>
              <Table.Cell>{customer.id}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-x-2 sm:items-start">
                  <Avatar
                    shape="square"
                    className="size-6 *:size-6 sm:size-8 sm:*:size-8"
                    src={customer.avatar}
                  />
                  <div className="grid gap-0.5">
                    <h4 className="font-semibold text-sm/4">{customer.name}</h4>
                    <Description className="hidden text-xs sm:inline">{customer.email}</Description>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell>{customer.phone_number}</Table.Cell>
              <Table.Cell>
                <div className="grid gap-1">
                  <h4 className="font-medium">
                    {customer.country} - {customer.city}
                  </h4>
                  <Description className="hidden text-xs sm:inline">{customer.address}</Description>
                </div>
              </Table.Cell>
              <Table.Cell>
                <Badge
                  intent={
                    customer.status === "active"
                      ? "success"
                      : customer.status === "inactive"
                        ? "warning"
                        : "danger"
                  }
                >
                  {customer.status}
                </Badge>
              </Table.Cell>
              <Table.Cell>{dateFormat(customer.created_at)}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <Paginate />
    </>
  )
}
