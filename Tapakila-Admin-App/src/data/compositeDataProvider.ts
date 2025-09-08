
import { 
  DataProvider,
  GetListResult,
  GetOneResult,
  GetManyResult,
  GetManyReferenceResult,
  UpdateResult,
  UpdateManyResult,
  CreateResult,
  DeleteResult,
  DeleteManyResult,
  RaRecord,
  Identifier
} from 'react-admin';
import { eventsDataProvider } from "./events-data-provider";
import { userDataProvider } from "./users-data-provider";
import { contactDataProvider } from "./contact-data-provider";

interface Event extends RaRecord {
  available_tickets: number;
  total_tickets: number;
  event_id: string;
  event_name: string;
  event_date: string;
  event_place: string;
  event_category: string;
  event_description: string;
  event_image?: string;
  event_organizer?: string;
  event_status: string;
}

interface User extends RaRecord {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface GetTicketsParams {
  eventId: string;
  status?: string;
}

interface CustomDataProvider extends DataProvider {
  getTicketsForEvent: (resource: string, params: GetTicketsParams) => Promise<number>;
}

const compositeDataProvider: CustomDataProvider = {
  getList: async <RecordType extends RaRecord = any>(resource: string, params: any): Promise<GetListResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.getList(resource, params) as GetListResult<Event>;
    } else if (resource === "users") {
      result = await userDataProvider.getList(params) as GetListResult<User>;
    } else if (resource === "contact") {
      result = await contactDataProvider.getList();
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    return result as GetListResult<RecordType>;
  },


  getOne: async <RecordType extends RaRecord = any>(resource: string, params: any): Promise<GetOneResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.getOne(resource, params) as GetOneResult<Event>;
    } else if (resource === "users") {
      result = await userDataProvider.getOne(params) as GetOneResult<User>;
    } else if (resource === "contact") {
      result = await contactDataProvider.getOne(params);
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    if (!result) {
      throw new Error(`Record not found`);
    }
    return result as GetOneResult<RecordType>;
  },


  getMany: async <RecordType extends RaRecord = any>(resource: string, params: any): Promise<GetManyResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.getMany(resource, params) as GetManyResult<Event>;
    } else if (resource === "users") {
      result = await userDataProvider.getMany(resource, params) as GetManyResult<User>;
    } else {
      throw new Error(`Unknown resource: ${resource}`);

    }
    return result as unknown as GetManyResult<RecordType> || { data: [] };
  },


  getManyReference: async <RecordType extends RaRecord = any>(resource: string, params: any): Promise<GetManyReferenceResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.getManyReference(resource, params) as GetManyReferenceResult<Event>;
    } else if (resource === "users") {
      result = await userDataProvider.getManyReference(resource, params) as GetManyReferenceResult<User>;
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    return result as unknown as GetManyReferenceResult<RecordType> || { data: [], total: 0 };
  },

  update: async <RecordType extends RaRecord = any>(resource: string, params: any): Promise<UpdateResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.update(resource, params) as UpdateResult<Event>;
    } else if (resource === "users") {
      result = await userDataProvider.update(resource, params) as UpdateResult<User>;
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    if (!result) {
      throw new Error(`Update failed`);
    }
    return result as unknown as UpdateResult<RecordType>;
  },


  updateMany: async <RecordType extends RaRecord = any>(resource: string, params: any): Promise<UpdateManyResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.updateMany(resource, params) as UpdateManyResult<Event>;
    } else if (resource === "users") {
      result = await userDataProvider.updateMany(resource, params) as UpdateManyResult<User>;
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    return result as unknown as UpdateManyResult<RecordType> || { data: [] };
  },

  create: async <RecordType extends Omit<RaRecord, "id"> = any>(resource: string, params: any): Promise<CreateResult<RecordType & { id: Identifier }>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.create(resource, params) as CreateResult<Event>;
    } else if (resource === "users") {
      result = await userDataProvider.create(resource, params) as CreateResult<User>;
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    if (!result) {
      throw new Error(`Create failed`);
    }
    return result as unknown as CreateResult<RecordType & { id: Identifier }>;
  },

  delete: async <RecordType extends RaRecord = any>(resource: string, params: any): Promise<DeleteResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.delete(resource, params) as DeleteResult<Event>;
    } else if (resource === "users") {
      result = await userDataProvider.delete(resource, params) as DeleteResult<User>;
    } else if (resource === "contact") {
      result = await contactDataProvider.delete(params);
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    if (!result) {
      throw new Error(`Delete failed`);
    }
    return result as DeleteResult<RecordType>;
  },

  deleteMany: async <RecordType extends RaRecord = any>(resource: string, params: any): Promise<DeleteManyResult<RecordType>> => {
    let result;
    if (resource === "events") {
      result = await eventsDataProvider.deleteMany(resource, params) as DeleteManyResult<Event>;
    } else if (resource === "users") {
      result = await userDataProvider.deleteMany(resource, params) as DeleteManyResult<User>;
    } else {
      throw new Error(`Unknown resource: ${resource}`);
    }
    return result as unknown as DeleteManyResult<RecordType> || { data: [] };
  },

  getTicketsForEvent: async (resource: string, params: GetTicketsParams): Promise<number> => {
    if (resource === "events") {
      return eventsDataProvider.getTicketsForEvent(params);
    }
    throw new Error(`Unknown resource: ${resource}`);
  },
};

export { compositeDataProvider };  export type { Event, User };

