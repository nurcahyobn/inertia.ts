"use client"

import shipping from "@/data/shipping-methods.json"
import { formatMoney } from "@/utils/helpers"
import {
  IconDotsHorizontal,
  IconDuplicate,
  IconHighlight,
  IconTrash,
  IconWindowVisit,
} from "justd-icons"
import { Button, Card, Description, Menu, SearchField, Table } from "ui"
import { CreateShippingMethod } from "./create-shipping-method"

export function ListShippingMethods() {
  return (
    <>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Card.Header className="max-w-xl p-0">
          <Card.Title level={1}>Shipping Methods</Card.Title>
          <Card.Description>
            Add, edit, or disable shipping methods to offer flexible delivery options for your
            customers.
          </Card.Description>
        </Card.Header>
        <div className="flex justify-end gap-x-2">
          <SearchField placeholder="Search..." />
          <CreateShippingMethod />
        </div>
      </div>
      <Table className="border-t" aria-label="List shipping">
        <Table.Header>
          <Table.Column isRowHeader>Name</Table.Column>
          <Table.Column>Cost</Table.Column>
          <Table.Column>Estimated Delivery Time</Table.Column>
          <Table.Column>Countries Available</Table.Column>
          <Table.Column>Available</Table.Column>
          <Table.Column />
        </Table.Header>
        <Table.Body items={shipping}>
          {(item) => (
            <Table.Row>
              <Table.Cell>
                <h4 className="font-medium">{item.name}</h4>
                <Description>{item.description}</Description>
              </Table.Cell>
              <Table.Cell>{formatMoney(item.cost)}</Table.Cell>
              <Table.Cell>{item.estimated_delivery_time}</Table.Cell>
              <Table.Cell>{item.countries_available.join(", ")}</Table.Cell>
              <Table.Cell>{item.tracking_available ? "Yes" : "No"}</Table.Cell>
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
      </Table>     </>
  )
}
