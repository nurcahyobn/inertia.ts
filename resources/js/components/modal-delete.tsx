import { useState } from "react";
import { Modal, Button } from "ui";

interface ModalDeleteProps {
   title?: string;
   description?: string;
   onDelete: () => void;
}

export default function ModalDelete({
   title = "Delete Item?",
   description = "Are you sure you want to delete this item? This action cannot be undone.",
   onDelete,
}: ModalDeleteProps) {
   const [isOpen, setIsOpen] = useState(true);

   return (
      <>
         {isOpen && (
            <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
               <Modal.Content>
                  {({ close }) => (
                     <>
                        <Modal.Header title={title} description={description} />

                        <Modal.Footer>
                           <Modal.Close onPress={close}>Cancel</Modal.Close>
                           <Button
                              onPress={() => {
                                 onDelete();
                                 close();
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
         )}
      </>
   );
}
