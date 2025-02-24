"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

const UploadPdf = ({ children }) => {
    const generatedUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
    const [file, setFile] = useState();
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
        setLoading(false);
        file.current.value = "";
    };

    return (

        <Dialog className={'w-full'}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Subir Archivos Pdf</DialogTitle>
                    <DialogDescription asChild>
                        <div className="">
                            <h2>selecciona archivo PDF</h2>
                            <div className="flex mt-5 gap-2 p-3 rounded-md border">
                                <input type="file" accept="application/pdf" onChange={event => OnFileSelect(event)} />
                            </div>
                            <div className="mt-2">
                                <label>Nombre archivo *</label>
                                <Input placeholder="Nombre archivo" />
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
                    <Button type="submit" onClick={OnUpload} >
                        {loading ? <Loader2Icon className="animate-spin" /> : 'Guardar'}

                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>



    )
}

export default UploadPdf