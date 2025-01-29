import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputText from "../../../../../components/Input/InputText.tsx";
import {
  useCreateProductMutation,
  useDeleteImageMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../../../../services/productApi.ts";
import {
  IProductResponse,
  IUploadImageResponse,
} from "../../../../../services/types/ProductInterface.tsx";
import { IUserResponse } from "../../../../../services/types/UserInterface.tsx";
import DropZoneUpload from "../../DropZoneUpload.tsx";

const UserCreate = () => {
  const navigate = useNavigate();
  const param = useParams();
  const formData = useForm<IUserResponse>();
  const [files, setFiles] = useState<IUploadImageResponse[]>([]);

  // *** end-point ***
  const [create, { isLoading: createLoading }] = useCreateProductMutation();
  const [upload, { isLoading }] = useUploadImageMutation();
  const [deleteImage, { isLoading: deleteLoading, originalArgs: deleteArgs }] =
    useDeleteImageMutation();

  const [update, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();
  const {
    data: productById,
    isLoading: productByIdLoading,
    isFetching: productByIdFetching,
  } = useGetProductByIdQuery(
    {
      id: Number(param.id),
    },
    { skip: !param.id, refetchOnMountOrArgChange: true },
  );

  const onDropFiles = async (fil: File[]) => {
    for (const f of fil) {
      setFiles([
        {
          public_id: "",
          message: "",
          imageUrl: URL.createObjectURL(f),
          originalFile: f,
        },
      ]);
    }
  };

  const onDeleteFile = async (props: { publicId?: string; index?: number }) => {
    if (props.publicId && props.publicId !== "") {
      await deleteImage({ publicId: props.publicId })
        .unwrap()
        .then((res) => {
          setFiles((prev) =>
            prev.filter((item) => item.public_id !== res.public_id),
          );
        });
    } else {
      setFiles((prev) => prev.filter((_, i) => i !== props.index));
    }
  };

  const createProduct = async (
    data: IProductResponse,
    imageUrl?: string,
    publicId?: string,
  ) => {
    return create({
      name: data.name,
      description: data.description,
      skuCode: data.skuCode,
      code: "",
      price: data.price,
      quantity: data.quantity,
      publicId: publicId ?? "",
      thumbnail: imageUrl ?? "",
    })
      .unwrap()
      .then(() => navigate("/admin/products?page=1&limit=20"))
      .catch((e) => console.error(e));
  };

  const updateProduct = async (
    data: IProductResponse,
    imageUrl?: string,
    publicId?: string,
  ) => {
    const thumbnail2 = imageUrl && imageUrl !== "" ? imageUrl : data.thumbnail;
    const publicId2 = publicId && publicId !== "" ? publicId : data.publicId;

    return update({
      id: Number(param.id),
      name: data.name,
      description: data.description,
      skuCode: data.skuCode,
      code: "",
      price: data.price,
      quantity: data.quantity,
      publicId: files.length > 0 ? publicId2 : "",
      thumbnail: files.length > 0 ? thumbnail2 : "",
    })
      .unwrap()
      .then(() => navigate(`/admin/products${window.location.search}`))
      .catch((e) => console.error(e));
  };

  const handleSubmit = async (data: IUserResponse) => {
    if (files.length > 0) {
      for (const f of files.flatMap((i) => i.originalFile)) {
        const form = new FormData();
        if (f) {
          form.append("file", f);
          await upload({ form })
            .unwrap()
            .then((res) => {
              createProduct(data, res.imageUrl, res.public_id);
            });
        }
      }
    } else {
      await createProduct(data, "", "");
    }
  };

  const handleUpdateSubmit = async (data: IUserResponse) => {
    if (files.length > 0) {
      for (const f of files.flatMap((i) => i.originalFile)) {
        const form = new FormData();
        if (f) {
          form.append("file", f);
          await upload({ form })
            .unwrap()
            .then((res) => {
              updateProduct(data, res.imageUrl, res.public_id);
            });
        } else {
          await updateProduct(data, "", "");
        }
      }
    } else {
      await updateProduct(data, "", "");
    }
  };

  useEffect(() => {
    if (productById) {
      formData.reset({
        id: Number(productById.id),
        name: productById.name,
        description: productById.description,
        code: productById.code,
        skuCode: productById.skuCode,
        price: productById.price,
        quantity: productById.quantity,
        thumbnail: productById.thumbnail,
        createdAt: productById.createdAt,
      });
      if (productById.thumbnail && productById.thumbnail !== "") {
        setFiles([
          {
            public_id: productById.publicId ?? "",
            message: "",
            imageUrl: productById.thumbnail ?? "",
            originalFile: null,
          },
        ]);
      } else {
        setFiles([]);
      }
    }
  }, [productById, formData]);

  if (productByIdLoading || productByIdFetching) {
    return <>loading...</>;
  }

  const createFormLoading = createLoading || isLoading;
  const updateFormLoading = updateProductLoading || isLoading;
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
    >
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {param.id ? "Update" : "Create"}
      </Typography>
      <Box
        component="form"
        onSubmit={formData.handleSubmit(
          param.id ? handleUpdateSubmit : handleSubmit,
        )}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: 2,
        }}
      >
        {/* <FormControl> */}
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            First name
          </Typography>
          <InputText
            formData={formData}
            name="firstName"
            placeholder="First name"
            error={formData.formState.errors["firstName"]}
            rules={{
              required: {
                value: true,
                message: "First name is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Last name
          </Typography>
          <InputText
            formData={formData}
            name="lastName"
            placeholder="Last name"
            error={formData.formState.errors["lastName"]}
            inputPropsTextField={{
              type: "text",
              multiline: true,
              rows: 5,
            }}
            rules={{
              required: {
                value: false,
                message: "Last name is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Email
          </Typography>
          <InputText
            formData={formData}
            name="email"
            placeholder="Email"
            error={formData.formState.errors["email"]}
            rules={{
              required: {
                value: true,
                message: "Email is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Phone
          </Typography>
          <InputText
            formData={formData}
            name="phone"
            placeholder="Phone"
            error={formData.formState.errors["phone"]}
            inputPropsTextField={{
              type: "number",
              slotProps: {
                htmlInput: {
                  min: 1,
                },
              },
            }}
            rules={{
              required: {
                value: true,
                message: "Phone is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Profile
          </Typography>
          <DropZoneUpload
            onDrop={onDropFiles}
            loading={isLoading}
            resFiles={files}
            onDelete={onDeleteFile}
            deleteLoading={deleteLoading}
            deleteArgs={deleteArgs}
            dropZoneOptions={{ multiple: false }}
          />
        </Stack>
        {param.id ? (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={updateFormLoading}
            startIcon={
              updateFormLoading && (
                <CircularProgress color="inherit" size={20} />
              )
            }
          >
            {updateFormLoading ? "Updating" : "Update"}
          </Button>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={createFormLoading}
            startIcon={
              createFormLoading && (
                <CircularProgress color="inherit" size={20} />
              )
            }
          >
            {createFormLoading ? "Submitting" : "Submit"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserCreate;
