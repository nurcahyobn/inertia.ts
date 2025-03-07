"use client"

import { Stats } from "./stats2"
import { Paginate } from "@/components/paginate"
import customers from "@/data/customers.json"
import orders from "@/data/orders.json"
import products from "@/data/products.json"
import { cn } from "@/utils/classes"
import { get } from "@/utils/eloquent"
import { dateFormat, formatMoney } from "@/utils/helpers"
import {
  IconDotsHorizontal,
  IconDuplicate,
  IconFilter,
  IconHighlight,
  IconLayoutColumnHalf,
  IconTrash,
  IconWindowVisit,
  IconX,
} from "justd-icons"
import { useState } from "react"
import type { Selection } from "react-aria-components"
import {
  Avatar,
  Badge,
  Button,
  Description,
  DetailLine,
  Heading,
  Menu,
  Modal,
  Popover,
  SearchField,
  Separator,
  Table,
} from "ui"

export function ListOrders() {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

  const isSelected = Array.from(selectedKeys).length > 0
  return (
    <>
      <Stats />

      <div
        className={cn(
          "flex flex-row justify-between gap-2 sm:items-center",
          isSelected ? "flex-row" : "flex-col sm:flex-row",
        )}
      >
        <Heading>Orders</Heading>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {isSelected ? (
            <div className="flex items-center justify-end">
              <Description>
                {selectedKeys === "all" ? "10" : [...selectedKeys].length} selected
              </Description>
              <Separator className="mx-2 h-6" orientation="vertical" />
              <Modal>
                <Button intent="danger">
                  <IconX /> Delete
                </Button>
                <Modal.Content>
                  {({ close }) => (
                    <>
                      <Modal.Header
                        title="Delete Selected Orders?"
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
            </div>
          ) : (
            <>
              <SearchField />
              <div className="grid grid-cols-2 gap-2">
                <Menu>
                  <Button intent="outline">
                    <IconFilter />
                    Filter
                  </Button>
                  <Menu.Content placement="bottom end">
                    <Menu.Section selectionMode="multiple" title="Status">
                      <Menu.Item id="pending">
                        <Menu.Label>Pending</Menu.Label>
                      </Menu.Item>
                      <Menu.Item id="canceled">
                        <Menu.Label>Canceled</Menu.Label>
                      </Menu.Item>
                      <Menu.Item id="shipped">
                        <Menu.Label>Shipped</Menu.Label>
                      </Menu.Item>
                      <Menu.Item id="delivered">
                        <Menu.Label>Delivered</Menu.Label>
                      </Menu.Item>
                    </Menu.Section>
                    <Menu.Section selectionMode="single" title="Order">
                      <Menu.Item id="asc">
                        <Menu.Label>Asc</Menu.Label>
                      </Menu.Item>
                      <Menu.Item id="desc">
                        <Menu.Label>Desc</Menu.Label>
                      </Menu.Item>
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
                      <Menu.Label>Customer</Menu.Label>
                    </Menu.Item>
                    <Menu.Item>
                      <Menu.Label>Total Amount</Menu.Label>
                    </Menu.Item>
                    <Menu.Item>
                      <Menu.Label>Status</Menu.Label>
                    </Menu.Item>
                    <Menu.Item>
                      <Menu.Label>Items</Menu.Label>
                    </Menu.Item>
                    <Menu.Item>
                      <Menu.Label>Created At</Menu.Label>
                    </Menu.Item>
                  </Menu.Content>
                </Menu>
              </div>
            </>
          )}
        </div>
      </div>

      <Table
        className="border-y"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        aria-label="Orders"
      >
        <Table.Header>
          <Table.Column className="w-0">#</Table.Column>
          <Table.Column isRowHeader>Customer</Table.Column>
          <Table.Column>Total Amount</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>Items</Table.Column>
          <Table.Column>Created At</Table.Column>
          <Table.Column />
        </Table.Header>
        <Table.Body items={orders.slice(0, 10)}>
          {(item) => (
            <Table.Row>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-x-2">
                  <Avatar
                    src={get(customers, item.customer_id)?.avatar}
                    size="small"
                    shape="circle"
                  />
                  {get(customers, item.customer_id)?.name}
                </div>
              </Table.Cell>
              <Table.Cell>{formatMoney(item.total_amount)}</Table.Cell>
              <Table.Cell>
                <Badge
                  intent={
                    item.status === "delivered"
                      ? "success"
                      : item.status === "shipped"
                        ? "primary"
                        : item.status === "pending"
                          ? "warning"
                          : "danger"
                  }
                >
                  {item.status}
                </Badge>
              </Table.Cell>
              <Table.Cell>
                <Popover>
                  <Popover.Trigger className="cursor-pointer outline-hidden">
                    {item.items.length} {item.items.length === 1 ? "Item" : "Items"}
                  </Popover.Trigger>
                  <Popover.Content>
                    <Popover.Header>
                      <Popover.Title className="font-medium sm:text-sm">
                        {item.items.length} {item.items.length === 1 ? "Item" : "Items"}
                      </Popover.Title>
                    </Popover.Header>
                    <Popover.Body className="pb-4">
                      <DetailLine>
                        {item.items.map((_product) => {
                          const product = get(products, _product.product_id)
                          return (
                            <DetailLine.Item
                              key={product?.id}
                              label={product?.name}
                              description={`${formatMoney(_product.quantity * _product?.price)}`}
                            />
                          )
                        })}
                        <Separator />
                        <DetailLine.Item
                          className="font-semibold"
                          label="Total"
                          description={`${formatMoney(item.total_amount)}`}
                        />
                      </DetailLine>
                    </Popover.Body>
                  </Popover.Content>
                </Popover>
              </Table.Cell>
              <Table.Cell>{dateFormat(item.created_at)}</Table.Cell>

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
