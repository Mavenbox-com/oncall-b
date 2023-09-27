/**
* Add new structure data EntityResponse {newField}->data->{id,attributes}
* @param originalStructure Reference value to add new data
* @param newData Data to add
* @param newField New Field to create
*/
export const formEntityResponse = (originalStructure,newData,newField) => {
  if (newData.results.length > 0) {
    originalStructure[newField] = {
      data:{
        id: newData.results[0].id,
        attributes: newData.results[0]
      }
    };
  }
};
