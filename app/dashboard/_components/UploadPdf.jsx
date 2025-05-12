"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useAction, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import uuid4 from "uuid4";

const UploadPdf = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const generatedUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embeddDocument = useAction(api.myAction.ingest);
  const { user } = useUser();
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [loading, setLoading] = useState(false);

  const OnFileSelect = async (e) => {
    setFile(e.target.files[0]);
  };
  const OnUpload = async () => {
    setLoading(true);
    // Step 1: Get a short-lived upload URL
    const postUrl = await generatedUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    console.log("Uploaded file to storage ID", storageId);
    const fileId = uuid4();
    const fileUrl = await getFileUrl({ storageId });
    // Step 3: Save the storage ID to the database
    const res = await addFileEntry({
      fileId,
      storageId,
      fileName: fileName ?? "untitled File",
      createdBy: user?.primaryEmailAddress?.emailAddress,
      fileUrl,
    });
    console.log("Added file to database", res);
    const apiResp = await fetch(`/api/pdf-loader?pdfUrl=${fileUrl}`);
    const data = await apiResp.json();
    console.log(data);
    const embededResult = await embeddDocument({
      splitText: data.result,
      fileId: fileId,
    });
    console.log(embededResult);
    setLoading(false);
    setOpenDialog(false);
  };

  return (
    <Dialog className={"w-full"}>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={() => setOpenDialog(true)}>
          + Subir PDF
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Subir Archivos Pdf</DialogTitle>
          <DialogDescription asChild>
            <div className="">
              <h2>selecciona archivo PDF</h2>
              <div className="flex mt-5 gap-2 p-3 rounded-md border">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(event) => OnFileSelect(event)}
                />
              </div>
              <div className="mt-2">
                <label>Nombre archivo *</label>
                <Input
                  placeholder="Nombre archivo"
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" onClick={OnUpload} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPdf;
