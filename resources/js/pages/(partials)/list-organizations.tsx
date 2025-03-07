import ModalDelete from "@/components/modal-delete"
import { Paginate } from "@/components/paginate-org"
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
import { toast } from 'sonner';
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

// Tambahan
import { usePrevious } from 'react-use';
import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import pickBy from 'lodash/pickBy';
import FilterBar from "@/components/FilterBar/FilterBar"


interface Organization {
   id: number;
   name: string;
   phone: string;
   city: string;
   region: string;
   deleted_at: string | null;
}

interface ListOrganizationProps {
   organizations: {
      data: Organization[];
      links: {
         label: string;
         url: string | null;
         active: boolean;
      }[];
      current_page: number;
      last_page: number;
      total: number;
      per_page: number;
      from: number;
      to: number;
      first_page_url: string;
      last_page_url: string;
      next_page_url: string | null;
      prev_page_url: string | null;
      path: string;
   };
   filters: {
      search?: string;
      trashed?: string;
   };
}

export function ListOrganization({ organizations }: ListOrganizationProps) {
   const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());



   const isSelected = Array.from(selectedKeys).length > 0;
   const handleDelete = () => {
      // console.log("Deleted items:", Array.from(selectedKeys));
      toast.success(`Organization created successfully!<p>Test </p>}`);

      setSelectedKeys(new Set());
   };

   function onDelete(id: string) {
      toast.success(`Delete <p>${id}</p>`);
   }


   const { filters } = usePage<{
      filters: { role?: string; search?: string; trashed?: string };
   }>().props;

   const [opened, setOpened] = useState(false);

   const [values, setValues] = useState({
      role: filters.role || '', // role is used only on users page
      search: filters.search || '',
      trashed: filters.trashed || ''
   });

   const prevValues = usePrevious(values);

   function reset() {
      setValues({
         role: '',
         search: '',
         trashed: ''
      });
   }

   useEffect(() => {
      // https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
      if (prevValues) {
         const query = Object.keys(pickBy(values)).length ? pickBy(values) : {};

         router.get(route(route().current() as string), query, {
            replace: true,
            preserveState: true
         });
      }
   }, [values]);

   //  function handleChange(
   //    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   //  ) {
   //    const name = e.target.name;
   //    const value = e.target.value;

   //    setValues(values => ({
   //      ...values,
   //      [name]: value
   //    }));

   //    if (opened) setOpened(false);
   //  }

   function handleChange(value: string) {
      setValues((prevValues) => ({
         ...prevValues,
         search: value, // 'value' langsung dari SearchField
      }));

      if (opened) setOpened(false);
   }
   return (
      <>
         <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <Heading>Organizations</Heading>

            {/* <div className="flex items-center justify-end gap-x-2">
               {isSelected ? (
                  <>
                     <span>
                        {selectedKeys === "all" ? organizations.data.length : [...selectedKeys].length} selected
                     </span>
                     <Button intent="danger">
                        <IconTrash />
                        Delete
                     </Button>
                  </>
               ) : (
                  <Button>
                     <IconPlus /> Add New
                  </Button>
               )}
            </div> */}

            {/* Toolbar */}
            <div className="flex items-center justify-end gap-x-2">
               {isSelected ? (
                  <>
                     <Description>
                        {selectedKeys === "all" ? organizations.data.length : [...selectedKeys].length} selected
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
                  <FilterBar />
               )}
            </div>
         </div>

         {/* <ModalDelete onDelete={handleDelete} /> */}
         <Table
            className="border-y"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            aria-label="Organizations"
         >
            <Table.Header>
               <Table.Column>#</Table.Column>
               <Table.Column isRowHeader>Name</Table.Column>
               <Table.Column>Phone</Table.Column>
               <Table.Column>City</Table.Column>
               <Table.Column>Region</Table.Column>
               <Table.Column>Status</Table.Column>
               <Table.Column />
            </Table.Header>
            <Table.Body items={organizations.data}>
               {(item) => (
                  <Table.Row>
                     <Table.Cell>{item.id}</Table.Cell>
                     <Table.Cell>{item.name}</Table.Cell>
                     <Table.Cell>{item.phone}</Table.Cell>
                     <Table.Cell>{item.city}</Table.Cell>
                     <Table.Cell>{item.region}</Table.Cell>
                     <Table.Cell>
                        {item.deleted_at ? <span className="text-red-500">Inactive</span> : <span className="text-green-500">Active</span>}
                     </Table.Cell>
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
                              <Menu.Item href="#" onAction={() => onDelete(item.id.toString())} isDanger>
                                 <IconTrash /> <Menu.Label>Delete</Menu.Label>
                              </Menu.Item>
                           </Menu.Content>
                        </Menu>
                     </Table.Cell>
                  </Table.Row>
               )}
            </Table.Body>
         </Table>
         <Paginate data_pages={organizations} />

      </>
   );
}
