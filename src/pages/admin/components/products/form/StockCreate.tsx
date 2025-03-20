import { CircularProgress, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InputText from "../../../../../components/Input/InputText.tsx";
import {
  useDeleteImageMutation,
  useUploadImageMutation,
} from "../../../../../services/productApi.ts";
import {
  useCreateStockMutation,
  useGetStockByIdQuery,
  useUpdateStockMutation,
} from "../../../../../services/stockApi.ts";
import {
  IProductResponse,
  IStockResponse,
  IUploadImageResponse,
} from "../../../../../services/types/ProductInterface.tsx";
import { generateRandomNumber } from "../../../../../utils/common.ts";
import { StockType } from "../../../../../utils/constant.ts";
import DropZoneUpload from "../../DropZoneUpload.tsx";
import { useFindProduct } from "../../orders/form/useFindProduct.tsx";
import { mapPathType } from "../stock/StockMainGrid.tsx";

const lastPathName = (pathname: string, number = 2) => {
  const splitPathname = pathname.split("/");
  const lastPathname = splitPathname[splitPathname.length - number];

  return lastPathname;
};

const mapPathName = (pathname: string): StockType => {
  const path = lastPathName(pathname);
  const type = {
    ["stock"]: StockType.STOCK,
    ["pre-stock"]: StockType.PRE_STOCK,
    ["live"]: StockType.LIVE,
  };

  return type[path] ?? StockType.STOCK;
};

const titleName = (pathname: string, number = 2): StockType => {
  const path = lastPathName(pathname, number);
  const type = {
    ["stock"]: "stock",
    ["pre-stock"]: "pre stock",
    ["live"]: "live",
  };

  return type[path] ?? "Stock";
};

const StockCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const formData = useForm<IStockResponse>({
    defaultValues: {
      type: mapPathName(location.pathname),
    },
  });
  const [files, setFiles] = useState<IUploadImageResponse[]>([]);

  // *** end-point ***
  const { returnJsx, selectOption, setSelectOption, setSearchValue } =
    useFindProduct();
  const [create, { isLoading: createLoading }] = useCreateStockMutation();
  const [upload, { isLoading }] = useUploadImageMutation();
  const [deleteImage, { isLoading: deleteLoading, originalArgs: deleteArgs }] =
    useDeleteImageMutation();
  const [update, { isLoading: updateProductLoading }] =
    useUpdateStockMutation();
  const {
    data: stockById,
    isLoading: stockByIdLoading,
    isFetching: stockByIdFetching,
  } = useGetStockByIdQuery(
    {
      id: Number(param.id),
    },
    { skip: !param.id, refetchOnMountOrArgChange: true },
  );

  const appendProduct = () => {
    if (selectOption) {
      formData.reset({
        id: 1,
        name: selectOption.name,
        description: selectOption.description,
        code: selectOption.code,
        skuCode: "",
        price: selectOption.price,
        type: mapPathName(location.pathname),
        quantity: 1,
        publicId: selectOption.publicId,
        thumbnail: selectOption.thumbnail,
        createdAt: "",
        updatedAt: "",
      });
      if (selectOption.thumbnail && selectOption.thumbnail !== "") {
        setFiles([
          {
            public_id: selectOption.publicId ?? "",
            message: "",
            imageUrl: selectOption.thumbnail ?? "",
            originalFile: null,
          },
        ]);
      } else {
        setFiles([]);
      }
    }
  };

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
    data: IStockResponse,
    imageUrl?: string,
    publicId?: string,
  ) => {
    return create({
      name: data.name,
      description: data.description,
      discount: data.discount,
      skuCode: data.skuCode,
      code: data.code,
      type: data.type,
      price: data.price,
      quantity: data.quantity,
      publicId: publicId ?? "",
      thumbnail: imageUrl ?? "",
    })
      .unwrap()
      .then(() =>
        navigate(
          `/admin/products/${mapPathType(data.type)}?type=${data.type}&page=1&limit=20`,
        ),
      )
      .catch((e) => console.error(e));
  };

  const updateStock = async (
    data: IStockResponse,
    imageUrl?: string,
    publicId?: string,
  ) => {
    const thumbnail2 = imageUrl && imageUrl !== "" ? imageUrl : data.thumbnail;
    const publicId2 = publicId && publicId !== "" ? publicId : data.publicId;

    return update({
      id: Number(param.id),
      name: data.name,
      description: data.description,
      type: data.type,
      skuCode: data.skuCode,
      code: data.code,
      price: data.price,
      quantity: data.quantity,
      discount: data.discount,
      publicId: files.length > 0 ? publicId2 : "",
      thumbnail: files.length > 0 ? thumbnail2 : "",
    })
      .unwrap()
      .then(() =>
        navigate(
          `/admin/products/${mapPathType(data.type)}${window.location.search}`,
        ),
      )
      .catch((e) => console.error(e));
  };

  const handleSubmit = async (data: IStockResponse) => {
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
        } else {
          createProduct(data, files[0].imageUrl, files[0].public_id);
        }
      }
    } else {
      await createProduct(data, "", "");
    }
  };

  const handleUpdateSubmit = async (data: IStockResponse) => {
    if (files.length > 0) {
      for (const f of files.flatMap((i) => i.originalFile)) {
        const form = new FormData();
        if (f) {
          form.append("file", f);
          await upload({ form })
            .unwrap()
            .then((res) => {
              updateStock(data, res.imageUrl, res.public_id);
            });
        } else {
          await updateStock(data, "", "");
        }
      }
    } else {
      await updateStock(data, "", "");
    }
  };

  const handleGenerateCode = () => {
    const code = generateRandomNumber();
    formData.setValue("skuCode", code);
    formData.trigger("skuCode");
  };

  const validateNumber = (num: number) => {
    if (num < 0) {
      return "Value can't less than 0";
    }
  };

  useEffect(() => {
    if (selectOption) {
      appendProduct();
    }
    return () => {
      setSelectOption(undefined as never);
      setSearchValue("");
    };
  }, [selectOption, setSelectOption, setSearchValue]);

  useEffect(() => {
    if (stockById) {
      formData.reset({
        id: Number(stockById.id),
        name: stockById.name,
        description: stockById.description,
        code: stockById.code,
        type: stockById.type,
        skuCode: stockById.skuCode,
        discount: stockById.discount,
        price: stockById.price,
        quantity: stockById.quantity,
        thumbnail: stockById.thumbnail,
        createdAt: stockById.createdAt,
      });
      if (stockById.thumbnail && stockById.thumbnail !== "") {
        setFiles([
          {
            public_id: stockById.publicId ?? "",
            message: "",
            imageUrl: stockById.thumbnail ?? "",
            originalFile: null,
          },
        ]);
      } else {
        setFiles([]);
      }
    }
  }, [stockById, formData]);

  if (stockByIdLoading || stockByIdFetching) {
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
        {param.id
          ? `Update ${titleName(location.pathname, 3)}`
          : `Add ${titleName(location.pathname, 2)}`}
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
        <Stack direction="row" width="100%" gap={2}>
          <Stack width="100%" gap={1}>
            {/* search product */}
            {!param.id && returnJsx()}
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
                Discount
              </Typography>
              <InputText
                formData={formData}
                name="discount"
                placeholder="Discount"
                error={formData.formState.errors["discount"]}
                inputPropsTextField={{
                  type: "number",
                  slotProps: {
                    htmlInput: {
                      min: 1,
                      max: 100,
                    },
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack width="100%" gap={1.97}>
            <Stack gap={0.5}>
              <Typography variant="body2" color="textSecondary">
                Type
              </Typography>
              <InputText
                formData={formData}
                name="type"
                placeholder="Type"
                error={formData.formState.errors["type"]}
                inputPropsTextField={{
                  disabled: true,
                }}
                rules={{
                  required: {
                    value: true,
                    message: "Type is required",
                  },
                }}
              />
            </Stack>
            <Stack gap={0.5}>
              <Typography variant="body2" color="textSecondary">
                Code
              </Typography>
              <InputText
                formData={formData}
                name="code"
                placeholder="Code"
                error={formData.formState.errors["code"]}
                inputPropsTextField={{
                  disabled: true,
                }}
                rules={{
                  required: {
                    value: true,
                    message: "Code is required",
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
                inputPropsTextField={{
                  slotProps: {
                    input: {
                      endAdornment: !param.id && (
                        <InputAdornment position="start">
                          <Button
                            size="small"
                            variant="contained"
                            sx={{ maxHeight: "12px" }}
                            onClick={handleGenerateCode}
                          >
                            Get code
                          </Button>
                        </InputAdornment>
                      ),
                    },
                  },
                  disabled: true,
                }}
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
                  validate: (val: any) => validateNumber(val),
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
                  validate: (val: any) => validateNumber(val),
                }}
              />
            </Stack>
          </Stack>
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

export default StockCreate;
