import { IconButton, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputText from "../../../../../components/Input/InputText.tsx";
import {
  IProductResponse,
  IUploadImageResponse,
} from "../../../../../services/types/ProductInterface.tsx";
import {
  IUserCreatePayload,
  IUserResponse,
} from "../../../../../services/types/UserInterface.tsx";
import { validateEmail } from "../../../../../utils/common.ts";
import {
  useCreateUserMutation,
  useDeleteImageMutation,
  useUpdateUserMutation,
  useUploadImageMutation,
} from "../../../../../services/adminApi.ts";
import { useGetUserByIdQuery } from "../../../../../services/userApi.ts";
import InputPhone from "../../../../../components/Input/InputPhone.tsx";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import { useFindProduct } from "./useFindProduct.tsx";
import { usePreview } from "./usePreview.tsx";
import { useFindUser } from "./useFindUser.tsx";

export type IDepositRegister = IUserResponse & {
  address: string;
  products: IProductResponse[];
};

const OrderDeposit = () => {
  const navigate = useNavigate();
  const param = useParams();
  const formData = useForm<IDepositRegister>();
  const [focusField, setFocusField] = useState<keyof IUserResponse | null>(
    null,
  );
  const formDataArray = useFieldArray({
    control: formData.control,
    name: "products",
  });
  const watchProducts = formData.watch("products");
  const watchData = formData.watch();
  const { findUserJsx, selectUser, setSelectUser } = useFindUser({
    key: focusField ?? "firstName",
    formData,
  });
  const { returnJsx, selectOption, setSelectOption, setSearchValue } =
    useFindProduct();
  const { previewReceipt } = usePreview();
  const [files, setFiles] = useState<IUploadImageResponse[]>([]);

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

  const handleFocusField = (keyField: keyof IUserResponse) => {
    setFocusField(keyField);
  };

  const handleOnBlurField = () => {
    setFocusField(null);
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

  const handleSubmit = async (data: IDepositRegister) => {
    if (files.length > 0) {
      for (const f of files.flatMap((i) => i.originalFile)) {
        const form = new FormData();
        if (f) {
          form.append("file", f);
          await upload({ form })
            .unwrap()
            .then((res) => {
              createUser(data, res.imageUrl, res.public_id);
            });
        }
      }
    } else {
      await createUser(data, "", "");
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
      if (duplicateCode) {
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

  const resetFormData = () => {
    if (selectUser) {
      formData.reset({
        firstName: selectUser.firstName,
        lastName: selectUser.lastName,
        email: selectUser.email,
        phone: selectUser.phone,
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
    };
  }, [selectOption, setSelectOption, setSearchValue]);

  useEffect(() => {
    if (selectUser) {
      resetFormData();
    }
  }, [selectUser]);

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
      sx={{
        width: "100%",
        maxWidth: { sm: "100%", md: "1700px" },
      }}
    >
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        {param.id ? "Update" : "Deposit"}
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
            <Stack sx={{ position: "relative" }}>
              <InputText
                formData={formData}
                name="address"
                placeholder="Address"
                error={formData.formState.errors["address"]}
                inputPropsTextField={{
                  type: "text",
                  multiline: true,
                  rows: 5,
                  slotProps: {
                    htmlInput: {
                      maxLength: 1000,
                    },
                  },
                }}
              />
              <Box
                sx={{
                  mt: "10px",
                  bottom: 5,
                  right: 10,
                  position: "absolute",
                }}
              >
                <Typography color="textSecondary">
                  {watchData.address ? watchData.address.length : 0} / {1000}{" "}
                  characters
                </Typography>
              </Box>
            </Stack>
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
                    rules={{
                      required: {
                        value: true,
                        message: "Code is required",
                      },
                    }}
                  />
                </Stack>
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
              <Button
                variant="contained"
                disabled={!watchProducts || watchProducts.length < 1}
                size="small"
                sx={{ minWidth: 100, borderRadius: "6px", height: 32 }}
                startIcon={<SaveAltRoundedIcon sx={{ width: 14 }} />}
                // onClick={() => navigate("/admin/products/create")}
              >
                Save
              </Button>
            </Stack>
          </Stack>
          {/*<Stack flexGrow={1}> {previewReceipt()}</Stack>*/}
        </Stack>
      </Box>
    </Box>
  );
};

export default OrderDeposit;
