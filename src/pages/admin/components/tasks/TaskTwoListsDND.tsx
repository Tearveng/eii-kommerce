import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
  useUpdateOrderTodoMutation,
  useUpdateTodoMutation,
} from "../../../../services/todoApi.ts";
import {
  ITodoCreatePayload,
  ITodoResponse,
} from "../../../../services/types/TodoInterface.ts";
import { groupBy } from "../../../../utils/internals/common.tsx";
import { TODO_STATUS } from "../../../../utils/constant.ts";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import Chip from "@mui/material/Chip";
import CircleIcon from "@mui/icons-material/Circle";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import IconButton from "@mui/material/IconButton";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import { grey } from "@mui/material/colors";

// a little function to help us with reordering the result
const reorder = (
  list: ITodoResponse[],
  startIndex: number,
  endIndex: number,
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (
  source: ITodoResponse[],
  destination: ITodoResponse[],
  droppableSource: any,
  droppableDestination: any,
): Record<string, ITodoResponse[]> => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  position: "relative",
  userSelect: "none",
  padding: grid / 6,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#fff",
  borderRadius: 1,
  transition: "all 0.2s ease",
  "&:hover .hover-action": {
    opacity: 1,
  },
  // styles we need to apply on draggables
  ...draggableStyle,
});

const id2ListMap = {
  todo: "items",
  inProgress: "selected",
  done: "completed",
};

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "#F4F6FB",
  padding: grid,
  width: 300,
});

