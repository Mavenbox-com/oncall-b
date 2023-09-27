import { v4 as uuidv4 } from 'uuid';

module.exports = {
  beforeCreate(event: { params: { data: { external_id?: string } } }) {
    if (!event.params.data.external_id) {
      const external_id = uuidv4();
      event.params.data.external_id = external_id;
    }
  },

  beforeUpdate(event: { params: { data: { external_id?: string } } }) {
    if (!event.params.data.external_id) {
      const external_id = uuidv4();
      event.params.data.external_id = external_id;
    }
  },
};
