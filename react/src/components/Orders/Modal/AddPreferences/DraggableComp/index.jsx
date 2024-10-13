import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Colbar } from "./Colbar";
import "./index.scss";

const DraggableComp = ({ data, setPreferenceModal }) => {
  const handleOnDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (draggableId == "Order Details" || draggableId == "Actions") return;
    if (destination.index == 0 || destination.index == 9) return;

    setPreferenceModal((pre) => {
      let arr = [...pre];
      let add = pre[source.index];
      arr.splice(source.index, 1);
      arr.splice(destination.index, 0, add);
      return arr;
    });
  };

  return (
    <div className="dragable-list-wraper">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="dragable-area">
          {(provided) => (
            <ul
              className="dragable-area"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {data.map((field, index) => {
                return (
                  <Draggable
                    key={field.headingPreference}
                    draggableId={field.headingPreference.toString()}
                    index={index}
                    isDragDisabled={
                      field.headingPreference === "Order Details" ||
                      field.headingPreference === "Actions"
                    }
                    disableInteractiveElementBlocking={
                      field.headingPreference === "Order Details" ||
                      field.headingPreference === "Actions"
                    }
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Colbar
                          data={field}
                          index={index}
                          setPreferenceModal={setPreferenceModal}
                        />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DraggableComp;
