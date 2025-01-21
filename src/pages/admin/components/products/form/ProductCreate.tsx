import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import InputText from "../../../../../components/Input/InputText";
import {
  IProductResponse,
  IUploadImageResponse,
} from "../../../../../services/types/ProductInterface";
import DropZoneUpload from "../../DropZoneUpload";
import {
  useCreateProductMutation,
  useDeleteImageMutation,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useUploadImageMutation,
} from "../../../../../services/productApi.ts";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  //   height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  //   padding: theme.spacing(2),
  //   [theme.breakpoints.up("sm")]: {
  //     padding: theme.spacing(4),
  //   },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

const ProductCreate = () => {
  const navigate = useNavigate();
  const param = useParams();
  const formData = useForm<IProductResponse>();
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
      // setFiles((prev) => [
      //   ...prev,
      //   {
      //     public_id: "",
      //     message: "",
      //     imageUrl: URL.createObjectURL(f),
      //     originalFile: f,
      //   },
      // ]);
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
      .then(() => navigate("/admin/products"))
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
      .then(() => navigate("/admin/products"))
      .catch((e) => console.error(e));
  };

  const handleSubmit = async (data: IProductResponse) => {
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

  const handleUpdateSubmit = async (data: IProductResponse) => {
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
            Name
          </Typography>
          <InputText
            formData={formData}
            name="name"
            placeholder="Name"
            error={formData.formState.errors["name"]}
            rules={{
              required: {
                value: true,
                message: "Name is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Description
          </Typography>
          <InputText
            formData={formData}
            name="description"
            placeholder="Description"
            error={formData.formState.errors["description"]}
            inputPropsTextField={{
              type: "text",
              multiline: true,
              rows: 5,
            }}
            rules={{
              required: {
                value: false,
                message: "Description is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Sku Code
          </Typography>
          <InputText
            formData={formData}
            name="skuCode"
            placeholder="Sku Code"
            error={formData.formState.errors["skuCode"]}
            rules={{
              required: {
                value: true,
                message: "Sku Code is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Price
          </Typography>
          <InputText
            formData={formData}
            name="price"
            placeholder="Price"
            error={formData.formState.errors["price"]}
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
                message: "Price is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Quantity
          </Typography>
          <InputText
            formData={formData}
            name="quantity"
            placeholder="Quantity"
            error={formData.formState.errors["quantity"]}
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
                message: "Quantity is required",
              },
            }}
          />
        </Stack>
        <Stack gap={0.5}>
          <Typography variant="body2" color="textSecondary">
            Thumbnail
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

export default ProductCreate;
