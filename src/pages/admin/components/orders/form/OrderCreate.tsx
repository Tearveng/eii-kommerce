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
import { useAppSelector } from "../../../../../redux.ts";
import {
  useDeleteImageMutation,
  useUpdateUserMutation,
  useUploadImageMutation
} from "../../../../../services/adminApi.ts";
import { useCreateOrderMutation } from "../../../../../services/orderApi.ts";
import {
  IProductResponse,
  IUploadImageResponse,
} from "../../../../../services/types/ProductInterface.tsx";
import {
  IUserResponse
} from "../../../../../services/types/UserInterface.tsx";
import { useGetUserByIdQuery } from "../../../../../services/userApi.ts";
import { validateEmail } from "../../../../../utils/common.ts";
import { useFindProduct } from "./useFindProduct.tsx";
import { useFindUser } from "./useFindUser.tsx";
import { usePreview } from "./usePreview.tsx";

const OrderCreate = () => {
  const { user } = useAppSelector(state => state.application)
  const navigate = useNavigate();
  const param = useParams();
  const [focusField, setFocusField] = useState<keyof IUserResponse | null>(
    null,
  );
  const formData = useForm<IUserResponse & { products: IProductResponse[] }>();
  const formDataArray = useFieldArray({
    control: formData.control,
    name: "products",
  });
  const watchFormData = formData.watch();
  const watchProducts = formData.watch("products");
  const { findUserJsx, selectUser, setSelectUser } = useFindUser({
    key: focusField ?? "firstName",
    formData,
  });
  const { returnJsx, selectOption, setSelectOption, setSearchValue } =
    useFindProduct();
  const { previewReceipt } = usePreview({
    tableData: watchFormData,
  });
  const [files, setFiles] = useState<IUploadImageResponse[]>([]);
  const [showPassword, setShowPassword] = useState(true);
  const handleShowPassword = () => (showPassword ? "password" : "text");

  // *** end-point ***
  const [create, { isLoading: createLoading }] = useCreateOrderMutation();
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
    { skip: !param.id, refetchOnMountOrArgChange: true }
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
            prev.filter((item) => item.public_id !== res.public_id)
          );
        });
    } else {
      setFiles((prev) => prev.filter((_, i) => i !== props.index));
    }
  };

  const createOrder = async (
    data: IUserResponse & { products: IProductResponse[] },
  ) => {
    if (user) {
      const products = data.products.map(p => ({
        id: p.id,
        skuCode: p.skuCode,
        quantity: p.quantity,
        discount: 0,
      }))

      return create({
        clientId: data.id,
        profileId: user.id,
        address: data.address,
        items: products
      })
        .unwrap()
        .then(() => navigate("/admin/people?page=1&limit=20"))
        .catch((e) => console.error(e));
    }
  };

  const updateUser = async (
    data: IUserResponse,
    imageUrl?: string,
    publicId?: string
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

  const handleSubmit = async (data: IUserResponse & { products: IProductResponse[] }) => {
    await createOrder(data)
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

  const handleFocusField = (keyField: keyof IUserResponse) => {
    setFocusField(keyField);
  };

  const handleOnBlurField = () => {
    setFocusField(null);
  };

  const resetFormData = () => {
    if (selectUser) {
      formData.reset({
        id: selectUser.id,
        firstName: selectUser.firstName,
        lastName: selectUser.lastName,
        email: selectUser.email,
        phone: selectUser.phone,
        address: '',
        products: watchProducts
      });
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

  useEffect(() => {
    if (selectUser) {
      resetFormData();
    }
  }, [selectUser]);

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
          param.id ? handleUpdateSubmit : handleSubmit
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
            {findUserJsx(
              (e) => (
                <InputText
                  formData={formData}
                  name="firstName"
                  placeholder="First name"
                  error={formData.formState.errors["firstName"]}
                  inputPropsAutoComplete={e}
                  disableSuggestions={true}
                  inputPropsTextField={{
                    onFocus: () => handleFocusField("firstName"),
                    onBlur: handleOnBlurField,
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: "First name is required",
                    },
                  }}
                />
              ),
              "firstName",
            )}
          </Stack>
          <Stack gap={0.5} flexGrow={1}>
            <Typography variant="body2" color="textSecondary">
              Last name
            </Typography>
            {findUserJsx(
              (e) => (
                <InputText
                  formData={formData}
                  name="lastName"
                  placeholder="Last name"
                  error={formData.formState.errors["lastName"]}
                  inputPropsAutoComplete={e}
                  disableSuggestions={true}
                  inputPropsTextField={{
                    onFocus: () => handleFocusField("lastName"),
                    onBlur: handleOnBlurField,
                  }}
                  rules={{
                    required: {
                      value: false,
                      message: "Last name is required",
                    },
                  }}
                />
              ),
              "lastName",
            )}
          </Stack>
        </Stack>
        <Stack direction="row" gap={2}>
          <Stack gap={0.5} flexGrow={1}>
            <Typography variant="body2" color="textSecondary">
              Email address
            </Typography>
            {findUserJsx(
              (e) => (
                <InputText
                  formData={formData}
                  name="email"
                  placeholder="Email address"
                  error={formData.formState.errors["email"]}
                  inputPropsAutoComplete={e}
                  disableSuggestions={true}
                  inputPropsTextField={{
                    onFocus: () => handleFocusField("email"),
                    onBlur: handleOnBlurField,
                  }}
                  rules={{
                    required: {
                      value: true,
                      message: "Email address is required",
                    },
                    validate: (val: any) => validateEmail(val),
                  }}
                />
              ),
              "email",
            )}
          </Stack>
          <Stack gap={0.5} flexGrow={1}>
            <Typography variant="body2" color="textSecondary">
              Phone number
            </Typography>
            {findUserJsx(
              (e) => (
                <InputPhone
                  formData={formData}
                  name="phone"
                  placeholder="Phone number"
                  error={formData.formState.errors["phone"]}
                  inputPropsAutoComplete={e}
                  inputPropsTextField={{
                    onFocus: () => handleFocusField("phone"),
                    onBlur: handleOnBlurField,
                  }}
                />
              ),
              "phone",
            )}
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
        <Stack direction="row">
          <Stack gap={2} flexGrow={1} maxWidth={850}>
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
          {watchProducts && <Stack flexGrow={1}>{previewReceipt()}</Stack>}
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderCreate;
