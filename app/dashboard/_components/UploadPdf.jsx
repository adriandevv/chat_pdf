import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const UploadPdf = ({children,className}) => {
    return (
  
            <Dialog className={'w-full'}>
                <DialogTrigger asChild>{children}</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Subir Archivos Pdf</DialogTitle>
                        <DialogDescription asChild>
                            <div className="">
                                <div className="flex mt-5 gap-2 p-3 rounded-md border">
                                    <h2>selecciona archivo PDF</h2>
                                    <input type="file" />
                                </div>
                                <div className="mt-2">
                                    <label>Nombre archivo *</label>
                                    <Input placeholder="Nombre archivo" />
                                </div>
                            </div>

                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


  
    )
}

export default UploadPdf