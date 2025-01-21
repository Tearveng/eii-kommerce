import { useEffect, useMemo, useState } from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { IUploadImageResponse } from "../../../services/types/ProductInterface.tsx";
import { Button, CircularProgress } from "@mui/material";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const thumbsContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb: React.CSSProperties = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export interface IDropZoneUploadProps {
  loading: boolean;
  onDrop: (file: File[]) => void;
  resFiles: IUploadImageResponse[];
  onDelete: (props: { publicId: string; index?: number }) => void;
  deleteLoading: boolean;
  deleteArgs: any;
  dropZoneOptions?: DropzoneOptions;
}

function DropZoneUpload(props: IDropZoneUploadProps) {
  const {
    loading,
    resFiles,
    onDelete,
    onDrop,
    deleteLoading,
    deleteArgs,
    dropZoneOptions,
  } = props;
  const [files, setFiles] = useState<IUploadImageResponse[]>([]);
  const { getRootProps, getInputProps, isFocused, isDragReject, isDragAccept } =
    useDropzone({
      ...dropZoneOptions,
      accept: {
        "image/*": [],
      },
      onDrop: async (acceptedFiles) => {
        onDrop(acceptedFiles);
      },
    });

  const thumbs = files.map((file, i) => (
    <div style={{ ...thumb, position: "relative" }} key={file.public_id}>
      <div style={{ ...thumbInner }}>
        <RemoveCircleOutlineRoundedIcon
          onClick={() => {
            if (deleteLoading) {
              return;
            } else {
              onDelete({
                publicId: file.public_id,
                index: i,
              });
            }
          }}
          color="error"
          sx={{
            width: 20,
            position: "absolute",
            top: -10,
            right: -10,
            cursor: "pointer",
          }}
        />
        {deleteLoading && deleteArgs.publicId === file.public_id && (
          <div
            style={{
              backgroundColor: "#fff",
              opacity: 0.5,
              width: "100%",
              top: "0",
              left: "0",
              height: "100%",
              filter: "blur(5px)",
              position: "absolute",
              zIndex: 0,
            }}
          ></div>
        )}
        {deleteLoading && deleteArgs.publicId === file.public_id && (
          <CircularProgress
            color="inherit"
            size={20}
            sx={{
              top: "40%",
              left: "40%",
              position: "absolute",
              zIndex: 99,
            }}
          />
        )}
        <img src={file.imageUrl} style={img} alt={file.public_id} />
      </div>
    </div>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  ) as React.CSSProperties;

  useEffect(() => {
    setFiles(resFiles);
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    // return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [resFiles]);

  return (
    <section className="container">
      <div {...getRootProps({ style })}>
        {!loading && <input {...getInputProps()} />}
        {loading ? (
          <Button
            variant={"text"}
            disabled
            startIcon={<CircularProgress color="inherit" size={20} />}
          >
            uploading....
          </Button>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}

export default DropZoneUpload;
