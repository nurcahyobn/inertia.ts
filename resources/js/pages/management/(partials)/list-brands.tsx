"use client"

import brands from "@/data/brands.json"
import { useMediaQuery } from "@/utils/use-media-query"
import { IconX } from "justd-icons"
import { useState } from "react"
import { Form, type Selection } from "react-aria-components"
import { Button, Choicebox, Description, Heading, Modal, Separator, TextField, Textarea } from "ui"

export function ListBrands() {
  const isMobile = useMediaQuery("(max-width: 600px)")
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set())

  const isSelected = Array.from(selectedKeys).length > 0
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Heading>Brands</Heading>
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
          <Modal>
            <Button>Add New</Button>
            <Modal.Content>
              <Modal.Header title="Add New Brand" description="Add a new brand to your store" />
              <Form>
                <Modal.Body className="flex flex-col gap-y-4 pb-1">
                  <TextField label="Title" placeholder="Enter title" />
                  <Textarea label="Description" placeholder="Enter description" />
                </Modal.Body>
                <Modal.Footer>
                  <Modal.Close>Cancel</Modal.Close>
                  <Button>Save</Button>
                </Modal.Footer>
              </Form>
            </Modal.Content>
          </Modal>
        )}
      </div>
      <Choicebox
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        gap={isMobile ? 0 : 2}
        aria-label="Brands"
        columns={isMobile ? 1 : 3}
        layout={isMobile ? "stack" : "grid"}
        items={brands}
      >
        {(item) => <Choicebox.Item className="**:[[slot=description]]:line-clamp-1" {...item} />}
      </Choicebox>
    </>
  )
}