const TaskTwoListsDND = () => {
  const [items, setItems] = useState<ITodoResponse[]>([]);
  const [inProgress, setInProgress] = useState<ITodoResponse[]>([]);
  const [completed, setCompleted] = useState<ITodoResponse[]>([]);
  const [fieldEdit, setFieldEdit] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [debouncedValue, setDebouncedValue] = useState(fieldEdit?.title);
  const [hasDropped, setHasDropped] = useState(false);
  const refTextField = useRef<HTMLInputElement>(null);

  // end-point
  const [createTodo, { isLoading: createTodoLoading }] =
    useCreateTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [updateOrderTodo] = useUpdateOrderTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const { data, isLoading: getTodosLoading } = useGetAllTodosQuery();

  const handleCreateTodo = async () => {
    const payload: ITodoCreatePayload = {
      title: "New Task",
    };
    await createTodo(payload).unwrap().then().catch().finally();
  };

  const handleUpdateTodo = async (id: number, payload: ITodoCreatePayload) => {
    await updateTodo({ body: { ...payload }, id })
      .unwrap()
      .then()
      .catch()
      .finally();
  };

  const handleUpdateOrderTodo = async () => {
    await updateOrderTodo({ orderedTodoIds: items.flatMap((i) => i.id) })
      .unwrap()
      .then()
      .catch()
      .finally();
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo({ id }).unwrap().then().catch().finally();
  };

  const handleEditTodo = (id: number, title: string) => {
    setFieldEdit({ id, title });
  };

  const handleChangeValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFieldEdit((prev) => ({ ...prev!, title: e.target.value }));
  };

  const mapStatus = (s: string) => {
    const status = {
      ["todo"]: TODO_STATUS.TODO,
      ["inProgress"]: TODO_STATUS.IN_PROGRESS,
      ["done"]: TODO_STATUS.COMPLETED,
    };

    return status[s];
  };

  const getList = (id: string) => {
    const listKey = id2ListMap[id];
    if (listKey === "items") return items;
    if (listKey === "selected") return inProgress;
    if (listKey === "completed") return completed;
    return [];
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(
        getList(source.droppableId),
        source.index,
        destination.index,
      );

      if (source.droppableId === "todo") {
        setItems(reordered);
      } else if (source.droppableId === "inProgress") {
        setInProgress(reordered);
      } else if (source.droppableId === "done") {
        setCompleted(reordered);
      }
    } else {
      const moved = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination,
      );

      // const status = mapStatus(destination.droppableId);
      // const id = result.draggableId.split("-")[1];
      // handleUpdateTodo(Number(id), { status }).then((r) => r);

      if ("todo" in moved) {
        setItems(moved.todo);
      }
      if ("inProgress" in moved) {
        setInProgress(moved.inProgress);
      }
      if ("done" in moved) {
        setCompleted(moved.done);
      }
    }
    setHasDropped(true);
  };

  useEffect(() => {
    if (hasDropped) {
      handleUpdateOrderTodo().then((r) => r);
      setHasDropped(false);
    }
  }, [hasDropped]);

  useEffect(() => {
    if (fieldEdit) {
      // Wait for focus to be applied before moving cursor
      if (refTextField.current) {
        const length = refTextField.current.value.length;
        refTextField.current?.setSelectionRange(length, length);
      }
    }
  }, [fieldEdit]);

  useEffect(() => {
    if (data) {
      const grouped = groupBy(data, (todos) => todos.status);
      if (TODO_STATUS.TODO in grouped) {
        setItems(grouped.TODO);
      } else {
        setItems([]);
      }

      if (TODO_STATUS.IN_PROGRESS in grouped) {
        setInProgress(grouped.IN_PROGRESS);
      } else {
        setInProgress([]);
      }

      if (TODO_STATUS.COMPLETED in grouped) {
        setCompleted(grouped.COMPLETED);
      } else {
        setCompleted([]);
      }
    }
  }, [data]);

  // Update debounced value after 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(fieldEdit?.title);
    }, 200);

    return () => clearTimeout(handler);
  }, [fieldEdit?.title]);

  // Trigger endpoint when debounced value changes
  useEffect(() => {
    if (debouncedValue && fieldEdit) {
      handleUpdateTodo(fieldEdit.id, { title: debouncedValue }).then((r) => r);
      // Call your API function here
    }
  }, [debouncedValue]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refTextField.current &&
        !refTextField.current.contains(event.target as Node)
      ) {
        setFieldEdit(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (getTodosLoading) {
    return <>loading...</>;
  }

  const chipLabel = (label: string, colorIcon: string) => (
    <Stack pb={2}>
      <Chip
        icon={<CircleIcon />}
        label={label}
        sx={{
          color: "grey",
          "& .MuiChip-icon": {
            color: colorIcon,
          },
        }}
      />
    </Stack>
  );

  const editButton = (todo: ITodoResponse) => {
    return (
      <Stack
        className="hover-action"
        direction="row"
        sx={{
          opacity: 0,
          transition: "opacity 0.3s",
          position: "absolute",
          right: 6,
          top: 18,
          transform: "translateY(-50%)",
        }}
      >
        <IconButton
          size="small"
          sx={{ width: 18, height: 18, borderRadius: 0.5 }}
          onClick={() => handleEditTodo(todo.id, todo.title)}
        >
          <BorderColorOutlinedIcon sx={{ width: 12 }} />
        </IconButton>
        <IconButton
          size="small"
          disableFocusRipple
          disableRipple
          disableTouchRipple
          sx={{
            width: 18,
            height: 18,
            borderRadius: 0.5,
            bgcolor: "red",
            "&:hover": {
              backgroundColor: "red",
            },
          }}
          onClick={() => handleDeleteTodo(todo.id)}
        >
          <RemoveOutlinedIcon sx={{ width: 12, color: "#fff" }} />
        </IconButton>
      </Stack>
    );
  };

  const fieldEditTextField = (todo: ITodoResponse) => {
    return (
      <Stack>
        <Stack direction="row" gap={1}>
          <EditNoteOutlinedIcon />
          {fieldEdit && fieldEdit.id === todo.id ? (
            <TextField
              variant="outlined"
              type="text"
              size="small"
              inputRef={refTextField}
              autoFocus
              minRows={1}
              multiline
              fullWidth
              name={`todo-${todo.id}`}
              value={fieldEdit.title}
              onChange={handleChangeValue}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  p: 0,
                  border: "none",
                  boxShadow: 0,
                  // bgcolor: fieldEdit && grey[200],
                  [`&.${outlinedInputClasses.focused}`]: {
                    outline: "none",
                  },
                },
              }}
            />
          ) : (
            <Typography
              variant="body2"
              sx={{
                whiteSpace: "normal", // allow normal wrapping
                wordBreak: "break-word", // optional: handle long words
              }}
            >
              {todo.title}
            </Typography>
          )}
        </Stack>
      </Stack>
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack direction="row">
        <Stack border={`1px solid ${grey[200]}`}>
          <Droppable droppableId="todo">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {chipLabel("Todo", "grey")}
                {items.map((item, index) => (
                  <Draggable
                    key={`item-${item.sortOrder}`}
                    draggableId={`item-${item.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Stack
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        {!fieldEdit && editButton(item)}
                        {fieldEditTextField(item)}
                      </Stack>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Stack>
                  <Button
                    variant="text"
                    startIcon={<AddOutlinedIcon />}
                    onClick={handleCreateTodo}
                    disabled={createTodoLoading}
                  >
                    New task
                  </Button>
                </Stack>
              </div>
            )}
          </Droppable>
        </Stack>
        <Stack border={`1px solid ${grey[200]}`}>
          <Droppable droppableId="inProgress">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {chipLabel("In progress", "lightblue")}
                {inProgress.map((item, index) => (
                  <Draggable
                    key={`item-${item.id}`}
                    draggableId={`item-${item.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Stack
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        {editButton(item)}
                        {fieldEditTextField(item)}
                      </Stack>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Stack>
        <Stack border={`1px solid ${grey[200]}`}>
          <Droppable droppableId="done">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {chipLabel("Done", "lightgreen")}
                {completed.map((item, index) => (
                  <Draggable
                    key={`item-${item.id}`}
                    draggableId={`item-${item.id}`}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Stack
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style,
                        )}
                      >
                        {editButton(item)}
                        {fieldEditTextField(item)}
                      </Stack>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Stack>
      </Stack>
    </DragDropContext>
  );
};

export default TaskTwoListsDND;
