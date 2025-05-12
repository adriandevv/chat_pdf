"use client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import WorkspaceHeader from "../_components/WorkspaceHeader";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PdfViewer from "../_components/PdfViewer";
import TextEditor from "../_components/TextEditor";

const Workspace = () => {
  const { fileId } = useParams();
  const fileInfo = useQuery(api.fileStorage.getFileRecord, { fileId });

  useEffect(() => {
    console.log(fileInfo);
  }, [fileInfo]);
  return (
    <div>
      <WorkspaceHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-5">
        <div className="px-5">
          {/* TEXT EDITO */}
          <TextEditor />
        </div>
        <div className='hidden md:block' >
          {/* PDF VIEWER  */}
          <PdfViewer fileUrl={fileInfo?.fileUrl} />
        </div>
      </div>
    </div>
  );
};
export default Workspace;
