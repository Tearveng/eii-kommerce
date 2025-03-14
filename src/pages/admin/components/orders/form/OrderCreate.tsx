import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import { IconButton, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputPhone from "../../../../../components/Input/InputPhone.tsx";
import InputText from "../../../../../components/Input/InputText.tsx";
import {
  useCreateUserMutation,
  useDeleteImageMutation,
  useUpdateUserMutation,
  useUploadImageMutation,
} from "../../../../../services/adminApi.ts";
import {
  IProductResponse,
  IUploadImageResponse,
} from "../../../../../services/types/ProductInterface.tsx";
import {
  IUserCreatePayload,
  IUserResponse,
} from "../../../../../services/types/UserInterface.tsx";
import { useGetUserByIdQuery } from "../../../../../services/userApi.ts";
import { validateEmail, validatePhone } from "../../../../../utils/common.ts";
import { useFindProduct } from "./useFindProduct.tsx";
import { usePreview } from "./usePreview.tsx";
import CodeBlockToPdf from "../../../../../utils/internals/CodeBlockToPdf.tsx";

const OrderCreate = () => {
  const navigate = useNavigate();
  const param = useParams();
  const formData = useForm<IUserResponse & { products: IProductResponse[] }>();
  const formDataArray = useFieldArray({
    control: formData.control,
    name: "products",
  });
  const watchProducts = formData.watch("products");
  const { returnJsx, selectOption, setSelectOption, setSearchValue } =
    useFindProduct();
  const { previewReceipt } = usePreview({
    tableData: watchProducts,
  });
  const [files, setFiles] = useState<IUploadImageResponse[]>([]);
  const [showPassword, setShowPassword] = useState(true);
  const handleShowPassword = () => (showPassword ? "password" : "text");

  // *** end-point ***
  const [create, { isLoading: createLoading }] = useCreateUserMutation();
  const [upload, { isLoading }] = useUploadImageMutation();
  const [deleteImage, { isLoading: deleteLoading, originalArgs: deleteArgs }] =
    useDeleteImageMutation();

  const [update, { isLoading: updateUserLoading }] = useUpdateUserMutation();
  const {
    data: userById,
    isLoading: userByIdLoading,
    isFetching: userByIdFetching,
  } = useGetUserByIdQuery(
    {
      id: Number(param.id),
    },
    { skip: !param.id, refetchOnMountOrArgChange: true },
  );

  const watchPassword = formData.watch("password");

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

  const createUser = async (
    data: IUserCreatePayload,
    imageUrl?: string,
    publicId?: string,
  ) => {
    return create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      phone: data.phone,
      publicId: publicId ?? "",
      profile: imageUrl ?? "",
    })
      .unwrap()
      .then(() => navigate("/admin/people?page=1&limit=20"))
      .catch((e) => console.error(e));
  };

  const updateUser = async (
    data: IUserResponse,
    imageUrl?: string,
    publicId?: string,
  ) => {
    const profile2 = imageUrl && imageUrl !== "" ? imageUrl : data.profile;
    const publicId2 = publicId && publicId !== "" ? publicId : data.publicId;

    return update({
      id: Number(param.id),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      publicId: files.length > 0 ? publicId2 : "",
      profile: files.length > 0 ? profile2 : "",
    })
      .unwrap()
      .then(() => navigate(`/admin/people${window.location.search}`))
      .catch((e) => console.error(e));
  };

  const handleSubmit = async (data: IUserCreatePayload) => {
    console.log("data", data);
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
              updateUser(data, res.imageUrl, res.public_id);
            });
        } else {
          await updateUser(data, "", "");
        }
      }
    } else {
      await updateUser(data, "", "");
    }
  };

  const appendProduct = () => {
    if (selectOption) {
      const duplicateCode = watchProducts
        .flatMap((item) => item.code)
        .includes(selectOption.code);
      if (duplicateCode || typeof selectOption === "string") {
        return;
      }

      formDataArray.append({
        id: 1,
        name: selectOption.name,
        description: selectOption.description,
        code: selectOption.code,
        skuCode: selectOption.skuCode,
        price: selectOption.price,
        quantity: 1,
        publicId: selectOption.publicId,
        thumbnail: selectOption.thumbnail,
        createdAt: "",
        updatedAt: "",
      });
    }
  };
  const removeProduct = async (index: number) => {
    formDataArray.remove(index);
  };

  const handleKeyDown = (event) => {
    if (event.key === "." || event.key === ",") {
      event.preventDefault();
    }
  };

  const handleOnPast = (event) => {
    const text = event.clipboardData.getData("text");
    if (text.includes(".") || text.includes(",")) {
      event.preventDefault();
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
    if (userById) {
      formData.reset({
        id: Number(userById.id),
        firstName: userById.firstName,
        lastName: userById.lastName,
        email: userById.email,
        phone: userById.phone,
        profile: userById.profile,
        createdAt: userById.createdAt,
      });
      if (userById.profile && userById.profile !== "") {
        setFiles([
          {
            public_id: userById.publicId ?? "",
            message: "",
            imageUrl: userById.profile ?? "",
            originalFile: null,
          },
        ]);
      } else {
        setFiles([]);
      }
    }
  }, [userById, formData]);

  if (userByIdLoading || userByIdFetching) {
    return <>loading...</>;
  }

  const createFormLoading = createLoading || isLoading;
  const updateFormLoading = updateUserLoading || isLoading;
  return (
    <Box
      component="form"
      onSubmit={formData.handleSubmit(handleSubmit)}
      noValidate
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
          {param.id ? "Update" : "Order purchase"}
        </Typography>
        <Stack direction="row" gap={2}>
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: 100, borderRadius: "6px", height: 32 }}
            // startIcon={<AddRoundedIcon />}
            // onClick={() => navigate("/admin/products/create")}
          >
            Clear
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="medium"
            sx={{ minWidth: 100, borderRadius: "6px", height: 32 }}
            // onClick={() => navigate("/admin/products/create")}
          >
            Save
          </Button>
        </Stack>
      </Stack>
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
        <Stack direction="row" gap={2}>
          <Stack gap={0.5} flexGrow={1}>
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
          <Stack gap={0.5} flexGrow={1}>
            <Typography variant="body2" color="textSecondary">
              Last name
            </Typography>
            <InputText
              formData={formData}
              name="lastName"
              placeholder="Last name"
              error={formData.formState.errors["lastName"]}
              rules={{
                required: {
                  value: false,
                  message: "Last name is required",
                },
              }}
            />
          </Stack>
        </Stack>
        <Stack direction="row" gap={2}>
          <Stack gap={0.5} flexGrow={1}>
            <Typography variant="body2" color="textSecondary">
              Email address
            </Typography>
            <InputText
              formData={formData}
              name="email"
              placeholder="Email address"
              error={formData.formState.errors["email"]}
              rules={{
                required: {
                  value: false,
                  message: "Email address is required",
                },
                validate: (val: any) => validateEmail(val),
              }}
            />
          </Stack>
          <Stack gap={0.5} flexGrow={1}>
            <Typography variant="body2" color="textSecondary">
              Phone number
            </Typography>
            <InputPhone
              formData={formData}
              name="phone"
              placeholder="Phone number"
              error={formData.formState.errors["phone"]}
              rules={{
                required: {
                  value: true,
                  message: "Phone number is required",
                },
                validate: (val: any) => validatePhone(val),
              }}
            />
          </Stack>
        </Stack>
        <Stack direction="row" gap={2}>
          <Stack gap={0.5} flexGrow={1}>
            <Typography variant="body2" color="textSecondary">
              Address
            </Typography>
            <InputText
              formData={formData}
              name="username"
              placeholder="Address"
              error={formData.formState.errors["username"]}
              inputPropsTextField={{
                type: "text",
                multiline: true,
                rows: 5,
              }}
            />
          </Stack>
        </Stack>
        <Stack direction="row" flexWrap="wrap">
          <Stack gap={2} flexGrow={1}>
            {returnJsx()}
            {formDataArray.fields.map((item, index) => (
              <Stack direction="row" gap={2} key={item.id}>
                <Stack gap={0.5} maxWidth={250} flexGrow={1}>
                  <Typography variant="body2" color="textSecondary">
                    Product name
                  </Typography>
                  <InputText
                    formData={formData}
                    name={`products.${index}.name`}
                    placeholder="Product name"
                    inputPropsTextField={{
                      disabled: true,
                    }}
                    // error={formData.formState.errors[""]}
                    rules={{
                      required: {
                        value: true,
                        message: "Product name is required",
                      },
                    }}
                  />
                </Stack>
                <Stack gap={0.5} maxWidth={150} flexGrow={1}>
                  <Typography variant="body2" color="textSecondary">
                    Code
                  </Typography>
                  <InputText
                    formData={formData}
                    name={`products.${index}.code`}
                    placeholder="Code"
                    inputPropsTextField={{
                      disabled: true,
                    }}
                    // error={formData.formState.errors[""]}
                    rules={{
                      required: {
                        value: true,
                        message: "Code is required",
                      },
                    }}
                  />
                </Stack>
                {watchProducts[index].thumbnail && (
                  <Stack gap={0.5} maxWidth={150} flexGrow={1}>
                    <Typography variant="body2" color="textSecondary">
                      Image
                    </Typography>
                    <img
                      style={{
                        maxWidth: "30px",
                      }}
                      src={watchProducts[index].thumbnail}
                      alt={watchProducts[index].publicId ?? ""}
                      loading="lazy"
                    />
                  </Stack>
                )}
                <Stack gap={0.5} maxWidth={100} flexGrow={1}>
                  <Typography variant="body2" color="textSecondary">
                    Price
                  </Typography>
                  <InputText
                    inputPropsTextField={{
                      disabled: true,
                      slotProps: {
                        input: {
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          ),
                        },
                      },
                    }}
                    formData={formData}
                    name={`products.${index}.price`}
                    placeholder="Price"
                    // error={formData.formState.errors[""]}
                    rules={{
                      required: {
                        value: true,
                        message: "Price is required",
                      },
                    }}
                  />
                </Stack>
                <Stack gap={0.5} maxWidth={100} flexGrow={1}>
                  <Typography variant="body2" color="textSecondary">
                    Quantity
                  </Typography>
                  <InputText
                    inputPropsTextField={{
                      defaultValue: 1,
                      type: "number",
                      slotProps: {
                        htmlInput: {
                          min: 1,
                          step: 1,
                        },
                      },
                      onKeyDown: handleKeyDown,
                      onPaste: handleOnPast,
                    }}
                    formData={formData}
                    name={`products.${index}.quantity`}
                    placeholder="QTY"
                    // error={formData.formState.errors[""]}
                    rules={{
                      required: {
                        value: true,
                        message: "Quantity is required",
                      },
                    }}
                  />
                </Stack>
                <Stack gap={0.5} maxWidth={80} flexGrow={1}>
                  <Typography variant="body2" color="textSecondary">
                    Total
                  </Typography>
                  <Stack p="10px 0px">
                    <Typography variant="body2">
                      ${" "}
                      {(
                        watchProducts[index].price *
                        watchProducts[index].quantity
                      ).toFixed(2)}
                    </Typography>
                  </Stack>
                  {/*<InputText*/}
                  {/*  inputPropsTextField={{*/}
                  {/*    type: "number",*/}
                  {/*    slotProps: {*/}
                  {/*      htmlInput: {*/}
                  {/*        min: 1,*/}
                  {/*      },*/}
                  {/*    },*/}
                  {/*  }}*/}
                  {/*  formData={formData}*/}
                  {/*  name={`products.${index}.quantity`}*/}
                  {/*  placeholder="Price"*/}
                  {/*  // error={formData.formState.errors[""]}*/}
                  {/*  rules={{*/}
                  {/*    required: {*/}
                  {/*      value: true,*/}
                  {/*      message: "Quantity is required",*/}
                  {/*    },*/}
                  {/*  }}*/}
                  {/*/>*/}
                </Stack>
                <Stack gap={0.5} maxWidth={40} flexGrow={1}>
                  <Typography
                    variant="body2"
                    sx={{ visibility: "hidden" }}
                    color="textSecondary"
                  >
                    Remove
                  </Typography>
                  <IconButton size="small" onClick={() => removeProduct(index)}>
                    <CloseRoundedIcon color="error" />
                  </IconButton>
                </Stack>
              </Stack>
            ))}
            <Stack direction="row" gap={2}>
              <Button
                variant="contained"
                disabled={!watchProducts || watchProducts.length < 1}
                size="small"
                sx={{ minWidth: 100, borderRadius: "6px", height: 32 }}
                startIcon={<PreviewOutlinedIcon sx={{ width: 14 }} />}
                // onClick={() => navigate("/admin/products/create")}
              >
                Preview
              </Button>
            </Stack>
          </Stack>
          {watchProducts && (
            <Stack flexGrow={1} maxWidth={600} minHeight={645}>
              <CodeBlockToPdf>{previewReceipt()}</CodeBlockToPdf>{" "}
            </Stack>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderCreate;
