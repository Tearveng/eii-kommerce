import { CircularProgress, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import InputText from "../../../../../components/Input/InputText.tsx";
import { IUploadImageResponse } from "../../../../../services/types/ProductInterface.tsx";
import {
  IUserCreatePayload,
  IUserResponse,
} from "../../../../../services/types/UserInterface.tsx";
import DropZoneUpload from "../../DropZoneUpload.tsx";
import { validateEmail } from "../../../../../utils/common.ts";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {
  useCreateUserMutation,
  useDeleteImageMutation,
  useUpdateUserMutation,
  useUploadImageMutation,
} from "../../../../../services/adminApi.ts";
import { useGetUserByIdQuery } from "../../../../../services/userApi.ts";

const UserCreate = () => {
  const navigate = useNavigate();
  const param = useParams();
  const formData = useForm<IUserResponse & { confirmPassword: string }>();
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
              validate: (val: any) => validateEmail(val),
            }}
          />
        </Stack>
        {!param.id && (
          <Stack direction="row" gap={4}>
            <Stack gap={0.5} flexGrow={1}>
              <Typography variant="body2" color="textSecondary">
                Password
              </Typography>
              <InputText
                formData={formData}
                name="password"
                placeholder="Password"
                error={formData.formState.errors["password"]}
                inputPropsTextField={{
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{ cursor: "pointer", height: 10 }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ width: 20 }} />
                          ) : (
                            <Visibility sx={{ width: 20 }} />
                          )}
                        </InputAdornment>
                      ),
                    },
                  },
                  type: handleShowPassword(),
                }}
                rules={{
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                }}
              />
            </Stack>
            <Stack gap={0.5} flexGrow={1}>
              <Typography variant="body2" color="textSecondary">
                Confirm Password
              </Typography>
              <InputText
                formData={formData}
                name="confirmPassword"
                placeholder="Confirm password"
                error={formData.formState.errors["confirmPassword"]}
                inputPropsTextField={{
                  slotProps: {
                    input: {
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          sx={{ cursor: "pointer", height: 10 }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityOff sx={{ width: 20 }} />
                          ) : (
                            <Visibility sx={{ width: 20 }} />
                          )}
                        </InputAdornment>
                      ),
                    },
                  },
                  type: handleShowPassword(),
                }}
                rules={{
                  required: {
                    value: true,
                    message: "Confirm password is required",
                  },
                  validate: (val: any) => {
                    if (val !== watchPassword) {
                      return "Password not matching";
                    }
                    return undefined;
                  },
                }}
              />
            </Stack>
          </Stack>
        )}

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
